
//! eseguo il codice solo quando il documento è completamente caricato 
document.addEventListener("DOMContentLoaded", () => { // Aspetta il caricamento della pagina
    const apiUrl = getApiUrl(); //Ottiene l'URL dell'API

    fetchApiData(apiUrl).then(data => { //Recupera i dati dall'API
        console.log("Data ricevuto dopo fetchApiData:", data);
        const bodyContainer = document.getElementById("body-container");
        const cardsHTML = map_joinCardsHTML(data); //Crea le carte dinamicamente

        bodyContainer.innerHTML = ` 
        <div class="row">
            ${cardsHTML}
        </div>`; // Inserisce le carte nel DOM

        addEventsToCards(data); // Aggiunge eventi di click alle carte
    });
});