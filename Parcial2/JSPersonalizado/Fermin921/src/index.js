const frases = [
    "AAA",
    "Hasta Luego",
    "Api REST",
    "Bienvenido",
    "Buenos dias"
];
/**
   * Esta función regresa una frase
   * @param {*} indice posición de la frase
   * @returns retorna la frase mediante la posición recibida captada por el parámetro indice
   */
function obtenerFrase(indice) {
    if (indice >= 0 && indice < frases.length) {
    return frases[indice];
    } else {
    return "Índice fuera de rango. Por favor, elige un índice válido.";
    }
}

const fraseObtenida = obtenerFrase(indice);
console.log(fraseObtenida);
