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
		},
		busqueda:{
			datos: [],
			idFin: null,
			error: null,
			cargando: true,
			hayMas: true
		},		
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
		},

		limpiarBusqueda(state){
			state.busqueda.datos = []
			state.busqueda.hayMas = true
			state.busqueda.idFin = ""
			state.busqueda.cargando = false
		}


	},
	actions: {
	},
	modules: {
	}
})
