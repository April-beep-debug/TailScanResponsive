<script setup>
import { ref, computed } from 'vue'
import QRCode from 'qrcode'
import { useRouter } from 'vue-router'
import { insforge } from '../lib/insforgeClient'

const router = useRouter()

const nombreMascota = ref('')
const especie = ref('Perro')
const nombreDueno = ref('')
const telefono = ref('')
const preview = ref('')
const archivoFoto = ref(null)

const qrCanvas = ref(null)
const qrGenerado = ref(false)
const cargando = ref(false)

const especieIcono = computed(() => (especie.value === 'Gato' ? '🐱' : '🐶'))
const especieLabel = computed(() => (especie.value === 'Gato' ? 'Cat' : 'Dog'))

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    archivoFoto.value = file
    const reader = new FileReader()
    reader.onload = (event) => {
      preview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const subirImagen = async (file) => {
  const nombreArchivo = `${Date.now()}-${file.name}`
  const { data, error } = await insforge.storage
    .from('mascotas')
    .upload(nombreArchivo, file)

  if (error) {
    console.error('Error uploading the photo:', error)
    return null
  }
  return data
}

const crearQR = async () => {
  if (!nombreMascota.value || !nombreDueno.value || !telefono.value) {
    alert('Complete all fields')
    return
  }

  if (!archivoFoto.value) {
    alert('⚠️ You must upload a pet photo')
    return
  }

  const { data: sessionData } = await insforge.auth.getCurrentUser()
  if (!sessionData?.user) {
    alert('⚠️ You must log in to register a pet')
    router.push('/')
    return
  }

  cargando.value = true

  const subida = await subirImagen(archivoFoto.value)

  if (!subida) {
    cargando.value = false
    alert('❌ Error uploading the photo. Please try again.')
    return
  }

  let textoQR = `${especieIcono.value} ${nombreMascota.value}\n`
  textoQR += `👤 ${nombreDueno.value}\n`
  textoQR += `📞 ${telefono.value}\n`
  textoQR += `📷 ${subida.url}`

  try {
    await QRCode.toCanvas(qrCanvas.value, textoQR, {
      width: 260,
      margin: 2,
      color: { dark: '#114c95', light: '#ffffff' }
    })

    const { error: dbError } = await insforge.database
      .from('mascotas')
      .insert([{
        nombre_mascota: nombreMascota.value,
        especie: especie.value,
        nombre_dueno: nombreDueno.value,
        telefono: telefono.value,
        foto_url: subida.url,
        foto_key: subida.key,
        qr_texto: textoQR
      }])

    if (dbError) throw dbError

    qrGenerado.value = true
    cargando.value = false
  } catch (err) {
    cargando.value = false
    console.error(err)
    alert('❌ Error generating the QR code or saving the pet')
  }
}

const descargarQR = () => {
  const canvas = qrCanvas.value
  if (canvas) {
    const link = document.createElement('a')
    link.download = `qr-${nombreMascota.value || 'mascota'}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}

const volver = () => {
  router.push('/home')
}
</script>

<template>
<div class="qr-page">
  <button class="page-back-button" @click="$router.back()" aria-label="Back">←</button>
  <!-- Decoraciones de fondo -->
  <div class="bg-blob bg-blob-left"></div>
  <div class="bg-blob bg-blob-right"></div>
  <div class="dots dots-left">
    <span v-for="n in 12" :key="`dl-${n}`"></span>
  </div>
  <div class="dots dots-right">
    <span v-for="n in 12" :key="`dr-${n}`"></span>
  </div>
  <span class="paw-float paw-1">🐾</span>
  <span class="paw-float paw-2">🐾</span>
  <span class="paw-float paw-3">🐾</span>

  <div class="qr-layout">
    <!-- ---------- Columna izquierda: formulario ---------- -->
    <div class="qr-container">
      <div class="header">
        <div class="logo-badge">
          <img src="/src/assets/img/mascota.png" alt="TailScan" class="logo-img" />
        </div>
        <h1><span class="tail">Tail</span><span class="scan">Scan</span></h1>
        <p class="subtitle">QR generator for your pet</p>
        <div class="header-divider">
          <span class="line"></span>
          <span class="paw-icon">🐾</span>
          <span class="line"></span>
        </div>
      </div>

      <form @submit.prevent class="form">
        <div class="card-block">
          <div class="card-title">
            <span class="icon-circle icon-circle-blue"></span>
            <span>Pet details</span>
          </div>

          <div class="input-group">
            <label> Pet Name <span class="required">*</span></label>
            <input v-model="nombreMascota" type="text" placeholder="e.g. Max" required>
          </div>

          <div class="input-group">
            <label> Species <span class="required">*</span></label>
            <div class="especie-toggle">
              <button type="button" :class="{ active: especie === 'Perro' }" @click="especie = 'Perro'">🐶 Dog</button>
              <button type="button" :class="{ active: especie === 'Gato' }" @click="especie = 'Gato'">🐱 Cat</button>
            </div>
          </div>

          <div class="input-group">
            <label> Owner Name <span class="required">*</span></label>
            <input v-model="nombreDueno" type="text" placeholder="e.g. John Smith" required>
          </div>

          <div class="input-group">
            <label> Contact Phone <span class="required">*</span></label>
            <input v-model="telefono" type="text" placeholder="e.g. 1234-5678" required>
          </div>

          <div class="input-group">
            <label> Pet Photo <span class="required">*</span></label>
            <label class="file-upload">
              <input type="file" accept="image/*" @change="onImageChange" required>
              <span class="icon-circle icon-circle-orange small"></span>
              <span>Choose file</span>
            </label>
            <small class="hint">The image is saved in TailScan storage</small>
          </div>
        </div>

        <button type="button" @click="crearQR" class="btn-generate" :disabled="cargando">
          <span v-if="cargando" class="spinner"></span>
          {{ cargando ? 'Saving pet...' : '🐾 Generate QR Code' }}
        </button>

        <button v-if="qrGenerado" type="button" @click="descargarQR" class="btn-download">
          Download QR
        </button>

        <button type="button" @click="volver" class="btn-volver">
          ⬅ Back to home
        </button>
      </form>
    </div>

    <!-- ---------- Columna derecha: tarjeta de la mascota ---------- -->
    <div class="pet-card">
      <div class="pet-card-header">
        <span class="icon-circle icon-circle-orange small"></span>
        <span>Card preview</span>
      </div>

      <div class="pet-card-body">
        <div class="pet-photo">
          <img v-if="preview" :src="preview" alt="Pet photo" />
          <span v-else class="pet-photo-placeholder">{{ especieIcono }}</span>
        </div>

        <h2 class="pet-name">{{ nombreMascota || 'Pet name' }}</h2>
        <span class="pet-especie-pill">{{ especieIcono }} {{ especieLabel }}</span>

        <div class="pet-info">
          <div class="pet-info-row">
            <span class="pet-info-label">👤 Owner</span>
            <span class="pet-info-value">{{ nombreDueno || '—' }}</span>
          </div>
          <div class="pet-info-row">
            <span class="pet-info-label">📞 Phone</span>
            <span class="pet-info-value">{{ telefono || '—' }}</span>
          </div>
        </div>

        <div class="qr-result" :class="{ 'has-qr': qrGenerado }">
          <canvas ref="qrCanvas"></canvas>
          <p v-if="!qrGenerado" class="qr-placeholder">Your QR code will appear here</p>
        </div>
      </div>
    </div>
  </div>
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

.qr-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(115deg, #1e3a8a 0%, #2f5fd1 28%, #eef2fb 50%, #ffe3c9 62%, #ff8a3d 85%, #f2632b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ---------- Decoración de fondo ---------- */

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.55;
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

.dots {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  z-index: 0;
}

.dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: block;
}

.dots-left {
  top: 60px;
  left: 40px;
}

.dots-left span {
  background: #114c95;
  opacity: 0.35;
}

.dots-right {
  bottom: 60px;
  right: 40px;
}

.dots-right span {
  background: #f2994a;
  opacity: 0.4;
}

.paw-float {
  position: absolute;
  font-size: 1.6rem;
  opacity: 0.25;
  z-index: 0;
}

.paw-1 { top: 12%; left: 8%; transform: rotate(-15deg); }
.paw-2 { bottom: 18%; left: 12%; transform: rotate(10deg); font-size: 1.2rem; }
.paw-3 { top: 20%; right: 10%; transform: rotate(20deg); }

/* ---------- Layout de dos columnas ---------- */

.qr-layout {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 28px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  flex-wrap: wrap;
}

/* ---------- Contenedor principal (formulario) ---------- */

.qr-container {
  background: #ffffff;
  border-radius: 28px;
  padding: 44px 40px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 25px 60px rgba(17, 76, 149, 0.15);
  text-align: center;
}

.header {
  margin-bottom: 28px;
}

.logo-badge {
  width: 68px;
  height: 68px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #eaf2fa, #fdecd9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 2px rgba(17, 76, 149, 0.08);
}

.logo-img {
  width: 40px;
}

h1 {
  font-size: 2.1rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.01em;
}

.tail {
  color: #114c95;
}

.scan {
  color: #f2994a;
}

.subtitle {
  font-size: 1rem;
  color: #5a6b7a;
  margin: 6px 0 0;
}

.header-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 14px;
}

.header-divider .line {
  width: 40px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, #114c95, #f2994a);
  opacity: 0.35;
}

.header-divider .paw-icon {
  font-size: 1.4rem;
  opacity: 0.85;
  line-height: 1;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #114c95;
  font-size: 1rem;
  margin-bottom: 18px;
  text-align: left;
}

.icon-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.icon-circle-blue {
  background: #e2edf9;
}

.icon-circle-orange {
  background: #fce4cc;
}

.icon-circle.small {
  width: 26px;
  height: 26px;
  font-size: 0.85rem;
}

.input-group {
  margin-bottom: 16px;
  text-align: left;
}

.input-group:last-of-type {
  margin-bottom: 0;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #114c95;
  font-size: 0.92rem;
}

.required {
  color: #f2994a;
}

.input-group input[type="text"] {
  width: 100%;
  padding: 12px 16px;
  background: #ffffff;
  border: 1.5px solid #dce6ef;
  border-radius: 12px;
  color: #1c2b3a;
  font-size: 1rem;
  transition: all 0.2s;
}

.input-group input[type="text"]:focus {
  outline: none;
  border-color: #114c95;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(17, 76, 149, 0.12);
}

.especie-toggle {
  display: flex;
  gap: 10px;
}

.especie-toggle button {
  flex: 1;
  padding: 12px 10px;
  border-radius: 12px;
  border: 1.5px solid #dce6ef;
  background: #ffffff;
  color: #5a6b7a;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.especie-toggle button.active {
  border-color: #114c95;
  background: #eaf2fa;
  color: #114c95;
  box-shadow: 0 0 0 3px rgba(17, 76, 149, 0.12);
}

.file-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  background: #ffffff;
  border: 1.5px dashed #f2c391;
  border-radius: 12px;
  cursor: pointer;
  color: #f2994a;
  font-weight: 600;
  transition: all 0.2s;
}

.file-upload:hover {
  background: #fff6ec;
  border-color: #f2994a;
}

.file-upload input[type="file"] {
  display: none;
}

.hint {
  color: #9aa9b6;
  display: block;
  margin-top: 6px;
  font-size: 0.82rem;
}

/* ---------- Botones ---------- */

.btn-generate {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #114c95, #1a63bd);
  color: #ffffff;
  font-weight: 700;
  font-size: 1.02rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 4px 0 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(17, 76, 149, 0.3);
}

.btn-generate:disabled {
  background: #a9b4bf;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-download {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #f2994a, #e6832a);
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.25s;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(242, 153, 74, 0.3);
}

.btn-volver {
  width: 100%;
  padding: 14px;
  background: #eef2f6;
  color: #5a6b7a;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.25s;
}

.btn-volver:hover {
  background: #e2e8ee;
  color: #114c95;
  transform: translateY(-2px);
}

/* ---------- Columna derecha: tarjeta de la mascota ---------- */

.pet-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 32px 34px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 25px 60px rgba(17, 76, 149, 0.15);
}

.pet-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #114c95;
  font-size: 1rem;
  margin-bottom: 22px;
}

.pet-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pet-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, #eaf2fa, #fdecd9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: inset 0 0 0 3px rgba(17, 76, 149, 0.08);
}

.pet-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-photo-placeholder {
  font-size: 3rem;
}

.pet-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1c2b3a;
  margin: 0 0 8px;
  word-break: break-word;
}

.pet-especie-pill {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 50px;
  background: #eaf2fa;
  color: #114c95;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 20px;
}

.pet-info {
  width: 100%;
  margin-bottom: 20px;
}

.pet-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eef2f6;
  font-size: 0.92rem;
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

/* ---------- Resultado QR ---------- */

.qr-result {
  width: 100%;
  padding: 20px;
  background: #f7fafc;
  border: 1.5px dashed #dce6ef;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.qr-result.has-qr {
  background: #ffffff;
  border: 1.5px solid #eaf1f7;
  box-shadow: 0 8px 20px rgba(17, 76, 149, 0.08);
}

.qr-placeholder {
  color: #9aa9b6;
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 520px) {
  .qr-container,
  .pet-card {
    padding: 32px 22px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
