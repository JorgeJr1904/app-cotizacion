//tabla de listado de Usuarios
async function getUsers() {
    const userTable = document.getElementById("userTable");
    let count = 1;

    try {
        const response = await fetch("http://localhost:8080/api/user/get");
        const data = await response.json();
        for (const user of data) {
            const roleName = await idToRoleName(user.idRole);
            user.status = user.status === "1" ? "Activo" : "Inactivo";

            const row = document.createElement("div");
            row.className = "div-table-row";

            row.innerHTML = `
                <div class="div-table-cell">${count}</div>
                <div class="div-table-cell">${user.name}</div>
                <div class="div-table-cell">${user.lastname}</div>
                <div class="div-table-cell">${user.userName}</div>
                <div class="div-table-cell">${roleName}</div>
                <div class="div-table-cell">${user.status}</div>
                <div class="div-table-cell">
                    <button onclick="enableDisableUser(${user.id})" type="submit" class="btn btn-info tooltips-general" data-toggle="tooltip" data-placement="top" title="Pulsa el botón para activar o desactivar el usuario"><i class="zmdi zmdi-swap-vertical"></i></button>
                </div>
                <div class="div-table-cell">
                    <button onclick="btnUpdateUser(${user.id})" name="actualizar" class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
                </div>
                <div class="div-table-cell">
                    <button class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
                </div>
                <div class="div-table-cell">
                    <button class="btn btn-warning"><i class="zmdi zmdi-arrow-split"></i></button>
                </div>
            `;

            userTable.appendChild(row);
            count++;
        }
    } catch (error) {
        throw error;
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Retrieve the user entered from HTML
function getUserForm() {
    const user = {
        name: document.getElementById("txt_name").value,
        lastname: document.getElementById("txt_lastName").value,
        userName: document.getElementById("txt_userName").value,
        password: document.getElementById("txt_pass").value,
        idRole: document.getElementById("txt_role").value,
    };
    return user;
}

function reqOption(method, data) {
    const requestOptions = {
        method: method, // Establece el método de la solicitud como POST
        headers: {
            // Define los encabezados de la solicitud
            "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
        },
        body: JSON.stringify(data), // Convierte el objeto dataToSend a una cadena JSON y establece el cuerpo de la solicitud
    };
    return requestOptions;
}

async function createUser() {
    const user = getUserForm();
    let repass = document.getElementById("txt_repass").value;

    if (user.password === repass) {
        fetch("http://localhost:8080/api/user/new", reqOption("POST", user))
            .then((response) => response.text())
            .then((data) => {
                if (data === "user already exists") {
                    alert("El Nombre de Usuario que intenta crear ya existe");
                } else if (data === "not secure password") {
                    alert(
                        "La contraseña no es segura. Debe tener almenos 8 letras, una mayuscula, una minuscula y un caracter especial"
                    );
                } else if (data === "true") {
                    alert("Contraseña creada correctamente");
                } else {
                    alert("Error inesperado porfavor vuelve a intentarlo");
                }
            });
    } else if (user.password != repass) {
        alert("Contraseñas no coinciden porfavor intentelo de nuevo");
    }
}

function updateUser(){
    console.log("true");
}

//this function change the id Role with the Role Name
async function idToRoleName(idRole) {
    try {
        const response = await fetch(
            "http://localhost:8080/api/role/getRoleName/" + idRole
        );
        const data = await response.json();
        return data.roleName;
    } catch (error) {
        throw error;
    }
}

function enableDisableUser(id) {
    const requestOptions = {
        method: "PATCH",
        body: "",
        redirect: "follow", // Especifica el método PATCH
    };

    fetch("http://localhost:8080/api/user/enable-desable/" + id, requestOptions)
        .then((response) => response.text())
        .then((data) => {
            if (data === "user disable") {
                alert("Usuario Deshabilitado con exito");
                location.reload();
            } else if (data === "user enable") {
                alert("Usuario Habilitado con exito");
                location.reload();
            } else {
                alert("Error al habilitar o deshabilitar el usuario");
                location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function btnUpdateUser(idUser) {
    window.location.href = "user.html?hideButtons=true&id=" + idUser;
}

// This function is to mostrate every role was create
async function getRoles() {
    try {
        const response = await fetch("http://localhost:8080/api/role");
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

//This function create a select for every role was create
async function inputRoles() {
    const selectRole = document.getElementById("txt_role");

    try {
        const data = await getRoles();

        data.forEach((role) => {
            const option = document.createElement("option");
            option.value = role.idRole;
            option.textContent = role.roleName;
            selectRole.appendChild(option);
        });
    } catch (error) {
        throw error;
    }
}

function hideButtons() {
    const cleanButton = document.getElementById("btn_clean");
    const saveButton = document.getElementById("btn_save");
    const updateButton = document.getElementById("btn_update");
    const pass = document.getElementById("div_pass");
    const repass = document.getElementById("div_repass");

    const urlParams = new URLSearchParams(window.location.search);
    const hideButtonsParam = urlParams.get("hideButtons");
    if (hideButtonsParam === "true") {
        if (cleanButton && saveButton && updateButton) {
            cleanButton.style.display = "none";
            saveButton.style.display = "none";
            pass.style.display = "none";
            repass.style.display = "none";
            updateButton.style.display = "";
            document.getElementById("txt_pass").removeAttribute("required");
            document.getElementById("txt_repass").removeAttribute("required");
        }
    } else {
        return;
    }
}

async function inputUser() {
    hideButtons();
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    if (userId) {
        const response = await fetch(
            "http://localhost:8080/api/user/get/" + userId
        );
        const data = await response.json();

        document.getElementById("txt_name").value = data.name;
        document.getElementById("txt_lastName").value = data.lastname;
        document.getElementById("txt_userName").value = data.userName;
        document.getElementById("txt_pass").value = data.password;
        document.getElementById("txt_role").value = data.idRole;
    } else {
        return;
    }
}

function crudUser(){
    document.getElementById("btn_save").onclick = createUser;
    document.getElementById("btn_update").onclick = updateUser;
}

function getters() {
    if (window.location.pathname.includes("listUser.html")) {
        getUsers();
    }
    if (window.location.pathname.includes("user.html")) {
        inputRoles();
        inputUser();
    }
}

document.addEventListener("DOMContentLoaded", getters());
