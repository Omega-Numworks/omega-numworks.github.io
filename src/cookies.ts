export function setCookie(cookie: string, value: string) {
    // Source: https://www.w3schools.com/js/js_cookies.asp
    var d = new Date();
    const EXPIRATION_IN_DAYS = 7;
    d.setTime(d.getTime() + EXPIRATION_IN_DAYS * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookie + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(cookie: string): string | undefined {
    // Source: https://www.w3schools.com/js/js_cookies.asp
    var name = cookie + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}
