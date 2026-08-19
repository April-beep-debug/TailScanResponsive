<script setup>
import { ref } from 'vue'
import mascotaImg from '../assets/img/mascota.png'
import cachorroImg from '../assets/img/cachorro.jpg'
import gatoImg from '../assets/img/gato.png'
import goldenImg from '../assets/img/golden.jpg'
import michiImg from '../assets/img/michi.png'

const productos = [
  { id: 1, marca: 'Taste of the Wild', nombre: 'Pacific Stream', precio: '32.99', rating: 4, resenas: 124, img: mascotaImg },
  { id: 2, marca: 'KONG Classic', nombre: 'Rojo - M', precio: '16.99', rating: 5, resenas: 88, img: cachorroImg },
  { id: 3, marca: 'Greenies', nombre: 'Original', precio: '23.50', rating: 4, resenas: 76, img: gatoImg },
  { id: 4, marca: 'Cama Suave', nombre: 'Premium Gris', precio: '39.99', rating: 5, resenas: 58, img: goldenImg },
  { id: 5, marca: 'Collar Reflectivo', nombre: 'Morado - L', precio: '12.99', rating: 4, resenas: 87, img: michiImg },
]

const categoriaActiva = ref('Productos')
</script>

<template>
  <div class="page">
    <!-- Blobs decorativos -->
    <div class="blob blob-orange"></div>
    <div class="dots-deco">
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
    </div>

    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-inner">
          <div class="logo-row">
            <img class="logo-badge" :src="mascotaImg" alt="Mascota" />
            <div>
              <h1 class="logo-title">TailScan</h1>
              <p class="logo-sub">Para perros y gatos</p>
            </div>
          </div>

          <nav class="menu">
            <a href="#" class="menu-item" :class="{ active: categoriaActiva === 'Productos' }" @click="categoriaActiva = 'Productos'">
              <i class="fa-solid fa-bag-shopping"></i> Productos
            </a>
            <a href="#" class="menu-item" @click="categoriaActiva = 'Perros'">
              <i class="fa-solid fa-dog"></i> Perros
            </a>
            <a href="#" class="menu-item" @click="categoriaActiva = 'Gatos'">
              <i class="fa-solid fa-cat"></i> Gatos
            </a>
          </nav>

          <div class="shipping-card">
            <p class="shipping-title">🚚 Envío gratis</p>
            <p class="shipping-sub">en compras desde $25</p>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="main">
        <!-- Hero -->
        <section class="hero">
          <h2 class="hero-title">
            Todo lo que necesita <span class="accent">tu mejor amigo</span> 🐾
          </h2>
          <p class="hero-sub">Alimento, juguetes y cuidado, elegidos con cariño.</p>
        </section>

        <!-- Banners -->
        <div class="banners">
          <div class="banner banner-dog">
            <div class="banner-text">
              <h3>Nutrición<br>de calidad</h3>
              <p>Para una vida sana y feliz</p>
              <button class="btn btn-blue" @click="() => alert('Redirigiendo a productos para perros...')">
                Ver productos
              </button>
            </div>
            <div class="banner-img">
              <img :src="goldenImg" alt="Golden Retriever">
            </div>
          </div>

          <div class="banner banner-cat">
            <div class="banner-text">
              <h3>Bienestar para<br>tu gato</h3>
              <p>Cuidado y cariño en cada detalle</p>
              <button class="btn btn-orange" @click="() => alert('Redirigiendo a productos para gatos...')">
                Ver productos
              </button>
            </div>
            <div class="banner-img">
              <img :src="gatoImg" alt="Gato">
            </div>
          </div>
        </div>

        <!-- Destacados -->
        <section class="destacados">
          <div class="section-head">
            <h3>Productos destacados</h3>
          </div>

          <div class="grid-productos">
            <div v-for="p in productos" :key="p.id" class="card-producto">
              <div class="card-img-wrap">
                <img :src="p.img" :alt="p.marca">
              </div>
              <div class="card-body">
                <p class="marca">{{ p.marca }}</p>
                <p class="nombre">{{ p.nombre }}</p>
                <p class="precio">${{ p.precio }}</p>
                <div class="rating">
                  <span v-for="n in 5" :key="n" :class="n <= p.rating ? 'star-on' : 'star-off'">★</span>
                  <span class="resenas">({{ p.resenas }})</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer info -->
        <footer class="footer-info">
          <div class="footer-item">
            <i class="fa-solid fa-truck"></i>
            <div>
              <p class="footer-title">Envíos rápidos</p>
              <p class="footer-sub">A todo el país</p>
            </div>
          </div>
          <div class="footer-item">
            <i class="fa-solid fa-shield"></i>
            <div>
              <p class="footer-title">Pagos seguros</p>
              <p class="footer-sub">Compra con confianza</p>
            </div>
          </div>
          <div class="footer-item">
            <i class="fa-solid fa-headset"></i>
            <div>
              <p class="footer-title">Atención 24/7</p>
              <p class="footer-sub">Siempre para ayudarte</p>
            </div>
          </div>
          <div class="footer-item">
            <i class="fa-solid fa-rotate"></i>
            <div>
              <p class="footer-title">Devoluciones fáciles</p>
              <p class="footer-sub">Sin complicaciones</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(160deg, #fdf6ec 0%, #fbeee0 45%, #fdf6ec 100%);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Blob decorativo naranja, igual que el home */
.blob-orange {
  position: absolute;
  top: -220px;
  right: -220px;
  width: 640px;
  height: 640px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  opacity: 0.9;
  z-index: 0;
}

.dots-deco {
  position: absolute;
  top: 40px;
  left: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  z-index: 0;
}
.dots-deco span {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: #cbd5f5;
}

.layout {
  position: relative;
  z-index: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
}

/* Sidebar */
.sidebar {
  width: 260px;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  border-right: 1px solid rgba(226, 232, 240, 0.6);
  position: sticky;
  top: 0;
}
.sidebar-inner {
  padding: 28px 22px;
}
.logo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 36px;
}
.logo-badge {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f4f5f7, #c6c7c8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);
}
.logo-title {
  font-size: 22px;
  font-weight: 800;
  color: #1e3a8a;
  margin: 0;
  line-height: 1.1;
}
.logo-sub {
  font-size: 11px;
  color: #94a3b8;
  margin: 2px 0 0;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  font-size: 14.5px;
  transition: all 0.25s ease;
}
.menu-item:hover {
  background: #eff4ff;
  color: #2563eb;
  transform: translateX(4px);
}
.menu-item.active {
  background: #fff1e6;
  color: #f97316;
  font-weight: 700;
}

