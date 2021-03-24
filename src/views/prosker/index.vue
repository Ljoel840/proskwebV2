<template>
	<section>
		<div class="fondoTitulo">
		</div>
			<div class="busqueda">
				<buscar @opcion="seleccion($event)"/>
			</div>
		<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<barra v-if="cargandoProsker"/>
		<div class="contenedorPublicidad">
			<div class="div1">
				<div class="contenedorPrincipal" v-if="!cargandoProsker&&datos.length>0">
					<div class="foto" :style="{ backgroundImage: 'url(' + datos[0].foto + ')' }"></div>
					<div class="datos">
						<h2>{{datos[0].nombre}}</h2>
						<h3>{{datos[0].pais}}</h3>
						<h3>Prosk: {{datos[0].prosk}}</h3>
						<h3>Seguidores: {{datos[0].seguidores}}</h3>
						<button class="botonMensaje" @mouseover="!usuario.ok ? mostrar=true:null" @mouseleave="mostrar=false" :class="!usuario.ok ? 'desactivado': null" @click="usuario.ok ? mostrarChat=!mostrarChat : null"> 
							<img src="@/assets/img/i_mensaje.png" alt="icono mensaje">
							<p>Enviar Mensaje</p>
						</button>
					</div>
					<div class="tooltiptext" v-if="mostrar">
						<img src="@/assets/img/i_proskquienes.png" alt="Logo Prosk">
						<span>Necesitas estar logueado para enviar un mensaje.  Si no eres <strong>Prosker</strong> descargate la <strong>App</strong> y <strong>Registrate</strong></span>
					</div>
					<div class="mensajes" v-if="mostrarChat && usuario.ok">
						<span>	<button @click="mostrarChat=false"><i class="material-icons">clear</i></button>	</span>
							<h3>ENVIAR MENSAJE</h3>
						
						<p>Escribe tu Mensaje:</p>
						<label>
							<textarea v-model="nuevoMensaje" class="form-control" rows="3" ></textarea> 
						</label>
						<button class="botonAceptar" @click="enviarMensaje(nuevoMensaje)">Enviar</button>
					</div>
				</div>
				<div class="contenedorPublicaciones" v-if="datos.length>0">
					<publicacion v-for="(d,index) in datos[0].publicaciones" :key="index" :d="d"/>
				</div>
			</div>
			<div class="div2">
				<publicidad300x600/>
			</div>

		</div>
		<div id="snackbar">{{mensajeEnvio}}</div>
	</section>
</template>
<script>
import extraer from './extraerProsker'
import enviar from './enviarMensaje'

