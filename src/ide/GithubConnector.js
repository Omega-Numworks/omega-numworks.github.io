
import firebase from "../firebase"

/**
 * Github connector class. Makes link between the firebase API and the frontend
 *
 * @author Maxime "M4x1m3" FRIESS
 * @license MIT
 */
export default class GithubConnector {
    static __instance = null;

    constructor() {
        this.onAuthStateChangedHandler = [];
        this.user = null;
        
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
}

