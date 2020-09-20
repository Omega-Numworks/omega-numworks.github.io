import React, { Component } from 'react';
import GithubConnector from "../GithubConnector";
import ImgBanner from '../img/banner.png';
import ImgIDE from '../img/ide.png';
import ImgIDESimu from '../img/ide-simu.png';
import { Button } from '@quentinguidee/react-jade-ui';
import { Fade } from 'react-reveal';
import { FeatureCardRow, FeatureCardColumn, FeatureCard, FeatureCardTitle, FeatureCardDescription, FeatureCardImage } from '../components/featurecard/FeatureCard';

export default class IDEMain extends Component {
    constructor(props) {
        super(props);
        document.title = "Omega - IDE";
        
        this.state = {
            connector: GithubConnector.getInstance()
        };
        
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
        this.login = this.login.bind(this);
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    
    componentDidMount() {
        this.state.connector.onAuthStateChanged(this.onAuthStateChanged);
    }
    
    componentWillUnmount() {
        this.state.connector.removeAuthStateChanged(this.onAuthStateChanged);
    }
    
    login() {
        this.state.connector.login();
    }

    onAuthStateChanged() {
        this.forceUpdate();
    }

    render() {
        
        var accessButton = null;
        
        if (this.state.connector.isLogged()) {
            accessButton = (
                <Button to="/ide/editor" className="project-description__button" rightIcon='play_arrow' outline big>
                    LAUNCH 
                </Button>
            );
        } else {
            accessButton = (
                <Button onClick={this.login} className="project-description__button" rightIcon='play_arrow' outline big>
                        LOGIN WITH GITHUB
                </Button>
            );
        }
        
        return (
            <div className="content content-home">
                <div className="project-description" style={{backgroundImage: `url(${ImgBanner})`}}>
                    <h1 className="project-description__title">
                        Omega IDE
                    </h1>
                    <h2 className="project-description__subtitle">
                        An online Python IDE.
                    </h2>
                    {accessButton}
                    <p className="project-description__description">
                        Omega IDE est un éditeur de scripts python rendant la programmation Python pour Numworks plus facile que jamais.
                        Cet IDE fonctionne aussi bien avec ou sans Omega installé.
                    </p>
                </div>

                <div style={ { height: "16px" } }></div>

                <Fade>
                <FeatureCardRow>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                Interface 
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                L'interface est facile d'utilisation et dispose de deux thèmes : un thème Omega et un thème VSCode.
                            </FeatureCardDescription>
                            <FeatureCardImage src={ImgIDE} />
                        </FeatureCard>
                    </FeatureCardColumn>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                Testez en toute simplicité
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                Avec Omega IDE, vous pouvez tester vos scripts Python directement dans le simulateur Omega, ou en les installant en quelques secondes sur la calculatrice.
                            </FeatureCardDescription>
                            <FeatureCardImage src={ImgIDESimu} />
                        </FeatureCard>
                    </FeatureCardColumn>
                </FeatureCardRow>
                </Fade>

                <Fade>
                <FeatureCardRow>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                Projets multi-fichiers
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                L'éditeur d'Omega est capable de gérer des projets composés de plusieurs fichiers.
                            </FeatureCardDescription>
                        </FeatureCard>
                    </FeatureCardColumn>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                Sauvegarde sur Gist
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                Tous les scripts sont sauvegardés sur votre propre compte GitHub Gist.
                            </FeatureCardDescription>
                        </FeatureCard>
                    </FeatureCardColumn>
                </FeatureCardRow>
                </Fade>

                <div style={ { height: "16px" } }></div>
            </div>
        )
    }
}
