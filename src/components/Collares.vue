<template>
  <div class="tienda-collares">
    <!-- Fondo decorativo estilo Home -->
    <div class="blob blob-blue"></div>
    <div class="blob blob-orange"></div>

    <div class="paw-watermark paw-left">
      <svg viewBox="0 0 64 64" fill="currentColor">
        <ellipse cx="14" cy="20" rx="7" ry="9"/>
        <ellipse cx="32" cy="12" rx="7.5" ry="10"/>
        <ellipse cx="50" cy="20" rx="7" ry="9"/>
        <path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/>
      </svg>
    </div>

    <div class="paw-watermark paw-right">
      <svg viewBox="0 0 64 64" fill="currentColor">
        <ellipse cx="14" cy="20" rx="7" ry="9"/>
        <ellipse cx="32" cy="12" rx="7.5" ry="10"/>
        <ellipse cx="50" cy="20" rx="7" ry="9"/>
        <path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/>
      </svg>
    </div>

    <div class="dots dots-left">
      <span v-for="n in 9" :key="n"></span>
    </div>

    <div class="dots dots-right">
      <span v-for="n in 9" :key="n"></span>
    </div>

    <!-- Header -->
    <header class="tc-header">
      <div class="header-top">
        <button class="icon-btn grid-btn" aria-label="Menú">
          <span class="dot" v-for="n in 6" :key="n"></span>
        </button>

        <button
          class="icon-btn back-btn"
          @click="$router.back()"
          aria-label="Volver"
        >
          ←
        </button>
      </div>

      <h1 class="title">
        Collares <span class="accent">personalizados</span>
      </h1>

      <div class="benefits">
        <span>✓ QR integrado</span>
        <span>✓ Diseños únicos</span>
        <span>✓ Pensados para tu mascota</span>
      </div>

      <!-- Filtros -->
      <div class="filtros">
        <button
          v-for="cat in categorias"
          :key="cat"
          :class="['filtro-btn', { activo: categoriaActiva === cat }]"
          @click="categoriaActiva = cat"
        >
          {{ cat }}
        </button>
      </div>
    </header>

    <!-- Productos -->
    <main class="productos-container">
      <div class="section-heading">
        <div>
          <span class="section-kicker">ENCUENTRA EL IDEAL</span>
          <h2>El collar perfecto para <span>tu compañero</span></h2>
        </div>

        <div class="products-count">
          {{ collaresFiltrados.length }}
          <small>productos</small>
        </div>
      </div>

      <section class="productos-grid">
        <article
          v-for="collar in collaresFiltrados"
          :key="collar.id"
          class="producto-card"
        >
          <div class="producto-imagen-wrap">
            <img
              :src="collar.imagen"
              :alt="collar.nombre"
              class="producto-imagen"
            />

            <div class="image-overlay"></div>

            <span v-if="collar.destacado" class="badge-destacado">
              ⭐ Popular
            </span>

            <span class="badge-qr">
              📱 QR incluido
            </span>
          </div>

          <div class="producto-info">
            <div class="product-category">
              {{ collar.categoria }}
            </div>

            <h2 class="producto-nombre">
              {{ collar.nombre }}
            </h2>

            <p class="producto-desc">
              {{ collar.descripcion }}
            </p>

            <div class="producto-tags">
              <span class="tag">✦ {{ collar.material }}</span>
              <span class="tag">✓ QR</span>
            </div>

            <div class="product-bottom">
              <div>
                <div class="producto-colores">
                  <span
                    v-for="color in collar.colores"
                    :key="color"
                    class="color-dot"
                    :style="{ background: color }"
                  ></span>
                  <small>Colores</small>
                </div>

                <div class="producto-precio-row">
                  <span class="precio">
                    ${{ collar.precio.toFixed(2) }}
                  </span>

                  <span
                    v-if="collar.precioAnterior"
                    class="precio-anterior"
                  >
                    ${{ collar.precioAnterior.toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            class="comprar-btn"
            @click="agregarAlCarrito(collar)"
          >
            <span>🛒</span>
            Agregar al carrito
            <strong>→</strong>
          </button>
        </article>
      </section>
    </main>

    <!-- Carrito flotante -->
    <transition name="slide-up">
      <div v-if="carrito.length" class="carrito-flotante">
        <div class="cart-icon">🛒</div>

        <div class="carrito-detalle">
          <strong>{{ carrito.length }} collar(es)</strong>
          <span>en tu carrito</span>
        </div>

        <div class="carrito-total">
          ${{ totalCarrito.toFixed(2) }}
        </div>

        <button
          class="ver-carrito-btn"
          @click="mostrarCarrito = !mostrarCarrito"
        >
          {{ mostrarCarrito ? 'Ocultar' : 'Ver carrito' }}
        </button>

        <button class="pagar-btn" @click="irAPagar">
          Pagar →
        </button>
      </div>
    </transition>

    <!-- Panel carrito -->
    <transition name="fade">
      <div v-if="mostrarCarrito" class="carrito-detalle-panel">
        <div class="cart-panel-header">
          <div>
            <span class="section-kicker">TAILSCAN SHOP</span>
            <h3>Tu carrito 🐾</h3>
          </div>

          <button
            class="close-cart"
            @click="mostrarCarrito = false"
          >
            ×
          </button>
        </div>

        <div class="cart-items">
          <div
            v-for="(item, index) in carrito"
            :key="index"
            class="carrito-item"
          >
            <div class="cart-item-icon">🦴</div>

            <div class="cart-item-info">
              <strong>{{ item.nombre }}</strong>
              <span>{{ item.material }}</span>
            </div>

            <strong class="cart-item-price">
              ${{ item.precio.toFixed(2) }}
            </strong>

            <button
              class="eliminar-btn"
              @click="eliminarDelCarrito(index)"
              title="Eliminar"
            >
              ×
            </button>
          </div>
        </div>

        <div class="cart-panel-footer">
          <div>
            <span>Total</span>
            <strong>${{ totalCarrito.toFixed(2) }}</strong>
          </div>

          <button class="panel-pay-btn" @click="irAPagar">
            Continuar al pago →
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import collarBordadoImg from '../assets/img/collar bordado mascota.png'
import collarCueroImg from '../assets/img/collar clasico cuero.jpg'
import collarTrenzadoImg from '../assets/img/collar clasico trenzado.jpg'
import collarPremiumImg from '../assets/img/collar premium acero.png'
import collarReflectivoNocturnoImg from '../assets/img/collar refelctivo octurno.png'
import collarReflectivoAjustableImg from '../assets/img/collar reflectivo ajustable.png'

const categorias = ref([
  'Todos',
  'Clásicos',
  'Reflectivos',
  'Bordados',
  'Premium'
])

const categoriaActiva = ref('Todos')
const carrito = ref([])
const mostrarCarrito = ref(false)

const router = useRouter()

const collares = ref([
  {
    id: 1,
    nombre: 'Collar Clásico Cuero',
    descripcion:
      'Cuero genuino con placa QR grabada, resistente al agua.',
    material: 'Cuero',
    categoria: 'Clásicos',
    colores: ['#5b3a29', '#1e3a8a', '#1e293b'],
    precio: 14.99,
    precioAnterior: 18.99,
    destacado: true,
    imagen: collarCueroImg
  },
  {
    id: 2,
    nombre: 'Collar Reflectivo Nocturno',
    descripcion:
      'Franja reflectiva para paseos nocturnos, con QR resistente a rayones.',
    material: 'Nylon',
    categoria: 'Reflectivos',
    colores: ['#0f172a', '#f97316'],
    precio: 12.5,
    imagen: collarReflectivoNocturnoImg
  },
  {
    id: 3,
    nombre: 'Collar Bordado Nombre',
    descripcion:
      'Bordado personalizado con el nombre de tu mascota y QR TailScan.',
    material: 'Algodón',
    categoria: 'Bordados',
    colores: ['#f472b6', '#60a5fa', '#facc15'],
    precio: 16.0,
    destacado: true,
    imagen: collarBordadoImg
  },
  {
    id: 4,
    nombre: 'Collar Premium Acero',
    descripcion:
      'Hebilla de acero inoxidable, placa QR metálica grabada con láser.',
    material: 'Acero + Nylon',
    categoria: 'Premium',
    colores: ['#334155', '#eab308'],
    precio: 24.99,
    imagen: collarPremiumImg
  },
  {
    id: 5,
    nombre: 'Collar Clásico Trenzado',
    descripcion:
      'Diseño trenzado resistente, ideal para razas grandes.',
    material: 'Nylon trenzado',
    categoria: 'Clásicos',
    colores: ['#1e3a8a', '#16a34a', '#0f172a'],
    precio: 13.5,
    imagen: collarTrenzadoImg
  },
  {
    id: 6,
    nombre: 'Collar Reflectivo Ajustable',
    descripcion:
      'Ajuste rápido, materiales impermeables y QR resistente al agua.',
    material: 'Poliéster',
    categoria: 'Reflectivos',
    colores: ['#0ea5e9', '#f97316', '#1e293b'],
    precio: 11.99,
    imagen: collarReflectivoAjustableImg
  }
])

const collaresFiltrados = computed(() => {
  if (categoriaActiva.value === 'Todos') {
    return collares.value
  }

  return collares.value.filter(
    c => c.categoria === categoriaActiva.value
  )
})

const totalCarrito = computed(() =>
  carrito.value.reduce(
    (sum, item) => sum + item.precio,
    0
  )
)

function syncLocalStorage() {
  try {
    localStorage.setItem(
      'tailscan_cart',
      JSON.stringify(carrito.value)
    )
  } catch (e) {}
}

function agregarAlCarrito(collar) {
  carrito.value.push(collar)
  syncLocalStorage()
}

function eliminarDelCarrito(index) {
  carrito.value.splice(index, 1)
  syncLocalStorage()

  if (!carrito.value.length) {
    mostrarCarrito.value = false
  }
}

function irAPagar() {
  try {
    localStorage.setItem(
      'tailscan_cart',
      JSON.stringify(carrito.value)
    )
  } catch (e) {}

  router.push({ name: 'PagosCollares' })
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('tailscan_cart')

    if (saved) {
      carrito.value = JSON.parse(saved)
    }
  } catch (e) {}
})
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #fdfbf8;
  color: #28324a;
}

