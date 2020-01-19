// création du cookie
function createCookie(name, value, days) {
    if(days){
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie  = name + "=" + value + expires + "; path=/";
}
// lecture du cookie
function readCookie(name) {
	var nameEQ = name + "=";
	var ca     = document.cookie.split(';');
	for(var i = 0; i < ca.length; i ++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}



$(document).ready(function(){
    $("#deny-cookie").click(function(){
        var cookie_avert   = readCookie("cookie_avert");
        if(cookie_avert == "set" || cookie_avert === null){
            createCookie("cookie_avert", "not", 365);
        }
        
        $("body").prepend('<div id="cookies-not" class="alert alert-success text-center">Your choice has been taken into account.</div>');
        $("#cookies-not").css({"bottom" : "0", "position" : "fixed", "z-index" : "99999", "margin" : "0", "width" : "100%", "border-radius" : "0", "display" : "none"});
        $("#cookies-not").fadeIn(200);
    	$("#cookies-banner").fadeOut(200);
        
        setTimeout(function(){
            $("#cookies-not").fadeOut(200);
        }, 5000); // 10 sec
    });
    
    // Notifications pour les cookies
    var cookie_avert   = readCookie("cookie_avert"),
        g_analytics_id = "G-MLMMF9EB6K", // Id unique google analytics 
        domain_name    = "omega-numworks.github.io"; // nom de domaine du site

    if (cookie_avert === null) { // si le cookie n'existe pas
        banner_text = '<span class="btn-align">By continuing to browse this site, you accept the use of cookies for audience measurement purposes.</span><button class="btn btn-primary btn-sm" id="accept-cookie" style="margin: 0 10px;">I agree</button><span class="btn-align"><a href=\"legal.html\">Read more...</a></span>';
        $("body").prepend('<div id="cookies-banner" class="alert alert-light text-center">' + banner_text + '</div>');
        $("#cookies-banner").css({"bottom" : "0", "position" : "fixed", "z-index" : "9999", "margin" : "0", "width" : "100%", "border-radius" : "0", "display" : "none"});
        $("#cookies-banner").fadeIn(200);
        
        // si on accepte, le cookie avec la valeur 'set' est créée, sinon, la valeur 'not'
        $("#accept-cookie").click(function(){
            action_button = "set";
        
            createCookie("cookie_avert", action_button, 365);
    	    $("#cookies-banner").fadeOut(200);
		    $("body").css({"top" : "0", "position" : ""});
        

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MLMMF9EB6K');
        });
    } else if (cookie_avert == "set") { // si le cookie existe avec la valeur 'set'
        // on charge google analytics

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-MLMMF9EB6K');
    }
});

