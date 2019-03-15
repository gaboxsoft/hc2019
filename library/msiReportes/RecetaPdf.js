//const Usuario = require('../models/usuario');

const pdf = require('pdfkit');
const pdfTools = require('../pdfkit/gxPdf');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
require('moment/locale/es');  // without this line it didn't work
moment.locale('es')

const recetaPdf = (receta) => {
  const hojaCartaPort = [612, 792];
  const hojaCartaLan = [792, 612];

  var doc = new pdf({
    size: 'letter',
    layout: 'portrait',
    //size: hojaCartaPort,
    margin: 0,
    info: {
      Title: 'Receta: msi-15 v1.0',
      Author: 'Clínica Médica San Isidro',
    }
  });
  //doc.lineWidth(3);
  //doc.lineJoin('round')
  //  .rect(5, 5, 600, 750)
  //  .stroke();


  const anchoHoja = pdfTools.mmToPt(210.02); // ptos: 612;
  const altoHoja = pdfTools.mmToPt(297.01);  // Ptos: 792;
  const margenIzq = 10;
  const margenDer = 10;
  const maxAncho = anchoHoja - margenDer - margenIzq;
  const margenSup = 10;
  const margenInf = 10;
  const maxAlto = altoHoja - margenInf - margenSup;
  const sizePaperLetter = '210.02x297.01';
  const centroMedico = 'Médica San Isidro';

  //console.log('\r\n\r\n\r\n receta: ', receta,'\r\n\r\n');
  

  let imgFormato = path.resolve(__dirname, '../../msiformatos/msi15.jpg');

  doc.image(imgFormato, {
    fit: [anchoHoja, altoHoja]
  });
  const vacio = '';

  let pathCfg = path.join(__dirname, './recetaFields.cfg');

  let pages = JSON.parse(fs.readFileSync(pathCfg, 'utf-8').toString().replace(/\n|\r/g, "").trim());

  //////////////
  // Registrar fuente de letra
  // Register a font
  doc.registerFont('arialnarrow', 'fonts/arial-narrow.ttf');
  

  // Colocr renglón en cero para saber que hay que imprimir los encabezados.
  doc.y = 0;

  linesByPage = 3;
  page = 0;
  col = 1.5;
  row = 7.4;
  rowIni = row;

  let n = 0;

  ////
  let paciente = receta.paciente;
  let usuarioSe = receta.usuarioSe;
 
  for (var i = 0; i <pages.length; i++) {
  pages[i].forEach(function (field) {
      //console.log('field.name:', field.name);
      writeLine(doc, eval(field.name), field.row, field.col, field.align, field.fontSize, field.color, field.width);
    });
  }

  ////
  // Stream contents to a file
  const fileName = 'MSI15-' + Date.now() + '.pdf';
  const filePath = path.join(__dirname, '../../public/pdfs/' + fileName);


  doc.pipe(fs.createWriteStream(filePath)).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....');
    //return filePath;
  });



  doc.end();
  return filePath;
  //var buffer = encoding.convert(data, "Latin_1") 
}

function writeLine(doc, text, row, col, align, fontSize, color, width) {
  const vacio = '';
 
  if (!col || !row) {
    doc.moveDown()
      .fillColor(color || 'black')
      .fontSize(fontSize || 10)
      .text(text || vacio, {
        align: align || 'left',
        width: pdfTools.cmToPt(width),
        //indent: 2,
        ellipsis: true
      });
  }
  else {
    doc.moveDown()
      .fillColor(color || 'black')
      .fontSize(fontSize || 10)
      .text(text || vacio, pdfTools.cmToPt(col || 1), pdfTools.cmToPt(row || 1), {
        align: align || 'left',
        width: pdfTools.cmToPt(width),
        //indent: 2,
        ellipsis: true
      });
  };
}

module.exports = recetaPdf;



/////////////////

