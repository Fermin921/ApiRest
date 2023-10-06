const express = require('express');
const {check,validationResult} = require('express-validator');//check revisa todos los posibles casos y resultvalidation es donde se obtendra el resultado de la comprobacion
const cors = require('cors');
const app=express();
app.use(cors());
app.use(express.json());

const Validation = {}


app.post('/Peticion',check('tipo').isNumeric().withMessage("Que paso pa, tiene que llevar numeros"),check('email').isEmail(),(req,res)=>{
    try
    {
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
    }
    catch (err)
    {
        app.use(err,req,res,next())
    }
    
});




app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080");
})