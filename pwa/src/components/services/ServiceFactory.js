export default class ServiceFactory {
  constructor(http) {
    this.$http = http;
  }

  loadPromise(promiFn) {
    return new Promise((resolve) => {
      const promi = promiFn();
      promi.then((modu) => {
        console.log('🟢 modu', modu);
        const instancia = new modu.Default({ ttp: this.$http });
        instancia.http = this.$http;
        resolve(instancia);
      });
    });
  }

  pessoaService() { return this.loadPromise(() => import('./biz/PessoaServiceBiz')); }
}
