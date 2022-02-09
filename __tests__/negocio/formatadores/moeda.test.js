import { formataBrasileiroParaDecimal, formataDecimalParaReal } from '../../../src/negocio/formatadores/moeda';

describe("negocio/formatadores/moeda", () => {

  describe("formataBrasileiroParaDecimal", () => {
    it("deve retornar 8.59 quando o valor for '8,59'", () => {
      expect(formataBrasileiroParaDecimal('8,59')).toBe(8.59);
    });

    it("deve retornar 500 quando o valor for '500'", () => {
      expect(formataBrasileiroParaDecimal('500')).toBe(500);
    });
  });

  describe("formataDecimalParaReal", () => {
    it("deve retornar R$ 8,59 quando o valor for 8.59", () => {
      expect(formataDecimalParaReal(8.59)).toMatch(/R\$\s8,59/);
    });

    it("deve retornar R$ 500,00 quando o valor for 500", () => {
      expect(formataDecimalParaReal(500)).toMatch(/R\$\s500,00/);
    });
  });
});
