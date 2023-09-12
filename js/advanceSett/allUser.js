async function getListUsers() {
    const userTable = document.getElementById("userTable");
    let count = 1;

    try {
        const response = await fetch("http://localhost:8080/api/user/get", reqOptionValid("GET"));
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
                    <button onclick="deleteUser(${user.id})" type="submit" class="btn btn-danger tooltips-general" data-toggle="tooltip" data-placement="top"><i class="zmdi zmdi-delete"></i></button>
                </div>`;

            userTable.appendChild(row);
            count++;
        }
    } catch (error) {
        throw error;
    }
}

async function idToRoleName(idRole) {
    try {
        const response = await fetch(
            "http://localhost:8080/api/role/getRoleName/" + idRole, reqOptionValid("GET")
        );
        const data = await response.json();
        return data.roleName;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id){

    try {
        swal({
            title: "¿Estas Seguro?",
            text: "Si borras el Usuario se borraran las cotizaciones que el haya creado",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        }, async function (isConfirm) {
            if (isConfirm) {
                const response = await fetch(
                    "http://localhost:8080/api/user/delete/" + id, reqOptionValid("DELETE")
                );
                const data = await response.text();
                if(data === "true"){
                    deleteUserSucces();
                }else{
                    deleteUserFail();
                }
            } else {
                return;
            }
        });
    } catch (error) {
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", getListUsers());

function deleteUserSucces(){
    swal({
        title: "Usuario Eliminado Con exito",
        text: "",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
    }, function () {
            window.location.reload();
    });
}

function deleteUserFail(){
    swal({
        title: "Error!!!",
        text: "No se pudo eliminar el usuario, porfavor intentalo nuevamente",
        type: "error",
        showCancelButton: false,
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
    }, function () {
            window.location.reload();
    });
}