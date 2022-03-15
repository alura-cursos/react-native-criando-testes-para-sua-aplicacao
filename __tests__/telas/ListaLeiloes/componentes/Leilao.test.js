import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import Leilao from '../../../../src/telas/ListaLeiloes/componentes/Leilao';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

jest.mock('../../../../src/negocio/formatadores/moeda.js', () => ({
  formataDecimalParaReal: jest.fn((valor) => valor),
}));

describe('telas/ListaLeiloes/componentes/Leilao', () => {
  const navigation = useNavigation();

  const leilao = {
    id: 1,
    nome: 'Leilão de teste',
    valorInicial: 1000,
  };

  beforeEach(() => {
    navigation.navigate.mockClear();
  });

  it('deve renderizar mostrando as informações de nome e valor', () => {
    const { getByText } = render(<Leilao {...leilao} />);

    expect(getByText('Leilão de teste')).toBeTruthy();
    expect(getByText('1000')).toBeTruthy();
  });

  it('deve chamar o método de navegação para a tela de detalhes do leilão', () => {
    const { getByText } = render(<Leilao {...leilao} />);

    fireEvent.press(getByText('Leilão de teste'));

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith('Leilao', { id: 1 });
  });
});