import React, { Component } from 'react'
import ReleaseCard from '../components/releasecard/ReleaseCard'
import { Button, ButtonsGroup } from '@quentinguidee/react-jade-ui'
import { FormattedMessage } from 'react-intl'

export default class Beta extends Component {
    render() {
        return (
            <div className="content">
                <div className="releases__banner">
                    <div className="releases__banner__title">Omega 1.21</div>
                    <div className="releases__banner__description">
						<FormattedMessage defaultMessage="Welcome to the Omega beta program." id="beta.welcome" />
					</div>
                    <ButtonsGroup style={{ display: "inline-block" }}>
                        <Button href="mailto:getomega.pro@gmail.com" leftIcon="mail"><FormattedMessage defaultMessage="REPORT A BUG BY MAIL" id="beta.report.mail"/></Button>
                        <Button href="https://discord.gg/X2TWhh9" leftIcon="web"><FormattedMessage defaultMessage="REPORT A BUG ON DISCORD" id="beta.report.discord"/></Button>
                    </ButtonsGroup>
                </div>
                <div style={ { height: "16px" } }></div>
                <div className="releases__cards">
                    <div className="releases__warning"><FormattedMessage defaultMessage="Please note: Betas do not have Omega exam mode." id="beta.report.exammode"/></div>
                    <ReleaseCard version={releases.firmwares[0]} name="Beta 1" />
                </div>
                <div style={ { height: "16px" } }></div>
            </div>
        )
    }
}

const releases = {
	"latest": "O1.21.β1-E14",
	"firmwares": [{
	    "name": "O1.21.β1-E14",
	    "commit": "0235de80101785c6dedf0b7f4651584cfd56cbad",
	    "changelog": [
			"Update: Updated to Epsilon 14.4.1!",
			"New: Added 67 constants",
			"New: New units",
			"New: 3DS Simulator",
			"New: External apps are now displayed on the home screen",
			"New: Python: open function (and derivatives)",
			"New: Physics constants are now using the Epsilon units",
			"New: Added message when the compilation starts",
			"New: Undef is hidden during symbolic calculation",
			"New: Display the scripts size",
			"New: Community themes: Download a community theme with THEME_REPO=git-url and THEME_NAME=theme_name.",
			"New: Shift + Home is now a shortcut to go to calculation (or the first app)",
			"New: Support for RGB files without alpha channel.",
			"New: Add root and log settings",
			"New: \\ shortcut (with ALPHA+x10^x)",
			"New: @ shortcut (with ALPHA+ANS)",
			"New: µ shortcut (with SHIFT+7)",
			"New: Ω shortcut (with SHIFT+9)",
			"New: Docker!",
			"New: Web simulator background",
			"Change: Simulators are renamed (Epsilon -> Omega)",
			"Fix: ALPHA lock+arrow",
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}]
}
