<template>
  <q-item
    clickable
    tag="a"
    :to="link"
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
};
</script>
