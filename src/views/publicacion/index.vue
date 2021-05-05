<template>
	<section>
		<div class="fondoTitulo">
			<div class="busqueda">
				<buscar/>
			</div>
		</div>
		<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<barra v-if="cargandoProsker"/>
		<!-- <div class="contenedorPublicidad">
			<div class="pub1"> -->
				<div class="contenedorPrincipal" v-if="!cargandoProsker&&datos.length>0">
					<div class="contenedorUsuario" @click="ir('Prosker',datos[0].idEnc)">
						<div class="foto" :style="{ backgroundImage: 'url(' + data.foto + ')' }"></div>
						<div class="datos">
							<h2>{{data.nombre}}</h2>
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
			<!-- </div>
			<div class="pub2">
				<publicidad300x250 />
			</div>
		</div> -->
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
		buscar: () => import('@/components/buscar'),
		publicidad300x250: () => import('@/components/adsense/publicidad300x250'),
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
					idEnc: this.data.idEnc,
                })
				this.cargandoProsker = true
            }
            catch (error) {
				this.error = error
				console.log(this.error)
            }
			this.cargandoProsker = false
		},
		ir(pag,data){
			this.$router.push({
				name: pag, 
				params: {data}
			}).catch(() => {})
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
	.busqueda {
		width: 100%;
		padding: 2em 0;
		
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
	.contenedorPublicacion{
		width: 100%;
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
	.contenedorPublicidad {
		display: grid;
		grid-template-columns: 1fr 310px;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.pub1 { grid-area: 1 / 1 / 2 / 2; }
	.pub2 { grid-area: 1 / 2 / 2 / 3; }

	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 140px;
			padding-top: 20px ;
		}
		.contenedorPrincipal{
			margin-top: 50px;
			width: 100%;
			padding: 0 10px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: 160px;
		}
		.busqueda {
			min-height: 50px;
			margin: 3em 0 0 0;
		}
		.busqueda *{
			margin-left: 25% ;
		}
	}



	@media (max-width:600px) {
		.busqueda{
			margin-left: 15% ;
		}
		.publicacion{
			width:100%;
			height: auto;
		}
		.publicacion img{
			width:100%;
			height: auto;
		}

		.contenedorPublicidad {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 260px;
		}

	.pub1 { grid-area: 1 / 1 / 2 / 2; }
	.pub2 { grid-area: 2 / 1 / 3 / 2; }
		
	}
</style>