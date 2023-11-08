const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/search', (req, res) => {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const artistName = req.query.artist;

    const apiUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;

const options = {
    url: apiUrl,
    headers: {
    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    json: true
};

request.get(options, (error, response, body) => {
    try {
        if (!error && response.statusCode === 200) {
            const artist = body.artists.items[0];
            
            if (artist) {
                res.send(`<h2>Artista encontrado:</h2><h1>${artist.name}</h1>`);
            } else {
                res.send('<h2>No se encontraron resultados</h2>');
            }
            } else {
            res.send('Error al hacer la petición a la API de Spotify');
            }
    }
    catch (error) {
        console.error(error);
                res.status(500).json({ message: 'Error interno del servidor' });
    }
});
});

app.get('/search-json', (req, res) => {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const artistName = req.query.artist;

    const apiUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;

const options = {
    url: apiUrl,
    headers: {
    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    json: true
};

request.get(options, (error, response, body) => {
    try 
    {  
        if (!error && response.statusCode === 200) {
        const artist = body.artists.items[0];
    
        if (artist) {
            res.json({
            name: artist.name,
            popularity: artist.popularity,
            genres: artist.genres,
            followers: artist.followers.total
        });
        } else {
            res.status(404).json({ message: 'Artista no encontrado' });
        }
        } else {
        res.status(500).json({ message: 'Error al hacer la petición a la API de Spotify' });
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
});

app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
});
