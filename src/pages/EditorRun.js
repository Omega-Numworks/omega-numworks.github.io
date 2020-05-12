import React, { Component } from 'react'
import Calculator from '../components/Calculator'

export default class Simulator extends Component {
    constructor(props) {
        super(props);
        
        var id = this?.props?.match?.params?.id;
        
    
        this.state = {
            simulator: null,
            error: false,
            message: "",
            loaded: false,
            scripts: null
        };
        
        if (id !== undefined) {

            const requestOptions = {
                headers: {
                    "Authorization": "token " + localStorage.getItem('accessToken'),
                },
                credentials: "same-origin"
            };
            
            fetch("https://api.github.com/gists/" + this.props.match.params.id, requestOptions)
                .then(res => res.json())
                .then(
                (result) => {
                    if("files" in result) {
                        var scripts = [];
                        for(var name in result.files) {
                            scripts.push({
                                name: result.files[name].filename,
                                code: result.files[name].content
                            });
                        }
                        
                        this.setState({
                            loaded: true,
                            scripts: scripts
                        });
                        
                    } else {
                        this.setState({
                            loaded: true,
                            error: true,
                            message: result.message
                        });
                    }
                },
                (error) => {
                    this.setState({
                        loaded: true,
                        error: true,
                        message: error.message
                    });
                }
            );
        } else {
            this.state["loaded"] = true;
        }
    }

    render() {
        if (this.state.loaded) {
            if (this.state.error) {
                return (
                    <p>ERROR: {this.state.message}</p>
                );
            } else {
                return (
                    <Calculator python={true} scripts={this.state.scripts} keyboard={true}/>
                );
            }
        } else {
            return null;
        }
    }
}
