
import profile from './img/profile.png'

/**
 * Local storage connector class. Dummy connector for dev.
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class GithubConnector {
    static __instance = null;
    static __allowed_chars_file = "abcdefghijklmnopqrstuvwxyz1234567890_";
    static __init_file_content = "from math import *\n";

    constructor() {
        this.onAuthStateChangedHandler = [];
        this.user = null;
        this.gists = null;
    }

    /**
     * @returns {GithubConnector}
     */
    static getInstance() {
        if (GithubConnector.__instance == null) {
            GithubConnector.__instance = new GithubConnector();
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
            if (GithubConnector.__allowed_chars_file.includes(char)) {
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
            "content": GithubConnector.__init_file_content
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
            "content": GithubConnector.__init_file_content
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

