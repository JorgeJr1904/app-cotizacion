function reqOptionValid(method, data) {
    const requestOptions = {
        method: method, // Establece el método de la solicitud como POST
        headers: {
            // Define los encabezados de la solicitud
            "Accept": "application/json",
            "Content-Type": "application/json",// Indica que estás enviando datos en formato JSON
            "Authorization": localStorage.token
        },
        body: JSON.stringify(data), // Convierte el objeto dataToSend a una cadena JSON y establece el cuerpo de la solicitud
    };
    return requestOptions;
}

async function validLogin(){
    const response = await fetch("http://localhost:8080/api/validToken/v1/validation", reqOptionValid("POST", ""));
        const data = await response.text();
        if(data === "true"){
            return;
        }else{
            window.location.href = "index.html";
        }
}

document.addEventListener("DOMContentLoaded", function () {
    validLogin();
});

