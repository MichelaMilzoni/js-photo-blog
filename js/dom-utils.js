// FILE .JS PER LE FUNZIONI LEGATE AL DOM


//? GENERAZIONE CARD

//! funzione per generare la card (HTML)
function generateCardHTML(item) { // paramentro in entrata ITEM
    // la funzione ritorna l'HTML della card
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
        <button id="overlay-button-right"> 
            <i class="fa-regular fa-circle-right" style="color: #000000;"></i>
        </button>
        <button id="overlay-button-left" > 
            <i class="fa-regular fa-circle-left" style="color: #000000;"></i>
        </button>
    </div>`;
}
//* ${item.url} - ${item.title} proprietà contenute nell'oggetto 


//! OVERLAY - visualizzare un overlay dinamico (sovrapposizione visiva) su una pagina web
function showOverlay(item, data) {
    if (!data) { // Controllo che data non sia undefined
        console.error("Errore: data è undefined!");
        return; // Blocca l'esecuzione se data non è valido
    }
    
    console.log("Data ricevuto in showOverlay:", data);
    currentIndex = data.findIndex(el => el.id === item.id); 
    // cerca nel parametro data (findIndex) l'id dell'elemento e lo assegna a current Index
    console.log("Indice attuale:", currentIndex);

    const overlay = document.createElement("div"); // creo il DIV per l'overlay 
    overlay.className = "overlay"; // assegno al DIV la classe "overlay"
    overlay.innerHTML = createOverlayHTML(item); // aggiungo il return ITEM dalla funzione createOverlayHTML alla costante overlay

    document.body.appendChild(overlay); // inserisco nel body HTML la variabile overlay creata 
    setTimeout(() => overlay.classList.add("show"), 100); // dopo 100 millisecondi aggiunge la classe "show" (display flex opacity 1)

    blurBackground(); // Aggiungi l' evento sfocatura
    addCloseEventToOverlay(overlay); // Aggiungi gli eventi di chiusura overlay (tasto x)
    addNavigationEvents(overlay, data); // Aggiungi gli eventi per navigare con le frecce
}

//! sfoco lo sfondo  
function blurBackground() { 
    const bodyContainer = document.getElementById("body-container"); // assegno alla variabile bodyContainer l'ID HTML "body-container"
    bodyContainer.classList.add("blurred"); // aggiungo la classe "blurred" x sfocare lo sfondo quando l'overlay viene attivato
}

//! aggiungo evento di chiusura overlay (tasto X) 
function addCloseEventToOverlay(overlay) { //paramentro overlay (creato nella funzione showOverlay)
    const closeButton = overlay.querySelector("#close-overlay"); // richiamo la classe "#close-overlay" e la assegno alla variabile closeButton
    closeButton.addEventListener("click", () => { //aggiungo evento al click del closeButton
        overlay.remove(); // rimuovo l'overlay
        const bodyContainer = document.getElementById("body-container"); // richiamo body-container tramite il suo ID HTML
        bodyContainer.classList.remove("blurred"); // rimuovo la classe blurred dal bodyContainer
    });
}

//? scorrimento foto con frecce destra/sinistra 

let currentIndex = 0; // creo variabile per raggiungere l'INDEX delle card

//! aggiunge il comportamento ai pulsanti, permettendo la navigazione tra le immagini 
function addNavigationEvents(overlay, data) { //parametro overlay (creato nella funzione showOverlay - dom-utils.js), 
                                              //paramentro data ( creato nella funzione addEventListener - main js) 
    const btnRight = overlay.querySelector("#overlay-button-right"); // richiamo overlay-button-right tramite la classe
    const btnLeft = overlay.querySelector("#overlay-button-left"); // richiamo overlay-button-left tramite la classe

    btnRight.addEventListener("click", () => navigateOverlay(1, overlay, data));  // Vai avanti 
        // aggiungo evento click richiamando la funzione navigateOverlay che lo gestisce
    btnLeft.addEventListener("click", () => navigateOverlay(-1, overlay, data)); // Vai indietro
        // aggiungo evento click  richiamando la funzione navigateOverlay che lo gestisce
}

//! aggiorna l'overlay con la nuova immagine, 
function navigateOverlay(direction, overlay, data) {
    // paramentro direction assume valore 1 se viene cliccata la freccia destra e -1 per quella sinistra 
    //                      (creato nella funzione addNavigationEvents - dom-utils.js))
    // paramentro overlay (creato nella funzione showOverlay - dom-utils.js)
    // parametro data ( creato nella funzione addEventListener - main js)
    currentIndex += direction; // Aggiorna l'indice
    console.log("Indice aggiornato:", currentIndex);

    // Assicurati che non superi i limiti dell'array
    if (currentIndex < 0) { // se currentIndex < 0
        currentIndex = data.length - 1; // Vai all'ultima foto
    } else if (currentIndex >= data.length) { // altrimenti 
        currentIndex = 0; // Torna alla prima foto
    }

    const newItem = data[currentIndex]; // Prendo il nuovo elemento e lo assegno alla variabile newItem
    console.log("Nuovo item visualizzato:", newItem);

    // Aggiorna l'overlay con la nuova immagine
    overlay.innerHTML = createOverlayHTML(newItem); // aggiungo all'overlay (creato nella funzione showOverlay - dom-utils.js)
                                                    // il nuovo elemento
    
    addCloseEventToOverlay(overlay); // Riaggiungi evento chiusura
    addNavigationEvents(overlay, data); // Riaggiungi eventi di navigazione
}