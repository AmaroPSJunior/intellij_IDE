<template>
  <div>
    <top-loader :pilha="topLoader"/>
    <titulo-padrao :icon="icone" unit="Unit017" :titulo="titulo" @onClick="clickTitulo"></titulo-padrao>
    <error-dialog :errorObject="modalError" @onClose="modalError=null"/>
    <simple-dialog title="Arte de Aniversário" :show="showNiverArt" @onClose="showNiverArt = false">
      <div class="row valign-wrapper">
        <div class="col s12 valign-wrapper">
          <img v-if="unegSelecionada" class="responsive-img" :src="unegSelecionada.unegArteAniversario">
        </div>
      </div>
    </simple-dialog>
    <div v-if="!unegSelecionada">
      <div class="espacador_conteudo">
        <!-- Filtro -->
        <div class="row card white">
          <form class="col s12">
            <div class="row">
              <div class="col s12 m9">
                <i class="material-icons prefix">search</i>
                <input id="filtro-unidade-negocio" ref="filtroUnidadeNegocio" type="text" v-model="filtroUnidadeNegocio" @keyup.enter="filtrar">
                <label for="icon_prefix">Unidade de Neg&oacute;cio</label>
              </div>
              <div class="col s12 m3">
                <a class="waves-effect waves-light btn right" @click.prevent="filtrar">Pesquisar</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Unidades de negócio -->
    <div class="espacador_conteudo">
      <div class="row">
        <template v-if="!unegSelecionada">
          <div class="col s12 m4" v-for="(uneg, indexUneg) in listaUnidadeNegocio" :key="indexUneg" @click.prevent="abrirDetalhe(uneg)">
          <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
              <div class="col s2">
                <i class="material-icons primary-color-text medium">account_balance</i>
              </div>
              <div class="col s10" style="padding-left:30px;cursor:pointer">
                <span class="black-text">
                  <b>{{uneg.unegRefExterno}}-{{uneg.unegNome}}</b><br>
                  {{uneg.unegInRemovido | inremovido}}
                </span>
              </div>
            </div>
          </div>
        </div>
        </template>

        <div v-else>
          <div class="espacador_conteudo collection">
            <div class="row collection-item">
              <div class="col s12">
                <p>Selecione abaixo uma nova arte de aniver&aacute;rio e logo ap&oacute;s clique em salvar. (A arte selecionada ser&aacute; exibida para o cliente anivers&aacute;riante
                  de m&ecirc;s no momento em que ele fizer login.)</p>
              </div>
            </div>
            <div class="row collection-item">
              <div class="col s12">
                <div class="switch">
                  <label>
                    <input type="checkbox" v-model="uneg.unegInArteAnivHabilitada" @change="alterarFlagAnivHabilitado(unegSelecionada)" >
                    <span class="lever"></span>
                    Exibir imagem de anivers&#225;rio
                  </label>
                </div>

              </div>
            </div>
            <div class="row collection-item">
              <div class="col s12">
                <div class="btn">
                  <span>Arquivo</span>
                  <input class="file-path-wrapper" type="file" @change="selecionarArteAniversario($event, unegSelecionada)">
                </div>

              </div>
            </div>
            <div class="row collection-item">
              <div class="col s6">
                <a class="btn-large waves-effect waves-light red" @click="apagarImagem(unegSelecionada)">Apagar imagem</a>
              </div>
              <div class="col s6">
                <a class="btn-large waves-effect waves-light secondary-color" @click="visualizarArteAniversario(uneg)">
                  Visualizar arte de anivers&aacute;rio
                </a>
              </div>
            </div>
            <div class="row collection-item">
                Digite abaixo os <b>TERMOS</b> de busca que ser&atilde;o permitidos no momento de fazer a prospec&ccedil;&atilde;o:<br>
                <span class="ultra-small"><b> Dica: Para inserir v&aacute;rias configura&ccedil;&otilde;es de uma s&oacute; vez, tente adicion&aacute;-las separadas por v&iacute;rgula.</b></span><br>
                <div class="input-field col s9">
                  <input :id="'termo_busca'+indexUneg" :ref="'termoBusca'+indexUneg" type="text" class="validate" @keyup.enter="adicionarTermoBusca(uneg.unegId, indexUneg)">
                  <label for="termo_busca">Termo de busca</label>
                </div>
                <div class="col s3 valign-wrapper" style="cursor:pointer; height:90px;">
                  <div @click.prevent="adicionarTermoBusca(uneg.unegId, indexUneg)" style="border-right: solid #bdbdbd 1px;">
                    <i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Adicionar" style="padding-right:5px;">add</i>
                  </div>
                  <div @click.prevent="limparCampoTermoBusca(indexUneg)">
                    <i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Limpar" style="padding-left:5px;">close</i>
                  </div>
                </div>
                <div class="col s12" style="padding-bottom:15px;">
                  <p v-if="uneg.unegTermosProspeccao && uneg.unegTermosProspeccao.length > 0" class="ultra-small">Termos configurados: </p>
                  <div class="chip secondary-color better-text" v-for="(termo, indexTermo) in uneg.unegTermosProspeccao" :key="indexTermo">
                    {{termo}}
                    <i class="close material-icons" @click.prevent="removerTermo(uneg.unegId, indexUneg, indexTermo)">close</i>
                  </div>
                </div>

            </div>
            <div class="row collection-item">
              Digite abaixo as <b>JUSTIFICATIVAS</b> permitidas ao se ignorar uma prospec&ccedil;&atilde;o:<br>
              <span class="ultra-small"><b> Dica: Para inserir v&aacute;rias justificativas de uma s&oacute; vez, tente adicion&aacute;-las separadas por v&iacute;rgula.</b></span><br>
              <div class="input-field col s9">
                <input :id="'justificativa_'+indexUneg" :ref="'justificativa'+indexUneg" type="text" class="validate" @keyup.enter="adicionarJustificativa(uneg.unegId, indexUneg)">
                <label for="justificativa">Justificativa</label>
              </div>
              <div class="col s3 valign-wrapper" style="cursor:pointer; height:90px;">
                <div @click.prevent="adicionarJustificativa(uneg.unegId, indexUneg)" style="border-right: solid #bdbdbd 1px;">
                  <i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Adicionar" style="padding-right:5px;">add</i>
                </div>
                <div @click.prevent="limparCampoJustificativa(indexUneg)">
                  <i class="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Limpar" style="padding-left:5px;">close</i>
                </div>
              </div>
              <div class="col s12" style="padding-bottom:15px;">
                <p v-if="uneg.unegJustificativasProspeccao && uneg.unegJustificativasProspeccao.length > 0" class="ultra-small">Justificativas configuradas: </p>
                <div class="chip secondary-color better-text" v-for="(justificativa, indexTermo) in uneg.unegJustificativasProspeccao" :key="indexTermo">
                  {{justificativa}}
                  <i class="close material-icons" @click.prevent="removerJustificativa(uneg.unegId, indexUneg, indexTermo)">close</i>
                </div>
              </div>
            </div>

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

              <!-- <div class="card col s6"  v-for="(itemCampoAdd, indexCampoAdd) in camposAdicionais" :key="indexCampoAdd">
                Campo <b>{{ itemCampoAdd.pcadLabel }}</b>.<br>
                <div class="input-field col s9">
                  <select :id="`selectUsua${itemCampoAdd.pcadIdCampo}`" @change="selecionou">
                    <option value="" disabled selected>Selecione o tipo de usuario</option>
                    <option :value="itemUsuario" v-for="(itemUsuario, indexUsua) in listaUsuarios" :key="indexUsua">{{ itemUsuario }}</option>
                  </select>
                </div>
                <div class="col s3 valign-wrapper" style="cursor:pointer; height:90px;">
                  <div @click.prevent="addItemSelecionado" style="border-right: solid #bdbdbd 1px;">
                    <i class="material-icons tooltipped"
                      data-position="bottom"
                      data-delay="50"
                      data-tooltip="Adicionar"
                      style="padding-right:5px;">
                      add
                    </i>
                  </div>
                  <div @click.prevent="tipoUsusSelecionado = null">
                    <i
                      class="material-icons tooltipped"
                      data-position="bottom"
                      data-delay="50"
                      data-tooltip="Limpar"
                      style="padding-left:5px;">
                      close
                    </i>
                  </div>
                </div>
                <div class="col s12" style="padding-bottom:15px;">
                  <p
                    v-if="uneg.unegJustificativasProspeccao && uneg.unegJustificativasProspeccao.length > 0"
                    class="ultra-small">
                    Usu&aacute;rios da configuradas:
                  </p>
                  <div class="chip secondary-color better-text" v-if="itemCampoAdd && itemCampoAdd.pcadRolesVisualizacaoBloqueada">
                    {{ itemCampoAdd.pcadRolesVisualizacaoBloqueada }}
                    <i class="close material-icons" @click.prevent="removeItemSelecionado(itemCampoAdd.pcadRolesVisualizacaoBloqueada)">close</i>
                  </div>
                  <div class="chip better-text" v-else>
                    Nenhum
                  </div>
                  <div class="">
                      <div class="switch">
                        <label>
                          <input type="checkbox" v-model="itemCampoAdd.pcadRolesVisualizacaoBloqueada" @change="true" >
                          <span class="lever"></span>
                          {{ itemCampoAdd.pcadRolesVisualizacaoBloqueada }}
                        </label>
                      </div>
                    </div>
                </div>
              </div> -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StHelper from '../helpers/StHelper';
