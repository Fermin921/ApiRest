const express=require('express');
const morgan = require('morgan');
const fs=require('fs');
const path=require('path');
const mysql =require('mysql2/promise');
const bearerToken = require('express-bearer-token'); 
const swaggerUI = require('swagger-ui-express');
const swaggerjsDoc= require('swagger-jsdoc');
const { SwaggerTheme } = require('swagger-themes');
const redoc = require('redoc-express');
const app=express();
const cors = require('cors');
var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accessLogStream}));
app.use(cors());
app.use(express.json());
app.use(bearerToken());
app.use(express.text());
// app.use('/swagger-theme', express.static(swaggerThemes.getThemes().absolutePath));
const theme = new SwaggerTheme('v3');
const options = {
    explorer: true,
    customCss: theme.getBuffer('monokai')
};
const data = fs.readFileSync(path.join(__dirname,'./Options.json'),{ encoding: 'utf8', flag: 'r' });
const obj = JSON.parse(data)

const swaggerOptions = {
    definition: obj,
    apis: [`${path.join(__dirname,"./index.js")}`],
}

const multer = require('multer');
const folder = path.join(__dirname+'/archivos/');
const storage = multer.diskStorage({
    destination : function(req,file,cb) {cb(null,folder)},
    filename: function (req,file,cb) {cb(null,file.originalname)}
});
const upload = multer({storage:storage})
app.use(express.urlencoded({extended:true}));
app.use(upload.single('archivo'));

app.post('/RecibirArchivo',(req,res)=>{
    console.log(`se recibio el archivo: ${req.file.originalname}`);
    console.log('se recibio el formulario:'+JSON.stringify(req.body));
    res.json(req.body);
})
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.post('/Recibir', (req, res) => {
    const { tipo, usuario, contraseña } = req.body;
    res.json({ mensaje: 'Datos recibidos exitosamente \n Tipo: '+tipo + '\n Usuario: ' + usuario + '\ Contraseña: '+contraseña });
});
/** 
* @swagger
* /usuarios/:
*   get:
*       tags:
*           - usuarios 
*       summary: Obtiene todos los usuarios
*       description: Obtiene un json que devuelve todos los usuarios que tenemos en la base de datos
*       responses: 
*          200:
*              description: Regresa un json con todos los usuarios registrados
* 
* /usuarios/{id}:
*   get:
*       tags:
*           - usuarios
*       summary: Consultar un usuario mediante su id 
*       description : Devuelve los datos del usuario mediante su id 
*       parameters:
*           - name: id
*             in: path
*             description: ID del usuario
*             required: true
*       schema:
*               type: integer
*               format: int64
*       responses:
*          200:
*              description: Successful operation
*
* /insertar:
*   post:
*       tags:
*           - usuarios
*       summary: Insertar nuevo usuario
*       description : Mediante un json se agrega un nuevo usuario
*       parameters:
*           - name: Tipo
*             in: path
*             description: Tipo de usuario que es o el rol que tiene dentro del sistema
*             required: true
*           - name: Nombre
*             in: path
*             description: EL nombre que tendra el usuario
*             required: true
*           - name: Contraseña
*             in: path 
*             description: Contraseña para ingresar del usuario
*             required: true
*       schema:
*               type: integer
*               format: int64
*       responses:
*          200:
*              description: Successful operation
* /usuario:
*   put:
*       tags:
*           - usuarios
*       summary: Modificar los datos de un usuario en especifico
*       description : Mediante un json se modifica los usuarios
*       parameters:
*           - name: Tipo
*             in: path
*             description: Tipo de usuario que es o el rol que tiene dentro del sistema
*             required: true
*           - name: Nombre
*             in: path
*             description: EL nombre que tendra el usuario
*             required: true
*           - name: Contraseña
*             in: path
*             description: Contraseña para ingresar del usuario
*             required: true
*       schema:
*               type: integer
*               format: int64
*       responses:
*          200:
*              description: Successful operation
* /usuarios:
*   delete:
*       tags:
*           - usuarios
*       summary: Eliminar un usuario
*       description : Mediante un json se modifica los usuarios
*       parameters:
*           - name: Tipo
*             in: path
*             description: Tipo de usuario que es o el rol que tiene dentro del sistema
*             required: true
*       schema:
*               type: integer
*               format: int64
*       responses:
*          200:
*              description: Successful operation
*/
app.get("/usuarios",async(req,res)=>{    
    try{
        const token = req.token
        
            const conn=await mysql.createConnection({host:'localhost',user:'root',password:'',database:'login'})
            const[rows,fields]=await conn.query('SELECT * from usuario');
            res.json(rows);
        
        
            console.log("NO diste bien la key bro");
            res.status(401).json({mensaje: 'Token inválido'});
        
    }catch(err){
        res.status(500).json({mensaje:err.sqlMessage});
    }
});

const basicAuth = require('express-basic-auth');

// Configurar el middleware de autenticación básica
const auth = basicAuth({
    users: { 'Fermin921': '1234' }, // 
    challenge: true, // 
    unauthorizedResponse: 'Acceso no autorizado', // 
});

  // Ruta protegida que requiere autenticación
app.get('/ruta-protegida', auth, (req, res) => {
    res.send('¡Acceso permitido!');
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

const swaggerDocs = swaggerjsDoc(swaggerOptions);

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));
app.get("/options",(req,res)=>
{
    res.json(data)
})

app.use("/api-docs-json",(req,res)=>{
    res.json(swaggerDocs);
});

 // define title and specUrl location
 // serve redoc
app.get(
    '/api-docs-redoc',
    redoc({
    title: 'API Docs',
    specUrl: '/api-docs-json',
      nonce: '', // <= it is optional,we can omit this key and value
      // we are now start supporting the redocOptions object
      // you can omit the options object if you don't need it
      // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
        theme: {
        colors: {
            primary: {
            main: '#6EC5AB'
            }
        },
        typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: '15px',
            lineHeight: '1.5',
            code: {
            code: '#87E8C7',
            backgroundColor: '#4D4D4E'
            }
        },
        menu: {
            backgroundColor: '#ffffff'
        }
        }
    }
    })
);

app.listen(8080,()=>{
    console.log("Servidor express escuchando en el puerto 8080");
});

