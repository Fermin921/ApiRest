const fsc = require('fs');
const path = require('path');
const { jsPDF } = require("jspdf");
var xl = require('excel4node');

// Archivo de texto
fsc.writeFile(path.join(__dirname,'Texto.txt'), "Archivo creado api", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Archivo Creado correctamente");
    }
});

// Instalacion del paquete jspdf para generar pdf
const doc = new jsPDF();
doc.text("Hola mundo", 10, 10);
doc.save(path.join(__dirname, "APdf.pdf"));

// Generacion de excel
var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');

var style = wb.createStyle({
    font: {
        color: '#FF0800',
        size: 12,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
});

ws.cell(1, 1)
.number(100)
.style(style);

wb.write(path.join(__dirname, 'Excel.xlsx'));
