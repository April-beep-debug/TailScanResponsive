<template>
  <div class="donaciones-page">
    <div class="blob blob-blue"></div>
    <div class="blob blob-orange"></div>

    <div class="paw-watermark paw-left">
      <svg viewBox="0 0 64 64" fill="currentColor">
        <ellipse cx="14" cy="20" rx="7" ry="9" />
        <ellipse cx="32" cy="12" rx="7.5" ry="10" />
        <ellipse cx="50" cy="20" rx="7" ry="9" />
        <path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z" />
      </svg>
    </div>

    <header class="tc-header">
      <div class="header-top">
        <button class="icon-btn" @click="$router.back()" aria-label="Volver">←</button>
      </div>
      <h1>Apoya una <span>vida</span></h1>
      <p>Cada aporte ayuda a rescatar, alimentar y cuidar mascotas que necesitan un hogar.</p>
    </header>

    <div class="steps">
      <div class="step active">
        <span>1</span>
        <div><strong>Donación</strong><small>Elige tu aporte</small></div>
      </div>
      <div class="step-line"></div>
      <div :class="['step', { active: paymentProcessed }]">
        <span>2</span>
        <div><strong>Pago</strong><small>Datos de tarjeta</small></div>
      </div>
      <div class="step-line"></div>
      <div :class="['step', { active: donationConfirmed }]">
        <span>3</span>
        <div><strong>Listo</strong><small>Donación recibida</small></div>
      </div>
    </div>

    <section class="checkout-grid">
      <aside class="resumen">
        <div class="resumen-header">
          <div><span class="section-kicker">TAILSCAN IMPACTO</span><h2>Tu donación</h2></div>
          <span class="cart-icon">❤️</span>
        </div>

        <div class="impact-items">
          <div class="impact-item"><span>🍖</span><div><strong>Alimentación</strong><small>Comida para mascotas rescatadas</small></div></div>
          <div class="impact-item"><span>🏠</span><div><strong>Refugio</strong><small>Un lugar seguro mientras esperan</small></div></div>
          <div class="impact-item"><span>❤️</span><div><strong>Atención</strong><small>Cuidados y recuperación</small></div></div>
        </div>

        <div class="secure-box">
          <span>🔒</span>
          <div><strong>Donación segura</strong><small>Tus datos están protegidos.</small></div>
        </div>
        <div class="total-row"><span>Total a donar</span><strong>${{ donationAmount.toFixed(2) }}</strong></div>
      </aside>

      <main class="form-area">
        <section v-if="!paymentProcessed" class="checkout-section">
          <div class="section-title">
            <div class="title-icon orange">🐾</div>
            <div><span class="section-kicker">PASO 1</span><h2>Elige tu aporte</h2></div>
          </div>
          <p class="section-description">Selecciona un monto y continúa con el pago mediante tarjeta.</p>

          <div class="amount-options">
            <button v-for="amount in amounts" :key="amount" :class="{ active: selectedAmount === amount }" @click="selectAmount(amount)">
              ${{ amount }}
            </button>
          </div>

          <label class="field full custom-field">
            <span>Otro monto</span>
            <div class="money-input">
              <span>$</span>
              <input v-model="customAmount" type="number" min="1" placeholder="Ingresa un monto" @input="selectedAmount = null" />
            </div>
          </label>

          <div class="donation-note">
            <span>💚</span>
            <div><strong>Tu ayuda cuenta</strong><p>El 100% de tu aporte se destina al bienestar de las mascotas.</p></div>
          </div>
          <button class="primary-btn" @click="continueToPayment">Continuar al pago <span>→</span></button>
        </section>

        <transition name="fade">
          <section v-if="paymentProcessed && !donationConfirmed" class="checkout-section">
            <div class="section-title">
              <div class="title-icon">💳</div>
              <div><span class="section-kicker">PASO 2</span><h2>Forma de pago</h2></div>
            </div>
            <p class="section-description">Ingresa los datos de tu tarjeta para completar tu donación.</p>

            <div class="payment-methods">
              <div class="payment-option selected">
                <span class="radio-custom"></span><span class="payment-icon">💳</span>
                <span class="payment-content"><strong>Tarjeta</strong><small>Crédito o débito.</small></span>
                <span class="check">✓</span>
              </div>
            </div>

            <div class="card-form">
              <div class="fake-card">
                <div class="fake-card-top"><span>TAILSCAN</span><span>💳</span></div>
                <div class="fake-card-number">{{ cardNumber || '•••• •••• •••• ••••' }}</div>
                <div class="fake-card-bottom">
                  <div><small>TITULAR</small><strong>{{ cardName || 'TU NOMBRE' }}</strong></div>
                  <div><small>EXPIRA</small><strong>{{ cardExpiry || 'MM/AA' }}</strong></div>
                </div>
              </div>

              <div class="form-grid">
                <label class="field full"><span>Nombre en la tarjeta</span><input v-model="cardName" placeholder="Nombre completo" /></label>
                <label class="field full"><span>Número de tarjeta</span><input v-model="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" inputmode="numeric" /></label>
                <label class="field"><span>Fecha de expiración</span><input v-model="cardExpiry" placeholder="MM/AA" maxlength="5" /></label>
                <label class="field"><span>CVV</span><input v-model="cardCvv" placeholder="123" maxlength="4" type="password" inputmode="numeric" /></label>
              </div>
              <button class="primary-btn" @click="submitDonation">Confirmar donación <span>✓</span></button>
            </div>
          </section>
        </transition>

        <transition name="fade">
          <section v-if="donationConfirmed" class="confirmation">
            <div class="success-icon">✓</div>
            <span class="section-kicker">TAILSCAN IMPACTO</span>
            <h2>¡Gracias por ayudar!</h2>
            <p>Tu donación de <strong>${{ donationAmount.toFixed(2) }}</strong> contribuirá al bienestar de una mascota.</p>
            <div class="confirmation-card">
              <div><span>Estado</span><strong>✓ Donación recibida</strong></div>
              <div><span>Total</span><strong>${{ donationAmount.toFixed(2) }}</strong></div>
            </div>
            <button class="primary-btn" @click="volverInicio">Volver al inicio <span>→</span></button>
          </section>
        </transition>
      </main>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const amounts = [5, 10, 20, 50]
