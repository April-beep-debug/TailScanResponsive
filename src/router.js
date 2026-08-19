import { createRouter, createWebHistory } from 'vue-router'

// Importa tus componentes
import LogIn from '@/components/LogIn.vue'
import SignIn from '@/components/SignIn.vue'
import Home from '@/components/Home.vue'
import GeneradorQR from '@/components/GeneradorQR.vue'
import MapaReportes from '@/components/MapaReportes.vue'
import Consejos from '@/components/Consejos.vue'
import Galeria from '@/components/Galeria.vue'
import PerfilMascota from '@/components/PerfilMascota.vue'
import Articulos from '@/components/Articulos.vue'
import MisMascotas from '@/components/MisMascotas.vue'
import Veterinarios from '@/components/Veterinarios.vue'
import Collares from '@/components/Collares.vue'
import PagosCollares from '@/components/PagosCollares.vue'
import Donaciones from '@/components/Donaciones.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LogIn
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/generador-qr',
    name: 'GeneradorQR',
    component: GeneradorQR
  },
  {                                               
    path: '/mapa',
    name: 'MapaReportes',
    component: MapaReportes
  },
  {
    path: '/consejos',
    name: 'Consejos',
    component: Consejos
  },
  {
    path: '/galeria',
    name: 'Galeria',
    component: Galeria
  },
  {
    path: '/mascota',
    name: 'PerfilMascota',
    component: PerfilMascota
  },
  {
    path: '/articulos',
    name: 'Articulos',
    component: Articulos
  },
  {
    path: '/mis-mascotas',
    name: 'MisMascotas',
    component: MisMascotas
  },
  {
    path: '/veterinarios',
    name: 'Veterinarios',
    component: Veterinarios
  },
  {
    path: '/collares',
    name: 'Collares',
    component: Collares
  }
  ,
  {
    path: '/pagos-collares',
    name: 'PagosCollares',
    component: PagosCollares
  }
  ,
  {
    path: '/donaciones',
    name: 'Donaciones',
    component: Donaciones
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router