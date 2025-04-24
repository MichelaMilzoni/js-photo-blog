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
    
        //! creo la riga per la card 
        const row = document.createElement("div");
        row.className = "row"; // classe Bootstrap row

        data.forEach(item => {
        // per ogni (forEach) elemento (data) dell'API creo una struttura dinamica 

            //! creo una colonna
            const col = document.createElement("col");
            col.className = "col d-flex align-items-center justify-content-center"; // 3 colonne per riga con Bootstrap

            //! struttura card
            col.innerHTML = `
                <div class="thumbtack"></div>
                <div class="card">
                    <div class="card-img">
                        <img src="${item.url}" class="card-img-top p-3" alt="...">
                    </div>
                    <div class="card-body">
                        <p class="card-text card-title">${item.title}</p>
                        <data class="card-data" value="">${item.date}</data>
                    </div>
                </div>
            `;

            //! aggiungo la colonna alla riga
            row.appendChild(col);
        });

        //! aggiungo la riga al contenitore - AGGIUNTA DEL CONTENUTO AL DOM
        bodyContainer.appendChild(row);
        // inserisce il codice HTML generato (cardHtml) nel contenitore (bodyContainer)
        // += aggiunge il nuovo contenuto senza sovrascrivere quello esistente
    })

    //! gestione degli errori
    .catch(error => {
        console.error("Errore durante il recupero dei dati", error);
    });
    // gestisce gli errori che potrebbere verificarsi durante la richiesta HTTP
});


//TODO In sintesi, questo script:

//TODO 1. Attende che il DOM sia pronto.
//TODO 2. Effettua una chiamata all'API per ottenere i dati.
//TODO 3. Elabora i dati e genera dinamicamente contenuto HTML.
//TODO 4. Inserisce il contenuto nel DOM per mostrarlo nella pagina.
//TODO 5. Gestisce eventuali errori che potrebbero verificarsi nella richiesta.

