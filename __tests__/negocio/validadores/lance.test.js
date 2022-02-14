import { validaLance, validaFormatoNumericoDoLance } from '../../../src/negocio/validadores/lance';
import {
  VALIDO,
  INVALIDO,
  MENOR_QUE_VALOR_INICIAL,
  MENOR_OU_IGUAL_AOS_LANCES
} from '../../../src/negocio/constantes/estadosLance';

describe('negocio/validadores/lance', () => {
  describe('validaLance', () => {
    it('deve retornar VALIDO quando o valor for maior que o maior lance do leilão', () => {
      const valorLance = 30;
      const leilao = {
        valorInicial: 10,
        lances: [
          {
            valor: 10,
          },
          {
            valor: 20,
          },
        ],
      };
      const resultado = validaLance(valorLance, leilao);
      expect(resultado).toBe(VALIDO);
    });

    it('deve retornar VALIDO quando o valor for igual ao valor inicial do leilão', () => {
      const valorLance = 10;
      const leilao = {
        valorInicial: 10,
        lances: [],
      };
      const resultado = validaLance(valorLance, leilao);
      expect(resultado).toBe(VALIDO);
    });

    it('deve retornar VALIDO quando o valor for maior que o valor inicial do leilão', () => {
      const valorLance = 20;
      const leilao = {
        valorInicial: 10,
        lances: [],
      };
      const resultado = validaLance(valorLance, leilao);
      expect(resultado).toBe(VALIDO);
    });

    it('deve retornar MENOR_OU_IGUAL_AOS_LANCES quando o valor for menor que o maior lance do leilão', () => {
      const valorLance = 15;
      const leilao = {
        valorInicial: 10,
        lances: [
          {
            valor: 10,
          },
          {
            valor: 20,
          },
        ],
      };
      const resultado = validaLance(valorLance, leilao);
      expect(resultado).toBe(MENOR_OU_IGUAL_AOS_LANCES);
    });

    it('deve retornar MENOR_OU_IGUAL_AOS_LANCES quando o valor for igual ao maior lance do leilão', () => {
      const valorLance = 20;
      const leilao = {
        valorInicial: 10,
        lances: [
          {
            valor: 10,
          },
          {
            valor: 20,
          },
        ],
      };
      const resultado = validaLance(valorLance, leilao);
      expect(resultado).toBe(MENOR_OU_IGUAL_AOS_LANCES);
    });

    it('deve retornar MENOR_QUE_VALOR_INICIAL quando o valor for menor que o valor inicial do leilão', () => {
      const valorLance = 9;
      const leilao = {
        valorInicial: 10,
        lances: [],
      };
      const resultado = validaLance(valorLance, leilao);
      expect(resultado).toBe(MENOR_QUE_VALOR_INICIAL);
    });
  });
  
  describe('validaFormatoNumericoDoLance', () => {
    it('deve retornar VALIDO quando o valor for um número inteiro', () => {
      const valorEmTexto = '123456789';
      const resultado = validaFormatoNumericoDoLance(valorEmTexto);
      expect(resultado).toBe(VALIDO);
    });

    it('deve retornar VALIDO quando o valor for um número decimal com vírgula', () => {
      const valorEmTexto = '123,45';
      const resultado = validaFormatoNumericoDoLance(valorEmTexto);
      expect(resultado).toBe(VALIDO);
    });

    it('deve retornar INVALIDO quando o valor for um número decimal com ponto', () => {
      const valorEmTexto = '123.45';
      const resultado = validaFormatoNumericoDoLance(valorEmTexto);
      expect(resultado).toBe(INVALIDO);
    });

    it('deve retornar INVALIDO quando o valor for não for um número', () => {
      const valorEmTexto = 'dez e noventa (10,90)';
      const resultado = validaFormatoNumericoDoLance(valorEmTexto);
      expect(resultado).toBe(INVALIDO);
    });
  });
});