.tienda-collares {
  --navy: #1e3a8a;
  --blue: #2f5fd1;
  --blue-mid: #4f7fe0;
  --orange: #ff8a3d;
  --orange-deep: #f2632b;
  --cream: #fdfbf8;
  --ink: #28324a;
  --muted: #6b7488;

  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 28px 40px 130px;
  background:
    linear-gradient(
      120deg,
      #ffffff 0%,
      #fbf7f1 35%,
      #fff3e8 70%,
      #ffe8d4 100%
    );
}

/* ===== DECORACIÓN ===== */

.blob {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
}

.blob-blue {
  width: 650px;
  height: 650px;
  left: -420px;
  bottom: -420px;
  background:
    radial-gradient(
      circle at 60% 40%,
      #4f7fe0,
      #1e3a8a 75%
    );
}

.blob-orange {
  width: 500px;
  height: 500px;
  right: -260px;
  top: -250px;
  background:
    radial-gradient(
      circle at 40% 40%,
      #ff9d5c,
      #f2632b 75%
    );
  opacity: .85;
}

.paw-watermark {
  position: absolute;
  width: 150px;
  height: 150px;
  color: #dbe4f5;
  opacity: .65;
  z-index: 0;
  pointer-events: none;
}

.paw-watermark svg {
  width: 100%;
  height: 100%;
}

