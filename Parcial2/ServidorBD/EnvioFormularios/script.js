document.getElementById('Forma').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Recopilar datos del formulario
    const formData = new FormData(this);

    // Opción 1: Usando la etiqueta Form
    // this.submit(); // Envía el formulario

    // Opción 2: Usando el API Fetch
    fetch('http://localhost:8080/Recibir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('Formas').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío por defecto del formulario

    const formData = new FormData(this);

    fetch('http://localhost:8080/RecibirArchivo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => console.error('Error:', error));
});

