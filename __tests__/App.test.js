import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import AppRotas from '../src/rotas/AppRotas';

import App from '../App.js';

jest.mock('../src/rotas/AppRotas.js');

describe('App.js', () => {
  it('deve renderizar sem erros', () => {
    AppRotas.mockImplementation(() => <View testID="AppRotasMock" />);
    const { toJSON } = render(<App />);

    expect(toJSON()).toMatchSnapshot();
  });
});