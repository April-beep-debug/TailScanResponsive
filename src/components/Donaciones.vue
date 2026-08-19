<template>
<section class="donation-section">
<div class="donation-container">
 
      <!-- Información -->
<div class="donation-info">
<span class="badge">🐾 Ayúdanos a ayudar</span>
 
        <h1>
          Tu donación puede cambiar
<span>una vida</span>
</h1>
 
        <p>
          Cada aporte nos ayuda a rescatar, alimentar y cuidar mascotas
          que han sido perdidas o abandonadas, además de facilitar que
          encuentren un nuevo hogar.
</p>
 
        <div class="impact-list">
<div class="impact-item">
<div class="impact-icon">🍖</div>
<div>
<h3>Alimentación</h3>
<p>Ayuda a proporcionar comida a mascotas rescatadas.</p>
</div>
</div>
 
          <div class="impact-item">
<div class="impact-icon">🏠</div>
<div>
<h3>Refugio</h3>
<p>Contribuye a mantenerlas seguras mientras encuentran hogar.</p>
</div>
</div>
 
          <div class="impact-item">
<div class="impact-icon">❤️</div>
<div>
<h3>Atención</h3>
<p>Apoya sus cuidados y recuperación.</p>
</div>
</div>
</div>
</div>
 
      <!-- Formulario -->
<div class="donation-card">
<div class="card-header">
<h2>Haz una donación</h2>
<p>Elige el monto que deseas aportar</p>
</div>
 
        <div class="amount-options">
<button
            v-for="amount in amounts"
            :key="amount"
            :class="{ active: selectedAmount === amount }"
            @click="selectAmount(amount)"
>
            ${{ amount }}
</button>
</div>
 
        <div class="custom-amount">
<label for="customAmount">Otro monto</label>
 
          <div class="input-money">
<span>$</span>
<input
              id="customAmount"
              v-model="customAmount"
              type="number"
              min="1"
              placeholder="Ingrese un monto"
              @input="selectedAmount = null"
            />
</div>
</div>
 
        <div class="donation-summary">
<span>Tu aporte</span>
<strong>${{ donationAmount }}</strong>
</div>
 
        <button class="donate-button" @click="donate">
          ❤️ Donar ahora
</button>
 
        <p class="secure-text">
          🔒 Tu donación se utilizará para apoyar el bienestar de las mascotas.
</p>
</div>
 
    </div>
 
    <!-- Estadísticas -->
<div class="stats">
<div>
<strong>+500</strong>
<span>Mascotas ayudadas</span>
</div>
 
      <div>
<strong>+300</strong>
<span>Mascotas adoptadas</span>
</div>
 
      <div>
<strong>+100</strong>
<span>Rescates realizados</span>
</div>
</div>
</section>
</template>
 
<script setup>
import { ref, computed } from 'vue'
 
const amounts = [5, 10, 20, 50]
 
const selectedAmount = ref(10)
const customAmount = ref('')
 
const selectAmount = (amount) => {
  selectedAmount.value = amount
  customAmount.value = ''
}
 
const donationAmount = computed(() => {
  if (customAmount.value && Number(customAmount.value) > 0) {
    return Number(customAmount.value)
  }
 
  return selectedAmount.value || 0
})
 
const donate = () => {
  if (donationAmount.value <= 0) {
    alert('Por favor selecciona un monto para donar.')
    return
  }
 
  alert(`¡Gracias por tu donación de $${donationAmount.value}! 🐾❤️`)
 
  // Aquí puedes conectar tu sistema de pagos.
  // Ejemplo:
  // router.push('/pago')
}
</script>
 
<style scoped>
* {
  box-sizing: border-box;
}
 
.donation-section {
  min-height: 100vh;
  padding: 80px 20px;
  background: #f8faf7;
  font-family: Arial, Helvetica, sans-serif;
}
 
.donation-container {
  max-width: 1150px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 70px;
  align-items: center;
}
 
/* Información */
 
.donation-info .badge {
  display: inline-block;
  padding: 9px 16px;
  border-radius: 30px;
  background: #e8f5e9;
  color: #3d7a4a;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}
 
.donation-info h1 {
  font-size: 48px;
  line-height: 1.1;
  color: #26352a;
  margin: 0 0 22px;
}
 
.donation-info h1 span {
  color: #65a66e;
}
 
.donation-info > p {
  max-width: 600px;
  color: #68746b;
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 35px;
}
 
.impact-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
 
.impact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}
 
.impact-icon {
  min-width: 52px;
  height: 52px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}
 
.impact-item h3 {
  margin: 0 0 4px;
  color: #304136;
  font-size: 16px;
}
 
.impact-item p {
  margin: 0;
  color: #7b857d;
  font-size: 14px;
}
 
/* Tarjeta */
 
.donation-card {
  background: white;
  padding: 35px;
  border-radius: 25px;
  box-shadow: 0 15px 50px rgba(40, 70, 45, 0.1);
}
 
.card-header h2 {
  margin: 0 0 8px;
  color: #26352a;
  font-size: 27px;
}
 
.card-header p {
  margin: 0 0 25px;
  color: #7b857d;
}
 
.amount-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 25px;
}
 
.amount-options button {
  padding: 14px;
  border: 2px solid #e2e9e3;
  background: white;
  border-radius: 12px;
  color: #45634b;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
 
.amount-options button:hover {
  border-color: #75ad7d;
}
 
.amount-options button.active {
  background: #65a66e;
  border-color: #65a66e;
  color: white;
}
 
.custom-amount {
  margin-bottom: 20px;
}
 
.custom-amount label {
  display: block;
  margin-bottom: 8px;
  color: #405045;
  font-size: 14px;
  font-weight: 600;
}
 
.input-money {
  display: flex;
  align-items: center;
  border: 2px solid #e2e9e3;
  border-radius: 12px;
  overflow: hidden;
}
 
.input-money span {
  padding-left: 15px;
  color: #6b756e;
  font-weight: bold;
}
 
.input-money input {
  width: 100%;
  border: none;
  outline: none;
  padding: 14px 10px;
  font-size: 16px;
}
 
.donation-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-top: 1px solid #edf0ed;
  margin-top: 10px;
  color: #667168;
}
 
.donation-summary strong {
  color: #304b35;
  font-size: 25px;
}
 
.donate-button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 13px;
  background: #65a66e;
  color: white;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
 
.donate-button:hover {
  background: #508f59;
  transform: translateY(-2px);
}
 
.secure-text {
  text-align: center;
  color: #8a938c;
  font-size: 12px;
  margin: 15px 0 0;
}
 
/* Estadísticas */
 
.stats {
  max-width: 900px;
  margin: 70px auto 0;
  padding: 30px;
  background: white;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05);
}
 
.stats div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
 
.stats strong {
  color: #65a66e;
  font-size: 30px;
}
 
.stats span {
  color: #747e77;
  font-size: 14px;
}
 
/* Responsive */
 
@media (max-width: 850px) {
  .donation-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
 
  .donation-info h1 {
    font-size: 38px;
  }
 
  .donation-card {
    max-width: 550px;
    width: 100%;
    margin: auto;
  }
}
 
@media (max-width: 550px) {
  .donation-section {
    padding: 50px 15px;
  }
 
  .donation-info h1 {
    font-size: 32px;
  }
 
  .donation-info > p {
    font-size: 15px;
  }
 
  .donation-card {
    padding: 25px 20px;
  }
 
  .stats {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}
</style>