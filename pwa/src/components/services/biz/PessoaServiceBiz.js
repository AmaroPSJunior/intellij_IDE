import ResourceFactory from '../../resources/ResourceFactory';

export default class PessoaServiceBiz {
  constructor(injectables) {
    this.resourceFactory = new ResourceFactory(injectables);
  }

  listaPessoas() {
    this.resourceFactory.pessoa().then((res) => res.listaPessoas());
  }

  pessoaPorId(id) {
    this.resourceFactory.pessoa().then((res) => res.pessoaPorwId(id));
  }

  novaPessoa(pessoaa) {
    this.resourceFactory.pessoa().then((res) => res.novaPessoa(pessoaa));
  }
}
