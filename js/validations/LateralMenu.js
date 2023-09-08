async function validateRole(){
    const req = await fetch("http://localhost:8080/api/permission_role/v1/get/" + localStorage.idRole, reqOptionValid("GET"));
    const res = await req.json();
    const menu = document.getElementById("lateralNavMenu").getElementsByTagName("li");
    for (let i = 0; i < menu.length; i++) {
        // Compara el valor de i+1 con los permisos
        if (res.idPermission.includes(i + 1)) {
            // Si el permiso está en la lista, oculta el elemento
            menu[i].style.display = "";
        }
    }
}


document.addEventListener("DOMContentLoaded", validateRole());