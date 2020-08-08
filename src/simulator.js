
/*global Epsilon*/

export default class PythonSimulator {
    constructor() {
        this.module = undefined;
        this.script = null;
        this.isLoaded = false;
    }
    
    run(calculator_element, keyboard = false, scripts_list = null, python_only = false) {
        var screen_element = calculator_element.querySelector("canvas");
        this.python_only = python_only;
        
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
                this.module.arguments.push(script.name + ":" + script.content);
            }
        }
        
        if (python_only)
            this.module.arguments.push("--code-lock-on-console");
        
        Epsilon(this.module);
        
        if (keyboard) {
            var spans = calculator_element.querySelectorAll(".calculator__keyboard__nav__key,.calculator__keyboard__functions__key,.calculator__keyboard__digits__key");
            for (i = 0; i < spans.length; i++) {
                var span = spans[i];
                span.addEventListener("mousedown", function(e) {
                if (this.module)
                        this.module._IonSimulatorKeyboardKeyDown(e.target.getAttribute("data-key"));
                }.bind(this));
                span.addEventListener("mouseup", function(e) {
                if (this.module)
                        this.module._IonSimulatorKeyboardKeyUp(e.target.getAttribute("data-key"));
                }.bind(this));
            }
        }
    }
    
    stop() {
        if (this.module) 
            if(this.module.asm)
                this.module._IonSimulatorEventsPushEvent(217);
        delete this.module;
        this.module = undefined;
    }
    
    load(python_only = false, callback) {
        if (this.script !== null) {
            this.unload();
        }
        
        this.script = document.createElement('script');
        
        this.script.src = "/epsilon.js";

        if (python_only)
            this.script.src = "/epsilon-python.js";

        this.script.async = true;
        
        this.script.onload = function() {
            this.isLoaded = true;
            callback();
        }.bind(this);
        
        document.body.appendChild(this.script);
    }
    
    screenshot() {
        
    }
    
    unload() {
        if (this.script !== null) {
            this.script.parentNode.removeChild(this.script);
            this.script = null;
            this.isLoaded = false;
        }
    }
};

