// FILE .JS PER GESTIONE DEGLI EVENTI

function addClickEventToCard(itemNode, data) {
    itemNode.addEventListener("click", () => {
        const itemId = parseInt(itemNode.getAttribute("data-item-id"));
        const item = data.find(item => item.id === itemId);

        if (item) {
            addFlipAnimation(itemNode, item);
        }
    });
}

function addFlipAnimation(itemNode, item) {
    const img = itemNode.querySelector(".card-img img");
    img.classList.add("flip-animation");

    img.addEventListener("animationend", () => {
        img.classList.remove("flip-animation");
        showOverlay(item);
    }, { once: true });
}

function addEventsToCards(data) {
    const itemsNodes = document.querySelectorAll(".card");
    itemsNodes.forEach(itemNode => addClickEventToCard(itemNode, data));
}