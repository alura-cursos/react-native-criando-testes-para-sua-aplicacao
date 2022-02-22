import { formataBrasileiroParaDecimal, formataDecimalParaReal } from "../../../src/negocio/formatadores/moeda";

describe("negocio/formatadores/moeda", () => {

  describe("formataBrasileiroParaDecimal", () => {

    it("deve retornar 8.59 quando o valor for '8,59'", () => {
      const resultado = formataBrasileiroParaDecimal("8,59");

      expect(resultado).toBe(8.59);
    });

  });

  describe("formataDecimalParaReal", () => {

    it("deve retornar R$ 8,59 quando o valor for 8.59", () => {
      const resultado = formataDecimalParaReal(8.59);

      expect(resultado).toMatch(/R\$\s8,59/);
    });

  });

});