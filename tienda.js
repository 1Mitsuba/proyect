// Crear y configurar los elementos de audio programáticamente
const addToCartSound = new Audio('sounds/coin-sound.wav');
const decreaseSound = new Audio('sounds/decrementar.wav');
addToCartSound.volume = 0.5; // Volumen al 50%
decreaseSound.volume = 0.5; // Volumen al 50%

// Constantes para el carrito
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const btnPagar = document.querySelector('#btn-pagar');

// Array para almacenar productos
let allProducts = [];

// Cargar productos del localStorage cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos del localStorage
    const savedProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (savedProducts.length > 0) {
        allProducts = savedProducts;
        showHTML();
        playAddToCartSound(); // Reproducir sonido al cargar productos
        // Limpiar localStorage después de cargar
        localStorage.removeItem('cartItems');
    }
});

// Funciones para reproducir sonidos
const playAddToCartSound = () => {
    try {
        addToCartSound.currentTime = 0; // Reinicia el sonido
        addToCartSound.play();
    } catch (error) {
        console.error("Error al reproducir el sonido:", error);
    }
};

const playDecreaseSound = () => {
    try {
        decreaseSound.currentTime = 0; // Reinicia el sonido
        decreaseSound.play();
    } catch (error) {
        console.error("Error al reproducir el sonido de decremento:", error);
    }
};

// Event Listener para mostrar/ocultar carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Event Listener para agregar productos al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exits = allProducts.some(
            product => product.title === infoProduct.title
        );

        if (exits) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        playAddToCartSound();
        showHTML();
    }
});

// Event Listener para eliminar productos
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );

        playDecreaseSound(); // Reproducir sonido al eliminar producto
        showHTML();
    }
});

// Event Listener para aumentar y disminuir cantidad
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('btn-increase') || e.target.classList.contains('btn-decrease')) {
        const product = e.target.closest('.cart-product');
        const title = product.querySelector('.titulo-producto-carrito').textContent;
        
        allProducts = allProducts.map(product => {
            if (product.title === title) {
                if (e.target.classList.contains('btn-increase')) {
                    product.quantity++;
                    playAddToCartSound(); // Reproducir sonido al incrementar
                } else if (e.target.classList.contains('btn-decrease')) {
                    if (product.quantity > 1) {
                        product.quantity--;
                        playDecreaseSound(); // Reproducir sonido al decrementar
                    }
                }
            }
            return product;
        });

        showHTML();
    }
});

// Función para mostrar productos en el carrito
const showHTML = () => {
    rowProduct.innerHTML = '';

    if (allProducts.length === 0) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
        btnPagar.classList.add('hidden');
        
        countProducts.innerText = "0";
        valorTotal.innerText = "$0";
        return;
    }

    cartEmpty.classList.add('hidden');
    rowProduct.classList.remove('hidden');
    cartTotal.classList.remove('hidden');
    btnPagar.classList.remove('hidden');

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <div class="cantidad-control">
                    <button class="btn-decrease">-</button>
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <button class="btn-increase">+</button>
                </div>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};

// Event Listener para el botón de pagar
btnPagar.addEventListener('click', () => {
    if (allProducts.length > 0) {
        const total = valorTotal.innerText;
        
        const customAlert = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        const alertClose = document.getElementById('alert-close');
        const alertCancel = document.getElementById('alert-cancel');
        
        alertMessage.textContent = `Pago procesado correctamente. Total: ${total}`;
        customAlert.classList.remove('hidden');
        
        alertClose.onclick = () => {
            customAlert.classList.add('hidden');
            allProducts = [];
            showHTML();
        };

        alertCancel.onclick = () => {
            customAlert.classList.add('hidden');
        };
    }
});