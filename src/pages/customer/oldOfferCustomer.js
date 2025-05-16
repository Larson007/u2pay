const oldOfferCustomer = {
    oldOfferCustomer: {
        name: "oldOfferCustomer",
        label: "Cas",
        options: [
            { label: "Remplacement", value: "remplacement", next: "remplacement" },
            { label: "Changement d'offre", value: "changeOffre", next: "changeOffre" },
            { label: "Ajout de materiel", value: "addTpe", next: "addTpe" },
        ],
    },

    // DEJA CLIENT - REMPLACEMENT
    remplacement: {
        name: "remplacement",
        label: "Quel est le nom de l'offre ?",
        type: "text",
        options: [],
    },
    // DEJA CLIENT - CHANGEMENT D'OFFRE
    changeOffre: {
        name: "changeOffre",
        label: "Quel est le nom de l'offre ?",
        type: "text",
        options: [],
    },
    // DEJA CLIENT - AJOUT DE MATERIEL
    addTpe: {
        name: "addTpe",
        label: "Quel est le nom de l'offre ?",
        type: "text",
        options: [],
    },
};

export default oldOfferCustomer;