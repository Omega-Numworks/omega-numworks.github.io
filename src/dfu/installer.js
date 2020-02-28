
import Storage from "../dfu/storage"
import Downloader from "../dfu/downloader"
import Numworks from "../dfu/nw"

import {releases} from '../firmware/firmwares'

// Used for debugging. When true, skips downloading and flashing.
const DO_DRY_RUN = false;

export default class Installer {
    constructor(install) {
        this.installInstance = install;

        this.toInstall = "latest";
        this.firmwareInfos = null;
        this.ignore_disconnect = false;
        this.waiting_for_flash = false;
        
        this.calculator = new Numworks();
        this.storage_content = new Storage();
        this.downloader = new Downloader();
    }
    
    init(versionToInstall) {
        this.toInstall = versionToInstall;
        if (this.toInstall === "latest") {
            this.toInstall = releases.latest;
        }
        
        
        for (var firm in releases.firmwares) {
            if (releases.firmwares[firm].name === this.toInstall) {
                this.firmwareInfos = releases.firmwares[firm];
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
        
        this.installInstance.calculatorDetected(pinfo.omega.installed ? "omega" : "epsilon");
        
    }
    
    __reinstallStorageCallback() {
        this.storage_content = new Storage();
        this.waiting_for_flash = false;
        
        this.installInstance.installationFinished();
    }
    
    async __reinstallStorage() {
        this.calculator.installStorage(this.storage_content, this.__reinstallStorageCallback.bind(this));
    }
    
    async install() {
        console.log("install version" + this.toInstall + "/" + this.installInstance.state.model);
        
        var _this = this;
        this.calculator.device.logProgress = function(done, total) {
            _this.installInstance.setProgressPercentage(done / total * 100);
        };
        
        this.storage_content = await this.calculator.backupStorage();
        
        // return;
        
        var callback = async function() {
            this.waiting_for_flash = true;
            this.calculator.autoConnect(this.__autoConnectCallback.bind(this));
        }.bind(this);
        
        if (!DO_DRY_RUN) {
            if (this.installInstance.state.model === "N0100") {
                await this.__installN0100(callback);
            } else {
                await this.__installN0110(callback);
            }
        } else {
            callback();
        }

        

        
        // this.installInstance.installationFinished();

    }
    
    async __installN0100(callback) {
        var _this = this;
        
        _this.downloader.downloadFirmwareCheck(_this.installInstance.state.model, _this.toInstall, "epsilon.onboarding.internal.bin", async (internal_check, internal_blob) => {
            if (!internal_check) {
                _this.installInstance.calculatorError(true, "Download of internal seems corrupted, please retry.");
            }
            
            this.ignore_disconnect = true;
            
            await _this.calculator.flashInternal(await internal_blob.arrayBuffer());
            
            await callback();
        });
    }
    
    async __installN0110(callback) {
        var _this = this;
        
        this.downloader.downloadFirmwareCheck(this.installInstance.state.model, this.toInstall, "epsilon.onboarding.external.bin", async (external_check, external_blob) => {
            if (!external_check) {
                _this.installInstance.calculatorError(true, "Download of external seems corrupted, please retry.");
            }
            
            _this.downloader.downloadFirmwareCheck(_this.installInstance.state.model, _this.toInstall, "epsilon.onboarding.internal.bin", async (internal_check, internal_blob) => {
                if (!internal_check) {
                    _this.installInstance.calculatorError(true, "Download of internal seems corrupted, please retry.");
                }
                
                await _this.calculator.flashExternal(await external_blob.arrayBuffer());
                
                this.ignore_disconnect = true;
                
                await _this.calculator.flashInternal(await internal_blob.arrayBuffer());
            
                await callback();
            });
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
            await this.__reinstallStorage();
        } else {
            this.installInstance.calculatorError(false, null);
            await this.__setCalculatorInfos();
        }
        console.log("AUTOCONNECT!");
    }
}

