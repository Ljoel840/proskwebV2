<template>
	<section>
		<div class="contenedorPrincipal">
			<div class="contenedor1">
				<img src="@/assets/img/logowebprosk.png" alt="">
			</div>

			<div class="texto">
				<h1>texto1</h1>
				<h2>texto2</h2>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'contacto2'
}
</script>
<style scoped>

.contenedorPrincipal{
	width: 400px;
	height: 200px;
	border: 2px solid red;
	display:flex;
	

}
.contenedorPrincipal div{
	width: 200px;
}
.contenedor1{
	display: flex;
	align-items: center;
	justify-content: center;
}
.texto{
	display: flex;
	align-items: center; /* justificación vertical */
	justify-content: center; /* justificación horizontal */
	flex-wrap: wrap;  /* Lineal o Multilineas */
	text-align: center;
}
.texto h1{
	width: 100%;
}
.contenedor1 img{
	width: 100%;
}

</style>