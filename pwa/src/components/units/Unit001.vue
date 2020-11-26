<template>
  <div>
    <h5>Hash: {{hash}}</h5>
    <span>Pessoa: {{ pessoa.nome + '/' }}</span>
  </div>
</template>
<script>
import ServiceFactory from '../services/ServiceFactory';

export default {
  components: {},

  props: {
    id: {
      type: Number,
      required: true,
      default: 3,
    },
  },

  data() {
    return {
      pessoa: {},
      hash: null,
    };
  },

  created() {
    this.carregarRecursos()
      .then(() => this.pessoaPorId())
      .catch((e) => alert('🔴 created: ', e));
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

    pessoaPorId() {
      this.pessoaServiceBiz.pessoaPorId(this.id)
        .then((pessoaRes) => this.pessoa = pessoaRes.pessoa)
        .then(() => this.hash = window.location.hash)
        .catch((e) => alert('🔴 pessoas: ', e));
    },
  },
};
</script>
