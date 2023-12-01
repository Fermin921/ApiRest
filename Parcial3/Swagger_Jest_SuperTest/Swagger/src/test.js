//supertest
//jest
const request = require('supertest');

let app='http://localhost:8080';

describe("Testear Get a la ruta de usuarios con CallBack", ()=>{
it("Prueba metodo GET de usuarios",()=>{
    request(app)
        .get('/usuarios')
        .expect(200)
        .end((err,res) =>{
        if(err) throw err;
        console.log('GET / deberia devolver un array de usuarios')
        });
})
})

describe('Prueba la ruta GET de usuarios con CallBack y Async-Await', () => {
it('Prueba método GET de usuarios', async () => {
    const response = await request(app).get('/usuarios');
    expect(response.status).toBe(200);
    console.log('GET /usuarios debería devolver un array de usuarios');
});
});