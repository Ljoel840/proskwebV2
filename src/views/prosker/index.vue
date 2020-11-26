<template>
	<section>
		<img src="@/assets/img/proskers.jpg" alt="Proskers" class="proskers">
		<barra v-if="cargandoProsker"/>
		<div class="contenedorPrincipal" v-if="!cargandoProsker&&datos.length>0">
			<div class="foto" :style="{ backgroundImage: 'url(' + datos[0].foto + ')' }"></div>
			<div class="datos">
				<h2>{{datos[0].nombre}}</h2>
				<h3>{{datos[0].pais}}</h3>
				<h3>Prosk: {{datos[0].prosk}}</h3>
				<h3>Seguidores: {{datos[0].seguidores}}</h3>
			</div>
		</div>
	</section>
</template>
<script>
import extraer from './extraerProsker'
export default {
	name: 'prosker',
	props:{
		data: {
			type: String
		}

	},
	components: {
		barra: () => import('@/components/barra'),
	},
	data() {
		return {
			datos: [],
			cargandoProsker: true,
			error: null
		}
	},

	created() {
		this.extraerDatos()
	},
	methods: {
		async extraerDatos(){
			try {
                this.error = null
                this.cargandoProsker = true
                this.datos=await extraer ({
					idEnc: this.data,
                })
				this.cargandoProsker = true
            }
            catch (error) {
				this.error = error
				console.log(this.error)
            }
			this.cargandoProsker = false
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

	.foto{
		position: absolute;
		width: 200px;
		height: 200px;
		margin-top: -40px;
		margin-left: 10vw;
		border-radius: 100px;
		border: 3px solid var(--a-color);
		background-color: var(--b-color);
		background-size: 220px auto ;
		background-position: center;
		background-repeat: no-repeat;

	}
	.datos {
		margin-left: 30vw;
	}
</style>