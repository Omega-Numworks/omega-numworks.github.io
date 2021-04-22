export interface App {
    name: string;
    description: {
        en: string;
        fr: string;
    };
}

export const apps: App[] = [
    {
        name: "KhiCAS",
        description: {
            en: "Computer algebra system",
            fr: "Système de calcul formel",
        },
    },
    {
        name: "Periodic",
        description: {
            en: "Periodic table of elements",
            fr: "Tableau périodique des éléments",
        },
    },
    {
        name: "Nofrendo",
        description: {
            en: "NES emulator",
            fr: "Émulateur NES",
        },
    },
    {
        name: "Peanut-GB",
        description: {
            en: "GameBoy emulator",
            fr: "Émulateur GameBoy",
        },
    },
    {
        name: "HexEdit",
        description: {
            en: "Hexadecimal editor",
            fr: "Éditeur hexadécimal",
        },
    },
    {
        name: "BadApple",
        description: {
            en: "Bad Apple demo",
            fr: "Démo Bad Apple",
        },
    },
];
