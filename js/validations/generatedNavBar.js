// Función para cargar el contenido del menú
function loadMenuContent() {
    const menuContainer = document.getElementById('menu-container');

    fetch('navBar.html')  // Cambia 'menu.html' por la ruta correcta de tu archivo
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar el menú:', error);
        });
}

// Llama a la función para cargar el menú cuando la página se cargue
window.addEventListener('DOMContentLoaded', loadMenuContent);
