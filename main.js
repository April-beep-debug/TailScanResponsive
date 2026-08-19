import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'     // ← Agrega esta línea

const app = createApp(App)

app.use(router)                      // ← Agrega esta línea

app.mount('#app')