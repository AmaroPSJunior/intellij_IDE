export default class ServiceFactory {
  constructor(http) {
    this.$http = http;
  }

  loadPromise(promiFn) {
    return new Promise((resolve, reject) => {
      const promi = promiFn();
      promi.then((moduloRes) => {
        const instancia = new moduloRes.default({ http: this.$http });
        instancia.http = this.$http;
        resolve(instancia);
      }).catch(reject);
    });
  }

  pessoaService() {
    return this.loadPromise(() => import('./biz/PessoaServiceBiz'));
  }
}
