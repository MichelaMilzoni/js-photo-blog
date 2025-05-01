// FILE .JS PER GESTIONE DEGLI EVENTI

//! aggiungo effetto rotazione alla card al click
function addClickEventToCard(itemNode, data) {
    itemNode.addEventListener("click", () => {
        const itemId = parseInt(itemNode.getAttribute("data-item-id"));
        const item = data.find(item => item.id === itemId);

        if (item) {
            addFlipAnimation(itemNode, item, data);
        }
    });
}

//! effetto rotazione card che richiamo nella funzione addClickEventToCard
function addFlipAnimation(itemNode, item, data) {
    console.log("Data ricevuto in addFlipAnimation:", data);
    const img = itemNode.querySelector(".card-img img");
    const pin = itemNode.closest(".col-12")?.querySelector(".thumbtack img"); // Trova il pin
    console.log("Elemento itemNode:", itemNode);
    console.log("Elemento thumbtack:", pin);

    if (pin) {  // Controllo aggiunto!
        pin.classList.add("hidden"); // Ora si applica solo se `pin` esiste!
    } else {
        console.warn("Attenzione: pin non trovato!"); // Stampa un messaggio di avviso
    }

    pin.classList.add("hidden"); // Nasconde il pin durante l'animazione
    img.classList.add("flip-animation");

    img.addEventListener("animationend", () => {
        img.classList.remove("flip-animation");
        console.log("Chiamando showOverlay con:", item); // 👀 Debug
        pin.classList.remove("hidden"); // Rendi visibile di nuovo il pin dopo l'animazione
        showOverlay(item, data);
    }, { once: true });
}

//! aggiungo eventi di click a tutte le carte presenti nella pagina
function addEventsToCards(data) {
    const itemsNodes = document.querySelectorAll(".card");
    itemsNodes.forEach(itemNode => addClickEventToCard(itemNode, data));
}