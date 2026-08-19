<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { insforge } from '../lib/insforgeClient'

const router = useRouter()
const usuario = ref(null)

const irAGenerarQR = () => {
  router.push('/generador-qr')
}
const irAlMapa = () => {
  router.push('/mapa')
}
const irAConsejos = () => {
  router.push('/consejos')
}
const irAGaleria = () => {
  router.push('/galeria')
}
const irArticulos = () => {
  router.push('/articulos')
}
const irAMisMascotas = () => {
  router.push('/mis-mascotas')
}
const irAVeterinarios = () => {
  router.push('/veterinarios')
}
const irACollares = () => {
  router.push('/collares')
}
const irADonaciones = () => {
  router.push('/donaciones')
}

const inicialAvatar = (usuario) => {
  const nombre = usuario?.profile?.name || usuario?.email || ''
  return nombre.charAt(0).toUpperCase() || '🐾'
}

const cerrarSesion = async () => {
  await insforge.auth.signOut()
  router.push('/')
}

onMounted(async () => {
  const { data } = await insforge.auth.getCurrentUser()
  usuario.value = data?.user || null
})
</script>

<template>
<div class="bg-wrap">
  <div class="blob blob-blue-1"></div>
  <div class="blob blob-blue-2"></div>
  <div class="blob blob-orange-1"></div>
  <div class="blob blob-orange-2"></div>
 
  <div class="paw paw-left">
    <svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="14" cy="20" rx="7" ry="9"/><ellipse cx="32" cy="12" rx="7.5" ry="10"/><ellipse cx="50" cy="20" rx="7" ry="9"/><path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/></svg>
  </div>
  <div class="paw paw-right">
    <svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="14" cy="20" rx="7" ry="9"/><ellipse cx="32" cy="12" rx="7.5" ry="10"/><ellipse cx="50" cy="20" rx="7" ry="9"/><path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/></svg>
  </div>
 
  <div class="dots dots-top-left">
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
  </div>
  <div class="dots dots-bottom-right">
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
  </div>
 
  <header>
    <div class="logo">
      <img src="../assets/img/mascota.png" alt="Mascota" class="logo-img" />
      <span class="tail">Tail</span><span class="scan">Scan</span>
    </div>
    <nav>
      <a href="#" class="active">Inicio</a>
      <a href="#" @click.prevent="irAGenerarQR">Registrar Mascota</a>
      <a href="#" @click.prevent="irAlMapa">Adopción y Perdidos</a>
      <a href="#" @click.prevent="irAConsejos">Cuidados</a>
      <a href="#" @click.prevent="irAGaleria">Galería</a>
    </nav>
    <div class="header-right">
      <button
        class="user-avatar"
        title="Mis mascotas registradas"
        @click="irAMisMascotas"
      >
        <img v-if="usuario?.profile?.avatar_url" :src="usuario.profile.avatar_url" alt="Foto de perfil" />
        <span v-else class="user-avatar-fallback">{{ inicialAvatar(usuario) }}</span>
      </button>
      <button class="logout-btn" title="Cerrar sesión" aria-label="Cerrar sesión" @click="cerrarSesion">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </div>
  </header>
 
  <div class="hero-layout">
    <div class="card">
      <div class="hero-text">
        <h1>¡Bienvenido/a a <span class="accent">TailScan</span>! 🐾</h1>
        <p>Nos alegra tenerte aquí. Registra a tu mascota con QR, adopta un nuevo compañero, accede a servicios profesionales y ayuda a reportar animales perdidos.</p>
        <p>Cada cola merece ser feliz. Gracias por formar parte de esta comunidad llena de amor y huellitas.</p>
        <div class="buttons">
          <button class="btn btn-primary" @click="irAGenerarQR">🐾 Registrar Mascota</button>
        </div>
      </div>
    </div>

    <div class="hero-side-image">
      <img src="../assets/img/hero.png" alt="Mascota" />
    </div>
  </div>
</div>

