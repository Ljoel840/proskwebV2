<template>
	<section>
		<div class="fondoTitulo">
			<h1>Página No Existe</h1>
			
		</div>
		<div class="contenedorPrincipal">

			<img src="@/assets/img/separador2.png" alt="separador" class="separador">
			<div class="contenedor">
				<img src="@/assets/img/f_noexiste.jpg" alt="">
			</div>
		</div>
	</section>
</template>
<script>

export default {
	name: 'quienes',
	data() {
		return {
			
		}
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
		margin-top: -55px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
		object-fit: fill;
	}
	.contenedorPrincipal{
		width: 100%;
		background-color: var(--e-color);
		margin-top: 120px;
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
	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 230px;
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
		.fondoTitulo h1{
			font-size: 2em;
		}

	}
</style>