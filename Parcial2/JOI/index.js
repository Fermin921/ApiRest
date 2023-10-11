
const validation = require ("./middleware/JOIValidation.js")
const {registroSchema} = require("./Schemas/Registro.js")
const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended : false}));

app.post('/clientes',validation(registroSchema),(req,res)=>{
    
    const {usuario,password,confirmar_password,nombres,edad,calle,ciudad,correo,fecha_registro} = req.body;
    res.send(`usuario:${usuario},password:${password},confirmar_password:${confirmar_password},nombre:${nombres},edad:${edad},
    calle:${calle},ciudad:${ciudad},correo:${correo},fecha_registro:${fecha_registro}`);
    
});


app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080");
})