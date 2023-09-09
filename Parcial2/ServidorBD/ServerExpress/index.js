const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('combined',{stream:accessLogStream}));

app.get("/usuarios", async (req,res) => 
{
    try 
    {
        const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'crud'})
        const [rows,fields] = await conn.query('SELECT * from usuario');
        res.json(rows);
    }
    catch(err)
    {
        res.status(500).json({mensaje:error.sqlMessage});
    }
});

app.get("/usuarios/:id",async (req,res) =>
{
    console.log(req.params.id);
    const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'crud'})
    cons [rows,fields] = await conn.query('SELECT * from usuario where idusuario='+req.params.id);
    if(rows.lenght==0)
    {
        res.json({mensaje:"Usuario no existe"});
    }
    else
    {
        res.json(rows);
    }
});

app.listen(8080,()=>
{
    console.log("Server express escuchando en el puerto 8080");
})