<template>
	<div class="seccion">
		<div class="contenedor">
			<span>
				<input type="text" class="buscar" :placeholder="'Buscar por '+`${opcion==0 ? 'Categoria': 'Prosker'}`" v-model="busqueda" @keypress="mostrar=true">
				<i class="material-icons">search</i>
			</span>
			<span>
				<label for="uno">
					<input type="radio" name="opcion" value="0" v-model="opcion" :checked="opcion==0 ? true : false" @change="cambiarLista(0)" >
					Categoría
				</label>
				<label for="Dos">
					<input type="radio" name="opcion" value="1" v-model="opcion"  @change="cambiarLista(1)" @keypress="mostrar=true">
					Prosker
				</label>
			</span>
			<div class="contenedorLista" v-if="!proskers.cargando && listaFiltrada.length>0 && mostrar">
				<ul>
					<li v-for="(p,index) in listaFiltrada" :key="index" @click="seleccion(p)">
						{{p.nombre.toLowerCase()}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'buscar',
	data() {
		return {
			opcion: 0,
			busqueda: "",
			mostrar: true
		}
	},
	created() {
		
	},
	computed: {
		proskers(){
			return this.$store.state.proskers
		},
		categorias(){
			return this.$store.state.categorias
		},		
		listaFiltrada(){
			if (this.busqueda) {
				return this.lista.filter((item) => item.nombre.toLowerCase().includes(this.busqueda.toLowerCase()))
			}else {
				return []
			}
			
		},
		lista:{
			get: function(){
				if (this.opcion===0) {
					return this.categorias.datos
				}else{
					return this.proskers.datos
				}

			},
			set: function(newValue){
				if (this.opcion===0) {
					return this.categorias.datos
				}else{
					return this.proskers.datos
				}				
			}
		}
		
		// lista(){
		// 	if (this.opcion===0) {
		// 		return this.categorias.datos
		// 	}else{
		// 		return this.proskers.datos
		// 	}
		// }
	},
	methods: {
		cambiarLista(nro){
			this.busqueda=''
			if (nro===0) {
				this.lista=this.categorias.datos
				console.log('categorias')
			}else{
				this.lista=this.proskers.datos
				console.log('prosker')
			}
		
		},
		seleccion(opc){
			this.mostrar=false
			this.busqueda=opc.nombre.toLowerCase()
			if (this.opcion===0) {
				this.$emit('opcion',{tipo:'Categorias',datos:opc})
			}else{
				this.$emit('opcion',{tipo:'Proskers',datos:opc})
			}
		},
	},
}
</script>
<style scoped>
	.seccion{
		/* position: absolute;
		left: 50%; */
		width: 450px;
		margin: auto;
		
	}
	.contenedor{
	 position: absolute;

	}
	i{
		color: var(--d-color);
		font-size: 2em;
	}

	span{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.buscar{
		margin: 5px;
		padding: 0 20px;
		min-width: 400px;
		height: 40px;
		border-radius: 20px;
		/* border: 1px solid var(--a-color); */
		border: none;
		outline: none;
		text-transform: capitalize;
	}
/* 
	.buscar:focus{
		border-radius: 20px 20px 0 0;

	} */

	label{
		color: var(--d-color);
		margin-right: 10px
	}
	
	input[type='radio']:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: var(--d-color);
        content: '';
        display: inline-block;
        visibility: visible;
        border: 1px solid white;
    }

    input[type='radio']:checked:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: var(--a-color);
        content: '';
        display: inline-block;
        visibility: visible;
        border: 1px solid white;
    }


	.contenedorLista{
		min-width: 400px;
		max-width: 440px;
		max-height: 150px;
		overflow-y: scroll;
		background-color: #fff;
		border-radius: 10px;
		/* margin: auto; */
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	ul{
		list-style-type: none;
		text-align: left;
		padding-left: 5px;
	}
	li{
		padding: 3px 10px;
		cursor: pointer;
		text-transform: capitalize;
		/* border-bottom: 1px solid var(--d-color); */
	}

</style>