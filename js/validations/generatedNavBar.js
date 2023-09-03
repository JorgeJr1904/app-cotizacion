// Función para cargar el contenido del menú
function loadLateralMenu() {
    const menuContainer = document.getElementById('lMenu-container');

    fetch('./../../lateralMenu.html')  // Cambia 'menu.html' por la ruta correcta de tu archivo
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar el menú:', error);
        });
}


