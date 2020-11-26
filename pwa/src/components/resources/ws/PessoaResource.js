export default class PessoaResource {
  constructor(injectables) {
    this.$http = injectables;
  }

  listaPessoas() {
    return new Promise((resolve, reject) => {
      this.$http.http.get('pessoa/')
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  }

  pessoaPorId(id) {
    return new Promise((resolve, reject) => {
      this.$http.http.get(`pessoa/id/${id}`)
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  }

  novaPessoa(pessoa) {
    return new Promise((resolve, reject) => {
      this.$http.http.post('novaPessoa/', pessoa)
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  }
}
