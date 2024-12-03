// Cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Obtener los botones de filtro y las tarjetas
    const filterButtons = document.querySelectorAll('.btn-group .btn');
    const animeCards = document.querySelectorAll('.card');

    // Función para filtrar los animes
    function filterAnimes(temporada) {
        animeCards.forEach(card => {
            const badgeText = card.querySelector('.badge.bg-primary').textContent;
            
            if (temporada === 'Todos') {
                card.parentElement.style.display = 'block';
            } else {
                if (badgeText.includes(temporada)) {
                    card.parentElement.style.display = 'block';
                } else {
                    card.parentElement.style.display = 'none';
                }
            }
        });
    }

    // Agregar evento click a cada botón
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            // Filtrar por la temporada seleccionada
            const temporada = this.textContent;
            filterAnimes(temporada);
        });
    });
});

