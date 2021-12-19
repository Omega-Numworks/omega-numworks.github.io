import { Releases } from "./firmwares";

export const epsilon: Releases = {
    latest: "E15",
    firmwares: [
        {
            name: "E15",
            commit: "2883f0c599e525ac70af2994abfd426bc3d60e49",
            changelog: [
            ],
            compatibility: {
                N0110: true,
                N0100: true,
                web: false,
                android: false,
                "3ds": false,
            },
            available: true,
            setname: false,
        },
    ],
};
