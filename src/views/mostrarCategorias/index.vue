<template>
	<section>
		<div class="fondoTitulo">
		</div>
			<div class="busqueda">
				<buscar  @opcion="seleccion($event)"/>
			<h1>{{data.nombre}}</h1>
			</div>
		<div class="cortina" v-if="mostrarMapa" @click="mostrarMapa=false"></div>
		<mapa :latitude="miPosicion.posicion.coords.latitude" :longitude="miPosicion.posicion.coords.longitude" :title="miPosicion.titulo" @cerrar="mostrarMapa=false" :marcadores="marcadores" v-if="mostrarMapa"/>
		<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<span class="subcategorias">
			<button :class="opc===null ? 'botonActivo' : null" @click="filtrarSubcategoria(null)">TODOS</button>
			<button v-for="(d,index) in data.subcategoria" :key="index" :class="index == opc ? 'botonActivo' : null" @click="filtrarSubcategoria(index)">{{d.nombre}}</button>
		</span>
		<span class="contenedor">
			<span class="ubicacion">
				<button @click="mostrarMapa=true">
					<img src="@/assets/img/i_ubicacion.png" alt="icono ubicacion">
				</button>
			</span>
			<barra v-if="cargandoBusqueda" />
			<publicacion v-for="(d,index) in busqueda.datos" :key="index" :d="d"/>
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
		buscar: () => import('@/components/buscar'),
		publicacion: () => import('@/components/publicaciones/publicacion'),
		mapa: () => import('@/components/googleMap')
	},
	data() {
		return {
			datos: [],
			error: null,
			opc: null,
			publicaciones: [],
			fin: '',
			cargandoBusqueda: false,
			mostrarMapa: false,
			subcategoria: ''
			
		}
	},
	created() {
		this.dataUsuario = this.data.idEnc
		this.$store.commit('limpiarBusqueda')
		this.extraer(this.dataUsuario,"","")
	},
	computed: {
		busqueda(){
			return this.$store.state.busqueda
		},
		marcadores(){
			return this.$store.state.marcadores
		},
		miPosicion(){
			return this.$store.state.miPosicion
		}
	

	},
	methods: {
		filtrarSubcategoria(id){
			this.opc = id
			this.$store.commit('limpiarBusqueda')
			if (!id) {
				this.subcategoria = ''
			}else{
				this.subcategoria= this.data.subcategoria[id].idEnc
			}
			this.extraer(this.dataUsuario,this.subcategoria,"")
		},
		async extraer(idCat,idSub,inicio){
			try {
				this.cargandoBusqueda = true
				this.datos = await extraer({
					idCatEnc:  idCat,
  					idSubCatEnc: idSub,
  					inicioEnc: inicio, 
				})
				this.$store.commit('cargarBusqueda',this.datos)
				this.cargandoBusqueda = false

			} catch (error) {
				this.error = error
			}
		},
		cargarMas(){
			this.extraer(this.dataUsuario,this.subcategoria,this.busqueda.idFin)
		},

		ir(pag,data){
			this.$router.push({
				name: pag, 
				params: {data}
			}).catch(() => {})
		},
		seleccion(opc){
			if (opc.tipo==='Categorias') {
				this.dataUsuario = opc.datos.idEnc
				this.$store.commit('limpiarBusqueda')
				this.extraer(this.dataUsuario,"","")
			}else{
				this.ir("Prosker",opc.datos.idEnc)

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
	h1{
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		margin-top: 1em;
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
		margin-top: -40px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
	}
	.busqueda {
		width: 100%;
		padding: 2em 0;
		
	}
	.busqueda h1{
		text-align: center;
		margin-top: 80px;
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
	.ubicacion {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.ubicacion button{
		background-color: transparent;
		width: 50px;
		height: 50px;
		color: var(--a-color);
		margin-right: 50px;
		cursor: pointer;

	}
	.ubicacion button:hover img {
		filter: grayscale(100%);
	}
	.ubicacion img{
		width: 40px;
		height: 40px;
	}
	.cortina{
		min-width: 100%;
		min-height: 100%;
		background-color: rgba(0, 0, 0, .7);
	}
	@media (max-width: 1000px) {
		.busqueda{
			margin-top: 60px;
		}
		/* .fondoTitulo{
			height: 120px;
		} */
	}
	@media (max-width: 600px) {
		.busqueda h1{
			font-size: 2em
		}
		.fondoTitulo{
			height: 180px;
		}
	}

</style>