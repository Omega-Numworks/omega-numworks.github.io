import React from "react";

import { Firmware } from "../../firmware/firmwares";
import { FormattedMessage } from "react-intl";
import Button from "../button/Button";
import ButtonsGroup from "../button/ButtonsGroup";

import styles from "./sass/ReleaseCard.module.sass";

type DownloadButtonsProps = {
    firmware: Firmware;
};

export default function DownloadButtons(props: DownloadButtonsProps) {
    const { name, available, compatibility } = props.firmware;

    const buttons = [
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/tag/${name}`,
            icon: "code",
            enabled: compatibility.github,
            externalLink: true,
            messageID: "releases.github",
            messageDefault: "GITHUB",
        },
        {
            to: `/install/${props.firmware.name}`,
            icon: "system_update_alt",
            enabled: available && (compatibility.N0110 || compatibility.N0100),
            messageID: "releases.install",
            messageDefault: "INSTALL",
        },
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/download/${name}/simulator.apk`,
            icon: "android",
            enabled: available && compatibility.android,
            messageID: "releases.android",
            messageDefault: "ANDROID",
        },
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/download/${name}/simulator.zip`,
            icon: "web",
            enabled: available && compatibility.web,
            messageID: "releases.web",
            defaultMessage: "WEB",
        },
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/download/${name}/simulator.3dsx`,
            icon: "gamepad",
            enabled: available && compatibility["3ds"],
            messageID: "releases.3ds",
            defaultMessage: "3DS",
        },
    ];

    const buttonsComponents = buttons.map((el, i) => (
        <Button
            key={i}
            to={el.enabled ? el.to : undefined}
            href={el.enabled ? el.href : undefined}
            leftIcon={el.icon}
            isExternalLink={el.externalLink}
            disabled={!el.enabled}
        >
            <FormattedMessage
                id={el.messageID}
                defaultMessage={el.messageDefault}
            />
        </Button>
    ));

    return (
        <ButtonsGroup className={styles.actions}>
            {buttonsComponents}
        </ButtonsGroup>
    );
}
