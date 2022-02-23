import React from 'react';
import { render } from '@testing-library/react-native';
import { ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

import EnviaLance from '../../../../src/telas/Leilao/componentes/EnviaLance';

describe('telas/Leilao/componentes/EnviaLance', () => {
  it('deve enviar o lance quando o botão for pressionado', () => {
    const enviaLance = jest.fn(() => new Promisse(resolve => resolve(ENVIADO)))

    const { toJSON } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor="blue"
      />
    );

    console.log(toJSON());
  });
});
