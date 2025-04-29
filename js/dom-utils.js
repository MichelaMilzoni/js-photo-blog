// FILE .JS PER LE FUNZIONI LEGATE AL DOM


//? GENERAZIONE CARD

//! funzione per generare la card (HTML)
function generateCardHTML(item) {
    return `
    <div class="col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
        <div class="thumbtack">
            <img src="./img/pin.svg" class="img-fluid" alt="pin">
        </div>
        <div class="card" data-item-id="${item.id}">
            <div class="card-img">
                <img src="${item.url}" class="card-img-top p-3 img-fluid" alt="...">
            </div>
            <div class="card-body">
                <p class="card-text card-title">${item.title}</p>
                <data class="card-data">${item.date}</data>
            </div>
        </div>
    </div>`;
}

//* ${item.id} - ${item.url} - ${item.title} -${item.date} sono i dati restituiti dall'API per ogni oggetto

//! funzione per mappare (map) e unire (join)
function map_joinCardsHTML(data) { // data: parametro (array di dati)
    return data.map(generateCardHTML).join('');
    // map: scorre l'array di dati e crea un nuovo array di stringhe 
    //      applicando a ogni elemento la funzione generateCardHTML
    // join: unisce tutto in un unica stringa
}

//! funzione per creare l'HTML dell'overlay (sovrapposizione visiva al click sulla card)
function createOverlayHTML(item) { // item: paramentro (oggetto che contiene proprietà)
    return `
    <div class="overlay-content">
        <img src="${item.url}" class="img-fluid" alt="${item.title}">
        <p class="overlay-title">${item.title}</p>
        <button id="close-overlay">X</button>
    </div>`;
}
//* ${item.url} - ${item.title} proprietà contenute nell'oggetto 


//! OVERLAY - visualizzare un overlay dinamico (sovrapposizione visiva) su una pagina web
function showOverlay(item) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = createOverlayHTML(item);

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add("show"), 100);

    blurBackground();
    addCloseEventToOverlay(overlay);
}

function blurBackground() {
    const bodyContainer = document.getElementById("body-container");
    bodyContainer.classList.add("blurred");
}

function addCloseEventToOverlay(overlay) {
    const closeButton = overlay.querySelector("#close-overlay");
    closeButton.addEventListener("click", () => {
        overlay.remove();
        const bodyContainer = document.getElementById("body-container");
        bodyContainer.classList.remove("blurred");
    });
}