.paw-left {
  top: 240px;
  left: 7%;
}

.paw-right {
  bottom: 160px;
  right: 8%;
  color: #ffd4b8;
}

.dots {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 6px);
  gap: 8px;
  z-index: 0;
}

.dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dots-left {
  top: 180px;
  left: 28px;
}

.dots-left span {
  background: #9fb3e0;
}

.dots-right {
  right: 28px;
  bottom: 180px;
}

.dots-right span {
  background: #ffb787;
}

/* ===== HEADER ===== */

.tc-header {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto 50px;
  text-align: center;
}

.header-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.icon-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,.85);
  color: var(--navy);
  box-shadow: 0 8px 20px rgba(30,58,138,.10);
  cursor: pointer;
  transition: .2s ease;
}

.icon-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(30,58,138,.16);
}

.grid-btn {
  display: grid;
  grid-template-columns: repeat(3, 4px);
  align-content: center;
  justify-content: center;
  gap: 4px;
}

.grid-btn .dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--navy);
}

.back-btn {
  font-size: 22px;
}

.eyebrow,
.section-kicker {
  color: var(--orange-deep);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .12em;
}

.eyebrow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.title {
  margin: 0;
  color: var(--navy);
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.15;
  font-weight: 800;
}

.title .accent {
  color: var(--orange-deep);
}

