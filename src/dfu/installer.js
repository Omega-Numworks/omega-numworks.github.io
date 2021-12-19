
import Downloader from "../dfu/downloader"
import Numworks from "numworks.js"

import { releases as finalReleases } from '../firmware/firmwares'
import { betas as betaReleases } from '../firmware/betas'
import { epsilon as epsilonReleases } from "../firmware/epsilon"

// use JSON.parse(JSON.stringify()) to do a deep copy to avoid problems
var releases_list = JSON.parse(JSON.stringify(finalReleases));
releases_list["firmwares"] = releases_list.firmwares.concat(JSON.parse(JSON.stringify(betaReleases.firmwares)));
releases_list["firmwares"] = releases_list.firmwares.concat(JSON.parse(JSON.stringify(betaReleases.firmwares))).concat(JSON.parse(JSON.stringify(epsilonReleases.firmwares)));

// Used for debugging. When true, skips downloading and flashing.
const DO_DRY_RUN = false;

/**
 * Installer class. Makes link between the front-end and the nw.js lib.
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class Installer {
    constructor(install) {
        this.installInstance = install;

        this.toInstall = "latest";
        this.firmwareInfos = null;
        this.ignore_disconnect = false;
        this.waiting_for_flash = false;
        
        this.calculator = new Numworks();
        this.storage_content = new Numworks.Storage();
        this.calculator_recovery = new Numworks.Recovery();
        this.downloader = new Downloader();
    }
    
    init(versionToInstall) {
        this.toInstall = versionToInstall;
        if (this.toInstall === "latest") {
            this.toInstall = releases_list.latest;
        }
        
        
        for (var firm in releases_list.firmwares) {
            if (releases_list.firmwares[firm].name === this.toInstall) {
                this.firmwareInfos = releases_list.firmwares[firm];
                break;
            }
        }
        
        if (this.firmwareInfos == null) {
            this.installInstance.firmwareNotFound(this.toInstall);
            return;
        } else {
            this.installInstance.calculatorError(false, null);
        }
        
        
        if (typeof navigator.usb === 'undefined') {
            this.installInstance.installerNotCompatibleWithThisBrowser();
        } else {
            navigator.usb.addEventListener("disconnect", this.onUnexpectedDisconnect.bind(this));
        this.calculator.autoConnect(this.__autoConnectCallback.bind(this));
        }
    }
    
    async __setCalculatorInfos() {
        this.installInstance.setModel("N" + this.calculator.getModel());
        
        let pinfo = await this.calculator.getPlatformInfo();
        
        // {"magik":true,"oldplatform":false,"omega":{"installed":true,"version":"1.19.0-0","user":""},"version":"13.0.0","commit":"dcaa1cb","storage":{"address":536874844,"size":32768}}
        
        if (pinfo.magik) {
            this.installInstance.setEpsilonVersion(pinfo.version);
            if (pinfo.omega.installed) {
                this.installInstance.setOmegaVersion(pinfo.omega.version);
                
                if (pinfo.omega.user.trim().length > 0) {
                    this.installInstance.setUsername(pinfo.omega.user.trim());
                }
            }
        }
        
        if ("languages" in this.firmwareInfos) {
            // Multilang support
            
            if (this.calculator.getModel() in this.firmwareInfos.languages) {
                this.installInstance.setLangsList(this.firmwareInfos.languages[this.calculator.getModel()]);
            } else {
                this.installInstance.disableLanguage();
            }
        } else {
            this.installInstance.disableLanguage();
        }
        
        if (this.firmwareInfos.setname) {
            // Custom name support enabled
            
            this.installInstance.enableName();
        } else {
            this.installInstance.disableName();
        }
        
        this.installInstance.calculatorDetected(pinfo.omega.installed ? "omega" : "epsilon");
        
    }
    
    __reinstallStorageCallback() {
        this.storage_content = new Numworks.Storage();
        this.waiting_for_flash = false;
        
        this.installInstance.installationFinished();
    }
    
    async __reinstallStorage() {
        if (this.storage_content !== null)
            this.calculator.installStorage(this.storage_content, this.__reinstallStorageCallback.bind(this));
    }
    
    async install(language) {
        console.log("install version" + this.toInstall + "/" + this.installInstance.state.model);
        
        var _this = this;
        this.calculator.device.logProgress = function(done, total) {
            _this.installInstance.setProgressPercentage(done / total * 100);
        };
        
        let pinfo = await this.calculator.getPlatformInfo();
        console.log(pinfo);
        
        if (pinfo.magik) {
            this.storage_content = await this.calculator.backupStorage();

            // Ditch all non-python stuff, for convinience.
            for(var i in this.storage_content.records) {
                if (this.storage_content.records[i].type !== 'py') this.storage_content.records.splice(i, 1);
            }
        } else {
            this.storage_content = null;
        }
        
        var callback = async function() {
            this.waiting_for_flash = true;
            this.calculator.autoConnect(this.__autoConnectCallback.bind(this));
        }.bind(this);
        
        if (!DO_DRY_RUN) {
            if (this.installInstance.state.model === "N0100") {
                await this.__installN0100(callback, language);
            } else {
                await this.__installN0110(callback, language);
            }
        } else {
            callback();
        }

        

        
        // this.installInstance.installationFinished();

    }
    
    async __installN0100(callback, language) {
        var _this = this;
        var file_name = "epsilon.onboarding.internal.bin";
        
        if (language !== null) {
            file_name = "epsilon.onboarding.internal." + language + ".bin";
        }
        
        _this.downloader.downloadFirmwareCheck(_this.installInstance.state.model, _this.toInstall, file_name, async (internal_check, internal_blob) => {
            if (!internal_check) {
                _this.installInstance.calculatorError(true, "Download of internal seems corrupted, please retry.");
            }
            
            this.ignore_disconnect = true;

            let internal_fw = await internal_blob.arrayBuffer();
            
            // Add username to the binary.
            if (_this.installInstance.state.getname) {
                let internal_buf = new Uint8Array(internal_fw);
                let username = _this.installInstance.state.customname;
                
                let enc = new TextEncoder();
                let encoded = enc.encode(username + "\0");
                if (encoded.length > 16) {
                    encoded[15] = 0;
                    encoded = encoded.slice(0, 16);
                }
                internal_buf.set(encoded, 0x1F8);
            }
            
            await _this.calculator.flashInternal(internal_fw);
            
            await callback();
        });
    }
    
    async __installN0110(callback, language) {
        var _this = this;
        var file_name_internal = "epsilon.onboarding.internal.bin";
        var file_name_external = "epsilon.onboarding.external.bin";
        
        if (language !== null) {
            file_name_internal = "epsilon.onboarding.internal." + language + ".bin";
            file_name_external = "epsilon.onboarding.external." + language + ".bin";
        }
        
        this.downloader.downloadFirmwareCheck(this.installInstance.state.model, this.toInstall, file_name_external, async (external_check, external_blob) => {
            if (!external_check) {
                _this.installInstance.calculatorError(true, "Download of external seems corrupted, please retry.");
            }
            
            _this.downloader.downloadFirmwareCheck(_this.installInstance.state.model, _this.toInstall, file_name_internal, async (internal_check, internal_blob) => {
                if (!internal_check) {
                    _this.installInstance.calculatorError(true, "Download of internal seems corrupted, please retry.");
                }
                
                await _this.calculator.flashExternal(await external_blob.arrayBuffer());
                
                this.ignore_disconnect = true;
                
                
                let internal_fw = await internal_blob.arrayBuffer();
                
                // Add username to the binary.
                if (_this.installInstance.state.getname) {
                    let internal_buf = new Uint8Array(internal_fw);
                    let username = _this.installInstance.state.customname;
                    
                    let enc = new TextEncoder();
                    let encoded = enc.encode(username + "\0");
                    if (encoded.length > 16) {
                        encoded[15] = 0;
                        encoded = encoded.slice(0, 16);
                    }
                    internal_buf.set(encoded, 0x1F8);
                }
                
                await _this.calculator.flashInternal(internal_fw);
                
                
                // await _this.calculator.flashInternal(await internal_blob.arrayBuffer());
            
                await callback();
            });
        });
    }
    
    async __installRecovery(callback) {
        var _this = this;
        var file_name = "flasher.verbose.bin";
        
        _this.downloader.downloadFirmwareCheck(_this.installInstance.state.model, "flasher", file_name, async (flasher_check, flasher_blob) => {
            if (!flasher_check) {
                _this.installInstance.calculatorError(true, "Download of flasher seems corrupted, please retry.");
            }

            let flasher = await flasher_blob.arrayBuffer();
            
            await _this.calculator_recovery.flashRecovery(flasher);
            
            await callback();
        });
    }
    
    async __detectCallback() {
        await this.__setCalculatorInfos();
    }
    
    async __detectErrorCallback(error) {
        this.installInstance.calculatorError(true, error);
    }
    
    detect() {
        this.installInstance.calculatorError(false, null);
        this.calculator.detect(this.__detectCallback.bind(this), this.__detectErrorCallback.bind(this));
    }
    
    async __recoveryDetectCallback() {
        this.installInstance.setModel("N" + this.calculator_recovery.getModel());
        await this.__installRecovery(async function() {
        
        });
    }
    
    recovery() {
        this.installInstance.calculatorError(false, null);
        this.calculator_recovery.detect(this.__recoveryDetectCallback.bind(this), this.__detectErrorCallback.bind(this));
    }
    
    __onUnexpectedDisconnectCallback(event) {
        if (this.ignore_disconnect === false)
            this.installInstance.calculatorError(true, event);
        this.calculator.autoConnect(this.__autoConnectCallback.bind(this));
    }
    
    onUnexpectedDisconnect(event) {
        this.calculator.onUnexpectedDisconnect(event, this.__onUnexpectedDisconnectCallback.bind(this));
    }
    
    async __autoConnectCallback() {
        if (this.waiting_for_flash) {
            await this.__setCalculatorInfos();
            await this.__reinstallStorage();
        } else {
            this.installInstance.calculatorError(false, null);
            await this.__setCalculatorInfos();
        }
        console.log("AUTOCONNECT!");
    }
}