export default {
	name: 'prosker',
	props:{
		data: {
			type: String
		}

	},
	components: {
		barra: () => import('@/components/barra'),
		buscar: () => import('@/components/buscar'),
		publicacion: () => import('@/components/publicaciones/publicacion'),
		// salaChat: () => import('@/components/chat/salaChat'),
		// chat: () => import('@/components/chat'),
		publicidad300x600: () => import('@/components/adsense/publicidad300x600'),

	},
	data() {
		return {
			datos: [],
			cargandoProsker: true,
			error: null,
			mostrar: false,
			mostrarChat: false,
			nuevoMensaje: '',
			mensajeEnvio: '',
			errorEnvio: null,
			enviandoMensaje: false,
			dataUsuario: ''
		}
	},
	computed: {
		usuario () {
			return this.$store.state.usuario
		},
		ahora () {
			return this.$store.state.ahora
		},
		
	},
	created() {
		this.dataUsuario = this.data
		this.extraerDatos()
		window.scrollTo(0,0)
	},
	methods: {
		snack() {
			var x = document.getElementById("snackbar");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		},
		async extraerDatos(){
			try {
                this.error = null
                this.cargandoProsker = true
                this.datos=await extraer ({
					idEnc: this.dataUsuario,
                })
				this.cargandoProsker = false
            }
            catch (error) {
				this.error = error
				console.log(this.error)
            }
			this.cargandoProsker = false
		},
		agregarMensaje(mensaje){
			let data = {
				idEnc: this.datos[0].idEnc,
				mensaje: mensaje,
				nombre: this.datos[0].nombre,
				foto: this.datos[0].foto,
				source: 'USUARIO',
				leido: true
			}
			if (mensaje) {
				this.$store.commit('agregarMensaje',data)
				this.$store.commit('agregarMensaje',{
					idEnc: this.datos[0].idEnc,
					mensaje: 'Hola, Cómo estás?',
					nombre: this.datos[0].nombre,
					foto: this.datos[0].foto,
					source: 'PROSKER',
					leido: false
				})
				this.$store.commit('sumarNuevoMensaje')
			}
			this.nuevoMensaje = ''
		},
		async enviarMensaje(mensaje){
			try{
				// let data = {
				// 	idEnc: this.usuario.idEnc,
				// 	idEncWith: this.datos[0].idEnc,
				// 	NewMessage: mensaje,
				// 	MessageFromConversationUser: true,
				// 	MessageStatus: 'Read',
				// 	MessageDate: this.ahora
				// }
				this.errorEnvio = null
				this.enviandoMensaje = true
				await enviar({
					idEnc: this.usuario.idEnc,
					idEncWith: this.datos[0].idEnc,
					NewMessage: mensaje
				})
				// this.$store.commit('agregarMensaje',data)
				this.mensajeEnvio='Mensaje Enviado'
				this.snack()
				this.nuevoMensaje = ''
				this.mostrarChat = false
			}
			catch (error){
				this.errorEnvio = error
				this.extraerDatos()
			}
		},
		ir(pag,data){
			this.$router.push({
				name: pag, 
				params: {data}
			}).catch(() => {})
		},
		seleccion(opc){
			if (opc.tipo==='Categorias') {
				this.ir("Mostrar Categorias",opc.datos)
			}else{
				this.dataUsuario = opc.datos.idEnc
				this.extraerDatos()
			}
		},
	
		
	},


}
</script>
<style scoped>
	section{
		width: 100%;
		min-height: 85vh;
	}
	section img {
		width: 100%;
		height: auto;
	}
	h2{
		font-size: 2em;
	}
	h3{
		color: var(--a-color);
		font-size: 1.2em;
	}
	.fondoTitulo{
		width: 100%;
		height: 150px;
		position: absolute;
		top: 0;
		z-index: -1;
		background-color: var(--a-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 3em;
	}
	.separador{
		margin-top: 50px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
	}
	.busqueda {
		width: 100%;
		padding: 2em 0;
		
	}
	.contenedorPublicidad {
		display: grid;
		grid-template-columns: 1fr 310px;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }
	.contenedorPrincipal{
		width: 100%;
		margin: auto;
		display: flex;
		justify-content: flex-start;	
		align-items: center;
	}
	.foto{
		width: 200px;
		height: 200px;
		min-width: 200px;
		min-height: 200px;
		margin-left: 10vw;
		border-radius: 100px;
		border: 3px solid var(--a-color);
		background-color: var(--b-color);
		background-size: 300px auto ;
		background-position: center;
		background-repeat: no-repeat;
		margin-top: 25px;
		margin-bottom: 25px;

	}
	.datos {
		margin-left: 3vw;
		
	}
	.contenedorPublicaciones{
		width: 80%;
		margin: 3em auto;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}


	.botonMensaje{
		background-color: transparent;
		border: none;
		margin: 10px 0;
		outline: none;
		
	}

	.tooltiptext {
		width: 300px;
		height: 100px;
		background-color: var(--d-color);
		border-radius: 6px;
		padding: 2px 5px;
		margin-top: 10px;
		margin-left: 10px;
		display: flex;		
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.tooltiptext img{
		width: auto;
		height: 80px;
		padding: 5px;
	}
	.tooltiptext span{
		color: var(--c-color);
		text-align: center;
		font-size: .9em;
	}

	#bmensaje:hover .tooltiptext {
		visibility: visible;
	}

	.botonMensaje img{
		width: 30px;
		height: 30px

	}
	.botonMensaje p{
		font-size: 0	.8em;
		color: var(--a-color);
	}
	.desactivado{
		filter: grayscale(90%);
	}
	.mensajes{
		width: 300px;
		height: 230px;
		background-color: var(--e-color);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 4em;
		border-radius: 10px;
	}
	.mensajes label{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 10px;
	}

	.mensajes input,textarea{
		padding: 10px;
		width: 100%;
		margin: 0 10px;
		border: none;
		background-color: var(--d-color);
	}
	.mensajes p{
		padding: 15px 10px 0;
		align-self: flex-start;
		font-size: .9em;

	}
	.mensajes span{
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
	.mensajes span button{
		float: right;
		margin-right: 10px;
		border: none;
		background-color: transparent;
		outline: none;
		cursor: pointer;
	}
	#snackbar {
		visibility: hidden;
		min-width: 250px;
		margin-left: -125px;
		background-color: var(--b-color);
		color: #fff;
		text-align: center;
		border-radius: 2px;
		padding: 16px;
		position: fixed;
		z-index: 1;
		left: 50%;
		top: 50%;
		font-size: 17px;
	}

	#snackbar.show {
		visibility: visible;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
	}
	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 140px;
		}
		.contenedorPrincipal{
			margin-top: 50px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: 10px;
		}
		.busqueda {
			min-height: 50px;
			margin: 3em 0 0 0;
		}
		.busqueda *{
			margin-left: 25% ;
		}
	}

	@media (max-width: 500px) {
		.busqueda *{
			margin-left: 5% ;
		}
		.foto{
			width: 150px;
			height: 150px;
			min-width: 150px;
			min-height: 150px;
		}
		.datos h2{
			font-size: 1.5em;
		}
		.datos h3{
			font-size: 1em;
		}
		.contenedorPublicidad {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 610px;
		}
		.div1 { grid-area: 1 / 1 / 2 / 2; }
		.div2 { grid-area: 2 / 1 / 3 / 2; }
	}
	@media (max-width: 850px) {
		.tooltiptext{
			position: absolute;
			left: 25vw;
			margin-top: 300px;
		}
	}

	
	

</style>