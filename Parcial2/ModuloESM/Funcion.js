let frases = ["Que paso", "AAAAAA", "Hasta luego", "APiREST"];

export function ObtenerFrase(indice) 
{
    return Promise.resolve(frases[indice]);
}

