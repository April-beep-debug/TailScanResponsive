<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { insforge } from '../lib/insforgeClient'

const user = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const socialLogin = async (provider) => {
  try {
    const { data, error } = await insforge.auth.signInWithOAuth(provider, {
      redirectTo: `${window.location.origin}/home`,
    })
    if (error) throw error
    if (data?.url) window.location.href = data.url
  } catch (error) {
    alert('Error: ' + error.message)
  }
}

const login = async () => {
  try {
    const { error } = await insforge.auth.signInWithPassword({
      email: user.value,
      password: password.value,
    })
    if (error) throw error
    router.push('/home')
  } catch (error) {
    alert('Error en usuario o contraseña: ' + error.message)
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
        Bienvenido de nuevo
        <svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="14" cy="20" rx="7" ry="9"/><ellipse cx="32" cy="12" rx="7.5" ry="10"/><ellipse cx="50" cy="20" rx="7" ry="9"/><path d="M32 30c-13 0-20 9-20 17s7 10 20 10 20-3 20-10-7-17-20-17z"/></svg>
      </div>

      <form @submit.prevent="login">
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

        <button type="submit" class="submit-btn">Iniciar Sesión</button>
      </form>

      <div class="divider">
        <span class="line"></span>
        <span>O continúa con</span>
        <span class="line"></span>
      </div>

      <button @click="socialLogin('google')" class="social-btn">
        <svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"/><path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.4 26.9 36 24 36c-5.2 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.7 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.6 5.4C40.4 36.3 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"/></svg>
        Google
      </button>

      <button @click="socialLogin('github')" class="social-btn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.79 10.79.57.1.78-.25.78-.55v-2.16c-3.17.69-3.84-1.36-3.84-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.9 10.9 0 015.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.33-5.2 5.62.41.36.77 1.06.77 2.14v3.17c0 .3.21.66.79.55C19.75 20.79 23 16.53 23 11.52 23 5.24 18.27.5 12 .5z"/></svg>
        GitHub
      </button>

      <div class="footer-links">
        <a href="#">¿Olvidaste tu contraseña?</a>
        <span class="sep">|</span>
        <router-link to="/signin" class="signup">Crear cuenta nueva</router-link>
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
    cursor:pointer;
    transition:background .15s ease;
  }
  .social-btn:hover{ background:#f7f9fc; }
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