<div class="bg-wrap">
  <div class="blob-blue"></div>
  <div class="blob-orange"></div>
 
  <div class="paw-watermark paw-left-wm">
    <svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="14" cy="20" rx="7" ry="9"/><ellipse cx="32" cy="12" rx="7.5" ry="10"/><ellipse cx="50" cy="20" rx="7" ry="9"/><path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/></svg>
  </div>
  <div class="paw-watermark paw-right-wm">
    <svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="14" cy="20" rx="7" ry="9"/><ellipse cx="32" cy="12" rx="7.5" ry="10"/><ellipse cx="50" cy="20" rx="7" ry="9"/><path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/></svg>
  </div>
 
  <div class="dots dots-top-left">
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
  </div>
  <div class="dots dots-bottom-right">
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
  </div>
 
  <section class="hero">
    <h1>Todo para el bienestar<br>de tu <span class="accent">mejor amigo</span> 🐾</h1>
    <p>Conecta, cuida y mejora la vida de las mascotas<br>desde un solo lugar.</p>
  </section>
 
  <div class="cards">
 
    <!-- Card 1: Adopción y perdidos -->
    <div class="card card-blue">
      <div class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 10-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 000-7.8z"/></svg>
      </div>
      <div class="illus">
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <rect x="20" y="40" width="90" height="70" rx="6" fill="#bcd4f7"/>
          <line x1="20" y1="63" x2="110" y2="63" stroke="white" stroke-width="2"/>
          <line x1="20" y1="86" x2="110" y2="86" stroke="white" stroke-width="2"/>
          <line x1="43" y1="40" x2="43" y2="110" stroke="white" stroke-width="2"/>
          <line x1="66" y1="40" x2="66" y2="110" stroke="white" stroke-width="2"/>
          <line x1="89" y1="40" x2="89" y2="110" stroke="white" stroke-width="2"/>
          <circle cx="66" cy="70" r="10" fill="#2f5fd1"/>
          <circle cx="66" cy="70" r="4" fill="white"/>
          <g transform="translate(115,35)">
            <ellipse cx="45" cy="80" rx="30" ry="20" fill="white" stroke="#1e3a8a" stroke-width="2.5"/>
            <circle cx="45" cy="45" r="24" fill="white" stroke="#1e3a8a" stroke-width="2.5"/>
            <path d="M25 30c-8-4-14 4-8 12" fill="#1e3a8a"/>
            <path d="M65 30c8-4 14 4 8 12" fill="#1e3a8a"/>
            <circle cx="37" cy="44" r="2.5" fill="#1e3a8a"/>
            <circle cx="53" cy="44" r="2.5" fill="#1e3a8a"/>
            <ellipse cx="45" cy="53" rx="3" ry="2" fill="#1e3a8a"/>
            <circle cx="45" cy="63" r="5" fill="none" stroke="#2f5fd1" stroke-width="2.5"/>
            <circle cx="45" cy="63" r="2" fill="#f2632b"/>
          </g>
        </svg>
      </div>
      <h3>Adopción y perdidos</h3>
      <p>Encuentra, ayuda y da un hogar lleno de amor.</p>
      <a class="link-row" href="#" @click.prevent="irAlMapa">
        <span class="link-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
          Reportes en mapa
        </span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
      </a>
      <a class="link-row" href="#" @click.prevent="irAGaleria">
        <span class="link-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
          Galería de adopción
        </span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
      </a>
    </div>
 
    <!-- Card 2: Cuidados -->
    <div class="card card-lightblue">
      <div class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg>
      </div>
      <div class="illus">
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <rect x="15" y="60" width="60" height="45" rx="6" fill="#2f5fd1"/>
          <rect x="35" y="48" width="20" height="14" rx="3" fill="none" stroke="#2f5fd1" stroke-width="4"/>
          <line x1="45" y1="72" x2="45" y2="92" stroke="white" stroke-width="5" stroke-linecap="round"/>
          <line x1="35" y1="82" x2="55" y2="82" stroke="white" stroke-width="5" stroke-linecap="round"/>
          <rect x="150" y="70" width="18" height="35" rx="3" fill="#3fae5c"/>
          <path d="M159 70c-14-6-14-26 0-30 14 4 14 24 0 30z" fill="#4fc46a"/>
          <path d="M159 70c10-10 10-22 2-28" fill="none" stroke="#3fae5c" stroke-width="2"/>
          <g transform="translate(75,20)">
            <ellipse cx="35" cy="85" rx="28" ry="18" fill="#f4b860"/>
            <circle cx="35" cy="50" r="22" fill="#f7c576"/>
            <ellipse cx="18" cy="38" rx="7" ry="12" fill="#e8a24c" transform="rotate(-20 18 38)"/>
            <ellipse cx="52" cy="38" rx="7" ry="12" fill="#e8a24c" transform="rotate(20 52 38)"/>
            <circle cx="28" cy="50" r="2.5" fill="#402a1a"/>
            <circle cx="42" cy="50" r="2.5" fill="#402a1a"/>
            <ellipse cx="35" cy="58" rx="3" ry="2" fill="#402a1a"/>
            <circle cx="35" cy="68" r="5" fill="none" stroke="#2f5fd1" stroke-width="2.5"/>
            <circle cx="35" cy="68" r="2" fill="#f2632b"/>
          </g>
        </svg>
      </div>
      <h3>Cuidados</h3>
      <p>Información y herramientas para una vida saludable.</p>
      <a class="link-row" href="#" @click.prevent="irAGenerarQR">
        <span class="link-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="16" y1="16" x2="16" y2="20"/><line x1="20" y1="16" x2="20" y2="20"/></svg>
          Código QR
        </span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
      </a>
      <a class="link-row" href="#" @click.prevent="irAConsejos">
        <span class="link-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5"/><circle cx="12" cy="16.5" r=".5" fill="currentColor"/></svg>
          Preguntas frecuentes
        </span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
      </a>
      <a class="link-row" href="#" @click.prevent="irADonaciones">
        <span class="link-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3l5 5-9 9H7v-5l9-9z"/><line x1="14" y1="5" x2="19" y2="10"/></svg>
          Donaciones
        </span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
      </a>
    </div>
 
    <!-- Card 3: Servicios -->
    <div class="card card-orange">
      <div class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 9l2-6h14l2 6"/><path d="M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9"/><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0"/></svg>
      </div>
      <div class="illus">
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <path d="M20 60h55l6 45H16z" fill="#f2632b"/>
          <path d="M32 60c0-10 6-18 15-18s15 8 15 18" fill="none" stroke="#f2632b" stroke-width="4"/>
          <circle cx="35" cy="78" r="8" fill="#fff" opacity=".3"/>
          <circle cx="47" cy="100" r="14" fill="#fbb040"/>
          <g transform="translate(95,25)">
            <path d="M50 100c-4-30 8-45 8-60 0-8-6-14-14-14s-14 6-14 14c0 15 12 30 8 60z" fill="#7d8592"/>
            <circle cx="44" cy="35" r="24" fill="#8b93a0"/>
            <path d="M26 20l4 14 8-8z" fill="#8b93a0"/>
            <path d="M62 20l-4 14-8-8z" fill="#8b93a0"/>
            <circle cx="36" cy="36" r="2.5" fill="#1a1d22"/>
            <circle cx="52" cy="36" r="2.5" fill="#1a1d22"/>
            <path d="M40 44h8" stroke="#1a1d22" stroke-width="2" stroke-linecap="round"/>
            <line x1="20" y1="40" x2="6" y2="38" stroke="#1a1d22" stroke-width="1.5"/>
            <line x1="20" y1="44" x2="6" y2="46" stroke="#1a1d22" stroke-width="1.5"/>
            <line x1="68" y1="40" x2="82" y2="38" stroke="#1a1d22" stroke-width="1.5"/>
            <line x1="68" y1="44" x2="82" y2="46" stroke="#1a1d22" stroke-width="1.5"/>
          </g>
        </svg>
      </div>
      <h3>Servicios</h3>
      <p>Encuentra los mejores servicios y productos para tu mascota.</p>
      <a class="link-row" href="#" @click.prevent="irAVeterinarios">
        <span class="link-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-6-4.5-9-9.5C1 6.5 4 3 8 4.5c2 .8 3 2.5 4 4 1-1.5 2-3.2 4-4 4-1.5 7 2 5 7-3 5-9 9.5-9 9.5z" opacity="0"/><path d="M4 14a5 5 0 015-5h1v5H8"/><rect x="9" y="9" width="6" height="10" rx="2"/><circle cx="12" cy="6" r="3"/></svg>
          Veterinarios
        </span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
      </a>
      <a class="link-row" href="#" @click.prevent="irACollares">
        <span class="link-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.5 12.5h11l2.5-8h-15"/></svg>
          Tiendas de collares personalizados
        </span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
      </a>
    </div>
 
  </div>
