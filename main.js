// Deduzioni dal JSON

//? Struttura chiara: I dati sono organizzati come un array di oggetti.

//? Campi utili:
//* id: Un identificativo univoco per ogni immagine.
//* title: Il titolo che descrive la foto.
//* date: La data associata all'immagine (forse data di scatto o evento).
//* url: L'indirizzo per accedere all'immagine.

// Sfrutta le informazioni per mostrare dinamicamente le immagini con descrizioni in una pagina web.


//! aggiungo "ascolto evento DOMContentLoaded"
document.addEventListener("DOMContentLoaded", () => {
    //* ascolto l'evento DOMContentLoaded che viene attivato quando il DOM (Document Object Model)
    //* è completamente caricato, ma prima che immagini o CSS (RISORSE ESTERNE) siano caricate
    //* GARANTISCE CHE IL CODICE SIA ESEGUITO SOLO DOPO CHE GLI ELEMENTI HTML 
    //* SONO DISPONIBILI E POSSONO ESSERE MANIPOLATI

//! url dell'API
const apiUrl = "https://lanciweb.github.io/demo/api/pictures/";
// definisco la variabile apiUrl che contiene ll'URL dell'APi da cui verranno presi i dati 
// apiUrl centralizza l'URL, se in futuro devo cambiarlo, lo faccio una volta sola

//! effettua chiamata all'API con Axios
axios.get(apiUrl) 
// effettuo una chiamata HTTP get verso l'URL (apiUrl) utilizzando libreria Axios
// Axios recupera i dati dall'API e semplifica la gestione della risposta
    //! gestione della risposta
    .then(response => { 
    // dopo che la richiesta ha avuto successo (then)
    // la risposta viene accettata come argomento (response)
        const data = response.data; //dati ricevuti dall'Api
        //la proprietà response.data contiene i dati ricevuti dall'API
        //* quindi sto estraendo e dati JSON forniti dall'API e li assegno alla variabile data
        const bodyContainer = document.getElementById("body-container")
        // ottengo un riferimento (ID html) nel punto del DOM in cui i nuovi contenuti saranno inseriti
        let cardsHTML= ''; // inizializzo una stringa per raccogliere il contenuto html
    
        data.forEach(item => {
        // per ogni (forEach) elemento (data) dell'API creo una struttura dinamica 
            cardsHTML += generateCards(item);
        });

        //! aggiungo le card al contenitore in un' unica operazione
        bodyContainer.innerHTML = 
        //! creo una row in cui inserire le card
        `
        <div class="row">
            ${cardsHTML}
        </div>
        `;

        //! ottengo i nodi degli elementi card
        const itemsNodes = document.querySelectorAll(".card");

        //! aggiungo evento al click sull'immagine
        itemsNodes.forEach(itemNode => {
            itemNode.addEventListener("click", () => {
                const itemId = parseInt(itemNode.getAttribute("data-item-id")); //recupero l'ID
                const item = data.find(item => item.id === itemId); //Cerco l'oggetto corrispondente 
                
                if (item) {
                    // Aggiungi la classe "flip-animation" per l'effetto sfogliata
                    const img = itemNode.querySelector(".card-img img"); // Seleziono l'immagine specifica
                    img.classList.add("flip-animation");
        
                    // mostro l'overlay dopo che l'animazione è completata
                    img.addEventListener("animationend", () => {
                        img.classList.remove("flip-animation"); //rimuovo l'animazione
                        showOverlay(item); //mostro l'overlay
                    }, {once: true }); //garantisco che l'evento venga eseguito una volta sola
                }
            });
        });
    })
    //! gestione degli errori
    .catch(error => {
        console.error("Errore durante il recupero dei dati:", error);
    });
});

//! funzione per creare le card
const generateCards = (item) => {
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
                <data class="card-data" value="">${item.date}</data>
            </div>
        </div>
    </div>`;
};

//! funzione per mostrare l'overlay - crearlo dinamicamente
const showOverlay = (item) => {
    const overlay = document.createElement("div")
    overlay.className = "overlay";
    overlay.innerHTML = `
        <div class="overlay-content">
            <img src="${item.url}" class="img-fluid" alt="${item.title}">
            <p class="overlay-title">${item.title}</p>
            <button id="close-overlay">X</button>
        </div>`

    //! aggiungo l'overlay al body
    document.body.appendChild(overlay);

    //! aggiungo la classe "show" con un leggero ritardo per animare l'entrata
    setTimeout(() => {
        overlay.classList.add("show");
    }, 100); //ritardo per attivare l'animazione (100ms)

    //! sfoco lo sfondo
    const bodyContainer = document.getElementById("body-container");
    bodyContainer.classList.add("blurred"); //aggiungo sfocatura

    //! chiudo l'overlay al click del bottone
    document.getElementById("close-overlay").addEventListener("click", () => {
        overlay.remove(); //rimuove l'overlay dal DOM
        bodyContainer.classList.remove("blurred"); //rimuovo la sfocatura
    });
};

//TODO In sintesi, questo script:

//TODO 1. Attende che il DOM sia pronto.
//TODO 2. Effettua una chiamata all'API per ottenere i dati.
//TODO 3. Elabora i dati e genera dinamicamente contenuto HTML.
//TODO 4. Inserisce il contenuto nel DOM per mostrarlo nella pagina.
//TODO 5. Gestisce eventuali errori che potrebbero verificarsi nella richiesta.

