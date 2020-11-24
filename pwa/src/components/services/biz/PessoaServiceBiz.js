import ResourceFactory from '../../resources/ResourceFactory';

export default class MenuServiceBiz {
  constructor(injectables) {
    this.resourceFactory = new ResourceFactory(injectables);
  }

  async listaPessoas() {
    const res = await this.resourceFactory.pessoa();
    return res.listaPessoas();
  }

  async pessoaPorId(id) {
    const res = await this.resourceFactory.pessoa();
    return res.pessoaPorId(id);
  }

  async novaPessoa(pessoaa) {
    const res = await this.resourceFactory.pessoa();
    return res.novaPessoa(pessoaa);
  }
}
