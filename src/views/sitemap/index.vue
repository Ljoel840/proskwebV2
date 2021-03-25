<template>

	<div>
		<div>
			<button  @click="createSitemap()">Crear sitemap</button>
		</div>
	</div>


</template>

<script>
export default{
    name: 'AlgorithmAdmin',  
	
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
                        
            var staticSites = [ '','publicacion', 'categorias', 'quienes','prensa','registro','blog'];
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
				loc.innerHTML = 'https://prosk.org/#/' + nombreProsker;
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
        
   }
}
</script>