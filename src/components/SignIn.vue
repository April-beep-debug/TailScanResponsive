<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { insforge } from '../lib/insforgeClient'

const user = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const router = useRouter()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const signUp = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      throw new Error('Las contraseñas no coinciden')
    }
    const { data, error } = await insforge.auth.signUp({
      email: user.value,
      password: password.value,
    })
    if (error) throw error
    router.push('/home')
  } catch (error) {
    alert('Error al crear la cuenta: ' + error.message)
  }
}

</script>

<template>
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
      <span></span><span></span><span></span>
    </div>

    <div class="login-card">
      <img class="dog-logo" src="../assets/img/mascota.png" alt="Dog Logo" />

      <div class="brand">
        <span class="tail">Tail</span><span class="scan">Scan</span>
      </div>

      <div class="welcome">
        Crea tu cuenta
        <svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="14" cy="20" rx="7" ry="9"/><ellipse cx="32" cy="12" rx="7.5" ry="10"/><ellipse cx="50" cy="20" rx="7" ry="9"/><path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/></svg>
      </div>

      <form @submit.prevent="signUp">
        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>
          <input
            v-model="user"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </div>

        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M7 10V7a5 5 0 0110 0v3"/></svg>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Contraseña"
            required
          />
          <svg @click="togglePassword" class="eye-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>

        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M7 10V7a5 5 0 0110 0v3"/></svg>
          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Repite tu contraseña"
            required
          />
          <svg @click="togglePassword" class="eye-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>

          <button type="submit" class="submit-btn">Crear cuenta</button>
      </form>

      <div class="footer-links">
        <span>¿Ya tienes cuenta?</span>
        <span class="sep">|</span>
        <router-link to="/" class="signup">Iniciar sesión</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

  .bg-wrap{
    position:relative;
    min-height:100vh;
    background:linear-gradient(120deg, #ffffff 0%, #fbf7f1 30%, #fff3e8 55%, #ffe0c4 100%);
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:60px 20px;
    font-family:'Segoe UI', Arial, sans-serif;
    color:var(--ink);
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
  .paw-watermark{ position:absolute; opacity:.5; }
  .paw-watermark svg{ width:100%; height:100%; }
  .paw-left-wm{ width:180px; height:180px; bottom:60px; left:20px; color:#dbe4f5; z-index:0; }
  .paw-right-wm{ width:200px; height:200px; top:40px; right:60px; color:#ffcda3; opacity:.6; z-index:0; }

  .dots{
    position:absolute;
    display:grid;
    grid-template-columns:repeat(3, 7px);
    gap:8px;
    z-index:1;
  }
  .dots span{ width:6px; height:6px; border-radius:50%; }
  .dots-top-left span{ background:#9fb3e0; }
  .dots-top-left{ top:60px; left:40px; }
  .dots-bottom-right span{ background:#ffb787; }
  .dots-bottom-right{ bottom:60px; right:40px; }

  .login-card{
    position:relative;
    z-index:2;
    width:100%;
    max-width:660px;
    background:#fdfbf8;
    border-radius:26px;
    box-shadow:0 40px 80px rgba(30,58,138,.22);
    padding:50px 60px 44px;
    text-align:center;
  }

  .dog-logo{
    width:80px;
    height:80px;
    margin:0 auto 14px;
    color:var(--navy);
  }
  .dog-logo .tail-accent{ stroke:var(--orange); }

  .brand{
    font-size:44px;
    font-weight:800;
    margin-bottom:8px;
  }
  .brand .tail{ color:var(--navy); }
  .brand .scan{ color:var(--orange); }

  .welcome{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    font-size:19px;
    color:var(--muted);
    margin-bottom:34px;
  }
  .welcome svg{ width:22px; height:22px; color:var(--orange-deep); }

  .field{
    display:flex;
    align-items:center;
    gap:14px;
    background:#fdfbf8;
    border:1px solid #dfe4ee;
    border-radius:12px;
    padding:16px 20px;
    margin-bottom:18px;
    text-align:left;
  }
  .field svg{ width:19px; height:19px; color:var(--blue); flex-shrink:0; }
  .field input{
    border:none;
    outline:none;
    background:transparent;
    font-size:15.5px;
    color:var(--ink);
    font-family:inherit;
    flex:1;
    width:100%;
  }
  .field input::placeholder{ color:var(--muted); }
  .eye-toggle{ cursor:pointer; }

  .submit-btn{
    width:100%;
    background:linear-gradient(135deg, var(--orange), var(--orange-deep));
    color:white;
    border:none;
    padding:16px 24px;
    border-radius:12px;
    font-size:16px;
    font-weight:700;
    cursor:pointer;
    box-shadow:0 12px 24px rgba(242,99,43,.3);
    transition:transform .15s ease;
    margin-top:6px;
  }
  .submit-btn:hover{ transform:translateY(-2px); }

  .divider{
    display:flex;
    align-items:center;
    gap:14px;
    margin:26px 0 20px;
  }
  .divider .line{ flex:1; height:1px; background:#e2e6ee; }
  .divider span{ font-size:14px; color:var(--navy); font-weight:600; white-space:nowrap; }

  .social-btn{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:12px;
    width:100%;
    background:white;
    border:1px solid #e2e6ee;
    border-radius:12px;
    padding:14px 20px;
    margin-bottom:14px;
    font-size:16px;
    font-weight:700;
    color:var(--navy);
    cursor:not-allowed;
    opacity:.7;
  }
  .social-btn svg, .social-btn img{ width:22px; height:22px; }

  .footer-links{
    margin-top:10px;
    font-size:14.5px;
    color:var(--muted);
  }
  .footer-links a{
    color:var(--navy);
    text-decoration:none;
    font-weight:600;
  }
  .footer-links .signup{ color:var(--orange-deep); }
  .footer-links .sep{ margin:0 10px; color:#d5d9e2; }

  @media (max-width:600px){
    .login-card{ padding:36px 26px 30px; }
    .brand{ font-size:34px; }
  }
</style>
