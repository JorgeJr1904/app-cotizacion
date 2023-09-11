async function getApiQuotes() {
    try {
        const req = await fetch(
            "http://localhost:8080/api/quote/v1/get",
            reqOptionValid("GET")
        );
        const res = await req.json();
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function setQuotes() {
    const quoteList = document.getElementById("quoteList");

    try {
        const quotes = await getApiQuotes();
        for (const quote of quotes) {
            let num = quote.totalPrice;
            const numQt = num.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' });
            let date = epochToTimestamp(quote.quoteDate);
            const divMedia = document.createElement("div");
            divMedia.className = "media media-hover";

            const divMediaLeft = document.createElement("div");
            divMediaLeft.className = "media-left media-middle";

            const img = document.createElement("img");
            img.className = "media-object";
            img.src = "../../assets/img/pdf.png";
            img.alt = "Libro";
            img.width = "48";
            img.height = "48";
            divMediaLeft.appendChild(img)

            const divMediaBody = document.createElement("div");
            divMediaBody.className = "media-body";

            const h4 = document.createElement("h4");
            h4.className = "media-heading";
            h4.textContent = date;

            const divPullLeft = document.createElement("div");
            const strongAutor = document.createElement("strong");
            const strongAnio = document.createElement("strong");

            strongAutor.textContent = "Cliente: " + quote.customerName + " " + quote.customerLastname;
            strongAnio.textContent = "Precio: " + numQt;

            divPullLeft.appendChild(strongAutor);
            divPullLeft.appendChild(document.createElement("br"));
            divPullLeft.appendChild(strongAnio);

            const p = document.createElement("p");
            p.className = "text-center pull-right";

            const a = document.createElement("a");
            a.href = "#!";
            a.className = "btn btn-info btn-xs";
            a.style.marginRight = "10px";

            const iZmdi = document.createElement("i");
            iZmdi.className = "zmdi zmdi-info-outline";

            a.appendChild(iZmdi);
            a.appendChild(document.createTextNode(" Descargar"));

            a.addEventListener("click", function() {
                quoteToPdf(quote.id);
            });

            p.appendChild(a);

            divMediaBody.appendChild(h4);
            divMediaBody.appendChild(divPullLeft);
            divMediaBody.appendChild(p);

            divMedia.appendChild(divMediaLeft);
            divMedia.appendChild(divMediaBody);

            // Agrega el elemento generado al contenedor
            quoteList.appendChild(divMedia);
        }
    } catch (error) {
        throw error;
    }
}

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

document.addEventListener("DOMContentLoaded", setQuotes());
