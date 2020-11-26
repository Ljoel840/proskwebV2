<template>
	<article class="home">
		<!-- <img alt="imagen Home" src="@/assets/img/homeprosk.jpg"> -->
		<div class="fondo">
			<buscar/>
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