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
	{
		path: '/usuario',
		name: 'Ingresar',
		component: () => import('@/views/s_usuario'),
	},
	{
		path: '/academy',
		name: 'Academy',
		component: () => import('@/views/academy'),
	},
	{
		path: '/contacto',
		name: 'Contacto',
		component: () => import('@/views/contacto'),
	},
	{
		path: '/contacto2',
		name: 'Contacto2',
		component: () => import('@/views/contacto2'),
	},
	{
		path: '/quienes',
		name: 'Quienes Somos',
		component: () => import('@/views/quienes'),
	},
	{
		path: '/funcionamiento',
		name: 'Funcionamiento',
		component: () => import('@/views/funcionamiento'),
	},	
	{
		path: '/prensa',
		name: 'Prensa',
		component: () => import('@/views/prensa'),
	},	
	{
		path: '/proskers',
		name: 'Proskers',
		component: () => import('@/views/proskers'),
	},	
	{
		path: '/blog',
		name: 'Blog',
		component: () => import('@/views/blog'),
		props: true
	},	
	{
		path: '/detalleBlog',
		name: 'Detalle Blog',
		component: () => import('../views/blog/detalleBlog'),
		props: true
	},
	{
		path: '/categoriaBlog',
		name: 'Categoria Blog',
		component: () => import('../views/blog/categoriaBlog'),
		props: true
	},
]

const router = new VueRouter({
  routes
})

export default router
