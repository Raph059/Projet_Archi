let boissonChoisie = null;
let prixBase = 0;

// 1. Sélection visuelle des boissons
document.querySelectorAll('.btn-boisson').forEach(bouton => {
    bouton.addEventListener('click', () => {
        document.querySelectorAll('.btn-boisson').forEach(b => b.classList.remove('selectionne'));
        bouton.classList.add('selectionne');
        boissonChoisie = bouton.dataset.nom;
        prixBase = parseFloat(bouton.dataset.prix);
        mettreAJourAffichagePrix();
    });
});

// 2. Recalcul du prix quand on coche/décoche une option
document.querySelectorAll('.option-sup').forEach(checkbox => {
    checkbox.addEventListener('change', mettreAJourAffichagePrix);
});

function mettreAJourAffichagePrix() {
    if (!boissonChoisie) return;
    let total = prixBase;
    document.querySelectorAll('.option-sup:checked').forEach(opt => {
        total += parseFloat(opt.dataset.prix);
    });
    total = Math.max(0, total); // Évite un prix négatif
    document.getElementById('msg-ecran').textContent = 
        `Sélection : ${boissonChoisie} (${total.toFixed(2)} €)`;
}

// 3. Mode Veille Écoconception (après 15 secondes sans clic)
let timerVeille;
function reveillerMachine() {
    document.body.classList.remove('veille');
    document.getElementById('badge-eco').textContent = 'Mode : Actif (120 W)';
    clearTimeout(timerVeille);
    timerVeille = setTimeout(() => {
        document.body.classList.add('veille');
        document.getElementById('badge-eco').textContent = 'Mode : Veille Éco (5 W)';
    }, 15000);
}

document.addEventListener('click', reveillerMachine);
reveillerMachine();