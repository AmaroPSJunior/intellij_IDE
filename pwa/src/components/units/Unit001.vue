<template>
  <div>
    <h5>pessoaId: {{ pessoaId }}</h5>
    <span>Pessoa: {{ pessoa.nome + '/' }}</span>
  </div>
</template>
<script>
import ServiceFactory from '../services/ServiceFactory';

export default {
  components: {},

  props: {
    pessoaId: {
      type: Number,
      require: true,
      default: null,
    },
  },

  data() {
    return {
      pessoaServiceBiz: null,
      pessoa: {},
      hash: null,
      url: null,
    };
  },

  created() {
    this.carregarRecursos()
      .then(() => this.obterPessoa())
      .catch((e) => console.error('🔴 created: ', e));
  },

  updated() {
    // this.obterPessoa();
  },

  methods: {
    carregarRecursos() {
      return new Promise((resolve, reject) => {
        const factory = new ServiceFactory(this.$http);
        factory.pessoaService()
          .then((servRes) => this.pessoaServiceBiz = servRes)
          .then(resolve)
          .catch(reject);
      });
    },

    obterPessoa() {
      this.pessoaServiceBiz.pessoaPorId(this.pessoaId)
        .then((pessoaRes) => this.pessoa = pessoaRes.pessoa)
        .catch((e) => console.error('🔴 obterPessoa: ', e));
    },
  },

  watch: {
    pessoaId: function () {
      this.obterPessoa();
    },
  },
};
</script>
