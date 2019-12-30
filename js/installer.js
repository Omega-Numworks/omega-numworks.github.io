var device = null;
let transferSize = 2048;
var platform_info = null;
var storage = null;
var ignore_disconnect = false;
var should_flash_scripts = false;
var total_bar_cycles = 0;
var current_bar_cycle = 0;

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
                
            } else {
                device = matching_devices[0];
                let interfaces = dfu.findDeviceDfuInterfaces(device.device_);
                await fixInterfaceNames(device.device_, interfaces);
                device = await connect(new dfu.Device(device.device_, interfaces[0]));
                console.log("Autoconnected to device:", device);
                
                if (should_flash_scripts) {
                    $("#info_progress").text("Reflashing scripts...");
                    device.startAddress = 0x080001c4;
                    const blob = await device.do_upload(transferSize, 0x48);
                    platform_info = parsePlatformInfo(await blob.arrayBuffer());
                    
                    if (platform_info["magik"]) {
                        if (storage["magik"]) {
                            for(filename in storage.records) {
                                if (!(filename.endsWith(".py") || filename.endsWith(".xw"))) {
                                    delete storage.records[filename];
                                }
                            }
                        }
                        
                        
                        var to_flash = reconstructStorage(platform_info["storage"]["size"], storage);
                        device.startAddress = platform_info["storage"]["address"];
                        await device.do_download(transferSize, to_flash, false);
                    }
                    $("#info_progress").text("Omega installation finished!");
                    $("#button_finished").removeClass('d-none');
                    $("#button_finished").addClass('d-inline-block');
                    
                    
                    console.log("Reconnected!");
                } else {
                    $("#detect_div").removeClass('d-flex');
                    $("#detect_div").addClass('d-none');
            
                    $("#ok_div").removeClass('d-none');
                    $("#ok_div").addClass('d-flex');
                    
                    $("#ok_div").animate({"background-position-y": "1900%"}, 1500);
                    $("#detect_div").animate({"background-position-y": "1900%"}, 1500);
                    $("#install_div").animate({"background-position-y": "1900%"}, 1500);
                    await display_infos();
                }
            }
        }
    );
}

