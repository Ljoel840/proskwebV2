<template>
	<article class="home">
		<!-- <img alt="imagen Home" src="@/assets/img/homeprosk.jpg"> -->
		<div class="fondo">
			<buscar @opcion="seleccion($event)"/>
		</div>
		<publicaciones />
		<categorias />
	</article>
</template>

<script>

export default {
  name: 'Home',
  components: {
		publicaciones: () => import('@/components/publicaciones'),
		categorias: () => import('@/components/categorias'),
		buscar: () => import('@/components/buscar')

  },
  data() {
		return {
			
		}
  },
  methods: {
		seleccion(opc){
			if (opc.tipo==='Categorias') {
				this.ir("Mostrar Categorias",opc.datos)
			}else{
				this.ir("Prosker",opc.datos)

			}
		},
		ir(pag,data){
			this.$router.push({
				name: pag, 
				params: {data}
			}).catch(() => {})
		}
  },

}
</script>
<style scoped>
	article{
		width: 100%;
		text-align: center;

	}
	img{
		width: 100%;
		height: auto;
	}
	.fondo{
		width: 100%;
		height: 50vh;
		background-image: url("./homeprosk.jpg");
		background-size: 100% auto;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;

	}

</style>