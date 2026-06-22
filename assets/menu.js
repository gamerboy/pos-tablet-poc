/* ============================================================
   Mega-menu aggregati POS — Applicazioni e Attività
   Cluster proposti (da verificare con Giulia).
   Le voci di menu con [data-mega] aprono il pannello relativo.
   ============================================================ */
const MEGA = {
  "Applicazioni": [
    { cat: "Vendita e marketing", links: ["Vendibilità offerte", "Win Canvas", "Capolavori IPx", "Let's Social"] },
    { cat: "Device e logistica", links: ["Packing List", "RetailPlus – device dal Cambio"] },
    { cat: "Pagamenti e amministrazione", links: ["PagoDealer", "Visure Camerali", "Connettività Luce e Gas"] },
    { cat: "Portali e supporto", links: ["Dealer Service Portal", "Eureka", "Moduli online comunicazioni", "WINDTRE ID Link", "COMAL", "Rkon", "IPID", "C5 Hub"] }
  ],
  "Attività": [
    { cat: "Verifiche e MNP", links: ["Esiti Verifiche Cliente", "Verifica auto MNP", "Esiti Richiesta MNP", "Esiti Verifiche Prefinanziamento", "Verifica stato ordini Fisso"] },
    { cat: "Migrazioni e pratiche", links: ["Inserimento Codici di Migrazione", "Ricerca Pratiche", "Recupero Pratiche", "Cessazioni"] },
    { cat: "Documenti e credito", links: ["Recupero Documenti Firmati", "Gestione Contratti Documentale", "Gestione Moduli Cessione del Credito", "Consegna Schede Offerta"] },
    { cat: "Ricariche e incassi", links: ["Dettaglio Connessione Ricariche", "Storno ultima ricarica", "Pagamenti Canone Deposito", "Riuso GdP con PayByLink", "Prescritica DTR & Pagamenti Rateizzati"] },
    { cat: "Magazzino e report", links: ["Report Magazzino", "Report Volumi", "Esporta Venduto", "Gestione Prenotazioni MGB"] }
  ]
};

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  if (!header) return;

  // overlay click-catcher per chiudere
  const overlay = document.createElement("div");
  overlay.className = "mega-overlay";
  header.appendChild(overlay);

  // un pannello per ciascun menu
  const panels = {};
  Object.keys(MEGA).forEach(function (key) {
    const panel = document.createElement("div");
    panel.className = "megamenu";
    let html = '<div class="mm-title">' + key + '</div><div class="megacols">';
    const cols = MEGA[key];
    cols.forEach(function (c) {
      html += '<div class="megacol"><h4>' + c.cat + "</h4>";
      c.links.forEach(function (l) { html += "<a>" + l + "</a>"; });
      html += "</div>";
    });
    html += "</div>";
    panel.innerHTML = html;
    panel.querySelector(".megacols").style.gridTemplateColumns = "repeat(" + cols.length + ",1fr)";
    header.appendChild(panel);
    panels[key] = panel;
  });

  const triggers = document.querySelectorAll(".navmenu a[data-mega]");
  let current = null;

  function close() {
    Object.values(panels).forEach(function (p) { p.classList.remove("open"); });
    triggers.forEach(function (t) { t.classList.remove("mega-active"); });
    overlay.classList.remove("open");
    current = null;
  }

  triggers.forEach(function (t) {
    t.addEventListener("click", function (e) {
      e.preventDefault();
      const key = t.getAttribute("data-mega");
      if (current === key) { close(); return; }
      close();
      panels[key].classList.add("open");
      t.classList.add("mega-active");
      overlay.classList.add("open");
      current = key;
    });
  });

  overlay.addEventListener("click", close);
});
