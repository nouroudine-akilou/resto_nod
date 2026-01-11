let panier = JSON.parse(localStorage.getItem("panier")) || [];

function sauvegarderPanier() {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function ajouterAuPanier(nom, prix) {
    let plat = panier.find(p => p.nom === nom);

    if (plat) {
        plat.quantite++;
    } else {
        panier.push({ nom, prix, quantite: 1 });
    }

    sauvegarderPanier();
    afficherPanier();
}

function augmenterQuantite(index) {
    panier[index].quantite++;
    sauvegarderPanier();
    afficherPanier();
}

function diminuerQuantite(index) {
    panier[index].quantite--;

    if (panier[index].quantite <= 0) {
        panier.splice(index, 1);
    }

    sauvegarderPanier();
    afficherPanier();
}

function afficherPanier() {
    let liste = document.getElementById("listePanier");
    let total = 0;
    liste.innerHTML = "";

    panier.forEach((item, index) => {
        total += item.prix * item.quantite;

        liste.innerHTML += `
            <li>
                <span>${item.nom}</span>
                <div>
                    <button onclick="diminuerQuantite(${index})">➖</button>
                    <strong>${item.quantite}</strong>
                    <button onclick="augmenterQuantite(${index})">➕</button>
                </div>
                <span>${item.prix * item.quantite} DH</span>
            </li>
        `;
    });

    document.getElementById("total").innerText = total;
}

function validerCommande() {
    if (panier.length === 0) {
        alert("❌ Votre panier est vide !");
        return;
    }

    alert("✅ Commande validée avec succès !");
    panier = [];
    sauvegarderPanier();
    afficherPanier();
}

// Charger le panier au démarrage
afficherPanier();
