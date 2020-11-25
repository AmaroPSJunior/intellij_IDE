export default class PessoaResource {
  constructor(injectables) {
    this.$http = injectables;
  }

  listaPessoas() { return this.$http.http.get('pessoa/').then((res) => res.json()); }

  pessoaPorId(id) { return this.$http.http.get(`pessoa/id/${id}`).then((res) => res.json()); }

  novaPessoa(pessoa) {
    console.log('🔵 novaPessoa > this.$http', this.$http);

    return this.$http.http.post('pessoa/', pessoa)
      .then((res) => {
        console.log('🔵 novaPessoa > res', res);
        return res.json();
      });
  }
}
