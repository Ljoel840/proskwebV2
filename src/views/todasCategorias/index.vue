<template>
	<section>
		<div class="fondoTitulo">
			<h1>Categorias</h1>
		</div>
			<div class="busqueda">
				<buscar @opcion="seleccion($event)"/>
			</div>
		<div class="contenedorPrincipal">
			<img src="@/assets/img/separador2.png" alt="separador" class="separador">
			<div class="contenedorCategorias">
				<div class="dcategorias" v-for="d in datosCategorias.datos" :key="d.idEnc" @click="ir('Mostrar Categorias',d)">
					<img class="imagen" :src="d.icon" alt="imagenes categorias">
					<span class="tooltiptext">{{d.nombre | capitalize}}</span>
				</div>
			</div>

		</div>

	</section>
</template>
<script>
export default {
	name: 'todasCategorias',
	components: {
		buscar: () => import('@/components/buscar'),

	},
	data() {
		return {
			ultimo: 12,
			imagenDefault: require('@/assets/img/usuario.png')
		}
	},
	filters: {
		capitalize(value) {
			if (!value) return ''
			value = value.toString().toLowerCase()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	computed: {
		datosCategorias () {
			return this.$store.state.categorias
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
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		/* min-height: 85vh; */
		
	}
	h1{
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		margin-top: 1.5em;
	}
	h2{
		margin-top: 1.5em;
		font-size: 2em;
	}
	h3{
		margin-top: .5em;
		font-size: 1.5em;
		color: var(--d-color);
		font-weight: 800;
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
	}
	.separador{
		margin-top: -20px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
	}
	.contenedorPrincipal{
		width: 100%;
		background-color: var(--e-color);
		margin-top: -1px;
	}

	.contenedorCategorias {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}


	.busqueda {
		width: 100%;
		min-height: 50px;
		margin: 100px 0 0 0;
		background-color: var(--a-color);
	}

	.dcategorias {
		width: 100px;
		height: auto;
		max-width: 100px;
		max-height: 100px;
		min-width: 100px;
		/* margin: 10px; */
		text-align: center;
		display: grid;
		grid-template-rows: auto;
		justify-items: center;
		cursor: pointer;
		margin: 20px 10px;

	}

	.imagen{
		width: 100px !important;
		height: 100px !important;
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
	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 230px;
		}
		.contenedorPrincipal{
			margin-top: 30px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: -5px;
		}
		.busqueda {
			min-height: 50px;
			margin: 150px 0 0 0px;
		}
		/* .busqueda *{
			margin-left: 15% ;
		} */
	}

	@media (max-width: 500px) {
		.busqueda {
			min-height: 50px;
			margin: 150px 0 0 40px;
		}
	}


</style>