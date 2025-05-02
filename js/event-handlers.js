// FILE .JS PER GESTIONE DEGLI EVENTI

//! aggiungo effetto rotazione alla card al click
function addClickEventToCard(itemNode, data) { 
    // parametro itemNode (preso dalla funzione addEventsToCards - event-handlers.js)
    // parametro data (creato nella funzione addEventListener - main js)
    itemNode.addEventListener("click", () => { //quando ascolto il click 
        const itemId = parseInt(itemNode.getAttribute("data-item-id")); // itemNode richiama l'elemento data-item-id e lo assegna a itemId  
        const item = data.find(item => item.id === itemId); // all'interno dell'array data cerca cerca l'ID dell'item aperto, 
                                                            // se corrisponde lo assegna alla variabile item

        if (item) { // se  item.id === itemId 
            addFlipAnimation(itemNode, item, data); // richiama la funzione addFlipAnimation (vedi sotto) e assegna i parametri
        }
    });
}

//! effetto rotazione card che richiamo nella funzione addClickEventToCard
function addFlipAnimation(itemNode, item, data) { // parametri (presi dalla funzione addClickEventToCard - vedi sopra)
    console.log("Data ricevuto in addFlipAnimation:", data);
    const img = itemNode.querySelector(".card-img img"); // assegno a img l'elemento DOM con classe .card-img img
    const pin = itemNode.closest(".col-12")?.querySelector(".thumbtack img"); // Trova il pin
        //* closest viene utilizzato per trovare l'elemento più vicino nella gerarchia del DOM 
        //* che corrisponde a un selettore specifico.
    console.log("Elemento itemNode:", itemNode);
    console.log("Elemento thumbtack:", pin);

    if (pin) {  // Controllo se pin non è null o undefined, ovvero se l'elemento con classe .thumbtack img esiste nel DOM.
        pin.classList.add("hidden"); // se vero (=esiste nel DOM) applico la classe HIDDEN
    } else { // altrimenti se pin è null o undefined
        console.warn("Attenzione: pin non trovato!"); // Stampo un messaggio di avviso
    }

    pin.classList.add("hidden"); // aggiungo la classe HIDDEN quindi nascondo il pin durante l'animazione
    img.classList.add("flip-animation"); // aggiungo la classe flip-animation

    img.addEventListener("animationend", () => { // ascolto l'evento animationend che sia attiva quando l'animazione CSS termina
        img.classList.remove("flip-animation"); // rimuovo la classe flip-animation
        console.log("Chiamando showOverlay con:", item); 
        pin.classList.remove("hidden"); // Rendi visibile di nuovo il pin dopo l'animazione
        showOverlay(item, data); // richiamo la funzione showOverlay (dom-utils.js)
    }, { once: true }); // la funzione viene eseguita una sola volta
}

//! aggiungo eventi di click a tutte le carte presenti nella pagina
function addEventsToCards(data) { // parametro data (creato nella funzione addEventListener - main js)
    const itemsNodes = document.querySelectorAll(".card"); // assegno gli elementi con classe .card alla NodeList itemsNodes
    itemsNodes.forEach(itemNode => addClickEventToCard(itemNode, data)); 
        // Per ogni itemNode (cioè ogni card), chiama la funzione addClickEventToCard, passando:
        //              L'elemento HTML corrente (itemNode).
        //              Il dataset data, per gestire i dati associati alla card.
}