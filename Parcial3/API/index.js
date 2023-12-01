const express=require('express');
const morgan = require('morgan');
const fs=require('fs');
const path=require('path');
const mysql =require('mysql2/promise');
const bearerToken = require('express-bearer-token'); 
const app=express();
const cors = require('cors');
var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
const swaggerUI = require('swagger-ui-express');
const swaggerjsDoc= require('swagger-jsdoc');
app.use(morgan('combined',{stream:accessLogStream}));
app.use(cors());
app.use(express.json());
app.use(bearerToken());

const data = fs.readFileSync(path.join(__dirname,'./Options.json'),{ encoding: 'utf8', flag: 'r' });
const obj = JSON.parse(data)

const swaggerOptions = {
    definition: obj,
    apis: [`${path.join(__dirname,"./index.js")}`],
}

app.get("/usuarios", async (req, res) => {    
    try {
        const token = req.token;

            const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'login' });
            const [rows, fields] = await conn.query('SELECT * from usuario');
            res.json(rows);
        
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.get("/usuarios/:id",async(req,res)=>{    
console.log(req.params.id)
const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'login'})
   const[rows,fields]=await conn.query('SELECT * from usuario where Tipo='+req.params.id);
if(rows.length==0)
{
    res.status(484).json({mensaje:"Usuario No existe"});
}else{
    res.json(rows);
}
});

app.post('/insertar', async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'login' });

        const { Tipo, Nombre, Contraseña } = req.body;

        const [rows, fields] = await conn.execute('INSERT INTO usuario (Tipo, Usuario, Contraseña) VALUES (?, ?, ?)', [Tipo, Nombre, Contraseña]);

        res.json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar datos' });
    }
});

app.put("/usuario/:Tipo", async (req, res) => {
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'login' });
        const { Usuario, Contraseña } = req.body;
        console.log(Usuario + Contraseña);
        console.log(req.body);
        await conn.query('UPDATE usuario SET Usuario = ?, Contraseña = ? WHERE Tipo = ?', [Usuario, Contraseña, req.params.Tipo]);
        res.json({ mensaje: "ACTUALIZADO" });
    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

app.delete("/usuarios/:Tipo", async (req, res) => {    
    try {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'login' });
        const [rows, fields] = await conn.query('DELETE FROM usuario WHERE Tipo = ?', [req.params.Tipo]);

        if (rows.affectedRows == 0) {
            res.json({ mensaje: "Registro No Eliminado" });
        } else {
            res.json({ mensaje: "Registro Eliminado" });
        }

    } catch (err) {
        res.status(500).json({ mensaje: err.sqlMessage });
    }
});

const swaggerDocs = swaggerjsDoc(swaggerOptions);

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.get("/options",(req,res)=>
{
    res.json(data)
})

app.use("/api-docs-json",(req,res)=>{
    res.json(swaggerDocs);
});



app.listen(8080,()=>{
    console.log("Servidor express escuchando en el puerto 8080");
});