.subtitle {
  max-width: 720px;
  margin: 18px auto 18px;
  color: var(--muted);
  line-height: 1.7;
  font-size: 16px;
}

.benefits {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}

.benefits span {
  padding: 8px 13px;
  border-radius: 999px;
  background: rgba(255,255,255,.8);
  color: var(--navy);
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(30,58,138,.06);
}

.filtros {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filtro-btn {
  border: 2px solid #dbe4f5;
  border-radius: 999px;
  background: rgba(255,255,255,.85);
  color: var(--navy);
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: .2s ease;
}

.filtro-btn:hover,
.filtro-btn.activo {
  border-color: var(--navy);
  background: var(--navy);
  color: #fff;
  transform: translateY(-2px);
}

/* ===== PRODUCTOS ===== */

.productos-container {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 25px;
}

.section-heading h2 {
  margin: 5px 0 0;
  color: var(--navy);
  font-size: 28px;
}

.section-heading h2 span {
  color: var(--orange-deep);
}

.products-count {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--navy);
  font-weight: 800;
}

.products-count small {
  color: var(--muted);
  font-weight: 500;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.producto-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border-radius: 22px;
  border: 1px solid rgba(30,58,138,.06);
  box-shadow: 0 15px 35px rgba(30,58,138,.09);
  transition: transform .25s ease, box-shadow .25s ease;
}

.producto-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 22px 45px rgba(30,58,138,.15);
}

.producto-imagen-wrap {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: #eaf0fc;
}

.producto-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .4s ease;
}

.producto-card:hover .producto-imagen {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(30,58,138,.04),
    rgba(30,58,138,.12)
  );
}

.badge-destacado,
.badge-qr {
  position: absolute;
  z-index: 2;
  border-radius: 999px;
  padding: 7px 11px;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  backdrop-filter: blur(5px);
}

.badge-destacado {
  top: 14px;
  left: 14px;
  background: var(--orange-deep);
}

.badge-qr {
  right: 14px;
  bottom: 14px;
  background: rgba(30,58,138,.9);
}

.producto-info {
  flex: 1;
  padding: 20px 20px 12px;
}

.product-category {
  margin-bottom: 6px;
  color: var(--orange-deep);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.producto-nombre {
  margin: 0 0 7px;
  color: var(--navy);
  font-size: 19px;
  font-weight: 800;
}

.producto-desc {
  min-height: 48px;
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.producto-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 16px;
}

.tag {
  padding: 5px 9px;
  border-radius: 999px;
  background: #eef3fd;
  color: var(--navy);
  font-size: 10px;
  font-weight: 700;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
}

.producto-colores {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 9px;
}

.producto-colores small {
  margin-left: 3px;
  color: var(--muted);
  font-size: 10px;
}

.color-dot {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px #d9dfeb;
}

.producto-precio-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.precio {
  color: var(--navy);
  font-size: 24px;
  font-weight: 900;
}

.precio-anterior {
  color: #a2aabd;
  font-size: 12px;
  text-decoration: line-through;
}

.comprar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin: 0 20px 20px;
  padding: 13px 15px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    var(--navy),
    var(--blue)
  );
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  transition: .2s ease;
}

