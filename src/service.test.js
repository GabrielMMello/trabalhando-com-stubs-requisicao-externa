const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
BASE_URL_1 = "https://swapi.dev/api/planets/1/"
BASE_URL_2 = "https://swapi.dev/api/planets/2/"
const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json'),
}
  ;
(async () => {

  // {
  //   // Vai para a internet!!
  //   const service = new Service()
  //   const withoutStub = await new Service().makeRequest(BASE_URL_2)
  //   console.log(JSON.stringify(withoutStub))
  // }


  //*Para testar apenas a lógica, sem testar a API externa

  const service = new Service()
  // Substitui o makeRequest pare evitar usar a internet
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

  {
    const expected = {
      "name": "Tatooine",
      "surfaceWater": "1",
      appearedIn: 5
    }
    const results = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(results, expected)
  }

  {
    const expected = {
      "name": "Alderaan",
      "surfaceWater": "40",
      appearedIn: 2
    }
    const results = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(results, expected)
  }
})()