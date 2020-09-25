
import profile from './pages/omega-ide/src/img/profile.png'

/**
 * Local storage connector class. Dummy connector for dev.
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class TiPlanetConnector {
    static __instance = null;
    static __allowed_chars_file = "abcdefghijklmnopqrstuvwxyz1234567890_";
    static __init_file_content = "from math import *\n";
    
    static __init_projects = decodeURIComponent(escape(window.atob("eyJMYWJ5IjpbeyJuYW1lIjoicG9seWNhbGMucHkiLCJjb250ZW50IjoiZGVmIGNvbDNfMl9yZ2IoYywgYml0cywgYmdyKTpcbiAgcmV0dXJuIGNbMipiZ3JdLy8yKiooOCAtIGJpdHNbMF0pICsgY1sxXS8vMioqKDggLSBiaXRzWzFdKSoyKipiaXRzWzBdICsgY1syKihub3QgYmdyKV0vLzIqKig4LWJpdHNbMl0pKjIqKihiaXRzWzBdICsgYml0c1sxXSlcbmRlZiBrYzE2X2RyYXdfbGluZSh4MSwgeTEsIHgyLCB5MiwgYyk6XG4gIGRyYXdfbGluZShpbnQoeDEpLCBpbnQoeTEpLCBpbnQoeDIpLCBpbnQoeTIpLCBjb2wzXzJfcmdiKGMsIFs1LCA2LCA1XSwgMSkpXG5cbmRlZiBnZXRfaW5mb3MoKTpcbiAgZ2xvYmFsIGtjMTZfZHJhd19saW5lXG4gIGZub3AgPSBsYW1iZGEgOiBOb25lXG4gIHNjcmVlbl93LCBzY3JlZW5faCwgY29sb3JfYml0cywgcG9seV9zZXRfcGl4ZWwsIHBvbHlfZHJhd19saW5lLCBwb2x5X2ZpbGxfcmVjdCwgcG9seV9jbGVhbl9zY3JlZW4sIG5lZWRfY2xlYW4sIG5lZWRfbGluZSwgbmVlZF9yZWN0ID0gMCwgMjIyLCBbNSwgNiwgNV0sIGZub3AsIGZub3AsIGZub3AsIGZub3AsIDAsIDEsIDFcbiAgdHJ5OlxuICAgIGlmIGNocigyNTYpPT1jaHIoMCk6ICMgS2hpQ0FTIFB5dGhvbiBjb21wYXQuXG4gICAgICBuZWVkX2xpbmUgPSAwXG4gICAgICBuZWVkX2NsZWFuID0gMVxuICAgICAgc2NyZWVuX3cgPSAzMjBcbiAgICAgIGRlZiBwb2x5X3NldF9waXhlbCh4LCB5LCBjKTpcbiAgICAgICAgc2V0X3BpeGVsKHgsIHksIGNvbDNfMl9yZ2IoYywgWzUsNiw1XSwgMCkpXG4gICAgICBwb2x5X2RyYXdfbGluZSA9IGtjMTZfZHJhd19saW5lXG4gIGV4Y2VwdDpcbiAgICBwYXNzXG4gIGlmIG5vdCBzY3JlZW5fdzpcbiAgICBrYzE2X2RyYXdfbGluZSA9IE5vbmVcbiAgICB0cnk6ICMgS2hpQ0FTIE1pY3JvcHl0aG9uXG4gICAgICBpbXBvcnQgZ3JhcGhpY1xuICAgICAgZGVmIHBvbHlfZHJhd19saW5lKHgxLCB5MSwgeDIsIHkyLCBjKTpcbiAgICAgICAgZ3JhcGhpYy5kcmF3X2xpbmUoaW50KHgxKSwgaW50KHkxKSwgaW50KHgyKSwgaW50KHkyKSwgY29sM18yX3JnYihjLCBjb2xvcl9iaXRzLCAxKSlcbiAgICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4MSwgeTEsIHgyLCB5MiwgYyk6XG4gICAgICAgIGdyYXBoaWMuZHJhd19maWxsZWRfcmVjdGFuZ2xlKGludCh4MSksIGludCh5MSksIGludCh4MiksIGludCh5MiksIGMpXG4gICAgICBzY3JlZW5fdywgcG9seV9zZXRfcGl4ZWwsIG5lZWRfY2xlYW4sIG5lZWRfbGluZSwgbmVlZF9yZWN0ID0gMzIwLCBncmFwaGljLnNldF9waXhlbCwgMSwgMCwgMFxuICAgIGV4Y2VwdDpcbiAgICAgIHBhc3NcbiAgaWYgbm90IHNjcmVlbl93OlxuICAgIHRyeTogIyBOdW1Xb3Jrc1xuICAgICAgaW1wb3J0IGthbmRpbnNreVxuICAgICAgc2NyZWVuX3csIHBvbHlfc2V0X3BpeGVsLCBuZWVkX3JlY3QgPSAzMjAsIGthbmRpbnNreS5zZXRfcGl4ZWwsIDBcbiAgICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4LCB5LCB3LCBoLCBjKTpcbiAgICAgICAga2FuZGluc2t5LmZpbGxfcmVjdChpbnQoeCksIGludCh5KSwgaW50KHcpLCBpbnQoaCksIGMpXG4gICAgZXhjZXB0OlxuICAgICAgcGFzc1xuXG4gIGlmIG5lZWRfbGluZTpcbiAgICBkZWYgcG9seV9kcmF3X2xpbmUoeDEsIHkxLCB4MiwgeTIsIGMpOlxuICAgICAgbSwgYTEsIGIxLCBhMiwgYjIgPSAwLCBpbnQoeDEpLCBpbnQoeTEpLCBpbnQoeDIpLCBpbnQoeTIpXG4gICAgICBpZiAoeDIgLSB4MSkgKiogMiA8ICh5MiAtIHkxKSAqKiAyOlxuICAgICAgICBtLCBhMSwgYTIsIGIxLCBiMiA9IDEsIGIxLCBiMiwgYTEsIGEyXG4gICAgICBpZiBtaW4oYTEsIGEyKSAhPSBhMTogYTEsIGIxLCBhMiwgYjIgPSBhMiwgYjIsIGExLCBiMVxuICAgICAgZm9yIGsgaW4gcmFuZ2UoYTIgLSBhMSArIDEpOlxuICAgICAgICBhLCBiID0gYTEgKyBrLCBpbnQoYjEgKyAoYjIgLSBiMSkgKiBrIC8gKChhMiAtIGExKSBvciAxKSlcbiAgICAgICAgcG9seV9zZXRfcGl4ZWwoKGEsIGIpW21dLCAoYiwgYSlbbV0sIGMpXG5cbiAgaWYgbmVlZF9yZWN0OlxuICAgIGRlZiBwb2x5X2ZpbGxfcmVjdCh4LCB5LCB3LCBoLCBjKTpcbiAgICAgIGZvciBrIGluIHJhbmdlKGgpOlxuICAgICAgICBwb2x5X2RyYXdfbGluZSh4LCB5ICsgaywgeCArIHcgLSAxLCB5ICsgaywgYylcblxuICBpZiBuZWVkX2NsZWFuOlxuICAgIGRlZiBwb2x5X2NsZWFuX3NjcmVlbigpOlxuICAgICAgcG9seV9maWxsX3JlY3QoMCwgMCwgc2NyZWVuX3csIHNjcmVlbl9oLCBbMjU1LCAyNTUsIDI1NV0pXG4gIHJldHVybiBzY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfY2xlYW5fc2NyZWVuLCBmbm9wXG4ifSx7Im5hbWUiOiJsYWJ5LnB5IiwiY29udGVudCI6IiNjYXNcbmZyb20gbWF0aCBpbXBvcnQgc2luLCBjb3MsIGFzaW4sIHBpXG5mcm9tIHBvbHljYWxjIGltcG9ydCAqXG5cbmRlZiByaShhLGIpOlxuICBnbG9iYWwgc1xuICBzID0gKHMgKiAyMTQwMTMgKyAyNTMxMDExKSAlIDQyOTQ5NjcyOTZcbiAgciA9IChzIC8vIDY1NTM2KSAmIDB4N2ZmZlxuICByZXR1cm4gciAlIChiLWEpICsgYVxuXG5kZWYgbW9uX3NlY3JldCh2LCBiLCBuKTpcbiAgcmV0dXJuIHYgJiB+KGIgKiAyKipuKVxuXG5kZWYgbW9uX3hvcihhLCBiKTpcbiAgcmV0dXJuIGEgKyBiIC0gKGEgJiBiKVxuXG5kZWYgZml4X2FuZ2xlKGEpOlxuICByZXR1cm4gYSAqIDIgKiBhc2luKDEpIC8gcGlcblxuZGVmIHVmbChyKTpcbiAgZ2xvYmFsIHJsXG4gIGksIHMgPSByIC8vIDMsIDEwICogKHIgJSAzKVxuICByZXAgPSBybFtpXS8vMioqcyAmIDEwMjNcbiAgaWYgcmVwICE9IHI6XG4gICAgcmVwID0gdWZsKHJlcClcbiAgICBybFtpXSA9IG1vbl9zZWNyZXQocmxbaV0sIDEwMjMsIHMpXG4gICAgcyA9IHJlcCAqIDIqKnNcbiAgICBybFtpXSA9IG1vbl94b3IocmxbaV0sIHMpXG4gIHJldHVybiByZXBcblxuZGVmIHVmbShyMSwgcjIpOlxuICBnbG9iYWwgcmxcbiAgaSwgcjEgPSByMSAvLyAzLCAxMCAqIChyMSAlIDMpXG4gIHIyICo9IDIqKnIxXG4gIHJsW2ldID0gbW9uX3NlY3JldChybFtpXSwgMTAyMywgcjEpXG4gIHJsW2ldID0gbW9uX3hvcihybFtpXSwgcjIpXG5cbmRlZiBjb3V0KHgpOlxuICByZXR1cm4gbGVuKHN0cihyb3VuZChhYnMoeCkvMS4sNSkpKVxuXG5kZWYgYV9nYXVjaGUoYSk6XG4gIGdsb2JhbCBzdGF0ZVxuICBzdGF0ZVs3XSArPSBhXG4gIHN0YXRlWzVdICs9IDUgKyBjb3V0KGEpXG4gIHN0YXRlWzJdIC09IGFcblxuZGVmIGFfZHJvaXRlKGEpOlxuICBzdGF0ZVs3XSArPSAyICogYVxuICBhX2dhdWNoZSgtYSlcblxuZGVmIGF2YW5jZXIobCk6XG4gIGdsb2JhbCBzdGF0ZVxuICB0ID0gZml4X2FuZ2xlKHN0YXRlWzJdKVxuICBkeCwgZHkgPSBjb3ModCksIHNpbih0KVxuICBzdGF0ZVs3XSArPSBsXG4gIHN0YXRlWzVdICs9IDggKyBjb3V0KGwpXG4gIHdoaWxlKGwgPiAwKTpcbiAgICBzdGF0ZVszOjVdID0gc3RhdGVbMDoyXVxuICAgIHgsIHkgPSBzdGF0ZVswXSArIGR4LzQsIHN0YXRlWzFdICsgZHkvNFxuICAgIGl4LCBpeSA9IGludCh4KSAtICh4IDwgMCksIGludCh5KSAtICh5IDwgMClcbiAgICBkcngsIGRyeSA9IGl4IC0gaW50KHN0YXRlWzNdKSwgaXkgLSBpbnQoc3RhdGVbNF0pXG4gICAgdncgPSBsYW1iZGEgeSwgeDogd2xbeV0gJiAyKip4XG4gICAgaHcgPSBsYW1iZGEgeSwgeDogd2xbeSArIGxhYnlfaF0gJiAyKip4XG4gICAgd3ggPSBsYWJ5X3cgLSAyIC0gbWluKGl4LCBpeCAtIGRyeClcbiAgICB0eCA9IGRyeCBhbmQgKGl4IDwgMCBvciBpeCA+PSBsYWJ5X3cgb3IgdncoaXkgLSBkcnksIGxhYnlfdyAtIDIgLSBtaW4oaXgsIGl4IC0gZHJ4KSkpXG4gICAgdHkgPSBkcnkgYW5kIChpeSA8IDAgb3IgaXkgPj0gbGFieV9oIG9yIGh3KG1pbihpeSwgaXkgLSBkcnkpLCBsYWJ5X3cgLSAxIC0gKGl4IC0gZHJ4KSkpXG4gICAgdCA9IGR4IDw9IDAgb3IgaW50KHgpIDwgbGFieV93IC0gMSBvciBpbnQoeSkgPCBsYWJ5X2ggLSAxXG4gICAgaWYgdCBhbmQgdHggb3IgdHkgb3IgKGRyeCBhbmQgZHJ5IGFuZCAodCBhbmQgdHggb3IgdHkpKSBvciAoZHJ4IGFuZCBkcnkgYW5kICh0IGFuZCB2dyhpeSwgbGFieV93IC0gMiAtIG1pbihpeCwgaXggLSBkcngpKSBvciBodyhtaW4oaXksIGl5IC0gZHJ5KSwgbGFieV93IC0gMSAtIGl4KSkpOlxuICAgICAgc3RhdGVbNV0gKz0gMTVcbiAgICAgIHJldHVyblxuICAgIGwgLT0gLjI1XG4gICAgc3RhdGVbNl0gKz0gKHN0YXRlWzZdIDwgMjAwKVxuICAgIHN0YXRlWzA6Ml0gPSAoeCwgeSlcbiAgICBwb2x5X2RyYXdfbGluZShzdGF0ZVszXSAqIHp4LCBzdGF0ZVs0XSAqIHp5LCBzdGF0ZVswXSAqIHp4LCBzdGF0ZVsxXSAqIHp5LCBjb2xvcnNbNF0pXG5cbmxhYnlfdywgbGFieV9oID0gMjAsIDEyXG5zID0gMHhkZWFkYmVlZlxuXG5ybCA9IFsoMyppICsgMikqMTA0ODU3NiArICgzKmkgKyAxKSoxMDI0ICsgMyppIGZvciBpIGluIHJhbmdlKChsYWJ5X3cqbGFieV9oICsgMikgLy8gMyldXG53bCA9IFsoMioqKGxhYnlfdyArIDEpIC0gMSkgLy8gKDEgKyAoayA8IGxhYnlfaCkpIGZvciBrIGluIHJhbmdlKDIqbGFieV9oIC0gMSldXG5jbCA9IGxhYnlfdyAqIGxhYnlfaFxud2hpbGUgY2wgPiAxIC0gKGxhYnlfdyAqIGxhYnlfaCkvLzEwMCoxMDpcbiAgeSA9IHJpKDAsIDIqbGFieV9oIC0gMSlcbiAgeCA9IHJpKDAsIGxhYnlfdyAtICh5IDwgbGFieV9oKSlcbiAgaWYgd2xbeV0gJiAyKip4OlxuICAgIGlmIHkgPCBsYWJ5X2g6XG4gICAgICByMSA9IHkqbGFieV93ICsgeFxuICAgICAgcjIgPSByMSArIDFcbiAgICBlbHNlOlxuICAgICAgcjEgPSAoeSAtIGxhYnlfaCkqbGFieV93ICsgeFxuICAgICAgcjIgPSByMSArIGxhYnlfd1xuICAgIHJsMSwgcmwyID0gdWZsKHIxKSwgdWZsKHIyKVxuICAgIGlmIHJsMSAhPSBybDIgb3IgY2wgPD0gMTpcbiAgICAgIHVmbShybDEsIHJsMilcbiAgICAgIGNsIC09IDFcbiAgICAgIHdsW3ldID0gbW9uX3NlY3JldCh3bFt5XSwgMSwgeClcbmZvciByIGluIHJhbmdlKGxhYnlfdyAqIGxhYnlfaCk6XG4gIHVmbChyKVxuXG5zY3JlZW5fdywgc2NyZWVuX2gsIHBvbHlfc2V0X3BpeGVsLCBwb2x5X2RyYXdfbGluZSwgcG9seV9maWxsX3JlY3QsIHBvbHlfY2xlYW5fc2NyZWVuLCBwb2x5X3Nob3dfc2NyZWVuID0gZ2V0X2luZm9zKClcbmRzID0gNFxuemludCA9IDEgKyAoc2NyZWVuX3cgPiAyKmxhYnlfdypkcylcbmRzICs9IHppbnQgLSAxXG56eCwgenkgPSAoc2NyZWVuX3cgLSB6aW50KSAvIGxhYnlfdywgKHNjcmVlbl9oIC0gemludCkgLyBsYWJ5X2hcbmdldF9pbmZvcywgcG9seV9zZXRfcGl4ZWwsIHJsLCB1ZmwsIHVmbSA9IE5vbmUsIE5vbmUsIE5vbmUsIE5vbmUsIE5vbmVcbmNvbG9ycyA9IChbMCwgOTUsIDBdLCBbMCwgMCwgNjNdLCBbMCwgMTI3LCAwXSwgWzAsIDAsIDc5XSwgWzI1NSwgMCwgMF0pXG5cbmRlZiBhbGxlcl9zZWxvbihmKTpcbiAgZ2xvYmFsIHN0YXRlXG4gIHN0YXRlID0gWzAsIC41LCAwLCAwLCAuNSwgMCwgMCwgMF1cbiAgcG9seV9jbGVhbl9zY3JlZW4oKVxuICBmb3IgaSBpbiByYW5nZSgyKTpcbiAgICBwb2x5X2ZpbGxfcmVjdCgwLCBpICogbGFieV9oICogenksIGxhYnlfdyAqIHp4LCB6aW50LCBjb2xvcnNbMV0pXG4gICAgcG9seV9maWxsX3JlY3QoaSAqIGxhYnlfdyAqIHp4LCAobm90IGkpICogenksIHppbnQsIChsYWJ5X2ggLSAxKSAqIHp5LCBjb2xvcnNbMF0pXG4gIGZvciB5IGluIHJhbmdlKDIqbGFieV9oIC0gMSk6XG4gICAgZm9yIHogaW4gcmFuZ2UobGFieV93IC0gKHkgPCBsYWJ5X2gpKTpcbiAgICAgIGlmIHdsW3ldICYgMioqejpcbiAgICAgICAgeCA9IGxhYnlfdyAtIDEgLSB6XG4gICAgICAgIGlmIHkgPCBsYWJ5X2g6XG4gICAgICAgICAgcG9seV9maWxsX3JlY3QoeCAqIHp4LCB5ICogenksIHppbnQsIHp5LCBjb2xvcnNbMl0pXG4gICAgICAgIGVsc2U6XG4gICAgICAgICAgcG9seV9maWxsX3JlY3QoeCAqIHp4LCAoeSAtIGxhYnlfaCArIDEpICogenksIHp4LCB6aW50LCBjb2xvcnNbM10pXG4gIGYoKVxuICBwb2x5X3Nob3dfc2NyZWVuKClcbiAgc3RhdGVbNV0gKz0gc2luKGZpeF9hbmdsZShzdGF0ZVs3XSkpIC0gc3RhdGVbNl0gLy8gMlxuICBwcmludCgnQ29uc29tbWF0aW9uIDogJyArIHN0cihzdGF0ZVs1XSkpXG4gIGlmIHN0YXRlWzBdID49IGxhYnlfdzpcbiAgICBwcmludCgnQnJhdm8sIHR1IGVzIHNvcnRpLWUuJylcbiAgICBwcmludCgnUG91ciBqb3VlciBldCBnYWduZXIsJylcbiAgICBwcmludCgnZW52b2llIHRvbiBzY3JpcHQgYScpXG4gICAgcHJpbnQoJ2luZm9AdGlwbGFuZXQub3JnLicpXG4gIHJldHVybiBzdGF0ZVs1XVxuIn0seyJuYW1lIjoibGFieXRlc3QucHkiLCJjb250ZW50IjoiI2Nhc1xuZnJvbSBsYWJ5IGltcG9ydCAqXG5cbmRlZiBjaGVtaW4oKTpcbiAgYXZhbmNlcigxLjUpXG4gIGFfZHJvaXRlKDEuNTcwNzk2MzI2Nzk0ODk2NilcbiAgYXZhbmNlcigxKVxuIn1dfQ==")));

    constructor() {
        this.onAuthStateChangedHandler = [];
        this.user = null;
        this.gists = null;
        
        window.localStorage.setItem('projects', TiPlanetConnector.__init_projects);
    }

    /**
     * @returns {TiPlanetConnector}
     */
    static getInstance() {
        if (TiPlanetConnector.__instance == null) {
            TiPlanetConnector.__instance = new TiPlanetConnector();
        }

        return this.__instance;
    }

    getUserName() {
        return "Dummy Name";
    }

    getUserPhotoURL() {
        return profile;
    }

    onAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler.push(changed_func);
    }

    removeAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler = this.onAuthStateChangedHandler.filter(element => element !== changed_func);
    }

    isLogged() {
        return true;
    }

    login(function_good, function_error) {
        function_good();
    }

    logout() {
        
    }

    getDefaultFileName(name) {
        var init_file_name = "";
        
        for(let i in name.toLowerCase()) {
            let char = name.toLowerCase()[i];
            if (TiPlanetConnector.__allowed_chars_file.includes(char)) {
                init_file_name += char;
            }
        }
        
        if (init_file_name.length === 0) {
            init_file_name = "main";
        }
        
        init_file_name += ".py";
        
        return init_file_name;
    }
    
    getDefaultFiles(name) {
        let files = {};
        
        files[this.getDefaultFileName(name)] = {
            "content": TiPlanetConnector.__init_file_content
        };
        
        return files;
    }

    getProjects(callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        let output = [];
        for (let name in projects) {
            output.push({
                "name": name,
                "files": [],
                "loaded": false,
                "loading": false,
                "selected": false
            });
        }
        
        console.log(output);

        callback(output);
    }

    loadProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }
        
        if (projects[name] === undefined) {
            callback(null);
            return;
        }
        
        callback({
            "name": name,
            "files": projects[name],
            "loaded": true,
            "loading": false,
            "selected": true
        });
    }

    createProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[name] !== undefined) {
            callback(null);
            return;
        }
        
        projects[name] = [{
            "name": this.getDefaultFileName(name),
            "content": TiPlanetConnector.__init_file_content
        }];

        callback({
            "name": name,
            "files": projects[name],
            "loading": false,
            "loaded": true,
            "selected": true
        });
        
        window.localStorage.setItem('projects', JSON.stringify(projects));
    }

    renameProject(oldname, newname, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[oldname] === undefined) {
            callback(null, null);
            return;
        }
        
        projects[newname] = projects[oldname];
        delete projects[oldname];
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(oldname, newname);
    }

    removeProject(name, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[name] === undefined) {
            callback(null);
            return;
        }
        
        delete projects[name];
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(name);
    }

    saveProject(project, callback) {
        var projects = window.localStorage.getItem('projects');

        if (projects === null) {
            projects = {};
            window.localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            projects = JSON.parse(projects);
        }

        if (projects[project.name] === undefined) {
            callback(null);
            return;
        }
        
        projects[project.name] = project.files;
        window.localStorage.setItem('projects', JSON.stringify(projects));
        callback(project);
    }
}

