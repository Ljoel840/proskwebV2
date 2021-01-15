<template>
	<section>
		<div class="fondoTitulo">
			<!-- <h1>Blog</h1>
			<h3>Aprende a ser más eficiente en Prosk</h3> -->
		</div>
		<div class="contenedorPrincipal">
				<img :src="data.BlogPostHeaderImage" alt="Blog" class="fondoBlog">
				<div class="titulos">
					<h1>{{data.BlogPostTitle}}</h1>
					<h3>{{cambiarFecha(data.BlogPostDatePublished)}}</h3>
				<button v-for="(b,index) in data.BlogPostTags" :key="index" class="tags" @click="ir('Blog',b.BlogTagId)">{{b.BlogTagName}}</button>
				</div>
			<div class="flag">
			</div>
			<div class="contenedor">
				<!-- <img class="imgBlog" :src="data.imagen.url"> -->
				<p class="textoBlog" v-html="data.BlogPostContent"></p>
			</div>
			<h2>Otros temas que pueden interesarte</h2>
			<button v-for="c in blogCategorias.datos" :key="c.idEnc" class="categorias"  @click="ir('Categoria Blog',c)">{{c.BlogCategoryName}}</button>
		</div>
	</section>
</template>
<script>
export default {
	name: 'detalleBlog',
	props:{
		data: {
			type: Object
		}
	},
	data() {
		return {
			error: null,
			cargandoBlog: false,
			options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12:"false" }
		}
	},
	created() {
		window.scrollTo(0, 0)
	},
	computed: {
		blogTags(){
			return this.$store.state.blogTags
		},
		blogCategorias(){
			return this.$store.state.blogCategorias
		},
	},
	methods: {
		cambiarFecha(fecha2){
			let fecha = new Date(fecha2);
			return fecha.toLocaleDateString('es-ES',this.options);
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
		min-height: 45vh;
		
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
	}
	.fondoTitulo{
		width: 100%;
		height: 100px;
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
		margin-top: -60px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
	}
	.contenedorPrincipal{
		width: 100%;
		background-color: var(--d-color);
		/* margin-top: 100px; */
		text-align: center;
		padding-bottom: 3em ;
	}
	.contenedor {
		width: 95%;
		max-width: 900px;
		margin: 2em auto 0 ;
		padding: 2em 0 4em;
		
		/* column-count: 2;
        column-gap: 2em; */
		/* display: flex;
		justify-content: space-around;	 */
		text-align: justify;	
	}
	.fechaBlog  {
		padding: 10px 0;
		margin: 0;
		color: #a8a8a8
	}

	.tituloBlog{
		color: var(--a-color);
	}
	.textoBlog  {
		padding: 5px 0;
		line-height: 1.5;
	}

	.imgBlog {
		width: 100%;
		height: 200px;
		margin: 5px;
		border: 2px solid var(--d-color);
		border-radius: 7px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		object-fit: fill;
		cursor: pointer;
	}
	.blogs {
		width: 100%;
		max-width: 450px;
	}

	.blogs button{
		float: right;
		width: 100px;
		padding: 10px;
	}

	.imgBlog:hover{
		opacity: .5;
		text-decoration: none;
	}
	.fondoBlog{
		width: 100%;
		max-width: 900px;

		height: 300px;
		object-fit: cover;
		margin: auto;
		
	}


	.flag{
		width: 100%;
		height: 50px;
		box-sizing: content-box;
		/* padding-top: 15px; */
		position: relative;
		background: transparent;
		color: white;
		font-size: 11px;
		letter-spacing: 0.2em;
		text-align: center;
		text-transform: uppercase;
		margin-top: -53px;
	}
	.flag:after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 0;
		border-top: 60px solid transparent;
		border-left: 50vw solid var(--d-color);
		border-right: 50vw solid var(--d-color);
    }
	.contenedorPrincipal .titulos{
		width: 50%;
		position: absolute;
		margin: auto;
		margin-top: -200px;
		z-index: 10000;
		color: #fff;
		text-align: center;
		left: 50vw;
		margin-left: -25vw;
	}
	.titulos h1,h3{
		margin: 0;
		color: var(--d-color);
		text-shadow: 0 0 7px rgb(97, 97, 97)
	}
	.tags{
		background-color: var(--f-color);
		color: var(--e-color);
		padding: 7px 10px;
		margin: 2px;
		border: none;
		outline: none;
		cursor: pointer;
		border-radius: 7px;
		font-size: .6em;
	}
	.categorias{
		background-color: var(--h-color);
		color: var(--e-color);
		padding: 10px;
		margin: 3px;
		border: none;
		outline: none;
		border-radius: 7px;
		cursor: pointer;
		text-transform: uppercase;
	}

	@media (max-width: 700px) {
		.contenedorPrincipal .titulos{
			width: 90%;
			left: 50vw;
			margin-left: -45vw;
			margin-top: -200px;
		}
		.titulos h1{
			font-size: 2em;
		}
		.titulos h3{
			font-size: 1.4em;
		}
	}

</style>