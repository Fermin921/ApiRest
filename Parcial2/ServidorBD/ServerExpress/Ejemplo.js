const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bearerToken = require('express-bearer-token'); // Agregamos el middleware

const app = express();
const cors = require('cors');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(express.json());
app.use(bearerToken()); // Agregamos el middleware

// Resto de tu código...

app.get("/usuarios", async (req, res) => {
    // Aquí puedes acceder al token si es necesario
    const token = req.token;
    // Resto de tu código...
});

// Resto de tus rutas...

app.listen(8080, () => {
    console.log("Servidor express escuchando en el puerto 8080");
});