</div>

<!-- ===== SECCIÓN DEL EQUIPO ===== -->
<div class="team-section">
  <div class="team-container">
    <div class="team-header">
      <h2>Nuestro <span class="accent">Equipo</span> 🐾</h2>
      <p>Personas apasionadas que trabajan cada día para mejorar la vida de las mascotas.</p>
    </div>

    <div class="team-grid">
      <!-- Nahomy Flores -->
      <div class="team-card">
        <span class="badge-icon">✏️</span>
        <div class="photo-wrap">
          <img src="../assets/img/naho.png" alt="Nahomy Flores">
          <span class="paw-tag">🐾</span>
        </div>
        <h3>Nahomy Flores</h3>
        <div class="role">Designer</div>
        <div class="mini-divider"><span class="line"></span><span class="paw">🐾</span><span class="line"></span></div>
      </div>

      <!-- Gerardo Echeverria -->
      <div class="team-card">
        <span class="badge-icon">✏️</span>
        <div class="photo-wrap">
          <img src="../assets/img/gerardo.png" alt="Gerardo Echeverria">
          <span class="paw-tag">🐾</span>
        </div>
        <h3>Gerardo Echeverria</h3>
        <div class="role">Designer</div>
        <div class="mini-divider"><span class="line"></span><span class="paw">🐾</span><span class="line"></span></div>
      </div>

      <!-- Lisdary Díaz -->
      <div class="team-card orange-role">
        <span class="badge-icon orange">👑</span>
        <div class="photo-wrap">
          <img src="../assets/img/lis.png" alt="Lisdary Díaz">
          <span class="paw-tag orange">🐾</span>
        </div>
        <h3>Lisdary Díaz</h3>
        <div class="role">Developer-Leader</div>
        <div class="mini-divider orange"><span class="line"></span><span class="paw">🐾</span><span class="line"></span></div>
      </div>

      <!-- Kenny Martínez -->
      <div class="team-card">
        <span class="badge-icon">✏️</span>
        <div class="photo-wrap">
          <img src="../assets/img/kenny.png" alt="Kenny Martínez">
          <span class="paw-tag">🐾</span>
        </div>
        <h3>Kenny Martínez</h3>
        <div class="role">Designer</div>
        <div class="mini-divider"><span class="line"></span><span class="paw">🐾</span><span class="line"></span></div>
      </div>

      <!-- Avril Rendon -->
      <div class="team-card orange-role">
        <span class="badge-icon orange">👑</span>
        <div class="photo-wrap">
          <img src="../assets/img/avril.png" alt="María Sánchez">
          <span class="paw-tag orange">🐾</span>
        </div>
        <h3>Avril Rendon</h3>
        <div class="role">Developer-Leader</div>
        <div class="mini-divider"><span class="line"></span><span class="paw">🐾</span><span class="line"></span></div>
      </div>

      <!-- Quote Card -->
      <div class="quote-card">
        <div class="quote-icon">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#ff7a1a" stroke-width="3.5">
            <path d="M50 30 C 30 30, 15 45, 15 62 C 15 78, 28 88, 42 85 C 42 85, 35 92, 50 95 C 65 92, 58 85, 58 85 C 72 88, 85 78, 85 62 C 85 45, 70 30, 50 30 Z"/>
            <circle cx="35" cy="58" r="3" fill="#ff7a1a" stroke="none"/>
            <circle cx="65" cy="58" r="3" fill="#ff7a1a" stroke="none"/>
            <path d="M40 68 Q50 74 60 68" stroke-linecap="round"/>
            <path d="M75 25 L78 32 M82 20 L86 26 M68 22 L70 29" stroke-linecap="round"/>
          </svg>
        </div>
        <p>Trabajamos con amor, dedicación y compromiso para crear soluciones que conecten y cuiden a las mascotas y a quienes las aman.</p>
      </div>
    </div>
  </div>