.comprar-btn strong {
  margin-left: auto;
  font-size: 17px;
}

.comprar-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(47,95,209,.25);
}

/* ===== CARRITO ===== */

.carrito-flotante {
  position: fixed;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: min(680px, calc(100vw - 30px));
  padding: 12px 14px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 18px;
  background: rgba(30,58,138,.96);
  color: #fff;
  box-shadow: 0 18px 45px rgba(30,58,138,.3);
  backdrop-filter: blur(12px);
}

.cart-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255,255,255,.12);
}

.carrito-detalle {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.carrito-detalle span {
  color: #dbe4ff;
  font-size: 11px;
}

.carrito-total {
  font-size: 18px;
  font-weight: 900;
}

.ver-carrito-btn,
.pagar-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  font-weight: 800;
  cursor: pointer;
}

.ver-carrito-btn {
  background: rgba(255,255,255,.13);
  color: #fff;
}

.pagar-btn {
  background: linear-gradient(
    135deg,
    var(--orange),
    var(--orange-deep)
  );
  color: #fff;
}

.carrito-detalle-panel {
  position: fixed;
  z-index: 40;
  right: 24px;
  bottom: 95px;
  width: min(430px, calc(100vw - 32px));
  overflow: hidden;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 25px 60px rgba(30,58,138,.2);
}

.cart-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f6f8fd;
}

.cart-panel-header h3 {
  margin: 4px 0 0;
  color: var(--navy);
  font-size: 22px;
}

.close-cart {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: #e9edf6;
  color: var(--navy);
  font-size: 22px;
  cursor: pointer;
}

.cart-items {
  max-height: 330px;
  overflow-y: auto;
  padding: 8px 20px;
}

.carrito-item {
  display: grid;
  grid-template-columns: 42px 1fr auto 30px;
  align-items: center;
  gap: 10px;
  padding: 13px 0;
  border-bottom: 1px solid #edf0f6;
}

.cart-item-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eef3fd;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cart-item-info strong {
  color: var(--navy);
  font-size: 12px;
}

.cart-item-info span {
  color: var(--muted);
  font-size: 10px;
}

.cart-item-price {
  color: var(--navy);
  font-size: 13px;
}

.eliminar-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: #fff0ec;
  color: var(--orange-deep);
  font-size: 18px;
  cursor: pointer;
}

.cart-panel-footer {
  padding: 18px 20px;
  background: #f8f9fc;
}

.cart-panel-footer > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: var(--muted);
}

.cart-panel-footer strong {
  color: var(--navy);
  font-size: 21px;
}

.panel-pay-btn {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    var(--orange),
    var(--orange-deep)
  );
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

/* ===== ANIMACIONES ===== */

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all .3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 25px);
}

/* ===== RESPONSIVE ===== */

@media (max-width: 950px) {
  .productos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tienda-collares {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 680px) {
  .tienda-collares {
    padding: 20px 16px 130px;
  }

  .productos-grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    align-items: flex-start;
  }

  .section-heading h2 {
    font-size: 22px;
  }

  .products-count {
    display: none;
  }

  .carrito-flotante {
    gap: 8px;
    padding: 10px;
  }

  .carrito-detalle {
    display: none;
  }

  .carrito-total {
    margin-left: auto;
  }

  .ver-carrito-btn,
  .pagar-btn {
    padding: 9px 11px;
    font-size: 11px;
  }

  .paw-watermark,
  .dots {
    opacity: .3;
  }
}
</style>
```
