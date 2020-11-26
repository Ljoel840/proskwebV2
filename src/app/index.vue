<template>
	<div id="app">
		<div class="cargando" v-if="datosPublicaciones.cargando && datosCategorias.cargando">
			<spinner-circular  v-if="datosPublicaciones.cargando && datosCategorias.cargando"/>
		</div>

		<menupc	v-if="(ancho>max) && !datosPublicaciones.cargando && !datosCategorias.cargando" />
		<!-- <menucel v-if="(ancho<=max)"/> -->
		<router-view v-if="!datosPublicaciones.cargando && !datosCategorias.cargando"/>
		<p_footer v-if="!datosPublicaciones.cargando && !datosCategorias.cargando"/>
	</div>
</template>
<script>
import p_footer from "./p_footer.vue"
import menupc from "./menupc.vue"

export default {
	components: {
		p_footer,
		menupc,
		spinnerCircular: () => import('@/components/spinnerCircular'),
	},
	data() {
		return {
			max: 600,
		}
	},
	computed:{
		ancho(){
			return this.$store.state.ancho
		},
		datosPublicaciones () {
			return this.$store.state.publicaciones
		},
		datosCategorias () {
			return this.$store.state.categorias
		},


	},
}
</script>
<style scoped>
	#app{
		min-width: 100%;
		min-height: 100%;
	}
	.cargando {
		width: 100px;
		height: 50px;
		top: 50vh;
		left: 50%;
		margin: auto;
		margin-top: 45vh;
	}
</style>
