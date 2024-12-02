document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const resultsTitle = searchResults.querySelector('.results-title');
    const resultsList = searchResults.querySelector('.results-list');
    const cards = document.querySelectorAll('.card');

    function getTitleFromCard(card) {
        const titleElement = card.querySelector('.card__title');
        return titleElement ? titleElement.textContent.replace(/"/g, '').trim() : '';
    }

    function getDescriptionFromCard(card) {
        const descElement = card.querySelector('.card__description');
        return descElement ? descElement.textContent.trim() : '';
    }

    function searchMangas() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            searchResults.classList.remove('active');
            return;
        }

        const matchingMangas = Array.from(cards).filter(card => {
            const title = getTitleFromCard(card);
            return title.toLowerCase().includes(searchTerm);
        }).map(card => ({
            title: getTitleFromCard(card),
            description: getDescriptionFromCard(card),
            element: card
        }));

        displayResults(matchingMangas, searchTerm);
    }

    function displayResults(mangas, searchTerm) {
        if (mangas.length > 0) {
            resultsTitle.textContent = `Resultados encontrados para "${searchTerm}" (${mangas.length}):`;

            resultsList.innerHTML = mangas
                .map(manga => `
                    <div class="result-item" data-title="${manga.title}">
                        <div class="manga-title">${manga.title}</div>
                        <small class="manga-description">${manga.description.substring(0, 100)}...</small>
                    </div>
                `).join('');
        } else {
            resultsList.innerHTML = '<div class="no-results">No se encontraron mangas con ese título</div>';
        }

        searchResults.classList.add('active');
    }

    // Event Listeners
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchMangas();
    });

    // Permitir búsqueda al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchMangas();
        }
    });

    // Evento para scroll al manga seleccionado
    resultsList.addEventListener('click', (e) => {
        const resultItem = e.target.closest('.result-item');
        if (resultItem) {
            const targetCard = Array.from(cards).find(card => 
                getTitleFromCard(card) === resultItem.dataset.title
            );
            
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetCard.classList.add('highlight');
                setTimeout(() => targetCard.classList.remove('highlight'), 2000);
            }
        }
    });
});