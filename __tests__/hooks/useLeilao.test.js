import { renderHook, act } from '@testing-library/react-hooks';
import useLeilao from '../../src/hooks/useLeilao';

import { obtemLeilao } from '../../src/repositorio/leilao';
import { adicionaLance, obtemLancesDoLeilao } from '../../src/repositorio/lance';

import { NAO_ENVIADO, ENVIADO, INVALIDO, MENOR_OU_IGUAL_AOS_LANCES } from '../../src/negocio/constantes/estadosLance';

jest.mock('../../src/repositorio/leilao');
jest.mock('../../src/repositorio/lance');

const mockLeilao = {
  id: 1,
  nome: 'Leilão',
  descricao: 'Descrição do leilão',
  valorInicial: 100,
};

const mockLeilaoAtualizado = {
  id: 1,
  nome: 'Leilão atualizado',
  descricao: 'Descrição do leilão atualizado',
  valorInicial: 100,
};

const mockLancesDoLeilao = [
  {
    id: 1,
    valor: 102,
  }
];

const mockLancesDoLeilaoAtualidado = [
  {
    id: 1,
    valor: 102,
  },
  {
    id: 2,
    valor: 103,
  }
];

describe('hooks/useLeilao', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    obtemLeilao.mockReturnValue(mockLeilao);
    obtemLancesDoLeilao.mockReturnValue(mockLancesDoLeilao);
  });

  it('deve retornar o leilão como primeiro parâmetro', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLeilao());
    expect(result.current[0]).toEqual({});

    await waitForNextUpdate();
    expect(result.current[0]).toEqual({ ...mockLeilao, lances: mockLancesDoLeilao });
  });

  it('deve retornar uma função para atualizar como segundo parâmetro', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLeilao());
    await waitForNextUpdate();

    obtemLeilao.mockReturnValue(mockLeilaoAtualizado);
    obtemLancesDoLeilao.mockReturnValue(mockLancesDoLeilaoAtualidado);

    await act(() => result.current[1]());
    expect(result.current[0]).toEqual({ ...mockLeilaoAtualizado, lances: mockLancesDoLeilaoAtualidado });
  });

  describe('[_, _, enviaLance]', () => {
    it('deve enviar um lance caso válido', async () => {
      adicionaLance.mockReturnValue(true);

      const { result, waitForNextUpdate } = renderHook(() => useLeilao());
      await waitForNextUpdate();

      let statusLance;
      await act(async () => {
        statusLance = await result.current[2]('110');
      });
      expect(statusLance).toEqual(ENVIADO);

      expect(adicionaLance).toHaveBeenCalledWith({ leilaoId: mockLeilao.id, valor: 110 });
    });

    it('deve rejeitar o lance caso o valor não for numérico', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useLeilao());
      await waitForNextUpdate();

      let statusLance;
      await act(async () => {
        statusLance = await result.current[2]('a');
      });
      expect(statusLance).toEqual(INVALIDO);

      expect(adicionaLance).not.toHaveBeenCalled();
    });

    it('deve rejeitar o lance caso o valor for menor ou igual a outros lances', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useLeilao());
      await waitForNextUpdate();

      let statusLance;
      await act(async () => {
        statusLance = await result.current[2]('102');
      });
      expect(statusLance).toEqual(MENOR_OU_IGUAL_AOS_LANCES);

      expect(adicionaLance).not.toHaveBeenCalled();
    });

    it('deve rejeitar o lance caso adicionaLance retornar false', async () => {
      adicionaLance.mockReturnValue(false);

      const { result, waitForNextUpdate } = renderHook(() => useLeilao());
      await waitForNextUpdate();

      let statusLance;
      await act(async () => {
        statusLance = await result.current[2]('110');
      });
      expect(statusLance).toEqual(NAO_ENVIADO);

      expect(adicionaLance).toHaveBeenCalledWith({ leilaoId: mockLeilao.id, valor: 110 });
    });
  });
});
