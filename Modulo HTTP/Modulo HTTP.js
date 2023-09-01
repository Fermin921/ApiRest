let http = require('http');

servidor = http.createServer(function(req,res) {
    res.write('Servidor HTTP contestando');
    res.header("ACCESS-CONTROL-ALLOW-ORIGIN","*")
    res.end();
})

servidor.listen(8080);