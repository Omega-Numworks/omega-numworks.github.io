
/*global Epsilon*/

export default class PythonSimulator {
    constructor() {
        this.module = undefined;
        this.script = null;
    }
    
    run(scripts_list = null, python_only = false) {
        this.module = {
            // arguments: ["--language", window.navigator.language.split('-')[0], "--code-script", name + ":" + code, "--code-lock-on-console"],
            arguments: ["--language", window.navigator.language.split('-')[0]],
            canvas: document.getElementById('screen'),
            keyboardListeningElement: document.getElementById('screen')
        };
        
        if (scripts_list !== null) {
            this.module.arguments.push("--code-wipe");
            
            for(var i in scripts_list) {
                var script = scripts_list[i];
                this.module.arguments.push("--code-script");
                this.module.arguments.push(script.name + ":" + script.code);
            }
        }
        
        if (python_only)
            this.module.arguments.push("--code-lock-on-console");
        
        Epsilon(this.module);
    }
    
    stop() {
        if (this.module) this.module._IonSimulatorEventsPushEvent(217);
        this.module = undefined;
    }
    
    load(callback) {
        if (this.script !== null) {
            this.unload();
        }
        
        this.script = document.createElement('script');
        
        this.script.src = "/epsilon.js";
        this.script.async = true;
        
        this.script.onload = function() {
            callback();
        };
        
        document.body.appendChild(this.script);
    }
    
    unload() {
        if (this.script !== null) {
            this.script.parentNode.removeChild(this.script);
            this.script = null;
        }
    }
};

PythonSimulator.Script = class {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
};