</div>

<footer class="footer">
  <div class="blob-left"></div>
  <div class="blob-right"></div>
 
  <div class="footer-content">
    <div class="brand">
      <div class="brand-logo">
        <span class="paw">🐾</span>
        <span class="tail">Tail<span class="scan">Scan</span></span>
      </div>
      <p>Cada cola merece ser feliz. Conectamos mascotas, familias y comunidad. 🐾</p>
    </div>
 
    <div class="col">
      <h4>Navegación</h4>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Registrar Mascota</a></li>
        <li><a href="#">Adoptar</a></li>
        <li><a href="#">Servicios</a></li>
      </ul>
    </div>
 
    <div class="col">
      <h4>Comunidad</h4>
      <ul>
        <li><a href="#">Consejos</a></li>
        <li><a href="#">Reportar mascota perdida</a></li>
        <li><a href="#">Donar</a></li>
        <li><a href="#">Nuestro equipo</a></li>
      </ul>
    </div>
 
    <div class="col">
      <h4>Síguenos</h4>
      <div class="social-icons">
        <a href="#" aria-label="App">📱</a>
        <a href="#" aria-label="Instagram">📷</a>
        <a href="#" aria-label="TikTok">🎵</a>
        <a href="#" aria-label="Email">✉️</a>
      </div>
    </div>
  </div>
 
  <div class="footer-bottom">
    <span>© 2026 TailScan. Todos los derechos reservados.</span>
    <span>Hecho con 🐾 por el equipo TailScan</span>
  </div>
</footer>
</template>

