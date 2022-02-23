import { obtemLeiloes } from '../../src/repositorio/leilao';

jest.mock('../../src/servicos/apiLeiloes');

describe('respositorio/leilao', () => {

  describe('obtemLeiloes', () => {

    it('deve retornar uma lista de leilões', async () => {
      const leiloes = await obtemLeiloes();
      console.log(leiloes);
    });

  });

});
