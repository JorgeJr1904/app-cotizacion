async function getListRoles() {
    const rolesTable = document.getElementById("rolesTable");
    let count = 1;

    try {
        const response = await fetch("http://localhost:8080/api/role", reqOptionValid("GET"));
        const roles = await response.json();
        for (const role of roles) {

            const row = document.createElement("div");
            row.className = "div-table-row";

            row.innerHTML = `
            <div class="div-table-cell">${count}</div>
            <div class="div-table-cell">${role.roleName}</div>
            <div class="div-table-cell">
                <button onclick="deleteRole(${role.idRole})" class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
            </div>`;

            /*<div class="div-table-cell">
                <button class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
            </div>*/

            rolesTable.appendChild(row);
            count++;
        }
    } catch (error) {
        throw error;
    }
}

async function deleteRole(idRole){

    const req = await fetch("http://localhost:8080/api/role/delete/" + idRole, reqOptionValid("DELETE"));
    const res = await req.text();

    if(res === "true"){
        deleteRoleAlert("Éxito!!", "La operacion se realizo con Exito", "success");
    }else{
        deleteRoleAlert("Error", "La operacion Fallo por favor intentelo de nuevo", "error");
    }

}

document.addEventListener("DOMContentLoaded", getListRoles());


function deleteRoleAlert(title, text, type) {
    swal({
        title: title,
        text: text,
        type: type,
        showCancelButton: false,
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
    }, function (isConfirm) {
        if (isConfirm) {
            // Se hizo clic en "Sí", realiza la acción correspondiente
            window.location.href = "listrole.html"
            // Aquí puedes agregar tu lógica adicional para el caso "Sí"
        } else {
            // Se hizo clic en "No", realiza la acción correspondiente
            window.location.href = "listrole.html"
            // Aquí puedes agregar tu lógica adicional para el caso "No"
        }
    });
}