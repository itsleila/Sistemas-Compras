export default async function obterEndereco(cep) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const retorno = await fetch(url);
    if (!retorno.ok) {
      throw new Error(
        'Desculpe ocorreu um error ao buscar o endereço solicitado.',
      );
    }
    const enderecoRetornado = await retorno.json();
    return enderecoRetornado;
  } catch (error) {
    return { error: error.message };
  }
}
