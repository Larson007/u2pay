const newCustomer = {

    newCustomer: {
        name: "Type de contrat",
        label: "S'agit il d'un contrat USAGE ou ABONNEMENT ?",
        options: [
            { label: "USAGE", value: "usage", next: "usage" },
            { label: "ABONNEMENT", value: "abonnement", next: "abonnement" }
        ]
    },
    // NOUVEAU CLIENT - USAGE
    usage: {
        name: "Type de contrat",
        label: "Quel case est coché ?",
        options: [
            { label: "MPOS", value: "mposUsage", next: "mposUsage" },
            { label: "COUPLE", value: "coupleUsage", next: "coupleUsage" },
            { label: "SOFTPOS", value: "softposUsage", next: "softposUsage" }
        ]
    },
    // NOUVEAU CLIENT - ABONNEMENT
    abonnement: {
        name: "Type de contrat",
        label: "Quel case est coché ?",
        options: [
            { label: "MPOS", value: "mposAbo", next: "mposAbo" },
            { label: "COUPLE", value: "coupleAbo", next: "coupleAbo" },
            { label: "SOFTPOS", value: "softposAbo", next: "softposAbo" }
        ]
    },
};

export default newCustomer;
