<template>
  <div>
    <div class="espacador_conteudo">
      <div class="row">
        <div>
          <div class="espacador_conteudo collection">

            <div class="row collection-item">
              Ative quais abaixo possuir&atilde;o permiss&atilde;o de acesso aos <b>campos adicionais do pedido</b>.<br>

              <div class="recursos-content col s12" v-if="true">
                <div class="container-card col s12 m6" v-for="(itemCampoAdd, indexCampoAdd) in camposAdicionais" :key="indexCampoAdd">
                    <div class="card col s12">
                        <div class="col s12"><strong>{{itemCampoAdd.pcadLabel}}</strong></div>
                        <template v-if="true">
                            <div v-for="(itemUsuario, indexUsua) in listaUsuarios" :key="indexUsua" class="div-action" :class="{'element-disabled':false}">
                                <div>
                                    {{itemUsuario}}
                                    <i v-if="true"
                                        ref="infoTooltip"
                                        class="material-icons tooltipped right"
                                        :data-tooltip="`Ultima alteração feita por `">
                                        info_outline
                                    </i>
                                </div>
                                <div class="switch" v-if="true"><label>Inativo
                                    <input
                                        type="checkbox"
                                        true-value="ATIVO" false-value="INATIVO"
                                        @change="abreModalConfirm(true)"
                                        :disabled="false"
                                        v-model="amaro"
                                    />
                                    <span class="lever">
                                    </span>Ativo</label>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StHelper from '../components/helpers/StHelper';
import ServiceFactory from '../components/services/ServiceFactory';

export default {
  name: 'PageIndex',
  data() {
    return {
      unidadeNegocioServ: null,
      filtroUnidadeNegocio: null,
      listaUnidadeNegocio: ['unidade 1','unidade 2','unidade 3'],
      arteAniversario: null,
      unegSelecionada: null,
      amaro: null,
      showNiverArt: false,
      listaUsuarios: ['amaro 1','pedro 2','junior 3'],
      usuaAdicionados: ['teste 1','teste 2','teste 3'],
      tipoUsusSelecionado: [],
      camposAdicionais: ['campo 1','campo 2','campo 3'],
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
    titulo: function() {
			return this.unegSelecionada?this.unegSelecionada.unegNome:'Parâmetros';
		},
    icone: function () {
			return this.unegSelecionada?'arrow_back':'home';
		},
  },
  methods: {
    carregarRecursos() {
      return new Promise((resolve, reject) => {
        const factory = new ServiceFactory(this.$http);
        factory.unidadeNegocio().then(serv=>this.unidadeNegocioServ = serv)
          .then(resolve)
          .catch(reject);
      })
		},

    addItemSelecionado(i) {
      // console.log('🟢 data', $(`#${data}`))
      // console.log('🟢 data2', $(data))
      console.log('🟢 ivent', $(i).parent().value)

      if(this.tipoUsusSelecionado && !this.usuaAdicionados.includes(this.tipoUsusSelecionado)) {
        // this.unidadeNegocioServ.atualizaUserRole(this.tipoUsusSelecionado)
        //   .then(()=>this.tipoUsusSelecionado = null)
        //   .catch(err=>console.log('🔴 err',err))
      } else {
        alert('nao pode ser vazio ou ja existe');
      }
    },

    selecionou(i) {
      console.log('🟢 selecionou', i.target.parentNode)
    },

    removeItemSelecionado() {
      //   this.tipoUsusSelecionado = null;
      //   this.unidadeNegocioServ.obterRoleUsersAdicionados(id)
      //     .then(()=>this.unidadeNegocioServ.atualizaUserRole(id, this.tipoUsusSelecionado))
      //     .then(()=>this.tipoUsusSelecionado = null)
      //     .catch(err=>console.log('🔴 err',err))
    },

  },
}
</script>

<style lang="scss" scoped>
  .clear-spacing {
    height:0;
    width:0;
  }

  .p0 {
    padding: 0;
  }

 .content-scoped {
    padding: 13px 20px;
    padding-left: 0;
    height: calc(100vh - 108px);
    margin: 0;

    .card {
      margin-left: 20px;

      .card-image {
        bottom: -25px;
      }

      .div-action {
        display: flex !important;
        justify-content: space-between !important;
      }
    }

    .element-disabled {
      * {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
        filter: gray;
      }
    }

    .recursos-content {
        padding: 0;
        padding-top: 20px;
        height: calc(100% - 145px);
        overflow-y: auto;
        padding-right: 5px;

        .container-card {
            padding: 0;
            height: 190px;
            min-width: 330px;
            padding-left: 20px;
            padding-bottom: 20px;

            .card {
                height: 100%;
                margin: 0;
                left: 1px;

                .col {

                    &:first-child {
                        border-bottom: 1px solid #ccc;
                        padding: 10px 0;
                        text-transform: uppercase;
                    }

                    i {
                        font-weight: 600;
                        color: #3949ab80;
                        cursor: pointer;

                        &:hover {
                                color: #3949ab;
                        }
                    }

                    &.div-action{
                        display: flex;
                        justify-content: space-between;
                        padding: 10px 0;

                        > span {
                            flex-grow: 1;
                            padding-right: 10px;

                            i {
                                margin: 0;
                            }
                        }
                    }
                }

                input[type=checkbox] {
                    + .lever {
                        background-color: #b71c1c80;
                        opacity: .5;

                        &::before {
                            background-color: #b71c1c80;
                        }

                        &::after {
                            background-color: #B71C1C;
                        }
                    }

                    &:checked + .lever {
                        background-color: #3949ab80;
                        opacity: 1;

                        &::before {
                            background-color: #3949ab80;
                        }

                        &::after {
                            background-color: #3949ab;
                        }
                    }
                }
            }

            input[type=checkbox] {
                + .lever {
                    background-color: #b71c1c80;
                    opacity: .5;

                    &::before {
                        background-color: #b71c1c80;
                    }

                    &::after {
                        background-color: #B71C1C;
                    }
                }

                &:checked + .lever {
                    background-color: #3949ab80;
                    opacity: 1;

                    &::before {
                        background-color: #3949ab80;
                    }

                    &::after {
                        background-color: #3949ab;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .content-scoped {
        padding: 5px;
        padding-left: 0;

        .card {
            margin-left: 5px;

            .card-content {
                padding: 0px 10px;
            }
        }

        .recursos-content {
            .container-card {
                padding: 0 5px;
                padding-bottom: 20px;
            }
        }
    }
}
</style>
