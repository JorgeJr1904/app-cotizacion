let cotizacionIndex = 2;
function newQuote() {
    const cotizacionesContainer = document.getElementById("cotizacionesContainer");

    const clone = document.createElement("div");
    clone.innerHTML = `
        <div class="col-xs-12">
        <legend><i class="zmdi zmdi-label"></i> &nbsp; Cotizacion</legend>
        <button id="eliminarBtn-${cotizacionIndex}" type="submit" style="margin-bottom: 40px;" class="btn btn-danger" title="Eliminar Cotizacion">- &nbsp; Eliminar Cotizacion</button><br>
    </div>
    <div class="col-xs-12">
        <div class="group-material">
            <input id="descripcion_${cotizacionIndex}" type="text" class="material-control tooltips-general" placeholder="Escribe la descripcion de tu cotizacion" required="" data-toggle="tooltip" data-placement="top" title="Descripcion de tu cotizacion">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Descripción</label>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6" onchange="valorTotal()">
        <div class="group-material">
           <input id="cantT_${cotizacionIndex}" type="number" class="material-control tooltips-general" placeholder="Escribe aquí la cantidad de personas" required="" pattern="[0-9]{1,4}" maxlength="4" data-toggle="tooltip" data-placement="top" title="Ingresa solo la cantidad de personas que trabajaran en este modulo o proyecto, solamente números, sin espacios">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Cantidad de Trabajadores</label>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6" onchange="valorTotal()">
        <div class="group-material">
            <input id="precioHora_${cotizacionIndex}" inputmode="numeric" type="text" class="material-control tooltips-general" placeholder="Ingresa el precio de la hora" required maxlength="7" data-toggle="tooltip" data-placement="top" title="Ingresa el precio el cual cobraras por hora a cada trabajador">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Precio x Hora</label>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6" onchange="valorTotal()">
        <div class="group-material">
            <input id="horasDia_${cotizacionIndex}" type="number" class="material-control tooltips-general" placeholder="Escribe aquí la edición del libro" required="" maxlength="7" data-toggle="tooltip" data-placement="top" title="Edición del libro">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Horas al dia</label>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6" onchange="valorTotal()">
        <div class="group-material">
            <input id="diasTrabajo_${cotizacionIndex}" type="number" class="material-control tooltips-general"  placeholder="Escribe aquí la cantidad de dias que trabajara cada trabajador" required=" "pattern="[0-9]" maxlength="7" data-toggle="tooltip" data-placement="top" title="Ingresa el numero exacto de dias habiles los cuales trabajara cada persona">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Dias a trabajar</label>
        </div>
    </div>
        `;

    // Actualiza los índices de los campos clonados para evitar conflictos
    const inputs = clone.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        const nameAttr = input.getAttribute("name");
        if (nameAttr) {
            input.setAttribute("name", `${nameAttr}-${cotizacionIndex}`);
        }
    });

    cotizacionesContainer.appendChild(clone);

    const eliminarBtn = document.getElementById(`eliminarBtn-${cotizacionIndex}`);
    eliminarBtn.addEventListener("click", function () {
        cotizacionesContainer.removeChild(clone);
        valorTotal();
    });

    cotizacionIndex++;
};

function valorTotal() {
    let valorTotal2 = 0;
    for (let i = 1; i < cotizacionIndex; i++) {
        if (document.getElementById("diasTrabajo_" + i) === null) {
            continue;
        } else {
            const cantidadTrabajadores = parseFloat(document.getElementById("cantT_" + i).value);
            const precioHora = parseFloat(document.getElementById("precioHora_" + i).value);
            const horasAldia = parseFloat(document.getElementById("horasDia_" + i).value);
            const diasAtrabajar = parseFloat(document.getElementById("diasTrabajo_" + i).value);
            // ... y así sucesivamente para los demás campos
            let total = cantidadTrabajadores * precioHora * horasAldia * diasAtrabajar;
            valorTotal2 += total;
        }
    }
    let precioTotal = document.getElementById("precioTotal");
    precioTotal.textContent = valorTotal2;
    return valorTotal2;
}

async function saveDataDB() {
    let errorCount = 0;

    const quote = {
        customerName: document.getElementById("customerName").value,
        customerLastname: document.getElementById("customerLastname").value,
        customerType: document.getElementById("customerType").value,
        totalPrice: valorTotal()
    }

    const quoteResponse = await fetch("http://localhost:8080/api/quote/v1/new", reqOptionValid("POST", quote));
    const dataQuote = await quoteResponse.json();

    if (dataQuote != null) {
        for (let i = 1; i < cotizacionIndex; i++) {
            if (document.getElementById("descripcion_" + i) === null) {
                continue;
            } else {
                let descripcion = document.getElementById("descripcion_" + i).value;
                let cantidadHombres = document.getElementById("cantT_" + i).value;
                let precioHora = document.getElementById("precioHora_" + i).value;
                let horasDia = document.getElementById("horasDia_" + i).value;
                let dias = document.getElementById("diasTrabajo_" + i).value;

                const order = {
                    description: descripcion,
                    men: cantidadHombres,
                    hourPrice: precioHora,
                    hourDays: horasDia,
                    days: dias,
                    totalPrice: cantidadHombres * precioHora * horasDia * dias,
                    idQuote: dataQuote.id
                }
                // ... y así sucesivamente para los demás campos
                const orderResponse = await fetch("http://localhost:8080/api/order/v1/new", reqOptionValid("POST", order));
                const orderData = await orderResponse.text();
                if(orderData === "false"){
                    errorCount ++;
                }
            }
        }
        if(errorCount === 0){
            createQuoteSuccess();
        }else{
            createQuoteFail();
        }
    }else{
        createQuoteFail();
    }
}


function crudQuote() {
    document.getElementById("btn_guardar").onclick = saveQuote;
    document.getElementById("agregarBtn").onclick = newQuote;
}

function getters() {
    /*if (window.location.pathname.includes("listUser.html")) {
        getUsers();
    }
    if (window.location.pathname.includes("user.html")) {
        inputRoles();
        inputUser();
    }*/
    crudQuote();
}


//ALERTS ------------------------------------------------------------------------------------------------------------------------------------------

function createQuoteSuccess() {
    swal({
        title: "Cotizacion creada con exito!!",
        text: "Deseas ver tu cotizaciones?",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "Sí",
        cancelButtonText: "No, Deseo realizar una cotizacion mas",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            // Se hizo clic en "Sí", realiza la acción correspondiente
            window.location.href = "catalog.html"
            // Aquí puedes agregar tu lógica adicional para el caso "Sí"
        } else {
            // Se hizo clic en "No", realiza la acción correspondiente
            window.location.href = "quote.html"
            // Aquí puedes agregar tu lógica adicional para el caso "No"
        }
    });
}

function createQuoteFail() {
    swal({
        title: "Upss!!",
        text: "Algo Salio Mal Porfavor intentalo de nuevo",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
        closeOnConfirm: true,
    });
}

function saveQuote() {
    swal(
        {
            title: "¿Guardar Cotizacion?",
            text: "Estas Seguro que deseas guardar la cotizacion?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, Guardar",
            cancelButtonText: "No, aun me falta",
            animation: "slide-from-top",
            closeOnConfirm: true,
        },
        function () {
            saveDataDB()
        }
    );
};
