<template>
	<section>
		<div class="tituloCategoria">
			<span class="busqueda">
				<buscar/>
			</span>
			<h1>{{data.nombre}}</h1>
		</div>
		<span class="subcategorias">
			<button :class="opc===null ? 'botonActivo' : null" @click="filtrarSubcategoria(null)">TODOS</button>
			<button v-for="(d,index) in data.subcategoria" :key="index" :class="index == opc ? 'botonActivo' : null" @click="filtrarSubcategoria(index)">{{d.nombre}}</button>
		</span>
	</section>
</template>
<script>
export default {
	name:'mostrarCategorias',
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
			error: null,
			opc: null,
		}
	},
	created() {
		console.log('çategorias:',this.data)
	},
	methods: {
		filtrarSubcategoria(id){
			this.opc = id
		}
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		min-height: 85vh;
	}
	h1{
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		margin-top: 1em;
	}
	.tituloCategoria{
		width: 100%;
		height: 200px;

		background-color: var(--a-color);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.busqueda {
		width: 100%;
		padding: 1em 0;
		
	}
	.subcategorias {
		width: 50%;
		margin: auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	button{
		background-color: var(--c-color);
		color: var(--e-color);
		padding: 10px;
		margin: 5px;
		border: none;
		/* border-radius: 7px; */
		outline: none;
	}

	

</style>