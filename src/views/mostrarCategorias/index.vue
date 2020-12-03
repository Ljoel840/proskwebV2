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
		<span class="contenedor">
			<div v-for="(b,index) in busqueda.datos" :key="index" class="dPublicaciones">
				<div class="fondo" :style="{ backgroundImage: 'url(' + b.imagen + ')' }" @click="ir('Publicacion',b)">
					<span class="descripcion">{{b.descripcion}}</span>	
				</div>
				<span class="prosker">
					<div class="foto" :style="{ backgroundImage: 'url(' + b.foto + ')' }" @click="ir('Prosker',b.idEncUsuario)" ></div>
					<p class="categoria">{{b.categoria.toLowerCase()}}</p>
					<span>
						<i class="material-icons">favorite</i>
						<p>{{b.like}}</p>
					</span>
				</span>
				<br>
				<barra v-if="busqueda.cargando" />
			</div>
		</span>
		<span class="contenedorBoton" v-if="!busqueda.cargando&&busqueda.hayMas">
			<button class="verMas" @click="cargarMas()"><i class="material-icons">expand_more</i></button>
		</span>
	</section>
</template>
<script>
import extraer from './extraerPublicaciones'
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
			error: null,
			opc: null,
			publicaciones: [],
			fin: '',
		}
	},
	created() {
		this.$store.commit('limpiarBusqueda')
		this.extraer(this.data.idEnc,"","")
	},
	computed: {
		busqueda(){
			return this.$store.state.busqueda
		}
	},
	methods: {
		filtrarSubcategoria(id){
			this.opc = id
		},
		async extraer(idCat,idSub,inicio){
			try {
				this.datos = await extraer({
					idCatEnc:  idCat,
  					idSubCatEnc: idSub,
  					inicioEnc: inicio, 
				})
				this.$store.commit('cargarBusqueda',this.datos)


			} catch (error) {
				this.error = error
			}
		},
		cargarMas(){
			this.extraer(this.data.idEnc,"",this.busqueda.idFin)
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
		padding: 0 5px;
	}

	.contenedorBoton{
		width: 80%;
		text-align: center;
		display: flex;
		justify-content: center;
		margin: 0 auto 2em;
	}
	.verMas{
		width: 100%;
		background-color: var(--d-color);
		color: var(--a-color);
		padding: 0;
		cursor: pointer;
	}

	.verMas:hover{
		background-color: var(--b-color);
	}

	.verMas:hover i{ 
		color: #fff;
	}

	.verMas:active{
		background-color: var(--c-color);
	}


	.verMas i{
		font-size: 3em;
	}

</style>