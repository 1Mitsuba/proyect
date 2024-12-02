document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos del DOM
    const genreFilter = document.getElementById('genreFilter');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const resultsTitle = searchResults.querySelector('.results-title');
    const resultsList = searchResults.querySelector('.results-list');
    const cards = document.querySelectorAll('.card');

    // Función para extraer géneros de una tarjeta
    function getGenresFromCard(card) {
        const generoElement = card.querySelector('.card__Genero');
        if (!generoElement) return [];

        let generoText = '';
        let nextNode = generoElement.nextSibling;
        while (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
            generoText += nextNode.textContent;
            nextNode = nextNode.nextSibling;
        }

        return generoText
            .toLowerCase()
            .split(',')
            .map(genre => genre.trim())
            .filter(genre => genre.length > 0);
    }

    // Función para obtener el título de una tarjeta
    function getTitleFromCard(card) {
        const titleElement = card.querySelector('.card__title');
        return titleElement ? titleElement.textContent.replace(/"/g, '').trim() : '';
    }

    // Función para filtrar libros
    function filterBooks() {
        const selectedGenre = genreFilter.value.toLowerCase();
        console.log('Filtrando por género:', selectedGenre);

        // Si no hay género seleccionado (Todos los géneros), ocultar resultados
        if (!selectedGenre) {
            searchResults.classList.remove('active');
            return;
        }

        const matchingBooks = Array.from(cards).filter(card => {
            const genres = getGenresFromCard(card);
            const title = getTitleFromCard(card);
            
            console.log('Analizando libro:', title, 'Géneros:', genres);

            return genres.some(genre => 
                genre.includes(selectedGenre) || 
                selectedGenre.includes(genre.split(' ')[0])
            );
        }).map(card => ({
            title: getTitleFromCard(card),
            genres: getGenresFromCard(card),
            element: card
        }));

        displayResults(matchingBooks, selectedGenre);
    }

    // Función para mostrar resultados
    function displayResults(books, selectedGenre) {
        if (books.length > 0) {
            resultsTitle.textContent = `Libros encontrados con género "${selectedGenre}" (${books.length}):`;

            resultsList.innerHTML = books
                .map(book => `
                    <div class="result-item" data-title="${book.title}">
                        ${book.title}
                        <small class="genres">${book.genres.join(', ')}</small>
                    </div>
                `).join('');
        } else {
            resultsList.innerHTML = '<div class="no-results">No se encontraron libros con este género</div>';
        }

        searchResults.classList.add('active');
        console.log('Resultados encontrados:', books.length);
    }

    // Event Listeners
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        filterBooks();
    });

    // Event Listener para hacer scroll al libro seleccionado
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