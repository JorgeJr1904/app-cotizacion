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
      console.log(data.message);
      validAuth(data.message);
    })
    .catch(error => {
      console.error(error)
    })
}

function validAuth(data){
  if(data == "Login Correcto"){
    window.location.href = "home.html"
  }else if(data == "Nombre de Usuario Incorrecto"){
    Swal.fire("Nombre de Usuario incorrecto", "Vuelve a intentar Nuevamente", "error")
  }else if(data == "Usuario Deshabilitado"){
    Swal.fire("Usuario deshabilitado", "Consulta con tu administrador para volver a habilitar el usuario", "warning")
  }else if(data == "Contrasenia Incorrecta"){
    Swal.fire("Contraseña Incorrecta", "Vuelve a intentarlo", "error")
  }
}