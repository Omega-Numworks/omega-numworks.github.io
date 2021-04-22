import React, { useState } from "react";

import { App, apps } from "../apps/apps";

import AppCard from "../components/apps/AppCard";
import Button from "../components/button/Button";
import Title from "../components/title/Title";
import Installer from "../dfu/installer";

import styles from "./sass/Apps.module.sass";

type Step = "selection" | "detect" | "installation";

export default function Apps() {
    const [step, setStep] = useState<Step>("selection");
    const [selection, setSelection] = useState<App[]>([]);
    const [model, setModel] = useState<string>();
    const [progress, setPropress] = useState(0);

    const installer = new Installer();

    const select = (app: App, selected: boolean) => {
        if (selected) {
            setSelection([...selection, app]);
        } else {
            setSelection(selection.filter((value) => value.name !== app.name));
        }
    };

    const goToInstallation = () => {
        if (!model) {
            setStep("detect");
        } else {
            setStep("installation");
        }
    };

    const install = () => {
        // INSTALLATION CODE GOES HERE
        // setProgress(0 -> 100)
    };

    const detect = () => installer.detect();

    const cards = apps.map((app, i) => {
        return <AppCard app={app} onClick={select} />;
    });

    let content;
    if (step === "selection") {
        content = (
            <React.Fragment>
                <div className={styles.apps}>{cards}</div>
                <div className={styles.buttonContainer}>
                    <Button
                        disabled={selection.length === 0}
                        onClick={goToInstallation}
                        blue
                    >
                        SUIVANT
                    </Button>
                </div>
            </React.Fragment>
        );
    } else if (step === "detect") {
        content = (
            <React.Fragment>
                The installer will install {selection.length} apps.
                <div className={styles.installer}>
                    Plug your calculator first
                    <Button onClick={detect} blue>
                        DETECT
                    </Button>
                </div>
            </React.Fragment>
        );
    } else {
        content = (
            <React.Fragment>
                <div className={styles.installer}>
                    <Button onClick={install} blue>
                        INSTALL
                    </Button>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div className="content">
            <Title>Applications</Title>
            {content}
        </div>
    );
}
