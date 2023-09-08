function descargarDocumento(){
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

