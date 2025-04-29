// FILE .JS PER LE CHIAMATE API


// ! funzione per richiamare API 
function getApiUrl() {
    return "https://lanciweb.github.io/demo/api/pictures/";
}


// ! funzione che richiama libreria Axios (permette di fare richieste HTTP) 
function fetchApiData(apiUrl) { //apiUrl paramentro di ingresso 
    return axios.get(apiUrl) //invio richiesta all'HTTP tramite Axios
        //dopo che la richiesta viene eseguita con successo 
        .then(response => response.data) // gestisco la risposta con THEN che restituisce i dati contenuti nell'API
        .catch(error => handleFetchError(error)); // richiamo la funzione che gestisce gli errori
}

// ! funzione per gestire gli errori
function handleFetchError(error) {
    console.error("Errore durante il recupero dei dati:", error);
    return []; // Restituisce un array vuoto per gestire il caso di errore
}

