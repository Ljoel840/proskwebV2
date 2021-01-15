<template>
	<aside>
		<div class="titulo">
			<p>Proskers: {{proskers.cantidad}} </p>
		</div>
		<div class="proskers">
			<ul>
				<li v-for="(p,index) in proskers.datos" :key="index" @click="ir('Prosker',p.idEnc)">
					<img src="@/assets/img/usuario.png" alt="icono usuario" v-if="!p.UserPhotoImageUrl"  >
					<img :src="p.UserPhotoImageUrl" alt="icono usuario" @error="replaceByDefault" v-else>
					<div>
						<h4>{{p.nombre.toLowerCase()}}	</h4>
						<p v-if="p.Categories.length>0">{{p.Categories[0].WorkFieldName.toLowerCase()}} {{p.Categories.length>1 ? '...':null}}</p>

					</div>
				</li>
			</ul>
		</div>
	</aside>
</template>
<script>
export default {
	name: 'mostrarProskers',

	computed: {
		proskers(){
			return this.$store.state.proskers
		},

	},
	methods: {
		replaceByDefault(e){
			e.target.src = require('../../assets/img/usuario.png')
		},
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
	aside{
		width: 300px;
		height: auto;
		background-color: var(--e-color);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.titulo{
		color: var(--e-color);
		background-color: var(--a-color) ;
		min-width: 100%;
	}
	.titulo p{
		margin: 0 10px;
	}
	.proskers{
		width: 100%;
		height: 250px;
		overflow-y: scroll;
	}
	ul{
		list-style-type: none;
		text-align: left;
		padding-left: 5px;
	}
	li{
		padding: 3px 10px;
		text-transform: capitalize;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	li img{
		width: 30px;
		height: 30px;
		margin: 5px;
		border-radius: 15px;
		object-fit: cover;
	}
	li h4{
		font-size: .9em;
	}
	li p{
		font-size: .8em;
		color: var(--a-color)
	}
	

</style>