$.ajaxTransport("+binary", function (options, originalOptions, jqXHR) {
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
        return {
            // create new XMLHttpRequest
            send: function (headers, callback) {
                // setup all variables
                var xhr = new XMLHttpRequest(),
                    url = options.url,
                    type = options.type,
                    async = options.async || true,
                    // blob or arraybuffer. Default is blob
                    dataType = options.responseType || "blob",
                    data = options.data || null,
                    username = options.username || null,
                    password = options.password || null;

                xhr.addEventListener('load', function () {
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function () {
                jqXHR.abort();
            }
        };
    }
});

function downloadEventListener(downloadFunction) {
    return async function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (device) {
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
                    console.log(error);
                }
            )
        }

        //return false;
    }
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function logProgress(done, total) {
    if (done == total) {
        current_bar_cycle++;
    }
    
    var current = (done/total) * (1/total_bar_cycles) + current_bar_cycle/total_bar_cycles;
    
    $("#progress_bar").width(Math.round(current*100) + "%");
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

function getType() {
    var n = device.memoryInfo.segments[device.memoryInfo.segments.length-1].end;
    return n > 0x080E0000 && n < 0x90000000 ? "0100" : "0110";
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
    
    return data;
}

function reconstructStorage(size, data) {
    const buffer = new ArrayBuffer(size);
    var u8buffer = new Uint8Array(buffer);
    var dv = new DataView(buffer);
    const encoder = new TextEncoder();
    var offset = 4;
    
    dv.setUint32(0, 0xBADD0BEE, false);
    dv.setUint32(size - 4, 0xBADD0BEE, false);
    
    if (data.magik) {
        for (filename in data.records) {
            var encoded_name = encoder.encode(filename)
            var encoded_data = encoder.encode(data.records[filename]);
            
            var record_len = encoded_name.byteLength + encoded_data.byteLength + 4;
            
            // If too much data, just break (shouldn't happen tho).
            if (record_len + offset + 4 > size) {
                break;
            }
            
            dv.setUint16(offset, record_len, true);
            u8buffer.set(encoded_name, offset + 2);
            u8buffer.set(encoded_data, offset + encoded_name.byteLength + 4);
            
            offset += record_len;
        }
    }
    
    return buffer;
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

    if (desc && Object.keys(desc).length > 0) {
        device.properties = desc;
        transferSize = desc.TransferSize;
        if (desc.CanDnload) {
            manifestationTolerant = desc.ManifestationTolerant;
        }

        if ((desc.DFUVersion == 0x100 || desc.DFUVersion == 0x011a) && device.settings.alternate.interfaceProtocol == 0x02) {
            device = new dfuse.Device(device.device_, device.settings);
            if (device.memoryInfo) {
                // We have to add RAM manually, because... meh.
                device.memoryInfo.segments.unshift({
                    start: 0x20000000,
                    sectorSize: 1024,
                    end: 0x20040000,
                    readable: true,
                    erasable: false,
                    writable: true
                });
            
                let totalSize = 0;
                for (let segment of device.memoryInfo.segments) {
                    totalSize += segment.end - segment.start;
                }
            }
        }
    }

    // Bind logging methods
    device.logDebug = console.log;
    device.logInfo = console.info;
    device.logWarning = console.warn;
    device.logError = console.error;
    device.logProgress = logProgress;
    
    return device;
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

function onDisconnect(reason, reason_only = false) {
    if (ignore_disconnect) {
        return;
    }

    $("#ok_div").removeClass('d-flex');
    $("#ok_div").addClass('d-none');
    
    $("#install_div").removeClass('d-flex');
    $("#install_div").addClass('d-none');
    
    $("#detect_div").removeClass('d-none');
    $("#detect_div").addClass('d-flex');
    if (reason_only) {
        $("#detect_message").html(reason);
    } else {
        $("#detect_message").html("An error has occured: <br/>" + reason + "<br/>please try reconnecting your device!");
    }
    
    $("#detect_div").addClass("nw-plug-err");
    
    $("#ok_div").animate({"background-position-y": "100%"}, 1500);
    $("#detect_div").animate({"background-position-y": "100%"}, 1500);
    $("#install_div").animate({"background-position-y": "100%"}, 1500);
    
    console.log(reason);
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

async function display_infos() {
    device.startAddress = 0x080001c4;
    const blob = await device.do_upload(transferSize, 0x48);
    var pinfo = parsePlatformInfo(await blob.arrayBuffer());
    console.log(pinfo);
    console.log(device);
    
    $("#version_numworks").text(getType());
    
    if (pinfo.magik) {
        $("#version_epsilon").text(pinfo.version);
        if (pinfo.omega.installed) {
            $("#version_omega").text(pinfo.omega.version);
        } else {
            $("#version_omega").text("N/A");
        }
    } else {
        $("#version_epsilon").text("N/A");
        $("#version_omega").text("N/A");
    }
    
    platform_info = pinfo;
}

function getVersion(data, name) {
    for(i in data["firmwares"]) {
        if (data["firmwares"][i]["name"] == name) {
            return data["firmwares"][i];
        }
    }
    return null;
}

$(function() {
    $.ajax({
        url: "firmware/firmwares.json",
        method: 'GET',
        dataType: 'json'
    }).done(function(data) {
        if (typeof navigator.usb !== 'undefined') {
            navigator.usb.addEventListener("disconnect", onUnexpectedDisconnect);
            autoConnect(0x0483, 0xa291);
            
            $("#unavaliable_div").removeClass('d-flex');
            $("#unavaliable_div").addClass('d-none');
            
            $("#detect_div").removeClass('d-none');
            $("#detect_div").addClass('d-flex');
        } else {
            $("#unavaliable_div").removeClass('d-none');
            $("#unavaliable_div").addClass('d-flex');
        }
        
        var version_info = getVersion(data, data["latest"]);
        
        if (version_info == null) {
            $("#unavaliable_div").removeClass('d-none');
            $("#unavaliable_div").addClass('d-flex');
            
            $("#detect_div").removeClass('d-flex');
            $("#detect_div").addClass('d-none');
            $("#unavaliable_div_error").html("An error has occured: <br/>Version " + data["latest"] + " doesn't exist!");
            $("#unavaliable_div_button").addClass("d-none");
            return;
        }
        
        $("#detect_button").click(function() {
            console.log("Detecting device...");
            
            navigator.usb.requestDevice({ 'filters': [{'vendorId': 0x0483, 'productId': 0xa291}]}).then(
                async selectedDevice => {
                    let interfaces = dfu.findDeviceDfuInterfaces(selectedDevice);
                    await fixInterfaceNames(selectedDevice, interfaces);
                    device = await connect(new dfu.Device(selectedDevice, interfaces[0]));
                    
                    $("#detect_div").removeClass('d-flex');
                    $("#detect_div").addClass('d-none');
            
                    $("#ok_div").removeClass('d-none');
                    $("#ok_div").addClass('d-flex');
                    
                    $("#ok_div").animate({"background-position-y": "1900%"}, 1500);
                    $("#detect_div").animate({"background-position-y": "1900%"}, 1500);
                    $("#install_div").animate({"background-position-y": "1900%"}, 1500);
                    await display_infos();
                }
            ).catch(error => {
                onDisconnect(error);
            });
        });
        
        $("#install_button").click(downloadEventListener(async function() {
            total_bar_cycles = getType() == "0110" ? 10 : 8;
        
            $("#ok_div").removeClass('d-flex');
            $("#ok_div").addClass('d-none');
            
            $("#install_div").removeClass('d-none');
            $("#install_div").addClass('d-flex');
            
            $("#progress_bar").animate({width: "0"}, 0);
            $("#info_progress").text("Backing-up storage...");
            device.startAddress = platform_info["storage"]["address"];
            const blob2 = await device.do_upload(transferSize, platform_info["storage"]["size"]+8);
            storage = parseStorage(await blob2.arrayBuffer());
            
            $("#info_progress").text("Downloading firmware...");
            

            
            if (getType() == "0110") {
                const external_firmware = await $.ajax({
                    url: "firmware/" + version_info["name"] + "/n0110/epsilon.onboarding.external.bin",
                    method: 'GET',
                    dataType: 'binary',
                    processData: 'false',
                    responseType: 'arraybuffer',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                const internal_firmware = await $.ajax({
                    url: "firmware/" + version_info["name"] + "/n0110/epsilon.onboarding.internal.bin",
                    method: 'GET',
                    dataType: 'binary',
                    processData: 'false',
                    responseType: 'arraybuffer',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                
                $("#progress_bar").width(0);
                $("#info_progress").text("Flashing external...");
                device.startAddress = 0x90000000;
                await device.do_download(transferSize, external_firmware, false);
                
                $("#progress_bar").width(0);
                $("#info_progress").text("Flashing internal...");
                device.startAddress = 0x08000000;
                ignore_disconnect = true;
                should_flash_scripts = true;
                await device.do_download(transferSize, internal_firmware, true);
            } else {
                const internal_firmware = await $.ajax({
                    url: "firmware/" + version_info["name"] + "/n0100/epsilon.onboarding.internal.bin",
                    method: 'GET',
                    dataType: 'binary',
                    processData: 'false',
                    responseType: 'arraybuffer',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                
                $("#progress_bar").width(0);
                $("#info_progress").text("Flashing internal...");
                device.startAddress = 0x08000000;
                ignore_disconnect = true;
                should_flash_scripts = true;
                await device.do_download(transferSize, internal_firmware, true);
            }
            
            $("#info_progress").text("Waiting for reconnection...");
            setTimeout(autoConnect.bind(null, 0x0483, 0xa291), 3000);
        }));
    }).fail(function(data, err) {
        console.log("aaa");
        $("#versions-error").removeClass('d-none');
        $("#versions-error-message").text(err);
    }).always(function() {
        $("#version-spin").addClass('d-none');
    });
});
