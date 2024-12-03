document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos del DOM para el filtro
    const genreFilter = document.getElementById('genreFilter');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const resultsTitle = searchResults.querySelector('.results-title');
    const resultsList = searchResults.querySelector('.results-list');
    const cards = document.querySelectorAll('.card');

    // Funciones para el carrito
    function addToLocalStorage(product) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const existingProductIndex = cartItems.findIndex(item => item.title === product.title);
        
        if (existingProductIndex !== -1) {
            cartItems[existingProductIndex].quantity++;
        } else {
            cartItems.push({
                quantity: 1,
                title: product.title,
                price: product.price
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function redirectToStore() {
        window.location.href = 'Tienda.html';
    }

    // Agregar event listeners a los botones de carrito
    const cartButtons = document.querySelectorAll('.cart-button');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                title: this.getAttribute('data-title'),
                price: `$${this.getAttribute('data-price')}`
            };
            
            addToLocalStorage(product);
            redirectToStore();
        });
    });

    // Funciones para el filtro de libros
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

    function getTitleFromCard(card) {
        const titleElement = card.querySelector('.card__title');
        return titleElement ? titleElement.textContent.replace(/"/g, '').trim() : '';
    }

    function filterBooks() {
        const selectedGenre = genreFilter.value.toLowerCase();
        console.log('Filtrando por género:', selectedGenre);

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

    // Event Listeners para el filtro
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        filterBooks();
    });

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