export default class ResourceFactory {
  constructor(injectables) {
    this.injectables = injectables;
    this.map = {};
  }

  createOrLoadPromise(mappingName, loadFn) {
    return new Promise((resolve, reject) => {
      if (this.map[mappingName]) {
        resolve(this.map[mappingName]);
      } else {
        loadFn().then((moduloRes) => {
          const instancia = new moduloRes.default(this.injectables);
          this.map[mappingName] = instancia;
          resolve(instancia);
        }).catch(reject);
      }
    });
  }

  pessoa() { return this.createOrLoadPromise('pessoa', () => import('./ws/PessoaResource')); }
}
