var express=require('express');
var  morgan = require('morgan')

var app=express();

app.use(morgan('combined' ));

app.get("/alumnos/:carrera",(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Servidor Express constentando a peticion GET");
});

app.post("/alumnos",(req,res)=>{
    res.send("Servidor Express contestando a POST");
});

app.listen(8080,()=>{
    console.log("Servidor express escuchando");
});


