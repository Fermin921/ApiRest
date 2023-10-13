
const express = require('express');
const app = express();
app.use(express.json);

const empleado = require('./empleado.js')

app.use("/empleado",empleado.router);

app.listen(8082,function(err){
    if(err) console.log(err);
    console.log("Servidor escuchando en el puerto 8082");
})

