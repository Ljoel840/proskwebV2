<template>
	<section>
		<div class="fondoTitulo">
			<span class="busqueda">
				<buscar/>
			</span>
		</div>
		<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<barra v-if="cargandoProsker"/>
		<div class="contenedorPrincipal" v-if="!cargandoProsker&&datos.length>0">
			<div class="contenedorUsuario">
				<div class="foto" :style="{ backgroundImage: 'url(' + datos[0].foto + ')' }"></div>
				<div class="datos">
					<h2>{{datos[0].nombre}}</h2>
					<h3>{{datos[0].pais}}</h3>
				</div>
			</div>
			<div class="contenedorPublicacion">
				<div class="publicacion">
					<img :src="data.imagen" alt="publicacion prosk">
				</div>
				<div class="descripcion">
					<h3>{{data.categoria}}</h3>
					<h4>{{data.descripcion}}</h4>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import extraer from '../prosker/extraerProsker'
export default {
	name: 'publicacion',
	props:{
		data: {
			type: Object
		}

	},
	components: {
		barra: () => import('@/components/barra'),
		buscar: () => import('@/components/buscar')
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
					idEnc: this.data.idEncUsuario,
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
		height: auto;
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
		height: 200px;
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
		margin-top: 140px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
	}
	.contenedorPrincipal{
		width: 50%;
		margin: auto;
		margin-bottom: 3em;
	}
	.contenedorUsuario{
		display: flex;
		justify-content: flex-start;
		padding: 10px 0;
	}

	.foto{
		position: relative;
		width: 80px;
		height: 80px;
		border-radius: 100px;
		border: 3px solid var(--a-color);
		background-color: var(--b-color);
		background-size: 100px auto ;
		background-position: center;
		background-repeat: no-repeat;

	}

	.datos{
		padding-left: 30px;
	}

	.publicacion{
		width: 100%;
		height: 400px;
		background-color: var(--d-color);
		text-align: center;
	}
	.publicacion img{
		height: 100%;
		width: auto;
		
	}

	.descripcion{
		width: auto;
	}
</style>