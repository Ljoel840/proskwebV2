<template>
	<section>
		<h1>PUBLICACIONES</h1>
		<div class="cargando" v-if="datosPublicaciones.cargando">
			<spinner-circular  v-if="datosPublicaciones.cargando"/>
		</div>
		<span class="contenedor" v-if="!datosPublicaciones.cargando">
			<!-- <div v-for="index in 4" :key="index" class="dPublicaciones">
				<div class="fondo" :style="{ backgroundImage: 'url(' + datosPublicaciones.datos[index].imagen + ')' }" @click="ir('Publicacion',datosPublicaciones.datos[index])">
					<span class="descripcion">{{datosPublicaciones.datos[index].descripcion}}</span>	
				</div>
				<span class="prosker">
					<div class="foto" :style="{ backgroundImage: 'url(' + datosPublicaciones.datos[index].foto + ')' }" @click="ir('Prosker',datosPublicaciones.datos[index].idEncUsuario)" ></div>
					<p class="categoria">{{datosPublicaciones.datos[index].categoria.toLowerCase()}}</p>
					<span>
						<i class="material-icons">favorite</i>
						<p>{{datosPublicaciones.datos[index].like}}</p>
					</span>
				</span>
				<br>
			</div> -->
			<slider :datos="datosPublicaciones.datos" />
		</span>
	</section>
</template>
<script>
// import Slider from './slider.vue'
import extraer from './extraerPublicaciones2'
export default {
	name: 'publicaciones',
	components: {
		spinnerCircular: () => import('@/components/spinnerCircular'),
		slider: () => import('@/components/sliderPublicaciones')
	},
	data() {
		return {
			tiempo: null,
			cargando:false,
			error: null,
			datos: []
			// datosPublicaciones: []
		}
	},
	// async created () {
	// 	try {
	// 		const retorno = await extraer ({
	// 			idEnc: "hXwuDUKromgcZVpNrNDjfQ==" ,
  	// 			inicioEnc: "zMFZGK1dnmjF2f1vKUsdmA=="
	// 		})
	// 		this.datosPublicaciones = retorno.frontProsker
	// 		this.fin = retorno.finEnc
	// 	}
	// 	catch (error) {
	// 		this.error = error
	// 	}
	// 	this.cargando = false
	// },
	created() {
		extraer(this)
	},
	mounted() {
		this.comenzarCuentaRegresiva()
	},
	computed: {
		datosPublicaciones () {
			return this.$store.state.publicaciones
		},
		rout () {
			return this.$route
		},

	},
	methods: {
		ir (pag,data) {
			// e.preventDefault()
			this.$router.push({
				name: pag, 
				params: {data}
			}).catch(() => {})
		},
		comenzarCuentaRegresiva(){
			this.tiempo = setInterval(()=>this.agregarDatos(), 10000);
		},
		
		agregarDatos(){
			clearInterval(this.tiempo)
			this.$store.commit('agregarPublicaciones')
			// console.log(this.datosPublicaciones)
			// this.comenzarCuentaRegresiva()
		}	
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		text-align: center;
		margin: 1em 0;
	}
	h1{
		font-size: 2em;
		color: var(--a-color)
	}
	.contenedor{
		width: 100%;
		margin: auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.cargando {
		width: 100%;
		height: 100px;
		margin: 0 auto;
	}
	.contenedor .dPublicaciones {
		width: 100%;
		height: auto;
		max-width: 300px;
		max-height: 300px;
		margin: 20px;

	}
	.contenedor .fondo{
		width: 100%;
		height: 150px;
		/* background-image: url('@/assets/imagen1.jpg'); */
		background-size: 320px auto ;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		
	}

	.contenedor .fondo span{
		width: 100%;
		height: 30px;
		background-color: rgba(0, 0, 0, .8);
		color: #fff;
		font-size: .8;
		overflow: hidden;

	}

	.contenedor div img{
		width: 100%;
		height: auto;
	}

	.prosker{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--d-color);
	}
	.prosker .foto{
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		border-radius: 30px;
		margin: 2px;
		/* background-image: url('./foto1.jpg'); */
		background-color: var(--b-color);
		background-size: auto 50px ;
		background-position: center;
		background-repeat: no-repeat;
	}
	.prosker p{
		margin: 0 5px;
	}
	.prosker .categoria{
		text-transform: capitalize;
		line-height: 1;
		

	}
	.prosker span{
		display: flex;
		color: var(--a-color);
		background-color: var(--d-color);
	}

	i{
		color: var(--a-color);
	}
	.descripcion{
		font-size: .9em;
	}
</style>