<style>
  :root{
    --navy:#1e3a8a;
    --blue:#2f5fd1;
    --blue-light:#7ea6f0;
    --orange:#ff8a3d;
    --orange-deep:#f2632b;
    --cream:#fdfbf8;
    --ink:#28324a;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  body{
    font-family:'Segoe UI', Arial, sans-serif;
    color:var(--ink);
    background:var(--cream);
    overflow-x:hidden;
  }
 
  /* ===== Decorative background ===== */
  .bg-wrap{
    position:relative;
    min-height:100vh;
    background:linear-gradient(115deg, var(--navy) 0%, var(--blue) 28%, #eef2fb 50%, #ffe3c9 62%, var(--orange) 85%, var(--orange-deep) 100%);
    overflow:hidden;
    padding-bottom:60px;
  }
  .blob{
    position:absolute;
    border-radius:50%;
    filter:blur(2px);
    opacity:.55;
  }
  .blob-blue-1{ width:520px; height:520px; background:radial-gradient(circle, #1e3a8a, transparent 70%); top:-120px; left:-160px; }
  .blob-blue-2{ width:640px; height:640px; background:radial-gradient(circle, #3b6fe0, transparent 70%); bottom:-220px; left:-180px; opacity:.5; }
  .blob-orange-1{ width:560px; height:560px; background:radial-gradient(circle, #ffb27a, transparent 70%); top:-140px; right:-160px; }
  .blob-orange-2{ width:480px; height:480px; background:radial-gradient(circle, #ff9d55, transparent 70%); bottom:-160px; right:-140px; opacity:.5; }
 
  .paw{
    position:absolute;
    opacity:.18;
    color:white;
  }
  .paw svg{ width:100%; height:100%; }
  .paw-left{ width:170px; height:170px; bottom:40px; left:20px; color:#dbe6ff; }
  .paw-right{ width:190px; height:190px; top:30px; right:30px; color:#ffd9b8; opacity:.4;}
 
  .dots{
    position:absolute;
    display:grid;
    grid-template-columns:repeat(3, 8px);
    gap:8px;
  }
  .dots span{
    width:6px; height:6px; border-radius:50%;
    background:rgba(255,255,255,.55);
  }
  .dots-top-left{ top:36px; left:36px; }
  .dots-bottom-right{ bottom:36px; right:36px; }
  .dots-bottom-right span{ background:rgba(255,190,130,.9); }
 
  /* ===== Header ===== */
  header{
    position:relative;
    z-index:2;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:26px 56px;
  }
  .logo{
    display:flex;
    align-items:center;
    gap:10px;
    font-size:24px;
    font-weight:800;
  }
  .logo .tail{ color:var(--navy); }
  .logo .scan{ color:var(--orange); }
  .logo-icon{ width:34px; height:34px; color:var(--navy); }
  .logo-img{ width:30px; height:30px; object-fit:contain; }
 
  nav{
    display:flex;
    gap:34px;
    font-size:15px;
    font-weight:600;
  }
  nav a{
    text-decoration:none;
    color:var(--ink);
    opacity:.75;
  }
  nav a.active{
    opacity:1;
    color:var(--orange-deep);
    border-bottom:2px solid var(--orange-deep);
    padding-bottom:6px;
  }
  nav a:hover{ opacity:1; }

  .header-right{
    display:flex;
    align-items:center;
  }
  .user-avatar{
    width:44px;
    height:44px;
    border-radius:50%;
    border:2px solid rgba(255,255,255,.7);
    padding:0;
    overflow:hidden;
    cursor:pointer;
    background:linear-gradient(135deg, var(--navy), var(--blue));
    box-shadow:0 6px 16px rgba(30,58,138,.25);
    transition:transform .15s ease, box-shadow .15s ease;
    flex-shrink:0;
  }
  .user-avatar:hover{
    transform:translateY(-2px) scale(1.04);
    box-shadow:0 10px 22px rgba(30,58,138,.32);
  }
  .user-avatar img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
  }
  .user-avatar-fallback{
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-weight:800;
    font-size:16px;
  }
  .logout-btn{
    width:40px;
    height:40px;
    border-radius:50%;
    border:2px solid rgba(255,255,255,.7);
    background:rgba(255,255,255,.9);
    color:var(--navy);
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    transition:transform .15s ease, box-shadow .15s ease, background .15s ease, color .15s ease;
    box-shadow:0 4px 12px rgba(30,58,138,.15);
  }
  .logout-btn svg{ width:18px; height:18px; }
  .logout-btn:hover{
    transform:translateY(-2px);
    background:#fff;
    color:var(--orange-deep);
    box-shadow:0 8px 18px rgba(0,0,0,.15);
  }

  /* ===== Hero card ===== */
  .hero-layout{
    position:relative;
    z-index:2;
    max-width:1240px;
    margin:20px auto 0;
    padding:0 24px;
    display:flex;
    align-items:stretch;
    justify-content:center;
    gap:24px;
  }
  .hero-layout .card{
    position:relative;
    z-index:2;
    flex:1 1 0;
    max-width:760px;
    margin:0;
    background:rgba(255,255,255,.92);
    backdrop-filter:blur(6px);
    border-radius:26px;
    box-shadow:0 30px 60px rgba(30,58,138,.18);
    padding:60px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .hero-text{
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    gap:24px;
  }
  .hero-text h1{
    font-size:36px;
    font-weight:800;
    margin-bottom:20px;
    color:var(--navy);
  }
  .hero-text h1 .accent{ color:var(--orange-deep); }
  .hero-text p{
    font-size:15.5px;
    line-height:1.75;
    color:#4b5568;
    margin-bottom:18px;
  }
  .buttons{
    display:flex;
    gap:14px;
    margin-top:28px;
    flex-wrap:wrap;
  }
  .btn{
    border:none;
    padding:13px 22px;
    border-radius:10px;
    font-size:14px;
    font-weight:700;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:8px;
    transition:transform .15s ease, box-shadow .15s ease;
  }
  .btn:hover{ transform:translateY(-2px); box-shadow:0 8px 18px rgba(0,0,0,.15); }
  .btn-primary{ background:linear-gradient(135deg, var(--navy), var(--blue)); color:white; }
  .btn-outline{ background:transparent; color:var(--navy); border:2px solid var(--navy); }
  .btn-donate{ background:linear-gradient(135deg, var(--orange), var(--orange-deep)); color:white; }
 
  .hero-side-image{
    flex:0 0 320px;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .hero-side-image img{
    width:100%;
    max-width:320px;
    border-radius:24px;
    box-shadow:0 20px 45px rgba(242,99,43,.25);
    border:6px solid rgba(255,255,255,.9);
    object-fit:cover;
  }
  .buttons{
    display:flex;
    gap:14px;
    margin-top:28px;
    flex-wrap:wrap;
  }
  .btn{
    border:none;
    padding:13px 22px;
    border-radius:10px;
    font-size:14px;
    font-weight:700;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:8px;
    transition:transform .15s ease, box-shadow .15s ease;
  }
  .btn:hover{ transform:translateY(-2px); box-shadow:0 8px 18px rgba(0,0,0,.15); }
  .btn-primary{ background:linear-gradient(135deg, var(--navy), var(--blue)); color:white; }
  .btn-outline{ background:transparent; color:var(--navy); border:2px solid var(--navy); }
  .btn-donate{ background:linear-gradient(135deg, var(--orange), var(--orange-deep)); color:white; }
  .hero-image img{
    max-width:420px;
    width:100%;
    border-radius:18px;
    box-shadow:0 20px 45px rgba(242,99,43,.25);
    border:6px solid white;
  }
  :root{
    --navy:#1e3a8a;
    --blue:#2f5fd1;
    --blue-mid:#4f7fe0;
    --orange:#ff8a3d;
    --orange-deep:#f2632b;
    --cream:#fdfbf8;
    --ink:#28324a;
    --muted:#6b7488;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  body{
    font-family:'Segoe UI', Arial, sans-serif;
    color:var(--ink);
    background:var(--cream);
    overflow-x:hidden;
  }
 
  .bg-wrap{
    position:relative;
    min-height:100vh;
    background:linear-gradient(120deg, #ffffff 0%, #fbf7f1 30%, #fff3e8 55%, #ffe0c4 100%);
    overflow:hidden;
    padding-bottom:80px;
  }
 
  .blob-blue{
    position:absolute;
    width:900px; height:900px;
    left:-420px; bottom:-420px;
    background:radial-gradient(circle at 60% 40%, var(--blue-mid), var(--navy) 75%);
    border-radius:50%;
    z-index:0;
  }
  .blob-orange{
    position:absolute;
    width:700px; height:700px;
    right:-260px; top:-40px;
    background:radial-gradient(circle at 40% 40%, var(--orange), var(--orange-deep) 75%);
    border-radius:50%;
    opacity:.9;
    z-index:0;
  }
  .paw-watermark{
    position:absolute;
    opacity:.5;
  }
  .paw-watermark svg{ width:100%; height:100%; }
  .paw-left-wm{ width:180px; height:180px; top:150px; left:170px; color:#dbe4f5; z-index:0; }
  .paw-right-wm{ width:200px; height:200px; top:150px; right:170px; color:#ffcda3; opacity:.6; z-index:0; }
 
  .dots{
    position:absolute;
    display:grid;
    grid-template-columns:repeat(3, 7px);
    gap:8px;
    z-index:1;
  }
  .dots span{ width:6px; height:6px; border-radius:50%; }
  .dots-top-left span{ background:#9fb3e0; }
  .dots-top-left{ top:160px; left:32px; }
  .dots-bottom-right span{ background:#ffb787; }
  .dots-bottom-right{ bottom:80px; right:32px; }
 
  header{
    position:relative;
    z-index:2;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:22px 56px;
    background:rgba(255,255,255,.5);
    border-bottom:1px solid rgba(0,0,0,.04);
  }
  .logo{
    display:flex;
    align-items:center;
    gap:8px;
    font-size:24px;
    font-weight:800;
  }
  .logo-icon{ width:34px; height:34px; color:var(--navy); }
  .logo .tail{ color:var(--navy); }
  .logo .scan{ color:var(--orange); }
 
  nav{
    display:flex;
    gap:40px;
    font-size:15px;
    font-weight:600;
  }
  nav a{
    text-decoration:none;
    color:var(--ink);
    opacity:.85;
    padding-bottom:8px;
  }
  nav a.active{
    opacity:1;
    color:var(--orange-deep);
    border-bottom:2px solid var(--orange-deep);
  }
  nav a:hover{ opacity:1; }
 
  .header-right{
    display:flex;
    align-items:center;
    gap:22px;
  }
  .bell{ width:22px; height:22px; color:var(--blue); cursor:pointer; }
  .login-btn{
    display:flex;
    align-items:center;
    gap:8px;
    background:linear-gradient(135deg, var(--navy), var(--blue));
    color:white;
    border:none;
    padding:12px 22px;
    border-radius:30px;
    font-size:14.5px;
    font-weight:700;
    cursor:pointer;
  }
  .login-btn svg{ width:16px; height:16px; }
 
  .hero{
    position:relative;
    z-index:2;
    text-align:center;
    padding:70px 24px 60px;
  }
  .hero h1{
    font-size:42px;
    font-weight:800;
    line-height:1.25;
    color:var(--navy);
  }
  .hero h1 .accent{ color:var(--orange-deep); }
  .hero p{
    margin-top:18px;
    font-size:16px;
    color:var(--muted);
    line-height:1.6;
  }
 
  .cards {
    position: relative;
    z-index: 2;
    max-width: 1040px;
    margin: 32px auto 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    padding: 0 16px;
    align-items: stretch;
  }
  .cards > .card{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background:white;
    border-radius:18px;
    box-shadow:0 14px 24px rgba(30,58,138,.08);
    padding:22px 16px 20px;
    position:relative;
    text-align:center;
    border-bottom:4px solid var(--card-accent, var(--blue));
    min-height: 420px;
    height: 100%;
  }
  .badge{
    position:absolute;
    top:-22px; left:50%;
    transform:translateX(-50%);
    width:44px; height:44px;
    border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    background:var(--card-accent, var(--blue));
    color:white;
    box-shadow:0 6px 12px rgba(0,0,0,.12);
  }
  .badge svg{ width:20px; height:20px; }
 
  .illus{
    height:118px;
    border-radius:16px;
    margin-bottom:14px;
    position:relative;
    overflow:hidden;
    background:var(--illus-bg, #eaf1fb);
    display:flex;
    align-items:flex-end;
    justify-content:center;
  }
  .illus svg{ max-height:98px; }
 
  .card h3{
    font-size:19px;
    font-weight:800;
    color:var(--card-accent, var(--navy));
    margin-bottom:6px;
  }
  .card > p{
    font-size:13.8px;
    color:var(--muted);
    line-height:1.55;
    margin-bottom:12px;
    min-height:34px;
  }
 
  .link-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: #f7f9fc;
    border-radius: 12px;
    padding: 8px 10px;
    margin-bottom: 8px;
    text-decoration: none;
    color: var(--ink);
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;
    min-height: 40px;
  }

  .link-row:hover {
    background: #eef2fa;
    transform: translateX(6px);
  }

  .link-row .link-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
    line-height: 1.2;
  }
  .link-left{ display:flex; align-items:center; gap:12px; text-align:left; }
  .link-left svg{ width:19px; height:19px; color:var(--card-accent, var(--blue)); flex-shrink:0; }
  .chev{ width:16px; height:16px; color:#b6bccb; flex-shrink:0; margin-left:6px; display: inline-flex; align-items: center; }
 
  .card-blue{ --card-accent:#2f5fd1; --illus-bg:#e4ecfb; }
  .card-lightblue{ --card-accent:#3f7fd6; --illus-bg:#eaf3fb; }
  .card-orange{ --card-accent:#f2632b; --illus-bg:#fdece1; }
 
  @media (max-width:960px){
    .cards{ grid-template-columns: 1fr; }
    header{ flex-wrap:wrap; gap:16px; padding:18px 24px; }
    nav{ gap:20px; font-size:13.5px; order:3; width:100%; justify-content:center; }
    .hero h1{ font-size:30px; }
  }
  @media (max-width:900px){
    .hero-layout{ flex-direction:column; }
    .card{ flex-direction:column; padding:36px; text-align:center; }
    .hero-side-image{ flex-basis:auto; width:100%; max-width:320px; }
    .hero-text{ order:1; }
    .buttons{ justify-content:center; }
    header{ flex-direction:column; gap:16px; padding:20px 24px; }
    nav{ font-size:13px; gap:16px; }
  }
 
  /* ===== TEAM SECTION ===== */
  .team-section {
    background: #f5f7fc;
    padding: 60px 20px 80px;
  }
  .team-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .team-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 50px;
  }
  .team-header h2 {
    font-size: 44px;
    font-weight: 800;
    color: var(--navy);
  }
  .team-header h2 .accent {
    color: var(--orange-deep);
  }
  .team-header p {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.6;
    margin-top: 18px;
  }
  .team-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 26px;
  }
  .team-card {
    grid-column: span 2;
    background: white;
    border-radius: 22px;
    padding: 26px 22px 22px;
    text-align: center;
    box-shadow: 0 15px 40px rgba(20, 40, 120, 0.06);
    position: relative;
    border: 2px solid transparent;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .team-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(20, 40, 120, 0.12);
  }
  .team-card.highlight {
    border-color: var(--blue);
  }
  .badge-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    background: var(--blue);
  }
  .badge-icon.orange {
    background: var(--orange-deep);
  }
  .photo-wrap {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 2px solid #c7d5f7;
    margin: 0 auto 20px;
    position: relative;
    padding: 6px;
  }
  .photo-wrap img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
  .paw-tag {
    position: absolute;
    bottom: 6px;
    right: 2px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #dbe6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  .paw-tag.orange {
    background: #ffe3cc;
  }
  .team-card h3 {
    font-size: 19px;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .team-card .role {
    font-size: 14px;
    font-style: italic;
    color: var(--blue);
    margin-bottom: 16px;
  }
  .team-card.orange-role .role {
    color: var(--orange-deep);
  }
  .mini-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .mini-divider .line {
    width: 40px;
    height: 1.5px;
    background: #c7d5f7;
  }
  .mini-divider.orange .line {
    background: #ffd0a3;
  }
  .mini-divider .paw {
    font-size: 12px;
  }
  .quote-card {
    grid-column: span 6;
    background: #f2f4fb;
    border-radius: 22px;
    padding: 36px 40px;
    display: flex;
    align-items: center;
    gap: 26px;
  }
  .quote-icon {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .quote-card p {
    font-size: 17px;
    color: var(--navy);
    line-height: 1.7;
    font-weight: 500;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f2f2f2;
  }
 
  .footer {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #1a3fd6 0%, #142e9e 60%, #0f2380 100%);
    color: #fff;
    padding: 48px 64px 24px;
  }
 
  /* decorative blob top-left */
  .blob-left {
    position: absolute;
    top: -60px;
    left: -60px;
    width: 220px;
    height: 220px;
    background: rgba(255,255,255,0.06);
    border-radius: 50%;
  }
  .blob-left::after {
    content: "";
    position: absolute;
    top: 90px;
    left: 30px;
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.06);
    border-radius: 50%;
  }
 
  /* decorative orange swoop top-right */
  .blob-right {
    position: absolute;
    top: -140px;
    right: -140px;
    width: 320px;
    height: 320px;
    background: linear-gradient(135deg, #ff8a3d, #ff5f1f);
    border-radius: 50%;
    z-index: 0;
  }
 
  .footer-content {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
  }
 
  .brand {
    max-width: 320px;
  }
 
  .brand-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 14px;
  }
 
  .brand-logo .paw {
    font-size: 22px;
  }
 
  .brand-logo .tail {
    color: #fff;
  }
 
  .brand-logo .scan {
    color: #ff8a3d;
  }
 
  .brand p {
    font-size: 14px;
    line-height: 1.6;
    color: #dbe2ff;
    margin: 0;
  }
 
  .col h4 {
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #ffb27a;
    margin: 0 0 16px;
    font-weight: 700;
  }
 
  .col ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
 
  .col ul li {
    margin-bottom: 10px;
  }
 
  .col ul li a {
    color: #e7ebff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s ease;
  }
 
  .col ul li a:hover {
    color: #ff8a3d;
  }
 
  .social-icons {
    display: flex;
    gap: 12px;
  }
 
  .social-icons a {
    width: 38px;
    height: 38px;
    border: 1px solid rgba(255,255,255,0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease;
  }
 
  .social-icons a:hover {
    background: rgba(255,255,255,0.12);
    border-color: #ff8a3d;
  }
 
  .footer-bottom {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.15);
    font-size: 13px;
    color: #c7d0f7;
    flex-wrap: wrap;
    gap: 10px;
  }
 
  @media (max-width: 700px) {
    .footer { padding: 40px 24px 20px; }
    .footer-content { flex-direction: column; gap: 28px; }
  }
 
  @media (max-width: 1100px) {
    .team-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .team-card {
      grid-column: span 1;
    }
    .quote-card {
      grid-column: span 2;
    }
  }
  @media (max-width: 600px) {
    .team-grid {
      grid-template-columns: 1fr;
    }
    .team-card {
      grid-column: span 1;
    }
    .quote-card {
      grid-column: span 1;
      flex-direction: column;
      text-align: center;
    }
    .team-header h2 {
      font-size: 32px;
    }
    .photo-wrap {
      width: 140px;
      height: 140px;
    }
  }
</style>