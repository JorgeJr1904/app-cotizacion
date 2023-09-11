function quoteToPdf(id) {
    window.open("invoice.html", "_blank");
    localStorage.idQuote = id;
}

async function getApiQuote() {
    try {
        let idQuote = parseInt(localStorage.idQuote);
        const req = await fetch(
            "http://localhost:8080/api/quote/v1/get/" + idQuote,
            reqOptionValid("GET")
        );
        const res = await req.json();
        return res;
    } catch (error) {
        return null;
    }
}


async function getQuoteOrders() {
    try {
        let idQuote = parseInt(localStorage.idQuote);
        const res = await fetch("http://localhost:8080/api/order/v1/get/" + idQuote, reqOptionValid("GET"))
        const data = await res.json();
        if (data !== null) {
            localStorage.removeItem(idQuote);
            return data;
        } else {
            localStorage.removeItem(idQuote);
            return null;
        }
    } catch (error) {
        localStorage.removeItem(idQuote);
        return null;
    }
}

async function createInvoice() {
    let quoteDate = document.getElementById("quote-date");
    let totalQuote = document.getElementById("totalQuote");
    let client = document.getElementById("client");
    let orderQuote = document.querySelector(".order-quote");
    const quote = await getApiQuote();
    const orders = await getQuoteOrders();
    for (const order of orders) {
        let num = order.totalPrice;
        const numQt = num.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' });
        var row = document.createElement("tr");
        row.classList.add("item");

        // Crea las celdas <td> y agrega contenido
        let celdaDescripcion = document.createElement("td");
        celdaDescripcion.textContent = order.description;

        var celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = numQt;

        // Agrega las celdas a la fila
        row.appendChild(celdaDescripcion);
        row.appendChild(celdaPrecio);

        // Agrega la fila al contenedor
        orderQuote.appendChild(row);
    }
    let total = quote.totalPrice;
    quoteDate.innerHTML = "Creado: " + epochToTimestamp(quote.quoteDate);
    totalQuote.textContent = "Total: " + total.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' });
    client.innerHTML = "Compania: <br> Cliente: " + quote.customerName + " " + quote.customerLastname; 

    await descargarDocumento();
}


async function descargarDocumento() {
    const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM
    html2pdf()
        .set({
            margin: 0.2,
            filename: 'cotizacion.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3, // A mayor escala, mejores gráficos, pero más peso
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "letter",
                orientation: 'portrait' // landscape o portrait
            }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err));
}

async function invoiceToPDF(){
    await createInvoice();
}

function getters() {
    if (window.location.pathname.includes("invoice.html")) {
        invoiceToPDF();
    }
    if (window.location.pathname.includes("catalog.html")) {
    }
}

document.addEventListener("DOMContentLoaded", getters());



function epochToTimestamp(epoch) {
    const fecha = new Date(epoch); // Multiplica por 1000 para convertir de segundos a milisegundos
    const dia = fecha.getDate().toString().padStart(2, '0'); // Obtiene el día y lo formatea con dos dígitos
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes (0-11) y lo formatea con dos dígitos, sumando 1
    const anio = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0'); // Obtiene las horas y las formatea con dos dígitos
    const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Obtiene los minutos y los formatea con dos dígitos

    const fechaHora = `${dia}/${mes}/${anio} ${horas}:${minutos}`;
    return fechaHora;
}

