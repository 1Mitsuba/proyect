document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.btn-group [data-filter]');
    const cards = document.querySelectorAll('.card');

    function filterCards(category) {
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.closest('.col').style.display = '';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.closest('.col').style.display = 'none';
            }
        });
    }

    // Manejar el clic en los botones
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase active de todos los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar la clase active al botón clickeado
            button.classList.add('active');
            
            // Filtrar las tarjetas
            filterCards(button.dataset.filter);
        });
    });

    // Activar el filtro "Todas" por defecto
    document.querySelector('[data-filter="all"]').classList.add('active');
    filterCards('all');
});