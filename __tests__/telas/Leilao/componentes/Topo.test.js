import React from 'react';
import { render, within } from '@testing-library/react-native';

import Topo from '../../../../src/telas/Leilao/componentes/Topo';

jest.mock('../../../../src/negocio/formatadores/moeda.js', () => ({
  formataDecimalParaReal: jest.fn((valor) => valor),
}));

describe('telas/Leilao/componentes/Topo', () => {
  const leilao = {
    nome: 'Leilão de teste',
    descricao: 'Descrição do leilão',
    lances: [
      {
        valor: 1200,
      },
    ],
    valorInicial: 1000,
  };

  it('deve renderizar mostrando as informações de nome, descricao, melhor lance e valor inicial', () => {
    const { getByText, getByA11yHint } = render(<Topo {...leilao} />);

    expect(getByText(leilao.nome)).toBeTruthy();
    expect(getByText(leilao.descricao)).toBeTruthy();
    expect(within(getByA11yHint('Melhor Lance')).getByText('1200')).toBeTruthy();
    expect(within(getByA11yHint('Valor Inicial')).getByText('1000')).toBeTruthy();
  });
});