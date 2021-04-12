import React, { Component } from "react";
import ReleaseCard from "../components/releasecard/ReleaseCard";
import Button from "../components/button/Button";
import ButtonsGroup from "../components/button/ButtonsGroup";
import { FormattedMessage } from "react-intl";
import { betas } from "../firmware/betas";

import styles from "./sass/Releases.module.sass";

type BetaState = {
    input: string;
    fieldCompleted: boolean;
};

export default class Beta extends Component<{}, BetaState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            input: "",
            fieldCompleted: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e: any) {
        const value = e.target.value;
        this.setState({ input: value });
        if (
            value.toLowerCase() ===
                "je suis d'accord et ne me rendrai jamais en examen avec une beta" ||
            value.toLowerCase() ===
                "je suis d'accord et ne me rendrai jamais en examen avec une bêta" ||
            value.toLowerCase() ===
                "i agree and will never go to exam with a beta"
        ) {
            this.setState({ fieldCompleted: true });
        } else {
            this.setState({ fieldCompleted: false });
        }
    }

    render() {
        return (
            <div className="content">
                <div className={styles.banner}>
                    <div className={styles.title}>Omega 1.21</div>
                    <div className={styles.description}>
                        <FormattedMessage
                            defaultMessage="Welcome to the Omega beta program."
                            id="beta.welcome"
                        />
                    </div>
                    <ButtonsGroup style={{ display: "inline-block" }}>
                        <Button
                            href="https://github.com/Omega-Numworks/Omega/issues/new?assignees=&labels=Status%3A+Triage%2C+Type%3A+Bug&template=omega-beta-only---bug-report.md&title=%5BBETA-1.21%5D+…"
                            leftIcon="web"
                        >
                            <FormattedMessage
                                defaultMessage="REPORT A BUG ON GITHUB"
                                id="beta.report.github"
                            />
                        </Button>
                        <Button
                            href="mailto:getomega.pro@gmail.com"
                            leftIcon="mail"
                        >
                            <FormattedMessage
                                defaultMessage="REPORT A BUG BY MAIL"
                                id="beta.report.mail"
                            />
                        </Button>
                    </ButtonsGroup>
                </div>
                <div style={{ height: "16px" }}></div>
                <div className={styles.cards}>
                    <div className={styles.warning}>
                        <FormattedMessage
                            defaultMessage="Warning: Omega betas are NOT made for exam and do not have Omega exam mode. By going with for exams, you put yourself in danger and risk several years of prohibition of exams. May be even more serious depending on the applicable legislation in your country. By installing an Omega beta, you agree that neither NumWorks nor Omega can be held responsible for any issues with exam mode. If you agree to this, type this sentence in the following field: I agree and will never go to exam with a beta"
                            id="beta.report.exammode"
                        />
                    </div>
                    <input
                        className={styles.warningField}
                        type="text"
                        value={this.state.input}
                        onChange={this.onChange}
                    ></input>
                    <ReleaseCard
                        version={betas.firmwares[0]}
                        name="Beta 1"
                        hidden={!this.state.fieldCompleted}
                    />
                </div>
                <div style={{ height: "16px" }}></div>
            </div>
        );
    }
}
