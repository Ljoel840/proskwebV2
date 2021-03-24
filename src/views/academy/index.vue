<template>
	<section>
		<div class="fondoTitulo">
			<h1>Prosk Academy</h1>
			<h3>Aprende a ser más eficiente en Prosk</h3>
		</div>
		<div class="contenedorPrincipal">
		<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<barra v-if="academy.cargando"/>
		<div class="contenedor" v-if="!academy.cargando">
			<h2 class="noDatos" v-if="academy.datos.length<=0">No hay Datos</h2>
			<div class="media" v-if="academy.datos.length>0">
				<h4>{{academy.datos[posicion].VideoPostTitle}}</h4>
				<!-- <iframe class="tipo" width="100%" :height="`${alto}'px'`" :src="academy.datos[posicion].VideoPostUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-if="academy.datos[posicion].VideoPostType===1"></iframe> -->
				<iframe class="tipo" width="100%" :height="`${alto}'px'`" :src="cambiarUrl(academy.datos[posicion].VideoPostUrl)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-if="academy.datos[posicion].VideoPostType===1"></iframe>
				<video class="tipo" width="560" height="315" :src="academy.datos[posicion].VideoPostUrl" v-else controls >
				</video>
				<div class="navegacion">
					<div class="div1">
						<button v-if="posicion>0" @click="posicion=posicion-1; cambiarTitulo()"><i class="material-icons">arrow_back_ios_new</i>{{academy.datos[posicion-1].VideoPostTitle}}</button>
					</div>
					<div class="div2">
						<button v-if="posicion<academy.datos.length-1" @click="posicion=posicion+1; cambiarTitulo()">{{academy.datos[posicion+1].VideoPostTitle}}<i class="material-icons">arrow_forward_ios</i></button>
					</div>
				</div>
			</div>
			<div class="contenedorVideos" v-if="academy.datos.length>0">
				<div class="_videos" v-for="(d,index) in academy.datos" :key="index" :class="posicion===index ? 'fondoColor' : null" @click="posicion=index; cambiarTitulo()">
					<span class="color" >{{index+1}}</span>
					<h3 :style="posicion===index ? 'color: #ffffff' : null">{{d.VideoPostTitle}}</h3>
				</div>
			</div>
		</div>
		</div>
	</section>
</template>
<script>
import datos from './datos2'
export default {
	name: 'academy',
	props:{
		data:{
			type: String,
			default: null
		},

	},
	components: {
        barra: () => import('@/components/barra')
    },
	data() {
		return {
			mostrar: false,
			datos,
			posicion: 0,
			rutaEmbed: 'https://www.youtube.com/embed/',
			titulo: this.$route.params.titleAcademy
		}
	},
	created() {
		if (this.academy.cargando){
			this.$store.commit('cargarVideosAcademy')
		}
		this.titulo = this.quitarGuiones(this.titulo)
		for (let index = 0; index < this.academy.datos.length; index++) {
			if (this.academy.datos[index].VideoPostTitle.toLowerCase().includes(this.titulo)){
				this.posicion = index
			}
					
		}
		
		for (let index = 0; index < array.length; index++) {
			
		}
		
	},
	computed: {
		ancho(){
			return this.$store.state.ancho
		},
		alto(){
			return this.ancho*(this.ancho>1000 ? 0.7 : 0.9)*0.56
		},
		anterior(){
			return this.posicion>0 ? this.posicion-- : 0
		},
		siguiente(){
			return this.posicion<this.academy.datos.length ? this.posicion++ : 0
		},
		academy(){
			return this.$store.state.academy
		}
	},

	methods: {
		cambiarUrl(url){
			return this.rutaEmbed+url.slice(url.indexOf('watch?v=')+8)
		},
		cambiarTitulo(){
			let titleAcademy= '' 
			titleAcademy = this.quitarEspacios(this.academy.datos[this.posicion].VideoPostTitle)
			this.$router.push({
				name: 'Academy', 
				params: {titleAcademy}
			}).catch(() => {})
			
		},
		quitarEspacios(nombre){
			return nombre.replace(/ /g, "-").toLowerCase()
		},
		quitarGuiones(nombre){
			return nombre.replace(/-/g, " ").toLowerCase()
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
	h3{
		margin-top: .5em;
		font-size: 1.5em;
		color: var(--d-color);
		font-weight: 800;
		text-align: center;
	}
	h4{
		padding: .5em 0;
		font-size: 1.5em;
		color: var(--c-color);
		font-weight: 900;
		text-align: left;

	}
	.noDatos{
		margin-top: .5em;
		font-size: 2em;
		color: var(--a-color);
		font-weight: 800;
		text-align: center;
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
		background-color: var(--d-color);
		margin-top: 120px;
	}
	.contenedor {
		width: 100%;
		/* margin: 2em auto; */
		padding: 2em 0;
		/* column-count: 2;
        column-gap: 2em; */
		/* display: flex;
		justify-content: center;	
		flex-wrap: wrap;	 */
		
	}
	.media{
		width: 70%;
		text-align: center;
		margin: auto;
	
	}

	.navegacion{
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }

	.div1{
		display: flex;
		justify-content: flex-start;
	}
	.div2{
		display: flex;
		justify-content: flex-end;
	}

	.navegacion button{
		background-color: var(--b-color);
		color: #ffffff;
		display: flex;
		align-items: center;
		border: none;
		outline: none;
		padding: 5px;
		font-family: sans-serif;
		cursor: pointer;
		margin: 2px;
	}

	.contenedorVideos{
		width: 70%;
		margin: 2em auto;
		padding: 1em 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		background: var(--c-color);
		
	}
	._videos{
		border: 2px solid var(--a-color);
		width: 45%;
		min-height: 60px;
		margin: 5px;
		padding: 5px 10px;
		background: var(--d-color);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-radius: 7px;
		box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.7);

	}
	.contenedorVideos h3{
		color: #ffffff;
		width: 90%;
		text-align: justify;
		/* padding: 20px ; */
		font-size: 1em;
		font-weight: 400;
		color: #000;
		font-family: sans-serif;
		margin: 0 ;
	}

	.fondoColor{
		background: var(--b-color);
		box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2);
	}

	span.color {
		background: #CC9933;
		border-radius: 1em;
		-moz-border-radius: 1em;
		-webkit-border-radius: 1em;
		color: #ffffff;
		display: inline-block;
		font-weight: bold;
		line-height: 2em;
		margin-right: 15px;
		text-align: center;
		font-size: 1.2em;
		font-family: sans-serif;
		width: 2em;
		height: 2em; 
	}

	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 230px;
		}
		.contenedorPrincipal{
			margin-top: 175px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: -5px;
		}
		.media, .contenedorVideos{
			width: 90%;
		}
	}
	@media (max-width: 780px) {
		._videos{
			width: 95%;
		}
		.contenedorVideos h3{
			font-size: .8em;
		}
	}

</style>