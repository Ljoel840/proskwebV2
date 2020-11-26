<template>
	<section>
		<h1>CATEGORIAS</h1>
		<div class="cargando" v-if="datosCategorias.cargando">
			<spinner-circular  v-if="datosCategorias.cargando"/>
		</div>
		<span class="contenedor" v-if="!datosCategorias.cargando">
			<!-- <div v-for="index in 10" :key="index" class="dcategorias">
				<img class="imagen" :src="datosCategorias.datos[index].icon" alt="imagenes categorias">
				<span>
					<a href="#" class="categorias">
						{{datosCategorias.datos[index].nombre.toLowerCase()}}
					</a>
					</span>	
			</div> -->
			<slider :datos="datosCategorias.datos" />
		</span>
	</section>
</template>
<script>
// import Slider from './slider.vue'
import extraer from './extraerCategorias'
export default {
	name: 'categorias',
	components: {
		spinnerCircular: () => import('@/components/spinnerCircular'),
		slider: () => import('@/components/sliderCategorias')
	},
	data() {
		return {
			cargando:true,
			error: null,
			datos: [],
			// datosCategorias: []
		}
	},
	// async created () {
	// 	try {
	// 		this.datosCategorias = await extraer()
	// 		this.cargando = false
	// 	}
	// 	catch (error) {
	// 		this.error = error
	// 	}
	// 	this.cargando = false
	// },
	computed: {
		datosCategorias () {
			return this.$store.state.categorias
		},
		rout () {
			return this.$route
		},

	},
	// created() {
	// 	extraer(this)
	// },
	// computed: {
	// 	datoscategorias () {
	// 		return this.$store.state.categorias
	// 	}
	// },
}
</script>
<style scoped>
	section{
		width: 100%;
		text-align: center;
		margin: 3em 0;
		background-color: var(--d-color);
	}
	h1{
		font-size: 1.5em;
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
	.dcategorias {
		width: 120px;
		height: auto;
		max-width: 120px;
		max-height: 120px;
		min-width: 100px;
		margin: 10px;
		text-align: center;
		display: grid;
		grid-template-rows: auto;
		justify-items: center;

	}

	.imagen{
		width: 80px !important;
		height: 80px !important;
	}
	.dcategoria span{
		width: 100%;
		text-align: center;
	}

	.categorias{
		text-align: center;
		text-transform: capitalize;
		text-decoration: none;
		color: var(--a-color);
	}

	i{
		color: var(--a-color);
	}
</style>