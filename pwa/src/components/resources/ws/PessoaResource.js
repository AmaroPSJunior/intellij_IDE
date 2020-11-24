export default class MenuResource {
  constructor(injectables) {
    this.$http = injectables.http;
  }

  async listaPessoas() {
    const response = await this.$http.get('pessoa/');
    const rs = await response.json();
    return rs;
  }

  async pessoaPorId(id) {
    const response = await this.$http.get(`pessoa/id/${id}`);
    const rs = await response.json();
    return rs;
  }

  async novaPessoa(pessoa) {
    const response = await this.$http.post('pessoa/', pessoa);
    const rs = await response.json();
    return rs;
  }
}
