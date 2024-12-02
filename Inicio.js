// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.isLoggedIn;
}

// Función para verificar el estado de login y actualizar la navegación
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginButton = document.getElementById('loginButton');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    const enlacesProtegidos = document.querySelectorAll('.enlace-protegido');

    if (currentUser && currentUser.isLoggedIn) {
        // Ocultar botón de login y mostrar perfil
        loginButton.style.display = 'none';
        userProfile.style.display = 'block';
        userName.textContent = currentUser.name;
        
        // Mostrar enlaces protegidos
        enlacesProtegidos.forEach(enlace => {
            enlace.style.display = 'block';
        });
    } else {
        // Mostrar botón de login y ocultar perfil
        loginButton.style.display = 'block';
        userProfile.style.display = 'none';
        
        // Ocultar enlaces protegidos
        enlacesProtegidos.forEach(enlace => {
            enlace.style.display = 'none';
        });
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html'; // Cambiado de 'Registro.html' a 'index.html'
}

// Agregar event listener cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar estado de login y actualizar navegación
    checkLoginStatus();

    // Configurar el botón de logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

// Función para proteger páginas
function protectPage() {
    const paginasPublicas = ['index.html', 'Registro.html'];
    const paginaActual = window.location.pathname.split('/').pop();
    
    if (!paginasPublicas.includes(paginaActual) && !isAuthenticated()) {
        window.location.href = 'Registro.html';
        return false;
    }
    return true;
}