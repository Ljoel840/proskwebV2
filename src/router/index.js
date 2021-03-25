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
		path: '/prosker/:proskerName',
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
		path: '/academy/:titleAcademy',
		name: 'Academy',
		component: () => import('@/views/academy'),
	},
	{
		path: '/academy',
		name: 'Academy2',
		component: () => import('@/views/academy2'),
	},
	{
		path: '/contacto',
		name: 'Contacto',
		component: () => import('@/views/contacto'),
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
		path: '/registro',
		name: 'Registro',
		component: () => import('../views/registro'),
		props: true
	},
	// {
	// 	path: '/sitemap',
	// 	name: 'Sitemap',
	// 	component: () => import('../views/sitemap'),
	// 	props: true
	// },
	{
		path: '/noexiste',
		name: 'No Existe',
		component: () => import('@/views/noExiste'),
		props: true
	},
	{
		path: '/blog',
		name: 'Blog',
		component: () => import('@/views/blog'),
		props: true
	},	
	{
		path: '/:titleBlog',
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
