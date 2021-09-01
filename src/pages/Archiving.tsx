import React, { Component } from "react";

import styles from "./sass/Policy.module.sass";

export default class Archiving extends Component {
    constructor(props: {}) {
        super(props);
        document.title = "Omega — Archiving";
    }

    render() {
        return (
            <div className="content">
                <div className={styles.legal}>
                    <h2 className={styles.title}>
                        The end of Omega.
                    </h2>
                    <p className={styles.paragraph}>
                        As a reminder, since August 13, 2021, Numworks has definitively put an end to community developments with its Epsilon 16 update. This installs a kernel in your Numworks that it is impossible to remove and which prevents any third-party firmware such as Omega, Delta or Epsilon variants.
                    </p>
                    <p className={styles.paragraph}>
                        In addition, Epsilon has now switched to a strong copyright license. It is now completely forbidden to create a variant of Epsilon 16 on GitHub under penalty of being sued by the manufacturer.
                    </p>
                    <p className={styles.paragraph}>
                        It is therefore with regret that we announce this Monday, August 30, 2021, and after 2 years of activity, the end and archiving of the Omega fork.
                    </p>
                    <p className={styles.paragraph}>
                        However, we want to keep the community that has grown around the project, and that’s why the Discord community will stay alive under the new name of Omega Community. The server will thus no longer be exclusively reserved for Omega but for everything Numworks-related.
                    </p>
                    <p className={styles.paragraph}>
                        Finally, about Epsilon, we will continue to advise against its latest Epsilon 16 update. Rest assured, we will keep the Omega installer online, and the binaries still available. We also recommend the excellent connectivity kit from Bernard Parisse available here: <a href="https://www-fourier.univ-grenoble-alpes.fr/~parisse/nws.html">https://www-fourier.univ-grenoble-alpes.fr/~parisse/nws.html</a>
                    </p>
                    <p className={styles.paragraph}>
                        We would like to close by thanking each of you for your interest in Omega. We also thank all the contributors, which you can partly find in Omega’s credits. In particular, a big thank you to Zardam for the external application system, Bernard Parisse for his essential KhiCAS software, Boricj for his RPN application, the entire TI-Planet team for the visibility provided, and Critor for his articles and his experience. more than vital to the project.
                    </p>
                    <p className={styles.paragraph}>
                        See you soon on Omega Community,
                    </p>
                    <p className={styles.paragraph}>
                        Quentin Guidée, Maxime Friess and Joachim Le Fournis.
                    </p>
                </div>
            </div>
        );
    }
}
