<template>
  <div class="consejos-container">
    <button class="page-back-button" @click="$router.back()" aria-label="Back">←</button>
    <!-- HERO / FORM -->
    <section class="hero-wrap">
      <div class="blob-left"></div>
      <div class="blob-right"></div>
      <div class="dots blue top-left">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="dots orange mid-right">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="hero-content">
        <h1>Community tips</h1>
        <div class="divider">
          <span class="line"></span>
          <span class="paw-icon">🐾</span>
          <span class="line"></span>
        </div>
        <p>Share your experience and help others take better care of their pets (dogs and cats)</p>
      </div>
      <div class="form-card">
        <div class="form-title">💬 Share your tip</div>
        <div class="form-row">
          <div class="input-field">
            <span class="icon">🐾</span>
            <select>
              <option>Select a category</option>
              <option>Dog</option>
              <option>Cat</option>
            </select>
          </div>
          <div class="input-field">
            <span class="icon">✏️</span>
            <input type="text" placeholder="Your tip title">
          </div>
        </div>
        <div class="textarea-field">
          <span class="icon">📝</span>
          <textarea placeholder="Write your tip here..."></textarea>
        </div>
        <button class="submit-btn" @click="enviarConsejo">📩 Send tip</button>
      </div>
    </section>

    <!-- CONSEJOS COMPARTIDOS -->
    <h2 class="shared-title">
      Tips shared by the community
      <div class="divider" style="margin-top:14px;">
        <span class="line"></span>
        <span class="paw-icon">🐾</span>
        <span class="line"></span>
      </div>
    </h2>
    <div class="cards-wrap">
      <div class="tip-card" v-for="consejo in consejos" :key="consejo.id">
        <span class="bookmark">🔖</span>
        <div class="tip-left">
          <span class="badge" :class="consejo.tipo === 'perro' ? 'dog' : 'cat'">
            🐾 {{ consejo.tipo === 'perro' ? 'Dog' : 'Cat' }}
          </span>
          <h3>{{ consejo.titulo }}</h3>
          <p>{{ consejo.descripcion }}</p>
          <div class="author">
            <img :src="consejo.avatar" :alt="consejo.autor">
            <div>
              <div class="name">By {{ consejo.autor }}</div>
              <div class="time">{{ consejo.fecha }}</div>
            </div>
          </div>
        </div>
        <div class="tip-illustration">{{ consejo.emoji }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const irAInicio = () => router.push('/home');
const irAGenerarQR = () => router.push('/generador-qr');
const irAlMapa = () => router.push('/mapa');



// Datos de consejos
const consejos = ref([
  {
    id: 1,
    tipo: 'perro',
    titulo: 'How to reduce separation anxiety',
    descripcion: 'Use interactive toys and leave soft music on when you leave home.',
    autor: 'María G.',
    avatar: 'https://i.pravatar.cc/40?img=47',
    fecha: '2 days ago',
    emoji: '🐶'
  },
  {
    id: 2,
    tipo: 'gato',
    titulo: 'Environmental enrichment for cats',
    descripcion: 'Install wall shelves and use cardboard boxes to stimulate their curiosity.',
    autor: 'Carlos R.',
    avatar: 'https://i.pravatar.cc/40?img=12',
    fecha: '4 days ago',
    emoji: '🐱'
  }
]);

const enviarConsejo = () => {
  alert('✅ Your tip has been sent! Thanks for sharing.');
};
</script>

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

:root {
  --blue-900: #0d1f6e;
  --blue-700: #1e40c9;
  --blue-500: #2f6bf0;
  --orange-500: #ff7a1a;
  --orange-600: #f2600a;
  --bg: #f5f7fc;
  --card-bg: #ffffff;
  --text-dark: #0d1f6e;
  --text-gray: #5b6478;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.consejos-container {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--text-dark);
  overflow-x: hidden;
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}

/* ===== HERO ===== */
.hero-wrap {
  position: relative;
  padding: 60px 60px 80px;
  overflow: hidden;
  background: linear-gradient(180deg, #f1f6ff 0%, #e7efff 100%);
  border: 1px solid rgba(30, 58, 138, 0.12);
  border-radius: 32px;
  box-shadow: 0 30px 100px rgba(15, 23, 42, 0.16);
}

.blob-left {
  position: absolute;
  left: -220px;
  top: 120px;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle at 30% 30%, #dbe6ff, #b9cdfd);
  border-radius: 50%;
  z-index: 0;
  opacity: 0.6;
}
.blob-right {
  position: absolute;
  right: -260px;
  top: -140px;
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #ff9a4d, #ff7a1a);
  border-radius: 45% 55% 60% 40% / 50% 45% 55% 50%;
  z-index: 0;
  opacity: 0.85;
}

.dots {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  z-index: 1;
}
.dots span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: block;
}
.dots.blue span {
  background: var(--blue-500);
}
.dots.orange span {
  background: var(--orange-500);
}
.dots.top-left {
  top: 110px;
  left: 30px;
}
.dots.mid-right {
  top: 420px;
  right: 40px;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
}
.hero-content h1 {
  font-size: 44px;
  font-weight: 800;
  color: var(--blue-900);
  margin-bottom: 18px;
}
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 16px;
}
.divider .line {
  width: 60px;
  height: 2px;
  background: var(--orange-500);
  opacity: 0.5;
}
.divider .paw-icon {
  font-size: 18px;
}
.hero-content p {
  font-size: 16px;
  color: var(--text-gray);
  line-height: 1.6;
}

