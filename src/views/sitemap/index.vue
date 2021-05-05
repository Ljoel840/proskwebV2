<template>
	<section>
		<div class="fondoTitulo">
			<h1>Mapa del Sitio</h1>
		</div>
			<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<div class="contenedorPrincipal">
			<ul>
				<li class="opciones">
					<a @click="ir('Home2')">Home</a>
				</li>
				<li class="subopciones">
					<a @click="ir('Prosker Recomendados')">Proskers Recomendados</a>
				</li>
				<li class="subopciones">
					<a @click="ir('Todas Categorias')">Categorías</a>
				</li>
				<li class="subopciones">
					<a  @click="ir('Mostrar Publicaciones')">Publicaciones</a>
				</li>
				<li class="opciones">
					<a @click="ir('Quienes Somos')">Quienes Somos</a>
				</li>
				<li class="subopciones">
					<a @click="ir('Funcionamiento')">Funcionamiento</a>
				</li>
				<li class="subopciones">
					<a @click="ir('Prensa')">Prensa</a>
				</li>
				<li class="opciones">
					<a @click="ir('Proskers')">Proskers</a>
				</li>
				<!-- <li class="subopciones">
					<a @click="ir('Mostrar Categorias')">Categorías</a>
				</li> -->
				<li class="opciones">
					<a @click="ir('Academy2')">Prosk Academy</a>
				</li>
				<li class="opciones">
					<a @click="ir('Blog')">Blog</a>
				</li>
				<!-- <li class="subopciones">
					<a  @click="ir('Categoria Blog')">Categoría Blog</a>
				</li> -->
				<li class="opciones">
					<a @click="ir('Contacto')">Contacto</a>
				</li>
				<li class="opciones">
					<a @click="ir('Registro')">Registro</a>
				</li>
			</ul>

				<!-- <button  @click="createSitemap()">Crear sitemap</button> -->
		
		</div>
	</section>
</template>

<script>
export default{
    name: 'sitemap',  
	
    data(){
        return{
           users: [],
           loadMoreUsers: true,
           projects:[],
           loadMoreProjects: true,
           entities: [],
           loadMoreEntities: true
        }
    },    

	created() {
		if (this.blog.datos.length<=0) {
			this.$store.commit('cargarBlog')
		}
	},
    computed: {
		proskers(){
			return this.$store.state.proskers
		},
		blog(){
			return this.$store.state.blog
		}
	},
	
    methods: {  
        createSitemap() {
            var doc = document.implementation.createDocument('', '', null);
            var urlset = doc.createElement("urlset");
            urlset.setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
            var url = ''; var changefreq = ''; var loc = '';
			var nombreProsker = ''; var tituloBlog = ''  
                        
            var staticSites = [ '','publicacion', 'publicaciones','recomendados', 'categorias', 'categoriasProsk','quienes','prensa','registro','blog', 'categoriaBlog','academy', 'funcionamiento','proskers','contacto','sitemap'];
            for (var i=0; i < staticSites.length; i++) {
                url = doc.createElement("url");
                loc = doc.createElement('loc');
                loc.innerHTML = 'https://prosk.org/#/' + staticSites[i];
                changefreq = doc.createElement("changefreq");
                changefreq.innerHTML = 'monthly';
                url.appendChild(loc);
                url.appendChild(changefreq);
                urlset.appendChild(url);
            } 

			for (var i=0; i < this.blog.datos.length; i++) {
				tituloBlog = this.quitarEspacios(this.blog.datos[i].BlogPostTitle)
				url = doc.createElement("url");
				loc = doc.createElement('loc');
				loc.innerHTML = 'https://prosk.org/#/' + tituloBlog;
				changefreq = doc.createElement("changefreq");
				changefreq.innerHTML = 'monthly';
				url.appendChild(loc);
				url.appendChild(changefreq);
				urlset.appendChild(url);
            }  

			for (var i=0; i < this.proskers.datos.length; i++) {
				nombreProsker = this.quitarEspacios(this.proskers.datos[i].nombre)
				url = doc.createElement("url");
				loc = doc.createElement('loc');
				loc.innerHTML = 'https://prosk.org/#/prosker/' + nombreProsker;
				changefreq = doc.createElement("changefreq");
				changefreq.innerHTML = 'monthly';
				url.appendChild(loc);
				url.appendChild(changefreq);
				urlset.appendChild(url);
            }            
            
            doc.appendChild(urlset);
            var oSerializer = new XMLSerializer();
            var xmltext = oSerializer.serializeToString(doc);
            xmltext = '<?xml version="1.0" encoding="UTF-8"?>' + xmltext;

			var pom = document.createElement('a');
            var filename = "sitemap.xml";
            var pom = document.createElement('a');
            var bb = new Blob([xmltext], {type: 'text/plain'});
            pom.setAttribute('href', window.URL.createObjectURL(bb));
            pom.setAttribute('download', filename);
            pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
            pom.draggable = true; 
            pom.classList.add('dragout');
            pom.click();
        },

        quitarEspacios(nombre){
			return nombre.replace(/ /g, "-").toLowerCase()
		},

		ir (pag,para) {
			let titleAcademy= ''
			if (this.ancho<1000) {
				this.mostrarMenu=false
			}
			if (pag==='Academy') {
				titleAcademy=this.quitarEspacios(this.academy.datos[0].VideoPostTitle)
			}
			this.$router.push({
				name: pag, 
				params: {para,titleAcademy}
			}).catch(() => {})
		},
		
   }
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
		
	}
	h4 {
		font-size: 1.2em;
		color: var(--c-color);
		font-weight: 400;
	}
	.fondoTitulo{
		width: 100%;
		height: 150px;
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
		margin-top: 60px;
		width: 100%;
		height: 50px;
		background-color: transparent;
		border: none;
	}
	.contenedorPrincipal{
		width: 100%;
		background-color: var(--e-color);
		margin: 3em auto;
		
		max-width: 800px;
	}
	.contenedor {
		width: 100%;
		padding: 2em 0;
		text-align: center;
	}
	.contenedor img{
		width: 70vw;
		height: auto
	}
	ul,li,a{
		text-decoration: none;
		list-style: none;
		color: var(--c-color);
		cursor: pointer;
	}
	.opciones{
		font-family: sans-serif;
		text-transform: uppercase;
		font-weight: 700;
		padding: 5px;
		margin-top: 10px;
		background-color: var(--d-color);
	}
	.subopciones{
		margin-left: 20px;
		font-weight: 500;
		padding: 5px;
	}
	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 180px;
		}
		.contenedorPrincipal{
			margin-top: 150px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: -5px;
		}
	}
	@media (max-width: 500px) {
		.contenedorPrincipal{
			margin-top: 150px;
		}
		.fondoTitulo h1{
			font-size: 2em;
		}

	}
</style>