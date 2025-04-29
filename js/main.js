document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = getApiUrl();

    fetchApiData(apiUrl).then(data => {
        const bodyContainer = document.getElementById("body-container");
        const cardsHTML = map_joinCardsHTML(data);

        bodyContainer.innerHTML = `
        <div class="row">
            ${cardsHTML}
        </div>`;

        addEventsToCards(data);
    });
});