import TopLoader from '../shared/topLoader/TopLoader.vue';
import ErrorDialog from '../shared/errorDialog/ErrorDialog.vue';
import ServiceFactory from '../services/ServiceFactory';
import TituloPadrao from '../shared/iv/TituloPadrao.vue';
import SimpleDialog from '../shared/dialog/SimpleDialog.vue';

export default {
  props:['env'],
  components: {
    TopLoader, ErrorDialog, TituloPadrao, SimpleDialog
  },
  data() {
    return {
      unidadeNegocioServ:null,
      filtroUnidadeNegocio:null,
      listaUnidadeNegocio:[],
      arteAniversario:null,
      topLoader:[],
      modalError:null,
      unegSelecionada:null,
      showNiverArt:false,
      listaUsuarios:[],
      usuaAdicionados:[],
      tipoUsusSelecionado:[],
      camposAdicionais:[],
    }
  },
  mounted(){
    $(this.$refs.collapsible).collapsible();
    $(this.$refs.materialboxed).materialbox();
    $('.tooltipped').tooltip({delay: 50});
    $('select').formSelect();
  },
  updated(){
    $('.tooltipped').tooltip({delay: 50});
    $('select').formSelect();
  },
  created(){
    this.carregarRecursos()
      .then(()=>this.listarUnidadesNegocio())
      .then(()=>this.unidadeNegocioServ.obterRoleUsers()).then(res=>this.listaUsuarios = res)
      // .then(()=>this.unidadeNegocioServ.obterRoleUsersAdicionados(3)).then(res=>this.usuaAdicionados = res)
      .then(()=>this.unidadeNegocioServ.obterListaPcad()).then(res=>this.camposAdicionais = res)
      .then(()=> {
        this.camposAdicionais.forEach(item => {
          return item.listRoleUsua = item.pcadRolesVisualizacaoBloqueada.split(';');
        })
      })
      .then(()=> console.log('🟢 res Adicionados', this.camposAdicionais))

      .catch(err=>console.error(err));
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

    visualizarArteAniversario() {
      this.topLoader.push(1);
      this.unidadeNegocioServ.obtemArteAniversario(this.unegSelecionada.unegId)
        .then(img => {
            if(img) {
              this.unegSelecionada.unegArteAniversario = img;
              this.showNiverArt = true;
            } else {
              this.showNiverArt = false;
              StHelper.toast(`Nenhuma arte de aniversário foi configurada para esta unidade de negócio`, 4000);
            }
          })
        .catch(err => this.modalError = err)
        .then(() => this.topLoader.pop());
    },
    filtrar(){
      if(!this.filtroUnidadeNegocio) {
        this.listarUnidadesNegocio();
      } else {
        this.topLoader.push(1);
        this.unidadeNegocioServ.getByName(this.filtroUnidadeNegocio)
          .then(rs => this.tratarListaRetorno(rs))
          .then(lt => this.listaUnidadeNegocio = lt)
          .catch(err => this.errorDialog = err)
          .then(() => this.topLoader.pop())
      }
    },
    clickTitulo() {
			if (this.unegSelecionada) this.unegSelecionada = null;
			else this.$router.push(this.env.home);
		},
    abrirDetalhe(uneg) {
      this.unegSelecionada = uneg;
    },
    tratarListaRetorno(listaRetornoAPI) {
      return new Promise((resolve, reject) => {
        resolve(listaRetornoAPI.map(uneg=>{
          if(uneg.unegTermosProspeccao) {
            let termos = [];
            termos.push(...uneg.unegTermosProspeccao.split(','));
            uneg.unegTermosProspeccao = termos;
          }

          if(uneg.unegJustificativasProspeccao) {
            let justificativas = [];
            justificativas.push(...uneg.unegJustificativasProspeccao.split(','));
            uneg.unegJustificativasProspeccao = justificativas;
          }
          return uneg
        }));
      });
    },
    listarUnidadesNegocio() {
      this.topLoader.push(1);
      let lista = null;
      this.unidadeNegocioServ.listar()
        .then((list)=>this.tratarListaRetorno(list))
        .then(lt => this.listaUnidadeNegocio = lt)
        .catch(err=>this.modalError = err)
        .then(()=>this.topLoader.pop());
    },
    selecionarArteAniversario(event, uneg) {
      this.arteAniversario = event.target.files[0];
      this.salvarConfiguracoesUneg(uneg);
    },
    salvarConfiguracoesUneg(uneg) {
      if(this.arteAniversario) {
        this.efetuarUploadArteAniversario(uneg.unegId)
      }

      if(uneg.unegTotalPlacesReqMes > -1) {
        this.topLoader.push(1);
        this.unidadeNegocioServ.atualizarLimiteReqApiGoogle(uneg.unegId, uneg.unegTotalPlacesReqMes)
          .then(() => StHelper.toast('Configurações salvas com sucesso!', 5000))
          .catch(err=>this.modalError = err)
          .then(() => this.topLoader.pop());
      }
    },
    alterarFlagAnivHabilitado(uneg) {
      this.unidadeNegocioServ.updateInArteAnivHabilitada(uneg.unegId,uneg.unegInArteAnivHabilitada)
        .then(response=>{
          StHelper.toast(`Opção armazenada (${uneg.unegInArteAnivHabilitada?'Banner será exibido':'Banner NÃO será exibido'})`,2000);
        })
        .catch(err=>this.modalError = err);
    },
    apagarImagem(uneg) {
      this.unidadeNegocioServ.deleteImagemAniversario(uneg.unegId)
        .then(response=>{
          StHelper.toast("Imagem apagada.",2000);
          this.listarUnidadesNegocio();
        })
        .catch(err=>this.modalError = err);

    },
    efetuarUploadArteAniversario(unegId) {
      this.topLoader.push(1);
      if(!this.arteAniversario){
        StHelper.toastAlerta("Selecione uma imagem!");
        this.topLoader.pop();
      } else {
        let pa = [];
        pa.push(
          this.unidadeNegocioServ.uploadArteAniversario(unegId, this.arteAniversario)
          .then(response => {
            if(!response)
              this.modalError = {title:'Erro no Upload', detail:'Houve um problema no upload da sua arte de aniversário, verifique se a mesma está no formato JPEG'};
            else
              StHelper.toast("Upload efetuado com sucesso!",4000);
          })
        );

        Promise.all(pa)
        .then(()=>this.listarUnidadesNegocio())
        .then(()=>this.topLoader.pop())
        .catch(err=>this.modalError = err);
      }
    },
    adicionarTermoBusca(unegId, index) {
      let termo = $(`#termo_busca${index}`)[0].value;
      if(!this.listaUnidadeNegocio[index].unegTermosProspeccao || !this.listaUnidadeNegocio[index].unegTermosProspeccao.includes(termo)) {
        this.topLoader.push(1);
        this.unidadeNegocioServ.addTermoBusca(unegId, termo)
          .then(() => {
              if(this.listaUnidadeNegocio[index].unegTermosProspeccao) {
                this.listaUnidadeNegocio[index].unegTermosProspeccao.push(termo);
              } else {
                this.listaUnidadeNegocio[index].unegTermosProspeccao = [];
                this.listaUnidadeNegocio[index].unegTermosProspeccao.push(termo);
              }

              return Promise.resolve;
            })
          .catch(err=>this.modalError = err)
          .then(()=>this.topLoader.pop());
      }

      this.limparCampoTermoBusca(index);
    },
    adicionarJustificativa(unegId, index) {
      let justificativa = $(`#justificativa_${index}`)[0].value;
      if(!this.listaUnidadeNegocio[index].unegJustificativasProspeccao || !this.listaUnidadeNegocio[index].unegJustificativasProspeccao.includes(justificativa)) {
        this.topLoader.push(1);
        this.unidadeNegocioServ.addJustificativa(unegId, justificativa)
          .then(() => {
              if(this.listaUnidadeNegocio[index].unegJustificativasProspeccao) {
                this.listaUnidadeNegocio[index].unegJustificativasProspeccao.push(justificativa);
              } else {
                this.listaUnidadeNegocio[index].unegJustificativasProspeccao = [];
                this.listaUnidadeNegocio[index].unegJustificativasProspeccao.push(justificativa);
              }

              return Promise.resolve;
            })
          .catch(err=>this.modalError = err)
          .then(()=>this.topLoader.pop());
      }

      this.limparCampoJustificativa(index);
    },
    limparCampoTermoBusca(index) {
      $(`#termo_busca${index}`)[0].value = null;
      $(`#termo_busca${index}`).focus();
    },
    limparCampoJustificativa(index) {
      $(`#justificativa_${index}`)[0].value = null;
      $(`#justificativa_${index}`).focus();
    },

    removerTermo(unegId, indexUneg, indexTermo) {
      this.topLoader.push(1);
      this.unidadeNegocioServ.removerTermoBusca(unegId, this.listaUnidadeNegocio[indexUneg].unegTermosProspeccao[indexTermo])
        .then(()=>this.listaUnidadeNegocio[indexUneg].unegTermosProspeccao.splice(indexTermo, 0))
        .catch(err=>this.modalError = err)
        .then(()=>this.topLoader.pop());
    },

    removerJustificativa(unegId, indexUneg, indexJustificativa) {
      this.topLoader.push(1);
      this.unidadeNegocioServ.removerJustificativa(unegId, this.listaUnidadeNegocio[indexUneg].unegJustificativasProspeccao[indexJustificativa])
        .then(()=>this.listaUnidadeNegocio[indexUneg].unegJustificativasProspeccao.splice(indexJustificativa, 0))
        .catch(err=>this.modalError = err)
        .then(()=>this.topLoader.pop());
    },

    addItemSelecionado(i) {
      // console.log('🟢 data', $(`#${data}`))
      // console.log('🟢 data2', $(data))
      console.log('🟢 ivent', $(i).parent().value)

      if(this.tipoUsusSelecionado && !this.usuaAdicionados.includes(this.tipoUsusSelecionado)) {
        // this.topLoader.push(1);
        // this.unidadeNegocioServ.atualizaUserRole(this.tipoUsusSelecionado)
        //   .then(()=>this.tipoUsusSelecionado = null)
        //   .catch(err=>this.modalError = err)
        //   .then(()=>this.topLoader.pop());
      } else {
        alert('nao pode ser vazio ou ja existe');
      }
    },

    selecionou(i) {
      console.log('🟢 selecionou', i.target.parentNode)
    },

    removeItemSelecionado() {
      // this.topLoader.push(1);
      //   this.tipoUsusSelecionado = null;
      //   this.unidadeNegocioServ.obterRoleUsersAdicionados(id)
      //     .then(()=>this.unidadeNegocioServ.atualizaUserRole(id, this.tipoUsusSelecionado))
      //     .then(()=>this.tipoUsusSelecionado = null)
      //     .catch(err=>this.modalError = err)
      //     .then(()=>this.topLoader.pop());
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
