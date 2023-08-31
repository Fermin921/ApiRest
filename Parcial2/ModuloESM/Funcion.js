let frases = ["Que paso", "AAAAAA", "Hasta luego", "APiREST"];

export async function ObtenerFrase(indice) 
{
    return Promise.resolve(frases[indice]);
}