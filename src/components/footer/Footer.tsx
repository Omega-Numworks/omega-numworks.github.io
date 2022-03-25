import classNames from "classnames";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import translations from "../../i18n/locales/index";
import FooterProjects from "./FooterProjects";
import FooterSeparator from "./FooterSeparator";
import FooterVercel from "./FooterVercel";
import styles from "./sass/Footer.module.sass";

var languages: any = translations;

type FooterProps = {
    onChangeLanguage: (lang: string) => void;
    locale: string;
};

type FooterState = {
    locale: string;
    localeDropdown: boolean;
};

export default function Footer(props: FooterProps) {
    const [lang, setLang] = useState(props.locale);
    const [isLangDropdownOpened, setLangDropdownOpened] = useState(false);

    const selectLang = (lang: string) => {
        setLang(lang);
        setLangDropdownOpened(false);

        props.onChangeLanguage(lang);
    };

    const onClickOverlay = () => {
        setLangDropdownOpened(false);
    };

    const toggleLangDropdown = () => {
        setLangDropdownOpened(!isLangDropdownOpened);
    };

    var langs_list = [];

    for (let lang in languages) {
        langs_list.push(
            <div
                key={lang}
                onClick={() => selectLang(lang)}
                className={styles.localeDropdownItem}
            >
                {languages[lang]["footer.language"]}{" "}
                {languages[lang]["footer.flag"]}
            </div>
        );
    }

    return (
        <footer className={classNames("footer", styles.footer)}>
            <div
                className={classNames({
                    [styles.overlay]: true,
                    [styles.overlayShow]: isLangDropdownOpened,
                })}
                onClick={onClickOverlay}
            ></div>
            <FooterProjects />
            <FooterSeparator />

            <div style={{ height: 316 }}>
                <FooterVercel />
                <div className={styles.discord}>
                    <iframe
                        title="Discord"
                        src="https://discordapp.com/widget?id=663420259851567114&theme=dark"
                        width="300"
                        height="300"
                        frameBorder={0}
                    ></iframe>
                </div>
            </div>

            <div className={styles.aboutNw}>
                <FormattedMessage
                    id="footer.trademark"
                    defaultMessage="NumWorks is a registered trademark of NumWorks SAS, 24 Rue Godot de Mauroy, 75009 Paris, France.{br}Nintendo and Nintendo 3DS are registered trademarks of Nintendo of America Inc, 4600 150th Ave NE, Redmond, WA 98052, USA.{br}Omega is not affiliated with Numworks, Phi or Nintendo."
                    values={{ br: <br /> }}
                />

                <a
                    className={styles.aboutNwContact}
                    href="mailto:getomega.pro@gmail.com"
                >
                    <FormattedMessage
                        id="footer.contact"
                        defaultMessage="Contact"
                    />
                </a>
            </div>
            <div
                className={classNames({
                    [styles.locale]: true,
                    [styles.localeActive]: isLangDropdownOpened,
                })}
                onClick={toggleLangDropdown}
            >
                {languages[lang]["footer.language"]}{" "}
                {languages[lang]["footer.flag"]}
                <div
                    className={classNames({
                        [styles.localeDropdown]: true,
                        [styles.localeDropdownShow]: isLangDropdownOpened,
                    })}
                >
                    {langs_list}
                </div>
            </div>
        </footer>
    );
}
