import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import AppRotas from '../../src/rotas/AppRotas';
import ListaLeiloes from '../../src/telas/ListaLeiloes';
import Leilao from '../../src/telas/Leilao';

jest.mock('../../src/telas/ListaLeiloes');
jest.mock('../../src/telas/Leilao');

describe('rotas/AppRotas', () => {
  it('deve renderizar sem erros', () => {
    ListaLeiloes.mockImplementation(() => <View testID="ListaLeiloes" />);
    Leilao.mockImplementation(() => <View testID="Leilao" />);
    const { toJSON } = render(<AppRotas />);

    expect(toJSON()).toMatchSnapshot();
  });
});