const newOffreCustomer = {
    newOffreCustomer: {
        name: "newOffreCustomer",
        label: "Déja client nouvelle offre",
        options: [
            { label: "MPOS", value: "mpos", next: "mpos" },
            { label: "SOFTPOS", value: "softpos", next: "softpos" },
            { label: "COUPLE", value: "couple", next: "couple" }
        ]
    },
    mpos: {
        name: "mpos",
        label: "Quel est le nom de l'offre ?",
        type: "checkbox",
        options: [
            { label: "Option 1", value: "option1", next: "fin" },
            { label: "Option 2", value: "option2", next: "fin" },
            { label: "Option 3", value: "option3", next: "fin" }
        ],
        result: (values) => {
            if (!values || !values.mpos || values.mpos.length === 0) {
                return "Aucune option n'a été cochée pour MPOS.";
            }
            const checked = values.mpos;
            if (
                checked.includes("option1") &&
                checked.includes("option2") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi toutes les options pour MPOS.";
            }
            if (
                checked.includes("option1") &&
                checked.includes("option2")
            ) {
                return "Vous avez choisi l'Option 1 et l'Option 2 pour MPOS.";
            }
            if (
                checked.includes("option1") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi l'Option 1 et l'Option 3 pour MPOS.";
            }
            if (
                checked.includes("option2") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi l'Option 2 et l'Option 3 pour MPOS.";
            }
            if (checked.includes("option1")) {
                return "Vous avez choisi l'Option 1 pour MPOS.";
            }
            if (checked.includes("option2")) {
                return "Vous avez choisi l'Option 2 pour MPOS.";
            }
            if (checked.includes("option3")) {
                return "Vous avez choisi l'Option 3 pour MPOS.";
            }
            return null;
        }
    },
    softpos: {
        name: "softpos",
        label: "Quel est le nom de l'offre ?",
        type: "checkbox",
        options: [
            { label: "Option 1", value: "option1", next: "fin" },
            { label: "Option 2", value: "option2", next: "fin" },
            { label: "Option 3", value: "option3", next: "fin" }
        ],
        result: (values) => {
            if (!values || !values.softpos || values.softpos.length === 0) {
                return "Aucune option n'a été cochée pour SOFTPOS.";
            }
            const checked = values.softpos;
            if (
                checked.includes("option1") &&
                checked.includes("option2") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi toutes les options pour SOFTPOS.";
            }
            if (
                checked.includes("option1") &&
                checked.includes("option2")
            ) {
                return "Vous avez choisi l'Option 1 et l'Option 2 pour SOFTPOS.";
            }
            if (
                checked.includes("option1") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi l'Option 1 et l'Option 3 pour SOFTPOS.";
            }
            if (
                checked.includes("option2") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi l'Option 2 et l'Option 3 pour SOFTPOS.";
            }
            if (checked.includes("option1")) {
                return "Vous avez choisi l'Option 1 pour SOFTPOS.";
            }
            if (checked.includes("option2")) {
                return "Vous avez choisi l'Option 2 pour SOFTPOS.";
            }
            if (checked.includes("option3")) {
                return "Vous avez choisi l'Option 3 pour SOFTPOS.";
            }
            return null;
        }
    },
    couple: {
        name: "couple",
        label: "Quel est le nom de l'offre ?",
        type: "checkbox",
        options: [
            { label: "Option 1", value: "option1", next: "fin" },
            { label: "Option 2", value: "option2", next: "fin" },
            { label: "Option 3", value: "option3", next: "fin" }
        ],
        result: (values) => {
            if (!values || !values.couple || values.couple.length === 0) {
                return "Aucune option n'a été cochée pour COUPLE.";
            }
            const checked = values.couple;
            if (
                checked.includes("option1") &&
                checked.includes("option2") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi toutes les options pour COUPLE.";
            }
            if (
                checked.includes("option1") &&
                checked.includes("option2")
            ) {
                return "Vous avez choisi l'Option 1 et l'Option 2 pour COUPLE.";
            }
            if (
                checked.includes("option1") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi l'Option 1 et l'Option 3 pour COUPLE.";
            }
            if (
                checked.includes("option2") &&
                checked.includes("option3")
            ) {
                return "Vous avez choisi l'Option 2 et l'Option 3 pour COUPLE.";
            }
            if (checked.includes("option1")) {
                return "Vous avez choisi l'Option 1 pour COUPLE.";
            }
            if (checked.includes("option2")) {
                return "Vous avez choisi l'Option 2 pour COUPLE.";
            }
            if (checked.includes("option3")) {
                return "Vous avez choisi l'Option 3 pour COUPLE.";
            }
            return null;
        }
    },
};

export default newOffreCustomer;