import { obtemLeilao, obtemLeiloes } from '../../src/repositorio/leilao';
import apiLeiloes from '../../src/servicos/apiLeiloes';

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão',
  }
]

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno
      });
    }, 100);
  });
};

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 100);
  });
};

jest.mock('../../src/servicos/apiLeiloes');

describe('repositorio/leilao', () => {

  beforeEach(() => {
    apiLeiloes.get.mockClear();
  });

  describe('obtemLeiloes', () => {
    it('deve retornar um array de leilões', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));

      const leiloes = await obtemLeiloes();

      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(leiloes).toEqual(mockLeiloes);
    });

    it('deve retornar um array vazio caso erro na requisição', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

      const leiloes = await obtemLeiloes();

      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(leiloes).toEqual([]);
    });
  });

  describe('obtemLeilao', () => {
    it('deve retornar um leilão', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes[0]));

      const leilao = await obtemLeilao(1);
      expect(leilao).toEqual(mockLeiloes[0]);
    });

    it('deve retornar um objeto vazio caso erro na requisição', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

      const leilao = await obtemLeilao(1);
      expect(leilao).toEqual({});
    });
  });
});