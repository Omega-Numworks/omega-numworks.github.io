var device = null;
(function() {
    'use strict';

    function hex4(n) {
        let s = n.toString(16)
        while (s.length < 4) {
            s = '0' + s;
        }
        return s;
    }

    function hexAddr8(n) {
        let s = n.toString(16)
        while (s.length < 8) {
            s = '0' + s;
        }
        return "0x" + s;
    }
    
    function readString(dv, index) {
        var out = "";
        var i = 0;
        var chr = dv.getUint8(index);
        while(chr != 0) {
            out += String.fromCharCode(chr);
            i++;
            var chr = dv.getUint8(index + i);
        }
        
        return out;
    }
    
    function readFString(dv, index, len) {
        var out = "";
        for(var i = 0; i < len; i++) {
            var chr = dv.getUint8(index + i);
            
            if (chr == 0) {
                break;
            }
            
            out += String.fromCharCode(chr);
        }
        
        return out;
    }
    
    function hexBuffer(buffer) {
        return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    }
    
    function parsePlatformInfo(array) {
        var dv = new DataView(array);
        var data = {};
        data["magik"] = dv.getUint32(0x00, false) == 0xF00DC0DE && dv.getUint32(0x1C, false) == 0xF00DC0DE;
        
        if (data["magik"]) {
            data["version"] = readFString(dv, 0x04, 8);
            data["commit"] = readFString(dv, 0x0C, 8);
            data["storage"] = {};
            data["storage"]["address"] = dv.getUint32(0x14, true);
            data["storage"]["size"] = dv.getUint32(0x18, true);
            data["omega"] = {};
            data["omega"]["installed"] = dv.getUint32(0x20, false) == 0xDEADBEEF && dv.getUint32(0x44, false) == 0xDEADBEEF;
            
            if (data["omega"]["installed"]) {
                data["omega"]["version"] = readFString(dv, 0x24, 16);
                data["omega"]["user"] = readFString(dv, 0x34, 16);
            }
        } else {
            data["omega"] = false;
        }
        
        console.log(data);
        return data;
    }
    
    function parseStorage(array) {
        var dv = new DataView(array);
        
        var data = {};
        data["magik"] = dv.getUint32(0x00, false) == 0xBADD0BEE;
        
        data["records"] = {};
        
        if (data["magik"]) {
            var offset = 4;
            do {
                var size = dv.getUint16(offset, true);
                
                console.log(size);
                
                if (size == 0) {
                    break;
                }
                
                var name = readFString(dv, offset+2, size-2);
                var code = readFString(dv, offset+4+name.length, size-4-name.length);
                
                data["records"][name] = code;
                
                offset += size;
            
            } while(size != 0 && offset < array.byteLength);
        }
        
        return data;
    }

    function niceSize(n) {
        const gigabyte = 1024 * 1024 * 1024;
        const megabyte = 1024 * 1024;
        const kilobyte = 1024;
        if (n >= gigabyte) {
            return n / gigabyte + "GiB";
        } else if (n >= megabyte) {
            return n / megabyte + "MiB";
        } else if (n >= kilobyte) {
            return n / kilobyte + "KiB";
        } else {
            return n + "B";
        }
    }

    function formatDFUSummary(device) {
        const vid = hex4(device.device_.vendorId);
        const pid = hex4(device.device_.productId);
        const name = device.device_.productName;

        let mode = "Unknown"
        if (device.settings.alternate.interfaceProtocol == 0x01) {
            mode = "Runtime";
        } else if (device.settings.alternate.interfaceProtocol == 0x02) {
            mode = "DFU";
        }

        const cfg = device.settings.configuration.configurationValue;
        const intf = device.settings["interface"].interfaceNumber;
        const alt = device.settings.alternate.alternateSetting;
        const serial = device.device_.serialNumber;
        let info = `${mode}: [${vid}:${pid}] cfg=${cfg}, intf=${intf}, alt=${alt}, name="${name}" serial="${serial}"`;
        return info;
    }

    function formatDFUInterfaceAlternate(settings) {
        let mode = "Unknown"
        if (settings.alternate.interfaceProtocol == 0x01) {
            mode = "Runtime";
        } else if (settings.alternate.interfaceProtocol == 0x02) {
            mode = "DFU";
        }

        const cfg = settings.configuration.configurationValue;
        const intf = settings["interface"].interfaceNumber;
        const alt = settings.alternate.alternateSetting;
        const name = (settings.name) ? settings.name : "UNKNOWN";

        return `${mode}: cfg=${cfg}, intf=${intf}, alt=${alt}, name="${name}"`;
    }

    async function fixInterfaceNames(device_, interfaces) {
        // Check if any interface names were not read correctly
        if (interfaces.some(intf => (intf.name == null))) {
            // Manually retrieve the interface name string descriptors
            let tempDevice = new dfu.Device(device_, interfaces[0]);
            await tempDevice.device_.open();
            let mapping = await tempDevice.readInterfaceNames();
            await tempDevice.close();

            for (let intf of interfaces) {
                if (intf.name === null) {
                    let configIndex = intf.configuration.configurationValue;
                    let intfNumber = intf["interface"].interfaceNumber;
                    let alt = intf.alternate.alternateSetting;
                    intf.name = mapping[configIndex][intfNumber][alt];
                }
            }
        }
    }

    function populateInterfaceList(form, device_, interfaces) {
        let old_choices = Array.from(form.getElementsByTagName("div"));
        for (let radio_div of old_choices) {
            form.removeChild(radio_div);
        }

        let button = form.getElementsByTagName("button")[0];

        for (let i=0; i < interfaces.length; i++) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "interfaceIndex";
            radio.value = i;
            radio.id = "interface" + i;
            radio.required = true;

            let label = document.createElement("label");
            label.textContent = formatDFUInterfaceAlternate(interfaces[i]);
            label.className = "radio"
            label.setAttribute("for", "interface" + i);

            let div = document.createElement("div");
            div.appendChild(radio);
            div.appendChild(label);
            form.insertBefore(div, button);
        }
    }

    function getDFUDescriptorProperties(device) {
        // Attempt to read the DFU functional descriptor
        // TODO: read the selected configuration's descriptor
        return device.readConfigurationDescriptor(0).then(
            data => {
                let configDesc = dfu.parseConfigurationDescriptor(data);
                let funcDesc = null;
                let configValue = device.settings.configuration.configurationValue;
                if (configDesc.bConfigurationValue == configValue) {
                    for (let desc of configDesc.descriptors) {
                        if (desc.bDescriptorType == 0x21 && desc.hasOwnProperty("bcdDFUVersion")) {
                            funcDesc = desc;
                            break;
                        }
                    }
                }

                if (funcDesc) {
                    return {
                        WillDetach:            ((funcDesc.bmAttributes & 0x08) != 0),
                        ManifestationTolerant: ((funcDesc.bmAttributes & 0x04) != 0),
                        CanUpload:             ((funcDesc.bmAttributes & 0x02) != 0),
                        CanDnload:             ((funcDesc.bmAttributes & 0x01) != 0),
                        TransferSize:          funcDesc.wTransferSize,
                        DetachTimeOut:         funcDesc.wDetachTimeOut,
                        DFUVersion:            funcDesc.bcdDFUVersion
                    };
                } else {
                    return {};
                }
            },
            error => {}
        );
    }

    // Current log div element to append to
    let logContext = null;

    function setLogContext(div) {
        logContext = div;
    };

    function clearLog(context) {
        if (typeof context === 'undefined') {
            context = logContext;
        }
        if (context) {
            context.innerHTML = "";
        }
    }

    function logDebug(msg) {
        console.log(msg);
    }

    function logInfo(msg) {
        if (logContext) {
            let info = document.createElement("p");
            info.className = "info";
            info.textContent = msg;
            logContext.appendChild(info);
        }
    }

    function logWarning(msg) {
        if (logContext) {
            let warning = document.createElement("p");
            warning.className = "warning";
            warning.textContent = msg;
            logContext.appendChild(warning);
        }
    }

    function logError(msg) {
        if (logContext) {
            let error = document.createElement("p");
            error.className = "error";
            error.textContent = msg;
            logContext.appendChild(error);
        }
    }

    function logProgress(done, total) {
        if (logContext) {
            let progressBar;
            if (logContext.lastChild.tagName.toLowerCase() == "progress") {
                progressBar = logContext.lastChild;
            }
            if (!progressBar) {
                progressBar = document.createElement("progress");
                logContext.appendChild(progressBar);
            }
            progressBar.value = done;
            if (typeof total !== 'undefined') {
                progressBar.max = total;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', event => {
        let connectButton = document.querySelector("#connect");
        let detachButton = document.querySelector("#detach");
        let getInfosButton = document.querySelector("#get_infos");
        let downloadInternalButton = document.querySelector("#download_internal");
        let downloadExternalButton = document.querySelector("#download_external");
        let uploadInternalButton = document.querySelector("#upload_internal");
        let uploadExternalButton = document.querySelector("#upload_external");
        let statusDisplay = document.querySelector("#status");
        let infoDisplay = document.querySelector("#usbInfo");
        let dfuDisplay = document.querySelector("#dfuInfo");
        let vidField = document.querySelector("#vid");
        let pidField = document.querySelector("#pid");
        let interfaceDialog = document.querySelector("#interfaceDialog");
        let interfaceForm = document.querySelector("#interfaceForm");
        let interfaceSelectButton = document.querySelector("#selectInterface");

        let searchParams = new URLSearchParams(window.location.search);
        let doAutoConnect = false;
        let vid = 0;
        let pid = 0;

        // Set the vendor ID from the landing page URL
        if (searchParams.has("vid")) {
            const vidString = searchParams.get("vid");
            try {
                if (vidString.toLowerCase().startsWith("0x")) {
                    vid = parseInt(vidString, 16);
                } else {
                    vid = parseInt(vidString, 10);
                }
                vidField.value = "0x" + hex4(vid).toUpperCase();
                doAutoConnect = true;
            } catch (error) {
                console.log("Bad VID " + vidString + ":" + error);
            }
        } else {
            // NumWorks specialization
            vid = 0x0483; // ST
        }

        // Set the product ID from the landing page URL
        if (searchParams.has("pid")) {
            const pidString = searchParams.get("pid");
            try {
                if (pidString.toLowerCase().startsWith("0x")) {
                    pid = parseInt(pidString, 16);
                } else {
                    pid = parseInt(pidString, 10);
                }
                pidField.value = "0x" + hex4(pid).toUpperCase();
                doAutoConnect = true;
            } catch (error) {
                console.log("Bad PID " + pidString + ":" + error);
            }
        } else {
            // NumWorks specialization
            pid = 0xA291;
        }

        // Grab the serial number from the landing page
        let serial = "";
        if (searchParams.has("serial")) {
            serial = searchParams.get("serial");
            // Workaround for Chromium issue 339054
            if (window.location.search.endsWith("/") && serial.endsWith("/")) {
                serial = serial.substring(0, serial.length-1);
            }
            doAutoConnect = true;
        }

        const isNumWorks = (vid === 0x0483 && pid === 0xA291);
        if (isNumWorks) {
            doAutoConnect = true;
        }
        console.log(`isNumWorks = ${isNumWorks} (VID = ${vid}, PID = ${pid})`);

        let configForm = document.querySelector("#configForm");

        let transferSizeField = document.querySelector("#transferSize");
        let transferSize = parseInt(transferSizeField.value);

        let dfuseStartAddressField = document.querySelector("#dfuseStartAddress");
        let dfuseUploadSizeField = document.querySelector("#dfuseUploadSize");

        let firmwareFileField = document.querySelector("#firmwareFile");
        let firmwareFile = null;

        let downloadLog = document.querySelector("#downloadLog");
        let uploadLog = document.querySelector("#uploadLog");

        let manifestationTolerant = true;

        //let device;

        function onDisconnect(reason) {
            if (reason) {
                statusDisplay.textContent = reason;
            }

            connectButton.textContent = "Connect";
            infoDisplay.textContent = "";
            dfuDisplay.textContent = "";
            detachButton.disabled = true;
            uploadInternalButton.disabled = true;
            uploadExternalButton.disabled = true;
            downloadInternalButton.disabled = true;
            getInfosButton.disabled = true;
            downloadExternalButton.disabled = true;
            firmwareFileField.disabled = true;
        }

        function onUnexpectedDisconnect(event) {
            if (device !== null && device.device_ !== null) {
                if (device.device_ === event.device) {
                    device.disconnected = true;
                    onDisconnect("Device disconnected");
                    device = null;
                }
            }
        }

        async function connect(device) {
            try {
                await device.open();
            } catch (error) {
                onDisconnect(error);
                throw error;
            }

            // Attempt to parse the DFU functional descriptor
            let desc = {};
            try {
                desc = await getDFUDescriptorProperties(device);
            } catch (error) {
                onDisconnect(error);
                throw error;
            }

            let memorySummary = "";
            if (desc && Object.keys(desc).length > 0) {
                device.properties = desc;
                let info = `WillDetach=${desc.WillDetach}, ManifestationTolerant=${desc.ManifestationTolerant}, CanUpload=${desc.CanUpload}, CanDnload=${desc.CanDnload}, TransferSize=${desc.TransferSize}, DetachTimeOut=${desc.DetachTimeOut}, Version=${hex4(desc.DFUVersion)}`;
                dfuDisplay.textContent += "\n" + info;
                transferSizeField.value = desc.TransferSize;
                transferSize = desc.TransferSize;
                if (desc.CanDnload) {
                    manifestationTolerant = desc.ManifestationTolerant;
                }

                if (device.settings.alternate.interfaceProtocol == 0x02) {
                    if (!desc.CanUpload) {
                        uploadInternalButton.disabled = true;
                        uploadExternalButton.disabled = true;
                        dfuseUploadSizeField.disabled = true;
                        getInfosButton.disabled = true;
                    }
                    if (!desc.CanDnload) {
                        downloadInternalButton.disabled = true;
                        downloadExternalButton.disabled = true;
                    }
                }

                if ((desc.DFUVersion == 0x100 || desc.DFUVersion == 0x011a) && device.settings.alternate.interfaceProtocol == 0x02) {
                    device = new dfuse.Device(device.device_, device.settings);
                    if (device.memoryInfo) {
                        let totalSize = 0;
                        for (let segment of device.memoryInfo.segments) {
                            totalSize += segment.end - segment.start;
                        }
                        memorySummary = `Selected memory region: ${device.memoryInfo.name} (${niceSize(totalSize)})`;
                        for (let segment of device.memoryInfo.segments) {
                            let properties = [];
                            if (segment.readable) {
                                properties.push("readable");
                            }
                            if (segment.erasable) {
                                properties.push("erasable");
                            }
                            if (segment.writable) {
                                properties.push("writable");
                            }
                            let propertySummary = properties.join(", ");
                            if (!propertySummary) {
                                propertySummary = "inaccessible";
                            }

                            memorySummary += `\n${hexAddr8(segment.start)}-${hexAddr8(segment.end-1)} (${propertySummary})`;
                        }
                    }
                }
            }

            // Bind logging methods
            device.logDebug = logDebug;
            device.logInfo = logInfo;
            device.logWarning = logWarning;
            device.logError = logError;
            device.logProgress = logProgress;

            // Clear logs
            clearLog(uploadLog);
            clearLog(downloadLog);

            // Display basic USB information
            statusDisplay.textContent = '';
            connectButton.textContent = 'Disconnect';
            infoDisplay.textContent = (
                "Name: " + device.device_.productName + "\n" +
                "MFG: " + device.device_.manufacturerName + "\n" +
                "Serial: " + device.device_.serialNumber + "\n"
            );

            // Display basic dfu-util style info
            dfuDisplay.textContent = formatDFUSummary(device) + "\n" + memorySummary;

            // Update buttons based on capabilities
            if (device.settings.alternate.interfaceProtocol == 0x01) {
                // Runtime
                detachButton.disabled = false;
                uploadInternalButton.disabled = true;
                uploadExternalButton.disabled = true;
                downloadInternalButton.disabled = true;
                getInfosButton.disabled = true;
                downloadExternalButton.disabled = true;
                firmwareFileField.disabled = true;
            } else {
                // DFU
                detachButton.disabled = true;
                uploadInternalButton.disabled = false;
                uploadExternalButton.disabled = false;
                downloadInternalButton.disabled = false;
                getInfosButton.disabled = false;
                downloadExternalButton.disabled = false;
                firmwareFileField.disabled = false;
            }

            if (device.memoryInfo) {
                let dfuseFieldsDiv = document.querySelector("#dfuseFields")
                dfuseFieldsDiv.hidden = false;
                dfuseStartAddressField.disabled = false;
                dfuseUploadSizeField.disabled = false;
                let segment = device.getFirstWritableSegment();
                if (segment) {
                    device.startAddress = segment.start;
                    dfuseStartAddressField.value = "0x" + segment.start.toString(16);
                    const maxReadSize = device.getMaxReadSize(segment.start);
                    dfuseUploadSizeField.value = maxReadSize;
                    dfuseUploadSizeField.max = maxReadSize;
                }
            } else {
                let dfuseFieldsDiv = document.querySelector("#dfuseFields")
                dfuseFieldsDiv.hidden = true;
                dfuseStartAddressField.disabled = true;
                dfuseUploadSizeField.disabled = true;
            }

            return device;
        }

        function autoConnect(vid, pid, serial) {
            dfu.findAllDfuInterfaces().then(
                async dfu_devices => {
                    let matching_devices = [];
                    for (let dfu_device of dfu_devices) {
                        if (serial) {
                            if (dfu_device.device_.serialNumber == serial) {
                                matching_devices.push(dfu_device);
                            }
                        } else {
                            if (
                                (!pid && vid > 0 && dfu_device.device_.vendorId  == vid) ||
                                (!vid && pid > 0 && dfu_device.device_.productId == pid) ||
                                (vid > 0 && pid > 0 && dfu_device.device_.vendorId  == vid && dfu_device.device_.productId == pid)
                               )
                            {
                                matching_devices.push(dfu_device);
                            }
                        }
                    }

                    if (matching_devices.length == 0) {
                        statusDisplay.textContent = 'No device found.';
                    } else {
                        if (matching_devices.length == 1 || isNumWorks) { // For NumWorks, we want interface 0 ("Internal Flash")
                            statusDisplay.textContent = 'Connecting...';
                            device = matching_devices[0];
                            console.log("Autoconnecting to device:", device);
                            device = await connect(device);
                        } else {
                            statusDisplay.textContent = "Multiple DFU interfaces found.";
                        }
                        vidField.value = "0x" + hex4(matching_devices[0].device_.vendorId).toUpperCase();
                        vid = matching_devices[0].device_.vendorId;
                    }
                }
            );
        }

        vidField.addEventListener("change", function() {
            vid = parseInt(vidField.value, 16);
        });

        transferSizeField.addEventListener("change", function() {
            transferSize = parseInt(transferSizeField.value);
        });

        dfuseStartAddressField.addEventListener("change", function(event) {
            const field = event.target;
            let address = parseInt(field.value, 16);
            if (isNaN(address)) {
                field.setCustomValidity("Invalid hexadecimal start address");
            } else if (device && device.memoryInfo) {
                if (device.getSegment(address) !== null) {
                    device.startAddress = address;
                    field.setCustomValidity("");
                    dfuseUploadSizeField.max = device.getMaxReadSize(address);
                } else {
                    field.setCustomValidity("Address outside of memory map");
                }
            } else {
                field.setCustomValidity("");
            }
        });

        connectButton.addEventListener('click', function() {
            if (device) {
                device.close().then(onDisconnect);
                device = null;
            } else {
                let filters = [];
                if (serial) {
                    filters.push({ 'serialNumber': serial });
                } else {
                    if (vid) {
                        filters.push({'vendorId': vid});
                    }
                    if (vid && pid) {
                        filters.push({'productId': pid, 'vendorId': vid});
                    }
                }
                navigator.usb.requestDevice({ 'filters': filters }).then(
                    async selectedDevice => {
                        let interfaces = dfu.findDeviceDfuInterfaces(selectedDevice);
                        if (interfaces.length == 0) {
                            console.log(selectedDevice);
                            statusDisplay.textContent = "The selected device does not have any USB DFU interfaces.";
                        } else if (interfaces.length == 1 || isNumWorks) { // For NumWorks, we want interface 0 ("Internal Flash")
                            await fixInterfaceNames(selectedDevice, interfaces);
                            device = await connect(new dfu.Device(selectedDevice, interfaces[0]));
                        } else {
                            await fixInterfaceNames(selectedDevice, interfaces);
                            populateInterfaceList(interfaceForm, selectedDevice, interfaces);
                            async function connectToSelectedInterface() {
                                interfaceForm.removeEventListener('submit', this);
                                const index = interfaceForm.elements["interfaceIndex"].value;
                                device = await connect(new dfu.Device(selectedDevice, interfaces[index]));
                            }

                            interfaceForm.addEventListener('submit', connectToSelectedInterface);

                            interfaceDialog.addEventListener('cancel', function () {
                                interfaceDialog.removeEventListener('cancel', this);
                                interfaceForm.removeEventListener('submit', connectToSelectedInterface);
                            });

                            interfaceDialog.showModal();
                        }
                    }
                ).catch(error => {
                    statusDisplay.textContent = error;
                });
            }
        });

        detachButton.addEventListener('click', function() {
            if (device) {
                device.detach().then(
                    async len => {
                        let detached = false;
                        try {
                            await device.close();
                            await device.waitDisconnected(5000);
                            detached = true;
                        } catch (err) {
                            console.log("Detach failed: " + err);
                        }

                        onDisconnect();
                        device = null;
                        if (detached) {
                            // Wait a few seconds and try reconnecting
                            setTimeout(autoConnect, 5000);
                        }
                    },
                    async error => {
                        await device.close();
                        onDisconnect(error);
                        device = null;
                    }
                );
            }
        });

        function uploadEventListener(uploadFunction) {
          return async function(event) {
              event.preventDefault();
              event.stopPropagation();
              if (!configForm.checkValidity()) {
                  configForm.reportValidity();
                  return false;
              }

              if (!device || !device.device_.opened) {
                  onDisconnect();
                  device = null;
              } else {
                  setLogContext(uploadLog);
                  clearLog(uploadLog);
                  try {
                      let status = await device.getStatus();
                      if (status.state == dfu.dfuERROR) {
                          await device.clearStatus();
                      }
                  } catch (error) {
                      device.logWarning("Failed to clear status");
                  }

                  let maxSize = Infinity;
                  if (!dfuseUploadSizeField.disabled) {
                      maxSize = parseInt(dfuseUploadSizeField.value);
                  }

                  try {
                      await uploadFunction(maxSize);
                  } catch (error) {
                      console.log(error);
                  }

                  setLogContext(null);
              }

              return false;
          }
        };

        getInfosButton.addEventListener('click', uploadEventListener(async function(maxSize) {
            device.startAddress = 0x080001c4;
            const blob = await device.do_upload(transferSize, 0x48);
            var pinfo = parsePlatformInfo(await blob.arrayBuffer());
            document.getElementById("sumarry").innerHTML = JSON.stringify(pinfo);
            
            device.startAddress = pinfo["storage"]["address"];
            const blob2 = await device.do_upload(transferSize, pinfo["storage"]["size"]+8);
            var storage = parseStorage(await blob2.arrayBuffer());
            console.log(storage);
        }));

        uploadInternalButton.addEventListener('click', uploadEventListener(async function(maxSize) {
          device.startAddress = 0x08000000;
          const blob = await device.do_upload(transferSize, maxSize);
          saveAs(blob, "internal.bin");
        }));

        uploadExternalButton.addEventListener('click', uploadEventListener(async function(maxSize) {
          device.startAddress = 0x90000000;
          const blob = await device.do_upload(transferSize, 8192*1024);
          saveAs(blob, "external.bin");
        }));

        firmwareFileField.addEventListener("change", function() {
            firmwareFile = null;
            if (firmwareFileField.files.length > 0) {
                let file = firmwareFileField.files[0];
                let reader = new FileReader();
                reader.onload = function() {
                    firmwareFile = reader.result;
                };
                reader.readAsArrayBuffer(file);
            }
        });

        function downloadEventListener(downloadFunction) {
          return async function(event) {
              event.preventDefault();
              event.stopPropagation();
              if (!configForm.checkValidity()) {
                  configForm.reportValidity();
                  return false;
              }

              if (device && firmwareFile != null) {
                  setLogContext(downloadLog);
                  clearLog(downloadLog);
                  try {
                      let status = await device.getStatus();
                      if (status.state == dfu.dfuERROR) {
                          await device.clearStatus();
                      }
                  } catch (error) {
                      device.logWarning("Failed to clear status");
                  }
                  await downloadFunction().then(
                      () => {
                          logInfo("Done!");
                          setLogContext(null);
                          if (!manifestationTolerant) {
                              device.waitDisconnected(5000).then(
                                  dev => {
                                      onDisconnect();
                                      device = null;
                                  },
                                  error => {
                                      // It didn't reset and disconnect for some reason...
                                      console.log("Device unexpectedly tolerated manifestation.");
                                  }
                              );
                          }
                      },
                      error => {
                          logError(error);
                          setLogContext(null);
                      }
                  )
              }

              //return false;
          }
        }

        downloadInternalButton.addEventListener('click', downloadEventListener(async function() {
          device.startAddress = 0x08000000;
          return device.do_download(transferSize, firmwareFile, true);
        }));

        downloadExternalButton.addEventListener('click', downloadEventListener(async function() {
          device.startAddress = 0x90000000;
          return device.do_download(transferSize, firmwareFile, false);
        }));

        // Check if WebUSB is available
        if (typeof navigator.usb !== 'undefined') {
            navigator.usb.addEventListener("disconnect", onUnexpectedDisconnect);
            // Try connecting automatically
            if (doAutoConnect) {
                // autoConnect(vid, pid, serial);
            }
        } else {
            statusDisplay.textContent = 'WebUSB not available.'
            connectButton.disabled = true;
        }
    });
})();
