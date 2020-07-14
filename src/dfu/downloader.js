
import firebase from "../firebase"

/**
 * Class which handles downloading and checking the integrity of the firmwares.
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class Downloader {
    constructor() {
        this.storage = firebase.storage();
    }
    
    async __sha256(blob) {
        const msgUint8 = await blob.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    __downloadFirmware(model, version, fwname, callback) {
        console.log('firmwares/' + version + '/' + model.toLowerCase() + '/' + fwname)
        this.storage.ref().child('firmwares/' + version + '/' + model.toLowerCase() + '/' + fwname).getDownloadURL().then(function(url) {
            var oReq = new XMLHttpRequest();
            oReq.responseType = 'blob';

            console.log("[DOWNLOAD] " + url);

            oReq.onload = function(oEvent) {
                var blob = oReq.response;
                callback(blob);
            };
            oReq.open("GET", url, true);
            oReq.send();
        }).catch(function(error) {
            console.error("[DOWNLOAD] " + error.code);
        });
    }
    
    __downloadSHA256(model, version, fwname, callback) {
        this.storage.ref().child('firmwares/' + version + '/' + model.toLowerCase() + '/' + fwname + ".sha256").getDownloadURL().then(function(url) {
            var oReq = new XMLHttpRequest();
            
            console.log("[DOWNLOAD] " + url);

            oReq.onload = function(e) {
                callback(oReq.responseText.split(' ')[0]);
            }

            oReq.open("GET", url, true);
            oReq.send();
        }).catch(function(error) {
            console.error("[DOWNLOAD] " + error.code);
        });
    }
    
    /**
     * Downloads and check a specific firmware version.
     *
     * @param   model       Model of the firmware
     * @param   version     Version of the firmware
     * @param   firmware    internal/external
     * @param   callback    Callback to be called once the download is completed.
     *                      First argument if true if the sha256 of the downloaded bin and the expected one matches.
     *                      Second argument passed to the callback is a Blob object representing the downloaded firmware.
     */
    downloadFirmwareCheck(model, version, firmware, callback) {
        this.__downloadFirmware(model, version, firmware, async blob => {
            this.__downloadSHA256(model, version, firmware, async sha256 => {
                var calcSha256 = await this.__sha256(blob);
                
                if (sha256 === calcSha256) {
                    callback(true, blob);
                } else {
                    callback(false, blob);
                }
            });
            
        });
    }
}
