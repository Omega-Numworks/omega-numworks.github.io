import React from "react";

import VercelIcon from "../../img/powered-by-vercel.svg";

import styles from "./sass/Footer.module.sass";

export default function FooterVercel() {
    return (
        <div className={styles.vercel}>
            <a
                href="https://vercel.com/?utm_source=getomega&utm_campaign=oss"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    className={styles.vercelIcon}
                    src={VercelIcon}
                    alt="Vercel"
                />
            </a>
        </div>
    );
}
