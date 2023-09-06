let http = require('http');



let servidor = http.createServer(function (req, res){

    //brina el acceso al core

   // res.setHeader("Access-Control-Allow-Origin", "*");

    //repuesta del servidor node

res.write('servidor HTTP contestando');

res.end();

});



servidor.listen(8080, ()=>{

    console.log("Servidor Node-Http escuchando en pueto 8080");

});