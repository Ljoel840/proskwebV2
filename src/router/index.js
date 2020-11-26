import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/prosker',
    name: 'Prosker',
	component: () => import('../views/prosker'),
	props: true
  },
  {
    path: '/publicacion',
    name: 'Publicacion',
	component: () => import('../views/publicacion'),
	props: true
  },
  {
    path: '/categorias',
    name: 'Mostrar Categorias',
	component: () => import('../views/mostrarCategorias'),
	props: true
  },  
]

const router = new VueRouter({
  routes
})

export default router
