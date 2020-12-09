<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
      v-if="false"
    >

    <QRcode v-else />
  </q-page>
</template>

<script>
import QRcode from './QRcode.vue';
export default {
  name: 'PageIndex',
  components: { QRcode },
  data() {
    return {
      amaro: null,
    }
  },
  mounted(){
    // $('.tooltipped').tooltip({delay: 50});
  },
  updated(){
    // $('.tooltipped').tooltip({delay: 50});
  },
  created(){
    // this.carregarRecursos()
    //   .then(()=>this.listarUnidadesNegocio())
    //   .then(()=>this.unidadeNegocioServ.obterRoleUsers()).then(res=>this.listaUsuarios = res)
    //   // .then(()=>this.unidadeNegocioServ.obterRoleUsersAdicionados(3)).then(res=>this.usuaAdicionados = res)
    //   .then(()=>this.unidadeNegocioServ.obterListaPcad()).then(res=>this.camposAdicionais = res)
    //   .then(()=> {
    //     this.camposAdicionais.forEach(item => {
    //       return item.listRoleUsua = item.pcadRolesVisualizacaoBloqueada.split(';');
    //     })
    //   })
    //   .then(()=> console.log('🟢 res Adicionados', this.camposAdicionais))

    //   .catch(err=>console.error(err));
  },
  computed: {
    icone: function () {
			return this.unegSelecionada?'arrow_back':'home';
		},
  },
  methods: {},
}
</script>

<style lang="scss" scoped>

</style>
