
import firebase from "firebase"

/**
 * Github connector class. Makes link between the firebase API and the frontend
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
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
            
            for(var i in this.onAuthStateChangedHandler) {
                this.onAuthStateChangedHandler[i]();
            }
        }.bind(this));
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
        if (this.user !== null) {
            return this.user.displayName;
        } else {
            return null;
        }
    }

    getUserPhotoURL() {
        if (this.user !== null) {
            return this.user.photoURL;
        } else {
            return null;
        }
    }

    onAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler.push(changed_func);
    }

    removeAuthStateChanged(changed_func) {
        this.onAuthStateChangedHandler = this.onAuthStateChangedHandler.filter(element => element !== changed_func);
    }

    isLogged() {
        return this.user !== null;
    }

    login(function_good, function_error) {
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope("gist");

        firebase.auth().signInWithPopup(provider).then((result) => {
            var token = result.credential.accessToken;
            this.user = result.user;
            localStorage.setItem('accessToken', token);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode + "//" + errorMessage + "//" + email + "//" + credential);
            if (errorCode === "auth/popup-closed-by-user" || errorCode === "auth/popup-blocked") {
                firebase.auth().signInWithRedirect(provider);
            }
        });
    }

    logout() {
        firebase.auth().signOut();
    }
    
    getGistID(name) {
        for(let i = 0; i < this.gists.length; i++) {
            if (this.gists[i].name === name) {
                return this.gists[i].id;
            }
        }
        
        return null;
    }
    
    getGistInternalID(name) {
        for(let i = 0; i < this.gists.length; i++) {
            if (this.gists[i].name === name) {
                return i;
            }
        }
        
        return -1;
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
        const requestOptions = {
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            cache: "no-store"
        };
        
        fetch("https://api.github.com/gists", requestOptions).then(res => res.json()).then(function(result) {
            
            if (result.message !== undefined) {
                if (result.message === "Bad credentials") {
                    this.logout();
                    this.login(function() {
                        this.getProjects(callback);
                    }.bind(this), null);
                }
            }
            
            var output = [];
            this.gists = [];

            for(let i = 0; i < result.length; i++) {
                output.push({
                    "name": result[i].description,
                    "files": [],
                    "loaded": false,
                    "loading": false,
                    "selected": false
                });

                this.gists.push({
                    "name": result[i].description,
                    "id": result[i].id,
                    "current_files": []
                });
            }

            callback(output);
        }.bind(this));
    }

    loadProject(name, callback) {
        let id = this.getGistID(name);
        
        if (id === null) {
            callback(null);
            return;
        }
        
        const requestOptions = {
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            cache: "no-store"
        };
        
        fetch("https://api.github.com/gists/" + id, requestOptions).then(res => res.json()).then(function(result) {
            let files = result.files;
            var output = [];
            this.gists[this.getGistInternalID(name)].current_files = [];
            
            for (let key in files) {
                this.gists[this.getGistInternalID(name)].current_files.push({
                    "name": files[key].filename,
                    "content": files[key].content
                });
                
                output.push({
                    "name": files[key].filename,
                    "content": files[key].content
                });
            }
            
            callback({
                "name": result.description,
                "files": output,
                "loaded": true,
                "loading": false,
                "selected": true
            });
        }.bind(this));
    }

    createProject(name, callback) {
        let id = this.getGistID(name);
        
        if (id !== null) {
            callback(null);
            return;
        }
        
        
        const requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            cache: "no-store",
            body: JSON.stringify({
                "description": name,
                "public": true,
                "files": this.getDefaultFiles(name)
            })
        };
        
        fetch("https://api.github.com/gists", requestOptions).then(res => res.json()).then(function(result) {
            this.gists.push({
                "name": result.description,
                "id": result.id,
                "current_files": this.getDefaultFiles(name)
            });
            
            callback({
                "name": name,
                "files": [{
                    "name": this.getDefaultFileName(name),
                    "content": GithubConnector.__init_file_content
                }],
                "loading": false,
                "loaded": true,
                "selected": true
            });
        }.bind(this));
    }

    renameProject(oldname, newname, callback) {
        let gist_id = this.getGistID(oldname);
        
        if (gist_id === null) {
            callback(null, null);
            return;
        }
        
        const requestOptions = {
            method: 'PATCH',
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            cache: "no-store",
            body: JSON.stringify({
                "description": newname
            })
        };
        
        fetch("https://api.github.com/gists/" + gist_id, requestOptions).then(res => res.json()).then(function(result) {
            let gid = this.getGistInternalID(oldname);
            
            this.gists[gid].name = newname;
            callback(oldname, newname);
        }.bind(this));
    }

    removeProject(name, callback) {
        let gist_id = this.getGistID(name);
        
        if (gist_id === null) {
            callback(null);
            return;
        }
        
        const requestOptions = {
            method: 'DELETE',
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            cache: "no-store"
        };
        
        fetch("https://api.github.com/gists/" + gist_id, requestOptions).then(res => res.text()).then(function(result) {
            let gid = this.getGistInternalID(name);
            
            callback(name);
            
            this.gists.splice(gid, 1);
        }.bind(this));
    }
    
    calcDiff(old_files, new_files) {
        let names_list = [];
        let old_dict = {};
        let new_dict = {};
        let final_files = {};
        
        for(let i = 0; i < old_files.length; i++) {
            names_list.push(old_files[i].name);
            old_dict[old_files[i].name] = old_files[i].content
        }
        
        for(let i = 0; i < new_files.length; i++) {
            if (!names_list.includes(new_files[i].name))
                names_list.push(new_files[i].name);
            new_dict[new_files[i].name] = new_files[i].content
        }
        
        for(let i = 0; i < names_list.length; i++) {
            let curr_name = names_list[i];
            
            if (curr_name in new_dict) {
                final_files[curr_name] = {
                    "content": new_dict[curr_name]
                };
            } else if (curr_name in old_dict) {
                final_files[curr_name] = {
                    "content": ""
                };
            }
        }
        
        return final_files;
    }

    saveProject(project, callback) {
        let gid = this.getGistInternalID(project.name);
        let gist_id = this.getGistID(project.name);
        
        if (gid === -1 || gist_id === null) {
            callback(null);
            return;
        }
        
        const requestOptions = {
            method: 'PATCH',
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            cache: "no-store",
            body: JSON.stringify({
                "files": this.calcDiff(this.gists[gid].current_files, project.files)
            })
        };
        
        fetch("https://api.github.com/gists/" + gist_id, requestOptions).then(res => res.json()).then(function(result) {
            let gid = this.getGistInternalID(project.name);
            
            this.gists[gid].current_files = project.files;
            callback(project);
        }.bind(this));
    }
}

