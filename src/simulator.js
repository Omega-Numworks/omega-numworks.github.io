
/*global Epsilon*/

export default class PythonSimulator {
    constructor() {
        this.module = undefined;
        this.script = null;
    }
    
    run(calculator_element, keyboard = false, scripts_list = null, python_only = false) {
        var screen_element = calculator_element.querySelector("canvas");
        
        if (screen_element === null) {
            throw new Error("No canvas in calculator element!");
        }
        
        this.module = {
            // arguments: ["--language", window.navigator.language.split('-')[0], "--code-script", name + ":" + code, "--code-lock-on-console"],
            arguments: ["--language", window.navigator.language.split('-')[0]],
            canvas: screen_element,
            keyboardListeningElement: screen_element
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
        
        if (keyboard) {
            var spans = calculator_element.querySelectorAll(".calculator__keyboard__nav__key,.calculator__keyboard__functions__key,.calculator__keyboard__digits__key");
            for (var i=0; i< spans.length; i++) {
                var span = spans[i];
                span.addEventListener("mousedown", function(e) {
                    this.module._IonSimulatorKeyboardKeyDown(e.target.getAttribute("data-key"));
                }.bind(this));
                span.addEventListener("mouseup", function(e) {
                    this.module._IonSimulatorKeyboardKeyUp(e.target.getAttribute("data-key"));
                }.bind(this));
            }
        }
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
    
    screenshot() {
        
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

