import ResourceFactory from '../../resources/ResourceFactory';

export default class PessoaServiceBiz {
  constructor(injectables) {
    this.resourceFactory = new ResourceFactory(injectables);
  }

  listaPessoas() {
    return new Promise((resolve, reject) => {
      this.resourceFactory.pessoa()
        .then((res) => res.listaPessoas())
        .then(resolve)
        .catch(reject);
    });
  }

  pessoaPorId(id) {
    return new Promise((resolve, reject) => {
      this.resourceFactory.pessoa()
        .then((res) => res.pessoaPorId(id))
        .then(resolve)
        .catch(reject);
    });
  }

  novaPessoa(pessoaa) {
    return new Promise((resolve, reject) => {
      this.resourceFactory.pessoa()
        .then((res) => res.novaPessoa(pessoaa))
        .then(resolve)
        .catch(reject);
    });
  }
}
