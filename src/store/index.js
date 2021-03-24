import Vue from 'vue'
import Vuex from 'vuex'
import extaerPublicaciones from '../components/publicaciones/extraerPublicaciones'
import extaerCategorias from '../components/categorias/extraerCategorias'
import extaerProskers from '../components/buscar/extraerProskers'
import usuario from '../views/s_usuario/s_modulo'
import extraerCategoriasFAQ from '../views/funcionamiento/extraerCategoriasPreguntas'
import extraerCategoriasBlog from '../views/blog/extraerBlogCategorias'
import extraerTagsBlog from '../views/blog/extraerBlogTags'
import extraerBlog from "../views/blog/extraerBlog"
import extraerConversaciones from '../components/chat/extraerConversaciones'
import extraerMensajes from '../components/chat/extraerMensajes'
import extraerAcademy from "../views/academy/extraerAcademy"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		ancho: window.innerWidth,
		scrollY: window.scrollY,
		publicaciones:{
			datos: [],
			idFin: null,
			error: null,
			cargando: true
		},
		popUpLogin: {
			abierto: false,
			ventana: null,
			mensaje: null
		},
		categorias:{
			datos: [],
			error: null,
			cargando: true
		},
		proskers:{
			datos:[],
			error: null,
			cargando: true,
			cantidad: 0
		},
		busqueda:{
			datos: [],
			idFin: null,
			error: null,
			cargando: true,
			hayMas: true
		},
		mensajes: {
			datos:[],
			error: null,
			cargando: true
		},
		proskersDestacados:[],
		nuevoMensaje: 0,
		conteoAnteriorMensaje:0,
		categoriasFAQ: {
			datos: [],
			error: null,
			cargando: true
		},
		
		blog:{
			datos:[],
			error: null,
			cargando: true
		},
		blogCategorias:{
			datos:[],
			error: null,
			cargando: true
		},
		blogTags:{
			datos:[],
			error: null,
			cargando: true
		},
		ahora: null,
		conversaciones:{
			datos:[],
			error: null,
			cargando: true
		},
		chatAbierto: {},
		miPosicion:{
			posicion: {},
			error: null,
			titulo: 'YO',
			obtenerPosicion: false
		},
		marcadores:[],
		academy:{
			datos:[],
			error: null,
			cargando: true
		},
		
	},
	mutations: {
		cambiarAncho (state) {
			state.ancho = window.innerWidth
		},
		cambiarScrollY (state) {
			state.scrollY = window.scrollY
		},
		setearHora (state) {
            state.ahora = new Date()
        },
		cargarPublicaciones(state){
			extaerPublicaciones({
				idEnc: "hXwuDUKromgcZVpNrNDjfQ==" ,
  				inicioEnc: "zMFZGK1dnmjF2f1vKUsdmA=="
			}).then(contenido =>{
				state.publicaciones.datos = contenido.frontProsker
				state.publicaciones.idFin = contenido.finEnc
				state.publicaciones.cargando = false
			}).catch(error => {
				state.publicaciones.error = error
			})
		},
		cargarCategorias(state){
			extaerCategorias({idEnc: "hXwuDUKromgcZVpNrNDjfQ=="}).then(contenido =>{
				state.categorias.datos = contenido
				state.categorias.cargando = false
			}).catch(error => {
				state.categorias.error = error
			})
		},

		cargarProskers(state){
			extaerProskers({idEnc: "hXwuDUKromgcZVpNrNDjfQ=="}).then(contenido =>{
				state.proskers.datos = contenido
				state.proskers.cargando = false
				state.proskers.cantidad = contenido.length
				contenido.forEach(e=>{
					var registroDatos = {}
					e.Categories.forEach(e2=>{
						if (e2.SkillFeaturedOrder!=0) {
							registroDatos.idCat = e2.WorkFieldId
							registroDatos.nombreCategoria = e2.WorkFieldName
						}
					})
					if (registroDatos.idCat) {
						registroDatos.nombre = e.nombre
						registroDatos.idEnc = e.idEnc
						registroDatos.foto = e.UserPhotoImageUrl
						state.proskersDestacados.push(registroDatos)
					}
				})
			}).catch(error => {
				state.proskers.error = error
			})
		},
		agregarPublicaciones(state){
			// state.publicaciones.cargando = true
			extaerPublicaciones({
				idEnc: "hXwuDUKromgcZVpNrNDjfQ==" ,
  				inicioEnc: state.publicaciones.idFin
			}).then(contenido =>{
				contenido.frontProsker.forEach(element => {
					state.publicaciones.datos.push(element)
				});
				state.publicaciones.idFin = contenido.finEnc
				state.publicaciones.cargando = false
			}).catch(error => {
				state.publicaciones.error = error
			})
		},
		cargarBusqueda(state,contenido){
			state.busqueda.cargando = true

			if(state.busqueda.datos.map(e=>e.idEnc).indexOf(contenido.frontProsker[0].idEnc)<0){
				contenido.frontProsker.forEach(element => {
					state.busqueda.datos.push(element)
				});
			}else{
				state.busqueda.hayMas = false
			}
			if (state.busqueda.idFin === contenido.finEnc) {
				state.busqueda.hayMas = false
			}
			if (contenido.frontProsker.length<20) {
				state.busqueda.hayMas = false
			}
			state.busqueda.idFin = contenido.finEnc
			state.busqueda.cargando = false
			state.busqueda.datos.forEach(e=>{
				var geolocacion = e.SkillGeolocation.split(',')
				state.marcadores.push({
					posicion:{
						lat:parseFloat(geolocacion[0]),
						lng:parseFloat(geolocacion[1])
					},
					titulo: e.nombre
				})
			})
			
		},
		limpiarBusqueda(state){
			state.busqueda.datos = []
			state.busqueda.hayMas = true
			state.busqueda.idFin = ""
			state.busqueda.cargando = false
			state.marcadores = []
		},

		cargarMensajes(state,data){
			extraerMensajes(data)
			.then(contenido =>{
				state.mensajes.datos = contenido
				state.mensajes.cargando = false
			}).catch(error => {
				state.mensajes.error = error
			})
		},
		agregarMensaje(state, datos){
			state.mensajes.datos.push(datos)
			console.log(state.mensajes)
		},
		sumarNuevoMensaje(state){
			state.nuevoMensaje++
			state.conteoAnteriorMensaje++
		},
		restarNuevoMensaje(state,cuantos){
			state.nuevoMensaje = state.nuevoMensaje - cuantos
			state.conteoAnteriorMensaje = state.nuevoMensaje
		},
		reiniciarNuevoMensaje(state){
			state.nuevoMensaje=0
			
		},

		cargarCategoriasFAQ(state){
			extraerCategoriasFAQ({idEnc: "3CzpM62xZWsziwYYlxaz7zvEQ7UH2B3BDeasIAQyls4="})
			.then(contenido =>{
				state.categoriasFAQ.datos = contenido
				state.categoriasFAQ.cargando = false
			}).catch(error => {
				state.categoriasFAQ.error = error
			})
		},
		cargarCategoriasBlog(state){
			extraerCategoriasBlog({idEnc: ""})
			.then(contenido =>{
				state.blogCategorias.datos = contenido
				state.blogCategorias.cargando = false
			}).catch(error => {
				state.blogCategorias.error = error
			})
		},
		cargarTagsBlog(state){
			extraerTagsBlog({idEnc: ""})
			.then(contenido =>{
				state.blogTags.datos = contenido
				state.blogTags.cargando = false
			}).catch(error => {
				state.blogTags.error = error
			})
		},
		cargarBlog(state){
			extraerBlog({idEnc: ""})
			.then(contenido =>{
				state.blog.datos = contenido
				state.blog.cargando = false
			}).catch(error => {
				state.blog.error = error
			})
		},

		cargarConversaciones(state,id){
			extraerConversaciones({idEnc: id})
			.then(contenido =>{
				state.conversaciones.datos = contenido
				state.conversaciones.cargando = false
				state.conversaciones.datos.forEach(e=>{
					state.nuevoMensaje = state.nuevoMensaje+e.ConversationUnreadMessages
				})
				state.conteoAnteriorMensaje = state.nuevoMensaje
			}).catch(error => {
				state.conversaciones.error = error
			})
		},
		actualizarConversaciones(state,datos){
			state.conversaciones.datos.forEach(e=>{
				if (e.ConversationWithUserId===datos.ConversationWithUserId) {
					e.ConversationUnreadMessages = 0
				}
			})
		},
		verActualizacionesMensajes(state,id){
			extraerConversaciones({idEnc: id})
			.then(contenido =>{
				state.conversaciones.datos = contenido
				state.nuevoMensaje = 0
				state.conversaciones.datos.forEach(e=>{
					state.nuevoMensaje = state.nuevoMensaje+e.ConversationUnreadMessages
				})
			}).catch(error => {
				state.conversaciones.error = error
			})
		},
		cargarChatAbierto(state,datos){
			state.chatAbierto = datos
		},
		borrarChatAbierto(state){
			state.chatAbierto = {}
		},
		cargarPosicion(state){
			if(!("geolocation" in navigator)) {
				state.miPosicion.error = 'Geolocalización no disponible';
			}else{
				state.miPosicion.obtenerPosicion = true;
				navigator.geolocation.getCurrentPosition(pos => {
					state.miPosicion.obtenerPosicion = false;
					state.miPosicion.posicion = pos;
				}, err => {
					state.miPosicion.obtenerPosicion = false;
					state.miPosicion.error = err.message;
				})
			}

		},
		cargarVideosAcademy(state){
			extraerAcademy({idEnc: ""})
			.then(contenido =>{
				state.academy.datos = contenido
				state.academy.cargando = false
			}).catch(error => {
				state.academy.error = error
			})
		},

	},
	actions: {
	},
	modules: {
		usuario
	}
})
