<template>
  <div>Home</div>
</template>

<script>
import ServiceFactory from '../services/ServiceFactory';

export default {
	components: {},
  props:[],
  data() {
    return {
      pessoaService: null,
    }
  },
  created() {
    this.carregarRecursos()
      .then(() => this.pessoaService.listaPessoas())
      .catch(e => console.error(e));
  },

  updated() {},

  methods:{
		async carregarRecursos() {
				try {
          const sf = new ServiceFactory(this.$http);
          this.pessoaService	= await sf.pessoaService();
				} catch(e) {
          this.modalError = e;
				}
		}
  }
}

</script>

<style lang="scss" scoped>

</style>
