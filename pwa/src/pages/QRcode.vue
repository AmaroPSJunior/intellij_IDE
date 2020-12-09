<template>
  <div>
    <div class="" style="padding-bottom: 0px;text-align: center;">
        <p class="error">{{ error }}</p>
        <p class="decode-result">Id: <b>{{ result }}</b></p>
    </div>
    <div v-if="!result">
      <qrcode-stream @decode="onDecode" @init="onInit" />
      <h3>Amaro</h3>
    </div>

    <div class="v-card container" v-else style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
        <div >
            <p>Upload de arquivo da foto</p>
            <input :v-model="imagem" type="file" accept="image/*;capture=camera">
            <img :src="img" alt="">
        </div>
        <div>
            <a href="#" class="v-btn btn primary">Enviar</a>
            <a href="#" class="v-btn btn secondary" @click="result = null">Cancelar</a>
        </div>
    </div>

  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream },

  data () {
    return {
      result: '',
      error: '',
      teste: true,
      imagem: null,
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
