import classNames from "classnames";
import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import CookiesConsent from "./components/cookiesconsent/CookiesConsent";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { getCookie, setCookie } from "./cookies";
import GithubConnector from "./GithubConnector";
import translations from "./i18n/locales";
import Archiving from "./pages/Archiving";
import Home from "./pages/Home";
import IDEMain from "./pages/IDE";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";
import IDEEditor from "./pages/omega-ide/src/ide/Editor";
import IDESimulator from "./pages/omega-ide/src/ide/Simulator";
import Policy from "./pages/Policy";
import Releases from "./pages/Releases";
import Simulator from "./pages/Simulator";
import FullSimulator from "./pages/simulator/FullSimulator";
import "./sass/omega.library.sass";
import TiPlanetConnector from "./TiPlanetConnector";

function App() {
    const getLang = () => {
        if (navigator.languages !== undefined) return navigator.languages[0];
        else return navigator.language;
    };

    let initLang: any = localStorage.getItem("locale");
    if (initLang == null) initLang = getLang();
    if (!(initLang in translations)) {
        initLang = "en";
    }

    const [theme, setTheme] = useState(getCookie("theme") || "dark");
    const [lang, setLang] = useState(initLang);
    // @ts-ignore
    const [messages, setMessages] = useState(translations[initLang]);

    const onChangeLanguage = (lang: string) => {
        localStorage.setItem("locale", lang);
        setLang(lang);
        // @ts-ignore
        setMessages(translations[lang]);
    };

    const toggleTheme = () => {
        var newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        setCookie("theme", newTheme);
    };

    if (getCookie("cookieconsent_status") === "accepted") {
        // @ts-ignore
        window["ga-disable-G-P9YFFF08LN"] = false;
    } else {
        // @ts-ignore
        window["ga-disable-G-P9YFFF08LN"] = true;
    }

    return (
        <IntlProvider locale={lang} messages={messages}>
            <Router>
                <div className={classNames("body", theme)}>
                    {!window.location.pathname.includes("/simulator/run") && (
                        <React.Fragment>
                            <CookiesConsent linkToPolicy="/policy" />
                            <Header theme={theme} toggleTheme={toggleTheme} />
                        </React.Fragment>
                    )}
                    <Switch>
                        <Route path="/simulator" component={Simulator} exact />
                        <Route
                            path="/simulator/run/full"
                            component={FullSimulator}
                            exact
                        />
                        <Route path="/releases" component={Releases} exact />
                        {/* <Route path="/beta" component={Beta} exact /> */}
                        <Redirect path="/install" to="/install/latest" exact />
                        <Route path="/install/:version" component={Install} />
                        <Route path="/policy" component={Policy} exact />
                        <Route path="/archiving" component={Archiving} exact />
                        <Route path="/ide/" component={IDEMain} exact />
                        <Route
                            path="/ide/editor"
                            component={() => (
                                <IDEEditor
                                    base="/ide/"
                                    connector={GithubConnector}
                                    vercel={true}
                                />
                            )}
                            exact
                        />
                        <Route
                            path="/ide/tiplanet"
                            component={() => (
                                <IDEEditor
                                    base="/ide/"
                                    connector={TiPlanetConnector}
                                    vercel={true}
                                />
                            )}
                            exact
                        />
                        <Route
                            path="/ide/simulator"
                            component={IDESimulator}
                            exact
                        />
                        {/* <Route path="/wiki" component={Wiki} exact /> */}
                        <Route
                            path="/"
                            component={() => <Home theme={theme} />}
                            exact
                        />
                        <Route component={NotFound} />
                    </Switch>
                    {!window.location.pathname.includes("/simulator/run") && (
                        <Footer
                            locale={lang}
                            onChangeLanguage={onChangeLanguage}
                        />
                    )}
                </div>
            </Router>
        </IntlProvider>
    );
}

export default App;
