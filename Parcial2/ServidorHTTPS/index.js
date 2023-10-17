const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app=express();

const opciones = {
    key : fs.readFileSync(path.join(__dirname,"SSL","key.pem")),
    cert : fs.readFileSync(path.join(__dirname,"SSL","cert.pem"))
};

app.get("/", (req,res) => {
    res.send("Servidor Express constentando a peticion GET");
});

https.createServer(opciones,app).listen(8080,function()
{
    console.log("Servidor Escuchando en 8080 de manera segura");
});
