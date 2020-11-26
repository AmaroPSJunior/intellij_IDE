<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App v1
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Lista de Nomes
        </q-item-label>
        <input
          type="text"
          v-model="novoNome"
        />
        <button @click="novaPessoa">Novo</button>
        <hr>
        <Menu
          v-for="item in itensMenu"
          :key="item.id"
          v-bind="item"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from '../components/Menu.vue';
import ServiceFactory from '../components/services/ServiceFactory.js';

export default {
  name: 'MainLayout',
  components: { Menu },
  data() {
    return {
      leftDrawerOpen: false,
      itensMenu: [],
      pessoaServiceBiz: null,
      novoNome: null,
    };
  },

  created() {
    this.carregarRecursos()
      .then(() => this.pessoas())
      .catch((e) => alert('🔴 created: ', e));
  },

  updated() {},

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

    novaPessoa() {
      if (this.novoNome) {
        const obj = { nome: this.novoNome };
        this.pessoaServiceBiz.novaPessoa(obj)
          .then(() => this.novoNome = null)
          .then(() => this.pessoas())
          .catch((e) => alert('🔴 novaPessoa: ', e));
      }
    },

    pessoas() {
      this.pessoaServiceBiz.listaPessoas()
        .then((res) => this.itensMenu = res)
        .catch((e) => alert('🔴 pessoas: ', e));
    },
  },
};
</script>
