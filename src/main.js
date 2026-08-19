import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'     // ← Debe estar esta línea

const app = createApp(App)

app.use(router)                      // ← Esta línea es obligatoria

app.mount('#app')