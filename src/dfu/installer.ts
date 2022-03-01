import Downloader from "./downloader";
import Numworks from "numworks.js";

import {
    Firmware,
    releases as finalReleases,
    Releases,
} from "../firmware/firmwares";
import { betas as betaReleases } from "../firmware/betas";
import Install from "../pages/Install";

// use JSON.parse(JSON.stringify()) to do a deep copy to avoid problems
var releasesList: Releases = JSON.parse(JSON.stringify(finalReleases));
releasesList["firmwares"] = releasesList.firmwares.concat(
    JSON.parse(JSON.stringify(betaReleases.firmwares))
);

// Used for debugging. When true, skips downloading and flashing.
const DO_DRY_RUN = false;

type AsyncCallback = () => Promise<void>;

/**
 * Installer class. Makes link between the front-end and the nw.js lib.
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class Installer {
    installInstance: Install;

    toInstall: string;
    firmwareInfos?: Firmware;
    ignoreDisconnect: boolean;
    waitingForFlash: boolean;

    calculator: any; // Numworks
    storageContent: any; // Numworks.Storage
    calculatorRecovery: any; // Numworks.Recovery
    downloader: Downloader;

    constructor(install: Install) {
        this.installInstance = install;

        this.toInstall = "latest";
        // this.firmwareInfos = null;
        this.ignoreDisconnect = false;
        this.waitingForFlash = false;

        this.calculator = new Numworks();
        this.storageContent = new Numworks.Storage();
        this.calculatorRecovery = new Numworks.Recovery();
        this.downloader = new Downloader();
    }

    init(versionToInstall: string) {
        this.toInstall = versionToInstall;
        if (this.toInstall === "latest") {
            this.toInstall = releasesList.latest;
        }

        for (var firm in releasesList.firmwares) {
            if (releasesList.firmwares[firm].name === this.toInstall) {
                this.firmwareInfos = releasesList.firmwares[firm];
                break;
            }
        }

        if (!this.firmwareInfos) {
            return this.installInstance.firmwareNotFound(this.toInstall);
        } else {
            this.installInstance.calculatorError(false, null);
        }

        if (typeof navigator.usb === "undefined") {
            this.installInstance.installerNotCompatibleWithThisBrowser();
        } else {
            navigator.usb.addEventListener(
                "disconnect",
                this.onUnexpectedDisconnect.bind(this)
            );
            this.calculator.autoConnect(this.autoConnectCallback.bind(this));
        }
    }

    private async setCalculatorInfos() {
        this.installInstance.setModel("N" + this.calculator.getModel());

        let platformInfo = await this.calculator.getPlatformInfo();

        // {"magik":true,"oldplatform":false,"omega":{"installed":true,"version":"1.19.0-0","user":""},"version":"13.0.0","commit":"dcaa1cb","storage":{"address":536874844,"size":32768}}

        if (platformInfo.magik) {
            this.installInstance.setEpsilonVersion(platformInfo.version);
            if (platformInfo.omega.installed) {
                this.installInstance.setOmegaVersion(
                    platformInfo.omega.version
                );

                if (platformInfo.omega.user.trim().length > 0) {
                    this.installInstance.setUsername(
                        platformInfo.omega.user.trim()
                    );
                }
            }
        }

        if (this.firmwareInfos && this.firmwareInfos.languages) {
            // Multi languages support
            if (this.calculator.getModel() in this.firmwareInfos.languages) {
                const model: string = this.calculator.getModel();
                // @ts-ignore
                const languageList: any = this.firmwareInfos.languages[model];
                this.installInstance.setLangsList(languageList);
            } else {
                this.installInstance.disableLanguage();
            }
        } else {
            this.installInstance.disableLanguage();
        }

        // Custom name support
        if (this.firmwareInfos?.setname) {
            this.installInstance.enableName();
        } else {
            this.installInstance.disableName();
        }

        this.installInstance.calculatorDetected(
            platformInfo.omega.installed ? "omega" : "epsilon"
        );
    }

    private reinstallStorageCallback() {
        this.storageContent = new Numworks.Storage();
        this.waitingForFlash = false;

        this.installInstance.installationFinished();
    }

    private async reinstallStorage() {
        if (this.storageContent !== null)
            this.calculator.installStorage(
                this.storageContent,
                this.reinstallStorageCallback.bind(this)
            );
    }

    async install(language?: string) {
        const model = this.installInstance.state.model;

        console.log(`install version ${this.toInstall}/${model}`);

        this.calculator.device.logProgress = (done: number, total: number) => {
            this.installInstance.setProgressPercentage((done / total) * 100);
        };

        let platformInfo = await this.calculator.getPlatformInfo();
        console.log(platformInfo);

        if (platformInfo.magik) {
            this.storageContent = await this.calculator.backupStorage();

            // Ditch all non-python stuff, for convenience.
            for (var i in this.storageContent.records) {
                if (this.storageContent.records[i].type !== "py")
                    this.storageContent.records.splice(i, 1);
            }
        } else {
            this.storageContent = null;
        }

        var callback = async () => {
            this.waitingForFlash = true;
            this.calculator.autoConnect(this.autoConnectCallback.bind(this));
        }; // .bind(this);

        if (!DO_DRY_RUN) {
            model === "N0100"
                ? await this.installN0100(callback, language)
                : await this.installN0110(callback, language);
        } else {
            callback();
        }

        // this.installInstance.installationFinished();
    }

    private async installN0100(callback: AsyncCallback, language?: string) {
        const filename = language
            ? `epsilon.onboarding.internal.${language}.bin`
            : "epsilon.onboarding.internal.bin";

        this.downloader.downloadFirmwareCheck(
            this.installInstance.state.model,
            this.toInstall,
            filename,
            async (internalCheck: boolean, internalBlob: any) => {
                if (!internalCheck) {
                    this.installInstance.calculatorError(
                        true,
                        "Download of internal seems corrupted, please retry."
                    );
                }

                this.ignoreDisconnect = true;

                let internalFirmware = await internalBlob.arrayBuffer();

                // Add username to the binary.
                if (this.installInstance.state.getname) {
                    let internalBuffer = new Uint8Array(internalFirmware);
                    let username = this.installInstance.state.customname;

                    let encoder = new TextEncoder();
                    let encoded = encoder.encode(username + "\0");
                    if (encoded.length > 16) {
                        encoded[15] = 0;
                        encoded = encoded.slice(0, 16);
                    }
                    internalBuffer.set(encoded, 0x1f8);
                }

                await this.calculator.flashInternal(internalFirmware);
                await callback();
            }
        );
    }

    private async installN0110(callback: AsyncCallback, language?: string) {
        const filenameInternal = language
            ? `epsilon.onboarding.internal.${language}.bin`
            : "epsilon.onboarding.internal.bin";

        const filenameExternal = language
            ? `epsilon.onboarding.external.${language}.bin`
            : "epsilon.onboarding.external.bin";

        this.downloader.downloadFirmwareCheck(
            this.installInstance.state.model,
            this.toInstall,
            filenameExternal,
            async (externalCheck: boolean, externalBlob: any) => {
                if (!externalCheck) {
                    this.installInstance.calculatorError(
                        true,
                        "Download of external seems corrupted, please retry."
                    );
                }

                this.downloader.downloadFirmwareCheck(
                    this.installInstance.state.model,
                    this.toInstall,
                    filenameInternal,
                    async (internalCheck: boolean, internalBlob: any) => {
                        if (!internalCheck) {
                            this.installInstance.calculatorError(
                                true,
                                "Download of internal seems corrupted, please retry."
                            );
                        }

                        await this.calculator.flashExternal(
                            await externalBlob.arrayBuffer()
                        );

                        this.ignoreDisconnect = true;

                        let internalFirmware = await internalBlob.arrayBuffer();

                        // Add username to the binary.
                        if (this.installInstance.state.getname) {
                            let internalBuffer = new Uint8Array(
                                internalFirmware
                            );
                            const username =
                                this.installInstance.state.customname;

                            let encoder = new TextEncoder();
                            let encoded = encoder.encode(username + "\0");
                            if (encoded.length > 16) {
                                encoded[15] = 0;
                                encoded = encoded.slice(0, 16);
                            }
                            internalBuffer.set(encoded, 0x1f8);
                        }

                        await this.calculator.flashInternal(internalFirmware);

                        // await this.calculator.flashInternal(await internal_blob.arrayBuffer());

                        await callback();
                    }
                );
            }
        );
    }

    private async installRecovery(callback: AsyncCallback) {
        const filename = "flasher.verbose.bin";

        this.downloader.downloadFirmwareCheck(
            this.installInstance.state.model,
            "flasher",
            filename,
            async (flasherCheck: boolean, flasherBlob: any) => {
                if (!flasherCheck) {
                    this.installInstance.calculatorError(
                        true,
                        "Download of flasher seems corrupted, please retry."
                    );
                }

                let flasher = await flasherBlob.arrayBuffer();

                await this.calculatorRecovery.flashRecovery(flasher);
                await callback();
            }
        );
    }

    private async detectCallback() {
        await this.setCalculatorInfos();
    }

    private async detectErrorCallback(error: any) {
        this.installInstance.calculatorError(true, error);
    }

    detect() {
        this.installInstance.calculatorError(false, null);
        this.calculator.detect(
            this.detectCallback.bind(this),
            this.detectErrorCallback.bind(this)
        );
    }

    private async recoveryDetectCallback() {
        this.installInstance.setModel("N" + this.calculatorRecovery.getModel());
        await this.installRecovery(async function () {});
    }

    recovery() {
        this.installInstance.calculatorError(false, null);
        this.calculatorRecovery.detect(
            this.recoveryDetectCallback.bind(this),
            this.detectErrorCallback.bind(this)
        );
    }

    private onUnexpectedDisconnectCallback(event: any) {
        if (this.ignoreDisconnect === false)
            this.installInstance.calculatorError(true, event);
        this.calculator.autoConnect(this.autoConnectCallback.bind(this));
    }

    onUnexpectedDisconnect(event: any) {
        this.calculator.onUnexpectedDisconnect(
            event,
            this.onUnexpectedDisconnectCallback.bind(this)
        );
    }

    private async autoConnectCallback() {
        if (this.waitingForFlash) {
            await this.setCalculatorInfos();
            await this.reinstallStorage();
        } else {
            this.installInstance.calculatorError(false, null);
            await this.setCalculatorInfos();
        }
        console.log("AUTOCONNECT!");
    }
}
