<template>
  <q-item
    clickable
    tag="a"
    @click="enviarPessoaId"
    :to="url"
  >
    <q-item-section
      v-if="icon"
      avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ nome }}</q-item-label>
      <q-item-label caption>
        {{ uri }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    id: {
      type: Number,
      default: null,
    },

    nome: {
      type: String,
      required: true,
    },

    uri: {
      type: String,
      default: '#',
    },

    link: {
      type: String,
      default: 'pessoas',
    },

    icon: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      url: '/',
    };
  },

  created() {
    if (this.id) {
      this.url = `${this.link}?id=${this.id}`;
    }
  },

  updated() {},

  methods: {
    enviarPessoaId() {
      const elementoPai = this.$parent.$parent.$parent.$parent;
      elementoPai.$emit('onAtualizaId', this.id);
    },
  },

  watch: {},
};
</script>
