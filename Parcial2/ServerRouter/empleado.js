const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>
{
    res.status(200).json({respuesta:"peticion get a ruta empleado"});
})
.post("/",function(req,res)
{
    res.status(200),json({respuesta:"Peticion post a ruta empleado"});
})
.put("/",function(req,res)
{
    res.status(200),json({respuesta:"Peticion put a ruta empleado"});
})
.delete("/",function(req,res)
{
    res.status(200),json({respuesta:"Peticion delete a ruta empleado"});
})
module.exports.router= router;