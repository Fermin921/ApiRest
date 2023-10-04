const express = require('express');
const {check,validationResult, checkSchema} = require('express-validator');//check revisa todos los posibles casos y resultvalidation es donde se obtendra el resultado de la comprobacion
const cors = require('cors');
const app=express();
app.use(cors());
app.use(express.json());

const Validation = {}

app.post('/Peticion',checkSchema({
    // 'usuario' :{is},
    'tipo' :{isLength:{min:5, max:10}, isNumeric:{errorMessage:"Tienen que ser caracter numerico"}},
    'telefono' :{isNumeric:{errorMessage:"No se aceptan letras"}},
    'email' : {isEmail:{errorMessage:"Favor de ingresar un correo valido"}}
}),(req,res)=>{
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