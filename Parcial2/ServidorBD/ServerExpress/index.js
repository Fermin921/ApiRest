//modulo npm i express
const express=require('express');
const morgan = require('morgan');
const fs=require('fs');
const path=require('path');
const mysql =require('mysql2/promise');
const app=express();
const cors = require('cors');
var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));
app.use(cors());
app.use(express.json());

app.get("/usuarios",async(req,res)=>{    
    try{
        const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'login'})
        const[rows,fields]=await conn.query('SELECT * from usuario');
        res.json(rows);
    }catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
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
    
    const [rows, fields] = await connection.execute('INSERT INTO usuario (Tipo, Nombre, Contraseña) VALUES (?, ?, ?)', [Tipo, Nombre, Contraseña]);
    
    res.json({ message: 'Datos insertados correctamente' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar datos' });
    }
});

app.put("/usuario", async (req, res) => {

    try {

    const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'login' });
        const {Usuario, Contraseña} = req.body;
        await conn.query('UPDATE usuario SET Usuario = ?, Contraseña = ? WHERE Tipo = ?', [Usuario, Contraseña, req.query.Tipo]);
        res.json({ mensaje: "ACTUALIZADO" });
    } catch (err) 
    {
    res.status(500).json({ mensaje: err.sqlMessage });

    }

});

app.delete("/usuarios",async(req,res)=>{    
    try{
        const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'login'})
        const[rows,fields]=await conn.query(`DELETE from usuario where Tipo=${req.query.Tipo}`);
        if(rows.affectedRows==0)
        {
            res.json({mensaje:"Registro No Eliminado"});
        }
        else
        {
            res.json({mensaje:"Registro Eliminado"});
        }
        
    }catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
    }
});



app.listen(8080,()=>{
    console.log("Servidor express escuchando en el puerto 8080");
});

