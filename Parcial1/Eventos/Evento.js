const events = require('events');

function Saludar() 
{
    const emisor = new events.EventEmitter();

    setTimeout(() => emisor.emit('Saludar', 'Fermin'), 3000);
    setTimeout(() => emisor.emit('Saludar', 'Fermin'), 5000);
    emisor.emit('Saludar', 'Pasa');

    return emisor;
}

let sal = Saludar();

sal.on('Saludar', (nombre) =>
{
    console.log('Que rollo ' + nombre);
});



// emisor.on('Saludar',(nombre)=>
// {
//     console.log('Hola',nombre)
// });

// emisor.addListener('Saludar',(nombre)=>
// {
//     console.log('Hola'+nombre)
// });

// emisor.emit('Emit','Fermin');