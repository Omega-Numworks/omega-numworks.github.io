import { Releases } from "./firmwares";

export const betas: Releases = {
    latest: "O1.21.β1-E15",
    firmwares: [
        {
            name: "O1.21.β1-E15",
            commit: "76db361cdeb2997a4aa0af41378d420265cde372",
            changelog: [
                "Update: Updated to Epsilon 15.3.1!",
                "New: Real-time clock in the toolbar",
                "Change: Chrome Popup: change URL from workshop.numworks.com to getomega.dev",
                "Change: Doxygen with an Omega theme",
                "Change: Merge omega-themes submodule in the main repository",
                "Fix: Better Spanish translations",
                "Fix: Fixed append implementation",
            ],
            compatibility: {
                N0110: true,
                N0100: true,
                web: true,
                android: false,
                "3ds": false,
            },
            available: true,
            setname: false,
            languages: {
                "0100": ["en", "fr"],
            },
        },
    ],
};
