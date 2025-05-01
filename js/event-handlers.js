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
    img.classList.add("flip-animation");

    img.addEventListener("animationend", () => {
        img.classList.remove("flip-animation");
        showOverlay(item, data);
    }, { once: true });
}

//! aggiungo eventi di click a tutte le carte presenti nella pagina
function addEventsToCards(data) {
    const itemsNodes = document.querySelectorAll(".card");
    itemsNodes.forEach(itemNode => addClickEventToCard(itemNode, data));
}