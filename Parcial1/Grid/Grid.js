document.addEventListener('DOMContentLoaded', function() {
    // Hacer una solicitud a la API
    fetch('http://localhost:8080/usuarios')
    .then(response => response.json())
    .then(data => {
        // Obtener la referencia a la tabla
        const tabla = $('#miTabla');

        // Iterar sobre los datos y agregar filas a la tabla
        data.forEach(item => {
        tabla.bootstrapTable('append', {
            Tipo: item.Tipo,
            Usuario: item.Usuario,
            Contraseña: item.Contraseña
        });
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));
});
