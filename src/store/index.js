import Vue from 'vue'
import Vuex from 'vuex'
import extaerPublicaciones from '../components/publicaciones/extraerPublicaciones'
import extaerCategorias from '../components/categorias/extraerCategorias'
import extaerProskers from '../components/buscar/extraerProskers'

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
		categorias:{
			datos: [],
			error: null,
			cargando: true
		},
		proskers:{
			datos:[],
			error: null,
			cargando: true
		}
	},
	mutations: {
		cambiarAncho (state) {
			state.ancho = window.innerWidth
		},
		cambiarScrollY (state) {
			state.scrollY = window.scrollY
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
			extaerCategorias().then(contenido =>{
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
			}).catch(error => {
				state.proskers.error = error
			})
		},
		agregarPublicaciones(state){
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




	},
	actions: {
	},
	modules: {
	}
})
