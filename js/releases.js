function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

$(function() {
    console.log("Ready!")
    $.ajax({
        url: "firmware/firmwares.json",
        method: 'GET',
        dataType: 'json'
    }).done(function(data) {
        $("#versions-list").removeClass('d-none');
        
        for(id in data["firmwares"]) {
            var list = "";
            for(i in data["firmwares"][id]["changelog"]) {
                list += "<li> - " + htmlEntities(data["firmwares"][id]["changelog"][i]) + "</li>";
            }
            
            var badges = "";
            
            if (data["firmwares"][id]["available"]) {
                if (data["firmwares"][id]["compatibility"]["N0100"] || data["firmwares"][id]["compatibility"]["N0110"]) {
                    var compat = "";
                    if (data["firmwares"][id]["compatibility"]["N0100"] && data["firmwares"][id]["compatibility"]["N0110"]) {
                        compat = "N0100 & N0110";
                    } else {
                        compat = data["firmwares"][id]["compatibility"]["N0100"] ? "N0100" : "N0110";
                    }
                    badges += `<span class="badge download-badge badge-pill badge-danger"><a href="install.html?version=` + data["firmwares"][id]["name"] + `">‎Flash (` + compat + `)</a></span>`;
                }
                if (data["firmwares"][id]["compatibility"]["android"]) {
                    badges += `<span class="badge download-badge badge-pill badge-success"><a href="firmware/` + data["firmwares"][id]["name"] + `/simulator.apk">Android</a></span>`
                }
                if (data["firmwares"][id]["compatibility"]["web"]) {
                    badges += `<span class="badge download-badge badge-pill badge-primary"><a href="firmware/` + data["firmwares"][id]["name"] + `/simulator.zip">Web</a></span>`
                }
            } else {
                badges = `<span class="badge download-badge badge-pill badge-secondary">‎N/A</span>`;
            }
            
            $("#versions-list").append(`
                <div class="row">
                    <div class="col">
                        <h3 class="release-title">` + data["firmwares"][id]["name"] + `</h3>
                        <ul>` + list + `</ul>
                        <div class="download">
                            ` + badges + `
                        </div>
                    </div>
                </div>
                <hr/>
            `);
            console.log(data["firmwares"][id]);
        }
        
        // console.log(data);
    }).fail(function(data, err) {
        console.log("aaa");
        $("#versions-error").removeClass('d-none');
        $("#versions-error-message").text(err);
    }).always(function() {
        $("#version-spin").addClass('d-none');
    });
    // console.log(versions_list);
});
