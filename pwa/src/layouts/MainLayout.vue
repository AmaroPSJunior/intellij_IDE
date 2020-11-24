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
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <button @click="pessoas">teste</button>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import ServiceFactory from '../components/services/ServiceFactory.js';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      pessoaService: null,
      lista: null,
    };
  },

  async created() {
    try {
      await this.carregarRecursos();
      this.pessoas();
    } catch (e) {
      console.console('🔴 e: ', e);
    }
  },

  updated() {},

  methods: {
    async carregarRecursos() {
      try {
        const factory = new ServiceFactory(this.$http);
        console.log('🟢 factory ', factory);
        this.pessoaService = await factory.pessoaService();
      } catch (e) {
        console.error('🔴 e: ', e);
      }
    },

    async pessoas() {
      try {
        const res = await this.pessoaService.listaPessoas();
        this.lista = res;
        alert('teste');
        console.log('🟢 res: ', res);
      } catch (e) {
        console.error('🔴 e: ', e);
      }
    },
  },
};
</script>
