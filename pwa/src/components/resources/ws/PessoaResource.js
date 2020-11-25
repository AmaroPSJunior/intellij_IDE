export default class PessoaResource {
  constructor(injectables) {
    this.$http = injectables;
  }

  listaPessoas() {
    const response = await this.$http.get('pessoa/').then((res) => res))
    const rs = await response.json();
    return rs;
  }

  pessoaPorId(id) {
    const response = await this.$http.get(`pessoa/id/${id}`).then((res) => res))
    const rs = await response.json();
    return rs;
  }

  novaPessoa(pessoa) {
    debugger;
    const response = await this.$http.post('pessoa/', pessoa).then((res) => res))
    const rs = await response.json();
    return rs;
  }
}
