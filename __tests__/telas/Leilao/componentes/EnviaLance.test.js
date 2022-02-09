import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ENVIADO, NAO_ENVIADO } from "../../../../src/negocio/constantes/estadosLance";

describe("telas/Leilao/componentes/EnviaLance", () => {
  it("deve enviar o lance quando o botão for pressionado", async () => {
    const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)));
    const cor = "blue";

    const { getByPlaceholderText, getByA11yHint, getByText } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor={cor}
      />
    );

    const input = getByPlaceholderText("R$");
    const botao = getByA11yHint("Enviar lance");

    fireEvent.changeText(input, "10");
    fireEvent.press(botao);

    await waitFor(() => {
      expect(enviaLance).toHaveBeenCalledWith("10");
      expect(getByText(ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(NAO_ENVIADO)).toThrow();
  });

  it("deve exibir o erro quando o lance não for enviado", async () => {
    const enviaLance = jest.fn(() => new Promise(resolve => resolve(NAO_ENVIADO)));
    const cor = "blue";

    const { getByPlaceholderText, getByA11yHint, getByText } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor={cor}
      />
    );

    const input = getByPlaceholderText("R$");
    const botao = getByA11yHint("Enviar lance");

    fireEvent.changeText(input, "10");
    fireEvent.press(botao);

    await waitFor(() => {
      expect(enviaLance).toHaveBeenCalledWith("10");
      expect(getByText(NAO_ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(ENVIADO)).toThrow();
  });
});
