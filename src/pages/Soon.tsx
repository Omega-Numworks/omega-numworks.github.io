import React from "react";
import { FormattedMessage } from "react-intl";

export default function Soon() {
    return (
        <div
            style={{
                fontFamily: "Fira Sans",
                fontSize: "16px",
                margin: "20px",
            }}
        >
            <FormattedMessage
                id="soon"
                defaultMessage="Will be available soon! 😄"
            />
        </div>
    );
}
