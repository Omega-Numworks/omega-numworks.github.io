import React, { Component } from "react";
import { Downloads } from "../components/downloads/Downloads";
import "./sass/simulator.sass";

export default class Simulator extends Component {
    constructor(props: {}) {
        super(props);

        document.title = "Omega - Simulator";

        this.state = {
            simulator: null,
        };
    }

    render() {
        return (
            <div className="content" style={{ textAlign: "center" }}>
                <div className="simulator">
                    <iframe
                        src="/simulator/run/full"
                        width="600"
                        height="800"
                        scrolling="no"
                        id="simu_frame_2"
                        style={{
                            minWidth: "100%",
                            minHeight: "100%",
                        }}
                        title="Simulator"
                    />
                </div>
                <Downloads />
            </div>
        );
    }
}
