<template>
  <div>
    <div v-if="result" class="" style="padding-bottom: 0px;text-align: center;">
        <p class="error">{{ error }}</p>
        <p class="decode-result">Nome: <b>{{ result.Nome }}</b></p>
        <p class="decode-result">Idade: <b>{{ result.Idade }}</b></p>
    </div>
    <div v-if="!result">
      <h3>Aponte o QRCode! <q-icon class="right" name="qr_code" /></h3>
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>

    <div class="v-card container" v-else style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
        <div v-if="false">
            <p>Upload de arquivo da foto</p>
            <input :v-model="imagem" type="file" accept="image/*;capture=camera">
            <img :src="img" alt="">
        </div>
        <div>
            <a href="#" class="v-btn btn primary" v-if="false">Enviar</a>
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
      this.result = JSON.parse(result);
      console.log('🔵 this.result', this.result)
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
