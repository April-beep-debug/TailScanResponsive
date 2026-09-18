<template>
  <div class="medicina-general">
    <!-- Blobs decorativos de fondo -->
    <div class="blob blob-left"></div>
    <div class="blob blob-right"></div>

    <!-- Header -->
    <header class="mg-header">
      <div class="header-top">
        <button class="icon-btn grid-btn" aria-label="Menu">
          <span class="dot" v-for="n in 6" :key="n"></span>
        </button>
        <button class="icon-btn back-btn" @click="$router.back()" aria-label="Back">
          ←
        </button>
      </div>

      <h1 class="title">
        <span class="icon-circle">🩺</span>
        General Medicine
        <span class="paw">🐾</span>
      </h1>
      <p class="subtitle">Preventive care, general consultations, and routine checkups.</p>
    </header>

    <!-- Grid de veterinarios -->
    <section class="vets-grid">
      <article
        v-for="vet in veterinarios"
        :key="vet.id"
        class="vet-card"
      >
        <div class="vet-info">
          <img :src="vet.foto" :alt="vet.nombre" class="vet-avatar" />
          <div class="vet-details">
            <h2 class="vet-name">
              {{ vet.nombre }}
              <span class="verified" title="Verified">✔</span>
            </h2>
            <p class="vet-role">{{ vet.rol }}</p>
            <p class="vet-lic">{{ vet.licencia }}</p>
            <p class="vet-location">📍 {{ vet.ubicacion }}</p>
            <p class="vet-exp">⭐ {{ vet.experiencia }} years of experience</p>
          </div>
        </div>

        <a
          :href="whatsappLink(vet.telefono)"
          target="_blank"
          rel="noopener"
          class="contact-btn"
        >
          <span class="wa-icon">💬</span>
          Contact me now
        </a>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import valeriaImg from '../assets/img/Valeria.png'
import alejandroImg from '../assets/img/Alejandro.png'
import marianaImg from '../assets/img/Mariana.png'
import diegoImg from '../assets/img/Diego.png'
import sofiaImg from '../assets/img/Sofia.png'
import carlosImg from '../assets/img/Carlos.png'

const veterinarios = ref([
  {
    id: 1,
    nombre: 'Dra. Valeria Ramírez',
    rol: 'Veterinary Doctor and Animal Scientist',
    licencia: 'Lic. Vet. 1234',
    ubicacion: 'San Salvador, El Salvador',
    experiencia: 8,
    telefono: '50370000001',
    foto: valeriaImg
  },
  {
    id: 2,
    nombre: 'Dr. Alejandro Torres',
    rol: 'Veterinary Doctor and Animal Scientist',
    licencia: 'Lic. Vet. 9876',
    ubicacion: 'Santa Tecla, El Salvador',
    experiencia: 10,
    telefono: '50370000002',
    foto: alejandroImg
  },
  {
    id: 3,
    nombre: 'Dra. Mariana López',
    rol: 'Veterinary Doctor and Animal Scientist',
    licencia: 'Lic. Vet. 5678',
    ubicacion: 'Antiguo Cuscatlán, El Salvador',
    experiencia: 6,
    telefono: '50370000003',
    foto: marianaImg
  },
  {
    id: 4,
    nombre: 'Dr. Diego Hernández',
    rol: 'Veterinary Doctor and Animal Scientist',
    licencia: 'Lic. Vet. 4567',
    ubicacion: 'Sonsonate, El Salvador',
    experiencia: 7,
    telefono: '50370000004',
    foto: diegoImg
  },
  {
    id: 5,
    nombre: 'Dra. Sofía Gutiérrez',
    rol: 'Veterinary Doctor and Animal Scientist',
    licencia: 'Lic. Vet. 6789',
    ubicacion: 'San Miguel, El Salvador',
    experiencia: 9,
    telefono: '50370000005',
    foto: sofiaImg
  },
  {
    id: 6,
    nombre: 'Dr. Carlos Mendoza',
    rol: 'Veterinary Doctor and Animal Scientist',
    licencia: 'Lic. Vet. 3456',
    ubicacion: 'La Libertad, El Salvador',
    experiencia: 5,
    telefono: '50370000006',
    foto: carlosImg
  }
])

function whatsappLink(telefono) {
  return `https://wa.me/${telefono}`
}
</script>

<style scoped>
.medicina-general {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #f4f7fc;
  padding: 32px 40px 60px;
}

/* Blobs decorativos */
.blob {
  position: absolute;
  z-index: 0;
  pointer-events: none;
}
.blob-left {
  top: -10%;
  left: -12%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at 30% 30%, #cfe0ff, transparent 70%);
  border-radius: 50%;
}
.blob-right {
  top: -8%;
  right: -8%;
  width: 420px;
  height: 420px;
  background: linear-gradient(135deg, #ff9a56, #ffb37a);
  clip-path: polygon(100% 0, 0 0, 100% 100%);
}

/* Header */
.mg-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 40px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto 24px;
}

.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e3a8a;
  font-size: 18px;
}

.grid-btn {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  padding: 12px;
}
.grid-btn .dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1e3a8a;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 2.6rem;
  font-weight: 800;
  color: #1e3a8a;
  margin: 0 0 12px;
}

.icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}

.subtitle {
  color: #1e3a8a;
  font-size: 1.1rem;
  opacity: 0.85;
}

/* Grid */
.vets-grid {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .vets-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 680px) {
  .vets-grid { grid-template-columns: 1fr; }
  .medicina-general { padding: 24px 16px 40px; }
}

.vet-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(30, 58, 138, 0.08);
}

.vet-info {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.vet-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.vet-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0 0 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.verified {
  color: #2563eb;
  font-size: 0.9rem;
}

.vet-role,
.vet-lic {
  font-size: 0.85rem;
  color: #475569;
  margin: 2px 0;
}

.vet-location,
.vet-exp {
  font-size: 0.85rem;
  color: #1e3a8a;
  margin: 4px 0 0;
}

.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: #1e3a8a;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;
}

.contact-btn:hover {
  background: #1e40af;
}
</style>