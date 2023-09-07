async function getApiPermissions(){
    const response = await fetch("http://localhost:8080/api/permission/v1", reqOptionValid("GET"));
    const data = response.json();
    return data;
}

async function setApiPermissionsRole(roleName, permissions){
    const PermissionsRoleDTO = {
        roleName: roleName,
        idPermission: permissions
    }
    const response = await fetch("http://localhost:8080/api/permission_role/v1/new", reqOptionValid("POST", PermissionsRoleDTO));
    const res = response.text();
    return res;
}

async function getPermissions(){
    let res = await getApiPermissions();
    const container = document.getElementById("permissions");

    for (let i = 0; i < res.length; i++){
        let data = res[i];

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `module${data.idPermission}`;
        checkbox.dataset.id = data.idPermission;

        const label = document.createElement("label");
        label.htmlFor = `module${data.idPermission}`;
        label.textContent = `${data.permissionName}`;

        const div = document.createElement("div");
        div.style.marginBottom = "20px";
        div.className = "col-xs-3 col-sm-2"

        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    }
}


function obtenerCheckBoxesMarcados() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxesMarcados = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            const id = checkbox.dataset.id;
            checkboxesMarcados.push(id);
        }
    });

    return checkboxesMarcados;
}

async function setPermissionsRolesForm(){
    const roleName = document.getElementById("txt_roleName").value;
    const permissions = obtenerCheckBoxesMarcados();
    const res = await setApiPermissionsRole(roleName, permissions);
    console.log(res)
    if(res === "true"){
        createRoleSuccess();
    }else if(res === "null Permissions"){
        createRoleError("Porfavor seleccione al menos un permiso");
    }else if(res === "false"){
        createRoleError("Hubo un error porfavor intentelo de nuevo");
    }else if(res === "Existent Role"){
        createRoleError("El rol " + roleName + " ya existe");
    }else{
        createRoleError("Hubo un error porfavor intentelo de nuevossssssssssssss");
    }
    

}

document.addEventListener("DOMContentLoaded", function () {
    getPermissions();
});



function createRoleSuccess() {
    swal({
        title: "Rol Creado con Exito!!",
        text: "",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
    }, function (isConfirm) {
        if (isConfirm) {
            // Se hizo clic en "Sí", realiza la acción correspondiente
            window.location.href = "role.html"
            // Aquí puedes agregar tu lógica adicional para el caso "Sí"
        } else {
            // Se hizo clic en "No", realiza la acción correspondiente
            window.location.href = "role.html"
            // Aquí puedes agregar tu lógica adicional para el caso "No"
        }
    });
}

function createRoleError(message) {
    swal({
        title: "Upss!!",
        text: message,
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
    }, function (isConfirm) {
        if (isConfirm) {
            // Se hizo clic en "Sí", realiza la acción correspondiente
            window.location.href = "role.html"
            // Aquí puedes agregar tu lógica adicional para el caso "Sí"
        } else {
            // Se hizo clic en "No", realiza la acción correspondiente
            window.location.href = "role.html"
            // Aquí puedes agregar tu lógica adicional para el caso "No"
        }
    });
}