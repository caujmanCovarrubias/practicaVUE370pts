import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HotelView from '../views/hotel/HotelView.vue'
import EmpleadoView from '../views/empleado/EmpleadoView.vue'
import HabitacionView from '../views/habitacion/HabitacionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: HotelView 
  },
  {
    path: '/empleado',
    name: 'empleado',
    component: EmpleadoView 
  },
  {
    path: '/habitacion',
    name: 'habitacion',
    component: HabitacionView 
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