const selectedAmount = ref(10)
const customAmount = ref('')
const paymentProcessed = ref(false)
const donationConfirmed = ref(false)
const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')

const donationAmount = computed(() => {
  if (customAmount.value && Number(customAmount.value) > 0) return Number(customAmount.value)
  return selectedAmount.value || 0
})

function selectAmount(amount) {
  selectedAmount.value = amount
  customAmount.value = ''
}

function continueToPayment() {
  if (donationAmount.value <= 0) {
    alert('Por favor selecciona un monto para donar.')
    return
  }
  paymentProcessed.value = true
}

function submitDonation() {
  if (!cardNumber.value || !cardName.value || !cardExpiry.value || !cardCvv.value) {
    alert('Por favor completa los datos de la tarjeta.')
    return
  }
  donationConfirmed.value = true
}

function volverInicio() {
  router.push({ name: 'Home' })
}
</script>

<style scoped>
:global(*) { box-sizing: border-box; }
:global(body) { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #fdfbf8; color: #28324a; }
.donaciones-page { --navy: #1e3a8a; --blue: #2f5fd1; --blue-mid: #4f7fe0; --orange: #ff8a3d; --orange-deep: #f2632b; --ink: #28324a; --muted: #6b7488; position: relative; min-height: 100vh; overflow: hidden; padding: 30px 40px 80px; background: linear-gradient(120deg, #fff 0%, #fbf7f1 35%, #fff3e8 70%, #ffe8d4 100%); }
.blob { position: absolute; z-index: 0; border-radius: 50%; pointer-events: none; }
.blob-blue { width: 650px; height: 650px; left: -430px; bottom: -430px; background: radial-gradient(circle at 60% 40%, var(--blue-mid), var(--navy) 75%); }
.blob-orange { width: 480px; height: 480px; right: -280px; top: -250px; background: radial-gradient(circle at 40% 40%, var(--orange), var(--orange-deep) 75%); opacity: .85; }
.paw-watermark { position: absolute; z-index: 0; width: 170px; height: 170px; color: #dbe4f5; opacity: .6; pointer-events: none; }
.paw-watermark svg { width: 100%; height: 100%; }
.paw-left { left: 6%; top: 300px; }
.tc-header, .steps, .checkout-grid { position: relative; z-index: 2; }
.tc-header { max-width: 1050px; margin: 0 auto 30px; text-align: center; }
.header-top { display: flex; justify-content: center; margin-bottom: 28px; }
.icon-btn { width: 44px; height: 44px; border: none; border-radius: 50%; background: rgba(255,255,255,.85); color: var(--navy); font-size: 22px; cursor: pointer; box-shadow: 0 8px 20px rgba(30,58,138,.1); transition: .2s ease; }
.icon-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(30,58,138,.16); }
.tc-header h1 { margin: 8px 0 12px; color: var(--navy); font-size: clamp(34px, 5vw, 48px); font-weight: 900; }
.tc-header h1 span { color: var(--orange-deep); }
.tc-header > p { max-width: 650px; margin: 0 auto; color: var(--muted); line-height: 1.6; }
.section-kicker { color: var(--orange-deep); font-size: 11px; font-weight: 900; letter-spacing: .12em; }
.steps { max-width: 820px; margin: 0 auto 35px; display: flex; align-items: center; justify-content: center; }
.step { display: flex; align-items: center; gap: 9px; color: #9aa3b7; }
.step > span { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #e8edf7; color: #8d97aa; font-weight: 900; font-size: 13px; }
.step.active { color: var(--navy); }
.step.active > span { background: var(--navy); color: white; box-shadow: 0 7px 15px rgba(30,58,138,.2); }
.step strong, .step small { display: block; }
.step strong { font-size: 12px; }
.step small { margin-top: 2px; font-size: 9px; }
.step-line { width: 70px; height: 2px; margin: 0 14px; background: #dce2ef; }
.checkout-grid { max-width: 1050px; margin: 0 auto; display: grid; grid-template-columns: 330px 1fr; gap: 24px; align-items: start; }
.resumen, .form-area { overflow: hidden; border-radius: 22px; background: #fff; box-shadow: 0 16px 40px rgba(30,58,138,.09); }
.resumen { position: sticky; top: 20px; }
.resumen-header { display: flex; align-items: center; justify-content: space-between; padding: 22px; background: #f6f8fd; }
.resumen-header h2 { margin: 4px 0 0; color: var(--navy); font-size: 20px; }
.cart-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 13px; background: #e7edfc; font-size: 19px; }
.impact-items { padding: 15px 20px 5px; }
.impact-item { display: flex; align-items: center; gap: 10px; padding: 13px 0; border-bottom: 1px solid #edf0f6; }
.impact-item > span { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 11px; background: #fff0e7; font-size: 18px; }
.impact-item strong, .impact-item small { display: block; }
.impact-item strong { color: var(--navy); font-size: 12px; }
.impact-item small { margin-top: 3px; color: var(--muted); font-size: 9px; line-height: 1.3; }
.secure-box { display: flex; align-items: center; gap: 10px; margin: 15px 20px; padding: 12px; border-radius: 12px; background: #f1f8f3; color: #348052; }
.secure-box strong, .secure-box small { display: block; }
.secure-box strong { font-size: 11px; }
.secure-box small { margin-top: 2px; font-size: 9px; }
.total-row { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-top: 1px solid #edf0f6; }
.total-row span { color: var(--muted); font-size: 13px; }
.total-row strong { color: var(--navy); font-size: 25px; font-weight: 900; }
.checkout-section { padding: 28px; }
.section-title { display: flex; align-items: center; gap: 13px; }
.title-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 14px; background: #e8efff; font-size: 20px; }
.title-icon.orange { background: #fff0e7; }
.section-title h2 { margin: 4px 0 0; color: var(--navy); font-size: 23px; }
.section-description { margin: 15px 0 22px; color: var(--muted); font-size: 13px; line-height: 1.6; }
.amount-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.amount-options button { padding: 14px 8px; border: 2px solid #e5e9f2; background: white; border-radius: 12px; color: var(--navy); font-size: 16px; font-weight: 800; cursor: pointer; transition: .2s; }
.amount-options button:hover, .amount-options button.active { border-color: var(--blue); background: #f7f9ff; }
.amount-options button.active { background: var(--blue); color: white; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field.full { grid-column: span 2; }
.field span { color: var(--navy); font-size: 11px; font-weight: 800; }
.field input { width: 100%; padding: 12px 13px; border: 1.5px solid #dfe4ee; border-radius: 10px; outline: none; color: var(--ink); background: #fcfdff; font: inherit; font-size: 12px; transition: .2s ease; }
.field input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(47,95,209,.09); }
.custom-field { margin-top: 4px; }
.money-input { display: flex; align-items: center; border: 1.5px solid #dfe4ee; border-radius: 10px; background: #fcfdff; }
.money-input > span { padding-left: 13px; color: var(--muted); }
.money-input input { border: none; background: transparent; }
.donation-note { display: flex; align-items: center; gap: 12px; margin-top: 20px; padding: 14px; border-radius: 13px; background: #f1f8f3; }
.donation-note > span { font-size: 22px; }
.donation-note strong { color: #348052; font-size: 12px; }
.donation-note p { margin: 4px 0 0; color: var(--muted); font-size: 10px; }
.primary-btn { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; margin-top: 20px; padding: 14px; border: none; border-radius: 12px; background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; font-weight: 800; cursor: pointer; transition: .2s ease; }
.primary-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(47,95,209,.22); }
.payment-methods { display: grid; grid-template-columns: 1fr; gap: 12px; }
.payment-option { position: relative; display: flex; align-items: center; gap: 10px; min-height: 80px; padding: 14px; border: 2px solid var(--blue); border-radius: 15px; background: #f7f9ff; }
.radio-custom { width: 14px; height: 14px; border: 4px solid var(--blue); border-radius: 50%; }
.payment-icon { font-size: 22px; }
.payment-content { flex: 1; }
.payment-content strong, .payment-content small { display: block; }
.payment-content strong { color: var(--navy); font-size: 12px; }
.payment-content small { margin-top: 3px; color: var(--muted); font-size: 9px; }
.check { color: var(--blue); font-weight: 900; }
.card-form { margin-top: 20px; }
.fake-card { max-width: 390px; min-height: 195px; margin: 0 auto 25px; padding: 22px; border-radius: 18px; color: white; background: linear-gradient(135deg, #1e3a8a, #2f5fd1); box-shadow: 0 15px 30px rgba(30,58,138,.25); }
.fake-card-top { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; }
.fake-card-number { margin-top: 38px; font-size: 20px; letter-spacing: 3px; }
.fake-card-bottom { display: flex; justify-content: space-between; margin-top: 25px; }
.fake-card-bottom small, .fake-card-bottom strong { display: block; }
.fake-card-bottom small { font-size: 7px; opacity: .7; }
.fake-card-bottom strong { margin-top: 3px; font-size: 9px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.confirmation { padding: 60px 35px; text-align: center; }
.success-icon { width: 78px; height: 78px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #e7f7ec; color: #36a45b; font-size: 35px; font-weight: 900; }
.confirmation h2 { margin: 8px 0 12px; color: var(--navy); font-size: 30px; }
.confirmation > p { max-width: 450px; margin: 0 auto; color: var(--muted); line-height: 1.7; font-size: 13px; }
.confirmation-card { max-width: 420px; margin: 25px auto; display: flex; justify-content: space-between; padding: 16px; border-radius: 14px; background: #f6f8fd; }
.confirmation-card span, .confirmation-card strong { display: block; }
.confirmation-card span { color: var(--muted); font-size: 9px; }
.confirmation-card strong { margin-top: 4px; color: var(--navy); font-size: 12px; }
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (max-width: 850px) { .checkout-grid { grid-template-columns: 1fr; } .resumen { position: relative; top: 0; } }
@media (max-width: 600px) { .donaciones-page { padding: 20px 15px 50px; } .steps { justify-content: flex-start; overflow-x: auto; padding-bottom: 5px; } .step-line { width: 30px; margin: 0 7px; } .step div { display: none; } .checkout-section { padding: 20px 16px; } .amount-options { grid-template-columns: repeat(2, 1fr); } .form-grid { grid-template-columns: 1fr; } .field.full { grid-column: span 1; } .fake-card { min-height: 170px; } .fake-card-number { font-size: 15px; letter-spacing: 2px; } .confirmation { padding: 45px 20px; } }
</style>