.shipping-card {
  margin-top: 32px;
  padding: 16px;
  border-radius: 20px;
  background: #eef4ff;
  text-align: center;
}
.shipping-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0;
}
.shipping-sub {
  font-size: 12px;
  color: #64748b;
  margin: 4px 0 0;
}

/* Main */
.main {
  flex: 1;
  padding: 40px 44px 60px;
}

.hero {
  margin-bottom: 32px;
}
.hero-title {
  font-size: 34px;
  font-weight: 800;
  color: #14213d;
  line-height: 1.2;
  margin: 0 0 10px;
}
.hero-title .accent {
  color: #1e2a8a;
}
.hero-sub {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

/* Banners */
.banners {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 44px;
}
.banner {
  display: flex;
  border-radius: 28px;
  overflow: hidden;
  min-height: 190px;
}
.banner-dog {
  background: linear-gradient(135deg, #eaf1ff, #ffffff);
}
.banner-cat {
  background: linear-gradient(135deg, #fff1e6, #ffffff);
}
.banner-text {
  flex: 1;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner-text h3 {
  font-size: 22px;
  font-weight: 800;
  color: #14213d;
  margin: 0 0 6px;
}
.banner-text p {
  color: #64748b;
  margin: 0 0 18px;
  font-size: 14px;
}
.banner-img {
  flex: 1;
  position: relative;
}
.banner-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.btn {
  align-self: flex-start;
  border: none;
  padding: 12px 22px;
  border-radius: 999px;
  color: #fff;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.btn-blue {
  background: #2563eb;
}
.btn-blue:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}
.btn-orange {
  background: #f97316;
}
.btn-orange:hover {
  background: #ea580c;
  transform: translateY(-2px);
}

/* Destacados */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.section-head h3 {
  font-size: 22px;
  font-weight: 700;
  color: #14213d;
  margin: 0;
}
.ver-todos {
  color: #2563eb;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ver-todos:hover {
  text-decoration: underline;
}

.grid-productos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.card-producto {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}
.card-producto:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px -10px rgba(30, 58, 138, 0.15);
}
.card-img-wrap {
  height: 170px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.card-img-wrap img {
  height: 100%;
  object-fit: contain;
}
.card-body {
  padding: 16px;
}
.marca {
  font-size: 12.5px;
  color: #94a3b8;
  margin: 0;
}
.nombre {
  font-weight: 600;
  color: #14213d;
  margin: 2px 0 0;
  font-size: 14.5px;
}
.precio {
  font-size: 19px;
  font-weight: 800;
  color: #14213d;
  margin: 10px 0 4px;
}
.rating {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
}
.star-on { color: #f59e0b; }
.star-off { color: #e2e8f0; }
.resenas {
  color: #94a3b8;
  font-size: 12px;
  margin-left: 4px;
}

/* Footer */
.footer-info {
  margin-top: 48px;
  background: #ffffff;
  border-radius: 24px;
  border-top: 1px solid #f1f5f9;
  padding: 24px 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: space-between;
}
.footer-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #475569;
}
.footer-item i {
  color: #2563eb;
  font-size: 18px;
}
.footer-title {
  font-weight: 700;
  color: #14213d;
  margin: 0;
}
.footer-sub {
  font-size: 12px;
  color: #94a3b8;
  margin: 2px 0 0;
}

/* Responsive */
@media (max-width: 1100px) {
  .grid-productos { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .layout { flex-direction: column; }
  .sidebar { width: 100%; min-height: auto; position: relative; }
  .banners { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .grid-productos { grid-template-columns: repeat(2, 1fr); }
  .main { padding: 28px 20px 40px; }
}
</style>