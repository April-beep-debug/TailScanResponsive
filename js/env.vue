<script setup>
import { insforge } from '../lib/insforgeClient'

const login = async (provider) => {
  await insforge.auth.signInWithOAuth({ provider })
}
</script>

<template>
  <button @click="login('google')">Entrar con Google</button>
  <button @click="login('github')">Entrar con GitHub</button>
</template>