import React, { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import FullSimulator from "./pages/simulator/FullSimulator";
import Releases from "./pages/Releases";
import Policy from "./pages/Policy";
import Install from "./pages/Install";
import IDEMain from "./pages/IDE";
import IDEEditor from "./pages/omega-ide/src/ide/Editor";
import IDESimulator from "./pages/omega-ide/src/ide/Simulator";
import NotFound from "./pages/NotFound";
import GithubConnector from "./GithubConnector";
import CookiesConsent from "./components/cookiesconsent/CookiesConsent";

import { IntlProvider } from "react-intl";
import translations from "./i18n/locales";
import classNames from "classnames";
import { getCookie, setCookie } from "./cookies";

import "./sass/omega.library.sass";

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

    const [theme, setTheme] = useState(getCookie("theme") || "light");
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
                        <Route path="/install" component={Install} exact />
                        <Route path="/install/:version" component={Install} />
                        <Route path="/policy" component={Policy} exact />
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
