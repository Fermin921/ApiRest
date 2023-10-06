const express = require('express');
const mysql = require('mysql2/promise');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login',
    connectionLimit: 10 
});

app.get("/usuarios", async (req, res,next) => {
    try {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * from usuario');
        conn.release();
        res.json(rows);
    } catch (err) {
        next(err)
        // console.error(err);
        // res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
});

app.get("/usuario/:id", async (req, res,next) => {
    try {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * from usuario where Tipo = ?', [req.params.id]);
        conn.release();
        if (rows.length == 0) {
            res.status(404).json({ mensaje: "Usuario No existe" });
        } else {
            res.json(rows);
        }
    } catch (err) {
        next(err);
        // console.error(err);
        // res.status(500).json({ mensaje: 'Error al obtener usuario' });
    }
});

app.post('/insertar', [
    check('Tipo').isNumeric().withMessage('Tipo debe ser numérico'),
    check('Usuario').notEmpty().withMessage('Usuario es requerido'),
    check('Contraseña').notEmpty().withMessage('Contraseña es requerida')
], async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    const { Tipo, Usuario, Contraseña } = req.body;

    try {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.execute('INSERT INTO usuario (Tipo, Usuario, ontraseña) VALUES (?, ?, ?)', [Tipo, Usuario, Contraseña]);
        conn.release();
        res.json({ message: 'Datos insertados correctamente' });
    } catch (err) {
        next(err)
        // console.error(error);
        // res.status(500).json({ message: 'Error al insertar datos, favor de revisar los datos ingresados' });
    }
});

app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).send({error : 'Algo salió mal!', message: err.message});
});

app.listen(8080, () => {
    console.log(
        'Servidor iniciado en el puerto 8080');
});
