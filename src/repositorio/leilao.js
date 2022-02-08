import apiLeiloes from '../servicos/apiLeiloes';

export async function obtemLeiloes() {
  try {
    const resposta = await apiLeiloes.get(`/leiloes`);
    return resposta.data;
  } catch (erro) {
    return [];
  }
}

export async function obtemLeilao(id) {
  try {
    const resposta = await apiLeiloes.get(`/leiloes/${id}`);
    return resposta.data;
  } catch(erro) {
    return {};
  }
}

export async function mudaLeilao(leilao) {
  try {
    await apiLeiloes.put(`/leiloes/${leilao.id}`, leilao);
    return true;
  } catch(erro) {
    return false;
  }
}