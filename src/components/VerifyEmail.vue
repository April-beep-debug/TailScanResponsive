<template>
  <div class="verify-container">
    <h2>Verifica tu correo</h2>
    <p>Enviamos un código a {{ email }}</p>
    <input
      v-model="code"
      placeholder="Código de 6 dígitos"
      maxlength="6"
      class="code-input"
    />
    <button @click="verify" class="btn-verify">Verificar</button>
    <button @click="resend" class="btn-resend">Reenviar código</button>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { insforge } from '../lib/insforgeClient'

const route = useRoute()
const router = useRouter()
const email = route.query.email
const code = ref('')
const message = ref('')

const verify = async () => {
  const { error } = await insforge.auth.verifyEmail({
    email,
    code: code.value,
  })
  if (error) {
    message.value = 'Código inválido o expirado'
  } else {
    message.value = 'Correo verificado. Redirigiendo...'
    setTimeout(() => router.push('/login'), 1500)
  }
}

const resend = async () => {
  const { error } = await insforge.auth.resendVerificationEmail({ email })
  message.value = error ? 'Error al reenviar' : 'Nuevo código enviado'
}
</script>

<style scoped>
.verify-container {
  max-width: 400px;
  margin: 60px auto;
  text-align: center;
  padding: 20px;
}
.code-input {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 4px;
  margin: 16px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn-verify {
  width: 100%;
  padding: 10px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
}
.btn-resend {
  width: 100%;
  padding: 10px;
  background: transparent;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  border-radius: 6px;
  cursor: pointer;
}
.message {
  margin-top: 12px;
  color: #333;
}
</style>