/* ===== FORM CARD ===== */
.form-card {
  position: relative;
  z-index: 3;
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.16);
  border-radius: 32px;
  padding: 44px 48px;
  box-shadow: 0 32px 120px rgba(15, 23, 42, 0.18);
}
.form-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: var(--blue-900);
  margin-bottom: 22px;
}
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 18px;
}
.input-field {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1.5px solid #dbe3f5;
  border-radius: 12px;
  padding: 14px 18px;
  background: #fbfcff;
  color: #8b93a7;
  font-size: 14px;
}
.input-field select {
  border: none;
  background: transparent;
  outline: none;
  color: #8b93a7;
  font-size: 14px;
  width: 100%;
  appearance: none;
  cursor: pointer;
}
.input-field input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  width: 100%;
  color: #333;
}
.textarea-field {
  display: flex;
  gap: 10px;
  border: 1.5px solid #dbe3f5;
  border-radius: 12px;
  padding: 16px 18px;
  background: #fbfcff;
  margin-bottom: 22px;
}
.textarea-field textarea {
  border: none;
  outline: none;
  background: transparent;
  resize: vertical;
  width: 100%;
  min-height: 80px;
  font-family: inherit;
  font-size: 14px;
  color: #333;
}
.textarea-field span.icon {
  color: #8b93a7;
  margin-top: 2px;
}
.input-field span.icon {
  color: #8b93a7;
  display: flex;
}

.submit-btn {
  display: flex;
  align-items: center;
   justify-content: center;
   gap: 10px;
   background: linear-gradient(135deg, #e65100, #bf360c);
   color: #ffffff;
   border: 1px solid rgba(255, 255, 255, 0.16);
   padding: 14px 26px;
   border-radius: 14px;
   font-weight: 800;
   font-size: 15px;
   cursor: pointer;
   box-shadow: 0 12px 32px rgba(186, 84, 18, 0.28);
   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);
 }
 .submit-btn:hover {
   transform: translateY(-1px);
   box-shadow: 0 16px 36px rgba(186, 84, 18, 0.32);
 }
 .shared-title {
   text-align: center;
   font-size: 26px;
   font-weight: 800;
   color: var(--blue-900);
   margin: 60px 0 30px;
   position: relative;
   z-index: 2;
}

.cards-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto 80px;
  padding: 0 60px;
}
.tip-card {
  flex: 1;
  background: var(--card-bg);
  border-radius: 20px;
  padding: 26px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 15px 40px rgba(20, 40, 120, 0.06);
  position: relative;
}
.tip-left {
  flex: 1;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 14px;
}
.badge.dog {
  background: var(--blue-700);
}
.badge.cat {
  background: var(--orange-500);
}
.tip-card h3 {
  font-size: 18px;
  color: var(--blue-900);
  margin-bottom: 10px;
  line-height: 1.3;
}
.tip-card p {
  font-size: 13.5px;
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 18px;
}
.author {
  display: flex;
  align-items: center;
  gap: 10px;
}
.author img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}
.author .name {
  font-size: 13px;
  font-weight: 700;
  color: var(--blue-900);
}
.author .time {
  font-size: 12px;
  color: #9aa2b5;
}
.bookmark {
  position: absolute;
  top: 22px;
  right: 22px;
  color: var(--blue-700);
  font-size: 18px;
}
.tip-illustration {
  width: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 60px;
}

@media (max-width: 900px) {
  header {
    padding: 16px 20px;
    flex-wrap: wrap;
    gap: 14px;
  }
  nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .hero-wrap {
    padding: 40px 20px;
  }
  .form-card {
    padding: 24px 20px;
  }
  .form-row {
    flex-direction: column;
  }
  .cards-wrap {
    flex-direction: column;
    padding: 0 20px;
  }
}
</style>