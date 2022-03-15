import React from 'react';
import { act, render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, TouchableWithoutFeedback } from 'react-native';

import Leilao from '../../../src/telas/Leilao';
import Topo from '../../../src/telas/Leilao/componentes/Topo';
import Lance from '../../../src/telas/Leilao/componentes/Lance';
import EnviaLance from '../../../src/telas/Leilao/componentes/EnviaLance';

import useLeilao from '../../../src/hooks/useLeilao';

const mockObteLeilao = jest.fn();
const mockEnviarLance = jest.fn(() => ({ valido: true }));

jest.mock('../../../src/hooks/useLeilao', () => jest.fn(() => ([
  {
    id: 1,
    nome: 'Leilão de teste',
    lances: [
      {
        id: 1,
        valor: 1200,
      },
      {
        id: 2,
        valor: 1300,
      },
    ]
  },
  mockObteLeilao,
  mockEnviarLance,
])));

jest.mock('../../../src/telas/Leilao/componentes/Topo');
jest.mock('../../../src/telas/Leilao/componentes/Lance');
jest.mock('../../../src/telas/Leilao/componentes/EnviaLance');

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn().mockReturnValue({
    params: {
      id: 1,
    },
  }),
}));

describe('telas/Leilao', () => {
  const [ leilao, obtemLeilao, enviaLance ] = useLeilao();

  beforeAll(() => {
    Topo.mockImplementation(({ nome }) => <Text>Topo: { nome }</Text>);
    Lance.mockImplementation(({ valor }) => <Text>Lance: { valor }</Text>);
    EnviaLance.mockImplementation(({ enviaLance }) => <TouchableWithoutFeedback onPress={enviaLance}>
      <Text>Enviar Lance</Text>
    </TouchableWithoutFeedback>);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar mostrando o componente de Leilao', () => {
    const { getByText } = render(<Leilao />);

    expect(getByText('Topo: Leilão de teste')).toBeTruthy();
    expect(getByText('Lance: 1200')).toBeTruthy();
    expect(getByText('Lance: 1300')).toBeTruthy();

    expect(obtemLeilao).not.toHaveBeenCalled();
    expect(enviaLance).not.toHaveBeenCalled();
  });

  it('deve atualizar o leilao quando a flatlist recarregar', () => {
    const { getByTestId } = render(<Leilao />);

    const flatList = getByTestId('lista-lances');

    act(() => {
      flatList.props.onRefresh();
    });

    expect(mockObteLeilao).toHaveBeenCalledTimes(1); 
    expect(mockEnviarLance).not.toHaveBeenCalled();
  });

  it('deve chamar enviaLance quando o lance for enviado e recarregar o leilão', async () => {
    const { getByText } = render(<Leilao />);

    fireEvent.press(getByText('Enviar Lance'));

    expect(mockEnviarLance).toHaveBeenCalledTimes(1); 
    expect(mockObteLeilao).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(mockObteLeilao).toHaveBeenCalledTimes(1);
    });
  });

  it('não deve crashar quando o leilão estiver estiver carregando', async () => {
    useLeilao.mockImplementation(() => ([[]]));
    const { getByTestId } = render(<Leilao />);

    expect(() => getByTestId('lista-lances')).toThrow();
  });
});