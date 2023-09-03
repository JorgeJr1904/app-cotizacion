async function authLogin(){
  const dataToSend = {
    userName: document.getElementById("user").value,
    password: document.getElementById("password").value,
  };

  const requestOptions = {
    method: "POST", // Establece el método de la solicitud como POST
    headers: {
      // Define los encabezados de la solicitud
      "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
    },
    body: JSON.stringify(dataToSend), // Convierte el objeto dataToSend a una cadena JSON y establece el cuerpo de la solicitud
  };

    fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
    .then(response => response.json())
    .then(data=>{
      console.log(data);
      validAuth(data);
    })
    .catch(error => {
      console.error(error)
    })
}

function validAuth(data){
  let password = document.getElementById("password");
  let user = document.getElementById("user");
  if(data.message == "Login Correcto"){
    localStorage.token = data.token;
    localStorage.userName = data.userName;
    localStorage.idRole = data.idRole;
    window.location.href = "quote.html"
  }else if(data.message == "Nombre de Usuario Incorrecto"){
    alert("Nombre de Usuario y/o contraseña incorrecta", "Vuelve a intentar Nuevamente", "error")
    user.value = "";
    password.value = "";
  }else if(data.message == "Usuario Deshabilitado"){
    alert("Usuario Deshabilitado, Porfavor Comuniquese con su encargado")
    user.value = "";
    password.value = "";
  }else if(data.message == "Contrasenia Incorrecta"){
    alert("Contraseña Incorrecta Vuelva a intetarlo Nuevamente");
    user.value = "";
    password.value = "";
  }

}