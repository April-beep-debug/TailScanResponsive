<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import QRCode from 'qrcode'
import { insforge } from '../lib/insforgeClient'

const router = useRouter()

const usuario = ref(null)
const mascotas = ref([])
const cargando = ref(true)
const error = ref('')
const canvasEls = ref({})

const setCanvasRef = (id) => (el) => {
  if (el) canvasEls.value[id] = el
}

const especieIcono = (especie) => (especie === 'Gato' ? '🐱' : '🐶')

const dibujarQRs = async () => {
  await nextTick()
  for (const m of mascotas.value) {
    const canvas = canvasEls.value[m.id]
    if (canvas && m.qr_texto) {
      await QRCode.toCanvas(canvas, m.qr_texto, {
        width: 180,
        margin: 2,
        color: { dark: '#114c95', light: '#ffffff' }
      })
    }
  }
}

const descargarQR = (mascota) => {
  const canvas = canvasEls.value[mascota.id]
  if (canvas) {
    const link = document.createElement('a')
    link.download = `qr-${mascota.nombre_mascota}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}

const irARegistrar = () => {
  router.push('/generador-qr')
}

const irAInicio = () => {
  router.push('/home')
}

onMounted(async () => {
  const { data: sessionData } = await insforge.auth.getCurrentUser()
  if (!sessionData?.user) {
    router.push('/')
    return
  }
  usuario.value = sessionData.user

  const { data, error: dbError } = await insforge.database
    .from('mascotas')
    .select()
    .order('created_at', { ascending: false })

  if (dbError) {
    error.value = 'No se pudieron cargar tus mascotas. Intenta de nuevo más tarde.'
    cargando.value = false
    return
  }

  mascotas.value = data || []
  cargando.value = false
  await dibujarQRs()
})
</script>

<template>
<div class="page">
  <button class="page-back-button" @click="$router.back()" aria-label="Volver">←</button>
  <div class="bg-blob bg-blob-left"></div>
  <div class="bg-blob bg-blob-right"></div>

  <header class="topbar">
    <div class="brand">
      <img src="/src/assets/img/mascota.png" alt="TailScan" class="brand-img" />
      <span><span class="tail">Tail</span><span class="scan">Scan</span></span>
    </div>
    <div class="user-chip" v-if="usuario">
      <img v-if="usuario.profile?.avatar_url" :src="usuario.profile.avatar_url" alt="" />
      <span>{{ usuario.profile?.name || usuario.email }}</span>
    </div>
  </header>

  <main class="content">
    <div class="title-block">
      <h1>Mis Mascotas</h1>
      <p>Aquí están las mascotas que has registrado, junto a su código QR.</p>
    </div>

    <div v-if="cargando" class="state-block">
      <span class="spinner"></span>
      <p>Cargando tus mascotas...</p>
    </div>

    <div v-else-if="error" class="state-block error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="mascotas.length === 0" class="state-block empty">
      <span class="empty-icon">🐾</span>
      <h2>Todavía no registras mascotas</h2>
      <p>Registra a tu perro o gato y genera su código QR de identificación.</p>
      <button class="btn-primary" @click="irARegistrar">🐾 Registrar Mascota</button>
    </div>

    <div v-else class="grid">
      <div v-for="m in mascotas" :key="m.id" class="pet-card">
        <div class="pet-photo">
          <img v-if="m.foto_url" :src="m.foto_url" :alt="m.nombre_mascota" />
          <span v-else class="pet-photo-placeholder">{{ especieIcono(m.especie) }}</span>
        </div>

        <h2 class="pet-name">{{ m.nombre_mascota }}</h2>
        <span class="pet-especie-pill">{{ especieIcono(m.especie) }} {{ m.especie }}</span>

        <div class="pet-info">
          <div class="pet-info-row">
            <span class="pet-info-label">👤 Dueño</span>
            <span class="pet-info-value">{{ m.nombre_dueno }}</span>
          </div>
          <div class="pet-info-row">
            <span class="pet-info-label">📞 Teléfono</span>
            <span class="pet-info-value">{{ m.telefono }}</span>
          </div>
        </div>

        <div class="qr-result">
          <canvas :ref="setCanvasRef(m.id)"></canvas>
        </div>

        <button class="btn-download" @click="descargarQR(m)">Descargar QR</button>
      </div>
    </div>
  </main>
</div>
</template>

<style scoped>
.page-back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 20;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, .9);
  color: #1e3a8a;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(30, 58, 138, .12);
}

* {
  box-sizing: border-box;
}

.page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(115deg, #1e3a8a 0%, #2f5fd1 20%, #eef2fb 45%, #ffe3c9 65%, #ff8a3d 88%, #f2632b 100%);
  font-family: 'Segoe UI', system-ui, sans-serif;
  padding-bottom: 60px;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
}

.bg-blob-left {
  width: 420px;
  height: 420px;
  left: -180px;
  bottom: -160px;
  background: radial-gradient(circle at 30% 30%, #cfe2f5, #a9cdec 70%);
}

.bg-blob-right {
  width: 380px;
  height: 380px;
  right: -160px;
  top: -140px;
  background: radial-gradient(circle at 60% 40%, #fcd9b6, #f6b978 70%);
}

.topbar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 40px;
}

.back-link {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50px;
  padding: 10px 18px;
  font-weight: 700;
  color: #114c95;
  cursor: pointer;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.3rem;
  font-weight: 800;
}

.brand-img {
  width: 28px;
}

.tail {
  color: #114c95;
}

.scan {
  color: #f2994a;
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  padding: 6px 14px 6px 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1c2b3a;
}

.user-chip img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 24px 0;
}

.title-block {
  text-align: center;
  color: #190eb3;
  margin-bottom: 32px;
}

.title-block h1 {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 8px;
}

.title-block p {
  margin: 0;
  opacity: 0.9;
}

.state-block {
  background: #ffffff;
  border-radius: 24px;
  padding: 48px 32px;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 25px 60px rgba(17, 76, 149, 0.15);
}

.state-block.error {
  color: #b3261e;
}

.spinner {
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 3px solid #dce6ef;
  border-top-color: #114c95;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 12px;
}

.empty h2 {
  margin: 0 0 8px;
  color: #1c2b3a;
}

.empty p {
  color: #5a6b7a;
  margin: 0 0 20px;
}

.btn-primary {
  background: linear-gradient(135deg, #114c95, #1a63bd);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 14px 28px;
  font-weight: 700;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.pet-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 28px 26px;
  box-shadow: 0 20px 45px rgba(17, 76, 149, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pet-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #eaf2fa, #fdecd9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 14px;
  box-shadow: inset 0 0 0 3px rgba(17, 76, 149, 0.08);
}

.pet-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-photo-placeholder {
  font-size: 2.6rem;
}

.pet-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1c2b3a;
  margin: 0 0 8px;
  word-break: break-word;
}

.pet-especie-pill {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 50px;
  background: #eaf2fa;
  color: #114c95;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 16px;
}

.pet-info {
  width: 100%;
  margin-bottom: 16px;
}

.pet-info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eef2f6;
  font-size: 0.88rem;
}

.pet-info-row:last-child {
  border-bottom: none;
}

.pet-info-label {
  color: #5a6b7a;
  font-weight: 600;
}

.pet-info-value {
  color: #1c2b3a;
  font-weight: 700;
  text-align: right;
  word-break: break-word;
}

.qr-result {
  padding: 14px;
  background: #f7fafc;
  border: 1.5px solid #eaf1f7;
  border-radius: 16px;
  margin-bottom: 16px;
}

.btn-download {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #f2994a, #e6832a);
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

@media (max-width: 600px) {
  .topbar {
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
  }
}
</style>
