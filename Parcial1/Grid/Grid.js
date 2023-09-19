document.addEventListener('DOMContentLoaded', function() {
    // Hacer una solicitud a la API
    fetch('http://localhost:8080/usuarios')
    .then(response => response.json())
    .then(data => {
        const tabla = $('#miTabla');
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
