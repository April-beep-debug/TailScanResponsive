```vue
<template>
  <div class="pagos-page">

    <!-- Decoración de fondo -->
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

    <!-- Header -->
    <header class="tc-header">
      <div class="header-top">
        <button
          class="icon-btn"
          @click="$router.back()"
          aria-label="Volver"
        >
          ←
        </button>
      </div>


      <h1>
        Finaliza tu <span>pedido</span>
      </h1>
    </header>

    <!-- Pasos -->
    <div class="steps">
      <div class="step active">
        <span>1</span>
        <div>
          <strong>Pago</strong>
          <small>Forma de pago</small>
        </div>
      </div>

      <div class="step-line"></div>

      <div
        :class="['step', { active: paymentProcessed }]"
      >
        <span>2</span>
        <div>
          <strong>Personalización</strong>
          <small>Datos de envío</small>
        </div>
      </div>

      <div class="step-line"></div>

      <div
        :class="['step', { active: orderConfirmed }]"
      >
        <span>3</span>
        <div>
          <strong>Listo</strong>
          <small>Pedido confirmado</small>
        </div>
      </div>
    </div>

    <section class="checkout-grid">

      <!-- RESUMEN -->
      <aside class="resumen">

        <div class="resumen-header">
          <div>
            <span class="section-kicker">TU COMPRA</span>
            <h2>Resumen del pedido</h2>
          </div>

          <span class="cart-icon">🛒</span>
        </div>

        <div v-if="cartItems.length" class="order-items">
          <div
            v-for="(it, i) in cartItems"
            :key="i"
            class="order-item"
          >
            <div class="item-icon">
              🦴
            </div>

            <div class="item-info">
              <strong>{{ it.nombre }}</strong>
              <span>{{ it.material || 'Collar TailScan' }}</span>
            </div>

            <strong>
              ${{ it.precio.toFixed(2) }}
            </strong>
          </div>
        </div>

        <div v-else class="empty-cart">
          <span>🐾</span>
          <p>No hay productos en el carrito.</p>
        </div>

        <div class="secure-box">
          <span>🔒</span>
          <div>
            <strong>Compra segura</strong>
            <small>Tus datos están protegidos.</small>
          </div>
        </div>

        <div class="total-row">
          <span>Total</span>
          <strong>${{ total.toFixed(2) }}</strong>
        </div>

      </aside>

      <!-- FORMULARIO -->
      <main class="form-area">

        <!-- PAGO -->
        <section v-if="!paymentProcessed" class="checkout-section">

          <div class="section-title">
            <div class="title-icon">💳</div>
            <div>
              <span class="section-kicker">PASO 1</span>
              <h2>Forma de pago</h2>
            </div>
          </div>

          <p class="section-description">
            Selecciona cómo deseas realizar el pago de tu collar.
          </p>

          <div class="payment-methods">

            <label
              :class="[
                'payment-option',
                { selected: paymentMethod === 'efectivo' }
              ]"
            >
              <input
                type="radio"
                value="efectivo"
                v-model="paymentMethod"
              />

              <span class="radio-custom"></span>

              <span class="payment-icon">💵</span>

              <span class="payment-content">
                <strong>Pago en efectivo</strong>
                <small>Realiza el pago según las indicaciones.</small>
              </span>

              <span class="check">✓</span>
            </label>

            <label
              :class="[
                'payment-option',
                { selected: paymentMethod === 'tarjeta' }
              ]"
            >
              <input
                type="radio"
                value="tarjeta"
                v-model="paymentMethod"
              />

              <span class="radio-custom"></span>

              <span class="payment-icon">💳</span>

              <span class="payment-content">
                <strong>Tarjeta</strong>
                <small>Crédito o débito.</small>
              </span>

              <span class="check">✓</span>
            </label>

          </div>

          <!-- TARJETA -->
          <div
            v-if="paymentMethod === 'tarjeta'"
            class="card-form"
          >

            <div class="fake-card">
              <div class="fake-card-top">
                <span>TAILSCAN</span>
                <span>💳</span>
              </div>

              <div class="fake-card-number">
                {{ cardNumber || '•••• •••• •••• ••••' }}
              </div>

              <div class="fake-card-bottom">
                <div>
                  <small>TITULAR</small>
                  <strong>{{ cardName || 'TU NOMBRE' }}</strong>
                </div>

                <div>
                  <small>EXPIRA</small>
                  <strong>{{ cardExpiry || 'MM/AA' }}</strong>
                </div>
              </div>
            </div>

            <div class="form-grid">

              <label class="field full">
                <span>Nombre en la tarjeta</span>
                <input
                  v-model="cardName"
                  placeholder="Nombre completo"
                />
              </label>

              <label class="field full">
                <span>Número de tarjeta</span>
                <input
                  v-model="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                />
              </label>

              <label class="field">
                <span>Fecha de expiración</span>
                <input
                  v-model="cardExpiry"
                  placeholder="MM/AA"
                  maxlength="5"
                />
              </label>

              <label class="field">
                <span>CVV</span>
                <input
                  v-model="cardCvv"
                  placeholder="123"
                  maxlength="4"
                  type="password"
                />
              </label>

            </div>

            <button
              class="primary-btn"
              @click="procesarPago"
            >
              Continuar
              <span>→</span>
            </button>

          </div>

          <!-- EFECTIVO -->
          <div
            v-if="paymentMethod === 'efectivo'"
            class="cash-box"
          >
            <div class="cash-icon">💵</div>

            <div>
              <strong>Pago en efectivo</strong>
              <p>
                Has elegido pagar en efectivo. Continúa para
                ingresar los datos de envío y personalización.
              </p>
            </div>
          </div>

          <button
            v-if="paymentMethod === 'efectivo'"
            class="primary-btn"
            @click="procesarPago"
          >
            Continuar
            <span>→</span>
          </button>

        </section>

        <!-- PERSONALIZACIÓN -->
        <transition name="fade">
          <section
            v-if="paymentProcessed && !orderConfirmed"
            class="checkout-section"
          >

            <div class="section-title">
              <div class="title-icon orange">🐾</div>
              <div>
                <span class="section-kicker">PASO 2</span>
                <h2>Personaliza tu pedido</h2>
              </div>
            </div>

            <p class="section-description">
              Cuéntanos a quién pertenece el collar y dónde debemos enviarlo.
            </p>

            <div class="form-block">

              <h3>📦 Información de envío</h3>

              <div class="form-grid">

                <label class="field">
                  <span>Nombre del cliente</span>
                  <input
                    v-model="buyerName"
                    placeholder="Tu nombre"
                  />
                </label>

                <label class="field">
                  <span>Teléfono</span>
                  <input
                    v-model="buyerPhone"
                    placeholder="+503 0000-0000"
                  />
                </label>

                <label class="field full">
                  <span>Dirección de envío</span>
                  <input
                    v-model="address"
                    placeholder="Calle, número, colonia..."
                  />
                </label>

                <label class="field">
                  <span>Ciudad</span>
                  <input
                    v-model="city"
                    placeholder="Ciudad"
                  />
                </label>

                <label class="field">
                  <span>Código postal</span>
                  <input
                    v-model="postal"
                    placeholder="Código postal"
                  />
                </label>

              </div>

            </div>

            <div class="form-block pet-block">

              <h3>🐶 Datos de tu mascota</h3>

              <div class="form-grid">

                <label class="field">
                  <span>Nombre</span>
                  <input
                    v-model="petName"
                    placeholder="Nombre de tu mascota"
                  />
                </label>

                <label class="field">
                  <span>Especie</span>
                  <input
                    v-model="petSpecies"
                    placeholder="Perro / Gato"
                  />
                </label>

                <label class="field">
                  <span>Raza</span>
                  <input
                    v-model="petBreed"
                    placeholder="Raza"
                  />
                </label>

                <label class="field">
                  <span>Tamaño</span>
                  <input
                    v-model="petSize"
                    placeholder="Pequeño / Mediano / Grande"
                  />
                </label>

              </div>

            </div>

            <div class="upload-box">

              <div class="upload-icon">📱</div>

              <div class="upload-content">
                <strong>Adjunta tu código QR</strong>
                <p>
                  Sube la imagen del QR que quieres utilizar en el collar.
                </p>

                <label class="upload-btn">
                  Seleccionar imagen
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleQRUpload"
                  />
                </label>

                <span v-if="qrFileName" class="file-name">
                  ✓ {{ qrFileName }}
                </span>
              </div>

              <div
                v-if="qrPreview"
                class="qr-preview"
              >
                <img
                  :src="qrPreview"
                  alt="QR preview"
                />
              </div>

            </div>

            <div class="estimated">
              <span>🚚</span>
              <div>
                <small>FECHA ESTIMADA DE LLEGADA</small>
                <strong>{{ estimatedDate }}</strong>
              </div>
            </div>

            <div class="actions">
              <button
                class="confirmar-btn"
                @click="submitOrder"
              >
                Confirmar pedido
                <span>✓</span>
              </button>

              <button
                class="cancel-btn"
                @click="$router.back()"
              >
                Cancelar
              </button>
            </div>

          </section>
        </transition>

        <!-- CONFIRMACIÓN -->
        <transition name="fade">
          <section
            v-if="orderConfirmed"
            class="confirmation"
          >
            <div class="success-icon">
              ✓
            </div>

            <span class="section-kicker">TAILSCAN SHOP</span>

            <h2>¡Pedido confirmado!</h2>

            <p>
              Gracias <strong>{{ buyerName }}</strong>.
              Tu pedido llegará aproximadamente el
              <strong>{{ estimatedDate }}</strong>.
            </p>

            <div class="confirmation-card">
              <div>
                <span>Estado</span>
                <strong>✓ Pedido recibido</strong>
              </div>

              <div>
                <span>Total</span>
                <strong>${{ total.toFixed(2) }}</strong>
              </div>
            </div>

            <button
              class="primary-btn"
              @click="volverHome"
            >
              Volver a la tienda
              <span>→</span>
            </button>
          </section>
        </transition>

      </main>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartItems = ref([])

const paymentMethod = ref('efectivo')

const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')

const buyerName = ref('')
const buyerPhone = ref('')
const address = ref('')
const city = ref('')
const postal = ref('')

const petName = ref('')
const petSpecies = ref('')
const petBreed = ref('')
const petSize = ref('')

const qrPreview = ref(null)
const qrFileName = ref('')

const paymentProcessed = ref(false)
const orderConfirmed = ref(false)

const total = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + (item.precio || 0),
    0
  )
)

function handleQRUpload(e) {
  const f = e.target.files && e.target.files[0]

  if (!f) return

  qrFileName.value = f.name

  const reader = new FileReader()

  reader.onload = (ev) => {
    qrPreview.value = ev.target.result
  }

  reader.readAsDataURL(f)
}

function procesarPago() {
  if (paymentMethod.value === 'tarjeta') {
    if (
      !cardNumber.value ||
      !cardName.value ||
      !cardExpiry.value ||
      !cardCvv.value
    ) {
      alert('Por favor completa los datos de la tarjeta.')
      return
    }
  }

  paymentProcessed.value = true
}

function submitOrder() {
  if (!buyerName.value || !address.value) {
    alert('Por favor completa nombre y dirección.')
    return
  }

  const order = {
    buyerName: buyerName.value,
    buyerPhone: buyerPhone.value,
    address: address.value,
    city: city.value,
    postal: postal.value,
    pet: {
      name: petName.value,
      species: petSpecies.value,
      breed: petBreed.value,
      size: petSize.value
    },
    qr: qrFileName.value || null,
    items: cartItems.value,
    total: total.value,
    estimated: estimatedDateValue()
  }

  console.log('Pedido TailScan:', order)

  try {
    localStorage.removeItem('tailscan_cart')
  } catch (e) {}

  orderConfirmed.value = true
}

function estimatedDateValue() {
  const d = new Date()
  d.setMonth(d.getMonth() + 1)

  return d.toISOString().slice(0, 10)
}

const estimatedDate = computed(() =>
  estimatedDateValue()
)

function volverHome() {
  router.push({ name: 'Collares' })
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('tailscan_cart')

    if (saved) {
      cartItems.value = JSON.parse(saved)
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

.pagos-page {
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
  padding: 30px 40px 80px;

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
  z-index: 0;
  border-radius: 50%;
  pointer-events: none;
}

.blob-blue {
  width: 650px;
  height: 650px;
  left: -430px;
  bottom: -430px;
  background:
    radial-gradient(
      circle at 60% 40%,
      var(--blue-mid),
      var(--navy) 75%
    );
}

.blob-orange {
  width: 480px;
  height: 480px;
  right: -280px;
  top: -250px;
  background:
    radial-gradient(
      circle at 40% 40%,
      var(--orange),
      var(--orange-deep) 75%
    );
  opacity: .85;
}

.paw-watermark {
  position: absolute;
  z-index: 0;
  width: 170px;
  height: 170px;
  color: #dbe4f5;
  opacity: .6;
}

.paw-watermark svg {
  width: 100%;
  height: 100%;
}

.paw-left {
  left: 6%;
  top: 300px;
}

/* ===== HEADER ===== */

.tc-header h1 {
  margin: 8px 0 12px;
  color: var(--navy);
  font-size: clamp(34px, 5vw, 48px);
  font-weight: 900;
  text-align: center;
  width: 100%;
}
.tc-header h1 span {
  color: var(--orange-deep);
}

.header-top {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
  position: relative;
}

.icon-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,.85);
  color: var(--navy);
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(30,58,138,.1);
  transition: .2s ease;
}

.icon-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(30,58,138,.16);
}

.mini-logo {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--navy);
  font-size: 20px;
  font-weight: 900;
}

.mini-logo .scan {
  color: var(--orange-deep);
}

.eyebrow,
.section-kicker {
  color: var(--orange-deep);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .12em;
}

.tc-header h1 {
  margin: 8px 0 12px;
  color: var(--navy);
  font-size: clamp(34px, 5vw, 48px);
  font-weight: 900;
}

.tc-header > p {
  max-width: 650px;
  margin: 0 auto;
  color: var(--muted);
  line-height: 1.6;
}

/* ===== STEPS ===== */

.steps {
  position: relative;
  z-index: 2;
  max-width: 820px;
  margin: 0 auto 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #9aa3b7;
}

.step > span {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8edf7;
  color: #8d97aa;
  font-weight: 900;
  font-size: 13px;
}

.step.active {
  color: var(--navy);
}

.step.active > span {
  background: var(--navy);
  color: white;
  box-shadow: 0 7px 15px rgba(30,58,138,.2);
}

.step strong,
.step small {
  display: block;
}

.step strong {
  font-size: 12px;
}

.step small {
  margin-top: 2px;
  font-size: 9px;
}

.step-line {
  width: 70px;
  height: 2px;
  margin: 0 14px;
  background: #dce2ef;
}

/* ===== CHECKOUT ===== */

.checkout-grid {
  position: relative;
  z-index: 2;
  max-width: 1050px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 330px 1fr;
  gap: 24px;
  align-items: start;
}

/* ===== RESUMEN ===== */

.resumen {
  position: sticky;
  top: 20px;
  overflow: hidden;
  border-radius: 22px;
  background: white;
  box-shadow: 0 16px 40px rgba(30,58,138,.09);
}

.resumen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  background: #f6f8fd;
}

.resumen-header h2 {
  margin: 4px 0 0;
  color: var(--navy);
  font-size: 20px;
}

.cart-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: #e7edfc;
  font-size: 19px;
}

.order-items {
  padding: 8px 20px;
}

.order-item {
  display: grid;
  grid-template-columns: 42px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 13px 0;
  border-bottom: 1px solid #edf0f6;
}

.item-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eef3fd;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.item-info strong {
  color: var(--navy);
  font-size: 12px;
}

.item-info span {
  color: var(--muted);
  font-size: 10px;
}

.order-item > strong {
  color: var(--navy);
  font-size: 13px;
}

.empty-cart {
  padding: 35px 20px;
  text-align: center;
  color: var(--muted);
}

.empty-cart span {
  font-size: 30px;
}

.empty-cart p {
  font-size: 12px;
}

.secure-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 20px;
  padding: 12px;
  border-radius: 12px;
  background: #f1f8f3;
  color: #348052;
}

.secure-box strong,
.secure-box small {
  display: block;
}

.secure-box strong {
  font-size: 11px;
}

.secure-box small {
  margin-top: 2px;
  font-size: 9px;
}

.total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-top: 1px solid #edf0f6;
}

.total-row span {
  color: var(--muted);
  font-size: 13px;
}

.total-row strong {
  color: var(--navy);
  font-size: 25px;
  font-weight: 900;
}

/* ===== FORM AREA ===== */

.form-area {
  overflow: hidden;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(30,58,138,.09);
}

.checkout-section {
  padding: 28px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 13px;
}

.title-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #e8efff;
  font-size: 20px;
}

.title-icon.orange {
  background: #fff0e7;
}

.section-title h2 {
  margin: 4px 0 0;
  color: var(--navy);
  font-size: 23px;
}

.section-description {
  margin: 15px 0 22px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.6;
}

/* ===== MÉTODOS DE PAGO ===== */

.payment-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.payment-option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 80px;
  padding: 14px;
  border: 2px solid #e5e9f2;
  border-radius: 15px;
  cursor: pointer;
  transition: .2s ease;
}

.payment-option:hover,
.payment-option.selected {
  border-color: var(--blue);
  background: #f7f9ff;
}

.payment-option input {
  position: absolute;
  opacity: 0;
}

.radio-custom {
  width: 14px;
  height: 14px;
  border: 2px solid #aab4c7;
  border-radius: 50%;
}

.payment-option.selected .radio-custom {
  border: 4px solid var(--blue);
}

.payment-icon {
  font-size: 22px;
}

.payment-content {
  flex: 1;
}

.payment-content strong,
.payment-content small {
  display: block;
}

.payment-content strong {
  color: var(--navy);
  font-size: 12px;
}

.payment-content small {
  margin-top: 3px;
  color: var(--muted);
  font-size: 9px;
}

.check {
  opacity: 0;
  color: var(--blue);
  font-weight: 900;
}

.payment-option.selected .check {
  opacity: 1;
}

/* ===== TARJETA ===== */

.card-form {
  margin-top: 20px;
}

.fake-card {
  max-width: 390px;
  min-height: 195px;
  margin: 0 auto 25px;
  padding: 22px;
  border-radius: 18px;
  color: white;
  background:
    linear-gradient(
      135deg,
      #1e3a8a,
      #2f5fd1
    );
  box-shadow: 0 15px 30px rgba(30,58,138,.25);
}

.fake-card-top {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 800;
}

.fake-card-number {
  margin-top: 38px;
  font-size: 20px;
  letter-spacing: 3px;
}

.fake-card-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.fake-card-bottom small,
.fake-card-bottom strong {
  display: block;
}

.fake-card-bottom small {
  font-size: 7px;
  opacity: .7;
}

.fake-card-bottom strong {
  margin-top: 3px;
  font-size: 9px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field.full {
  grid-column: span 2;
}

.field span {
  color: var(--navy);
  font-size: 11px;
  font-weight: 800;
}

.field input {
  width: 100%;
  padding: 12px 13px;
  border: 1.5px solid #dfe4ee;
  border-radius: 10px;
  outline: none;
  color: var(--ink);
  background: #fcfdff;
  font: inherit;
  font-size: 12px;
  transition: .2s ease;
}

.field input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(47,95,209,.09);
}

.primary-btn,
.confirmar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    var(--navy),
    var(--blue)
  );
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: .2s ease;
}

.primary-btn:hover,
.confirmar-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(47,95,209,.22);
}

/* ===== EFECTIVO ===== */

.cash-box {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding: 17px;
  border: 1px solid #e5eaf4;
  border-radius: 15px;
  background: #f8faff;
}

.cash-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: #e9f7ed;
  font-size: 22px;
}

.cash-box strong {
  color: var(--navy);
  font-size: 13px;
}

.cash-box p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
}

/* ===== PERSONALIZACIÓN ===== */

.form-block {
  margin-top: 20px;
  padding: 18px;
  border-radius: 16px;
  background: #f8f9fc;
}

.form-block h3 {
  margin: 0 0 16px;
  color: var(--navy);
  font-size: 14px;
}

.pet-block {
  background: #fff8f3;
}

.upload-box {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding: 17px;
  border: 2px dashed #d6ddec;
  border-radius: 16px;
  background: #fcfdff;
}

.upload-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 14px;
  background: #eaf0ff;
  font-size: 22px;
}

.upload-content {
  flex: 1;
}

.upload-content strong {
  color: var(--navy);
  font-size: 13px;
}

.upload-content p {
  margin: 4px 0 10px;
  color: var(--muted);
  font-size: 10px;
}

.upload-btn {
  display: inline-block;
  padding: 8px 11px;
  border-radius: 8px;
  background: var(--navy);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
}

.upload-btn input {
  display: none;
}

.file-name {
  display: block;
  margin-top: 7px;
  color: #3b8b58;
  font-size: 10px;
}

.qr-preview {
  width: 85px;
  height: 85px;
  padding: 5px;
  border-radius: 10px;
  background: white;
  border: 1px solid #e0e5ef;
}

.qr-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.estimated {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 14px;
  border-radius: 13px;
  background: #eef4ff;
  color: var(--navy);
}

.estimated > span {
  font-size: 24px;
}

.estimated small,
.estimated strong {
  display: block;
}

.estimated small {
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .08em;
}

.estimated strong {
  margin-top: 4px;
  font-size: 13px;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 130px;
  gap: 10px;
}

.confirmar-btn {
  margin-top: 20px;
  background: linear-gradient(
    135deg,
    var(--orange),
    var(--orange-deep)
  );
}

.cancel-btn {
  margin-top: 20px;
  border: none;
  border-radius: 12px;
  background: #edf0f5;
  color: var(--navy);
  font-weight: 700;
  cursor: pointer;
}

/* ===== CONFIRMACIÓN ===== */

.confirmation {
  padding: 60px 35px;
  text-align: center;
}

.success-icon {
  width: 78px;
  height: 78px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e7f7ec;
  color: #36a45b;
  font-size: 35px;
  font-weight: 900;
}

.confirmation h2 {
  margin: 8px 0 12px;
  color: var(--navy);
  font-size: 30px;
}

.confirmation > p {
  max-width: 450px;
  margin: 0 auto;
  color: var(--muted);
  line-height: 1.7;
  font-size: 13px;
}

.confirmation-card {
  max-width: 420px;
  margin: 25px auto;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 14px;
  background: #f6f8fd;
}

.confirmation-card span,
.confirmation-card strong {
  display: block;
}

.confirmation-card span {
  color: var(--muted);
  font-size: 9px;
}

.confirmation-card strong {
  margin-top: 4px;
  color: var(--navy);
  font-size: 12px;
}

/* ===== ANIMACIÓN ===== */

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 850px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .resumen {
    position: relative;
    top: 0;
  }

  .payment-methods {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .pagos-page {
    padding: 20px 15px 50px;
  }

  .steps {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 5px;
  }

  .step-line {
    width: 30px;
    margin: 0 7px;
  }

  .step div {
    display: none;
  }

  .checkout-section {
    padding: 20px 16px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .field.full {
    grid-column: span 1;
  }

  .upload-box {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .fake-card {
    min-height: 170px;
  }

  .fake-card-number {
    font-size: 15px;
    letter-spacing: 2px;
  }
}
</style>
```
