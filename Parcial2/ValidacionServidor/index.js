const express = require('express');
const {check,validationResult} = require('express-validator');
const cors = require('cors');
const app=express();
app.use(cors());
app.use(express.json());

app.post('/Peticion',check('tipo').isNumeric(),check('email').isEmail(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty())
    {
        console.log(req.body);
        res.json({mensaje:"Respuesta peticion post"});
    }
    else
    {
        res.json(result);
    }
});

app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080");
})