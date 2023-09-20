const events = require('events');
const emisor = new events.EventEmitter();

function Saludar() 
{
    const emisor = new events.EventEmitter();
    setTimeout(()=> emisor.emit('Que rollo','Fermin'),3000);
    setTimeout(()=> emisor.emit('Que rollo','Fermin'),5000);
    emisor.emit('Que rollo','PAsa');
    return emisor
    
}
let sal = Saludar();

sal.on('Saluda',(nombre) =>
{
    console.log('Que rollo'+nombre);
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