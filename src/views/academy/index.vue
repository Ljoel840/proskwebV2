<template>
	<section>
		<div class="fondoTitulo">
			<h1>Prosk Academy</h1>
			<h3>Aprende a ser más eficiente en Prosk</h3>
		</div>
		<div class="contenedorPrincipal">

		<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<div class="contenedor">
			<!-- <tip v-for="(d,index) in datos" :key="index" :datos="d" class=" break"/> -->
			<img src="@/assets/img/construccion.png" alt="">
			<div class="texto">
				<h1>EN CONSTRUCCIÓN</h1>

				<button class="botonAceptar" @click="ir('Contacto')">Contactanos</button>
			</div>
		</div>




		</div>
	</section>
</template>
<script>
import datos from './datos'
export default {
	name: 'academy',
	components:{
		tip: () => import('./tip'),

	},
	data() {
		return {
			mostrar: false,
			datos
		}
	},
	methods: {
		ir (pag,para) {
			this.$router.push({
				name: pag, 
				params: para
			}).catch(() => {})
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
		display: flex;
		justify-content: center;	
		flex-wrap: wrap;	
	}
	.break {
        break-inside: avoid;
        page-break-inside: avoid;
    }
	.contenedor img{
		width: 100%;
		max-width: 500px;
		height: auto;
		max-height: 500px;
	}
	.contenedor .texto{
		min-width: 500px;
		text-align: center
	}
	.contenedor .texto h1{
		color: var(--a-color);
		margin: 2em 0;
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
		.contenedor .texto{
			min-width: 100%;
			text-align: center
		}
	}
	@media (max-width: 500px) {
		.contenedor .texto h1{
			font-size: 1.8em;
		}
	}

</style>