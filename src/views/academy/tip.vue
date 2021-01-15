<template>
	<div>
		<div class="tip" @click="mostrar=!mostrar">
			<div class="div1">
				<img :src="datos.imagen" alt="pasos">
			</div>
			<div class="div2">
				<h2>{{datos.numero}}</h2>
			</div>
			<div class="div3">
				<h4>{{datos.titulo}}</h4>
			</div>
			<div class="div5" v-if="mostrar">
				<p v-html="datos.descripcion"></p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'tip',
	props:{
		datos:{
			type: Object
		}
	},
	data() {
		return {
			mostrar: false
		}
	},
}
</script>
<style scoped>
	.tip{
		width: 500px;
		display: grid;
		grid-template-columns: 125px 80px 265px 30px;
		grid-template-rows: 125px 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		background-color: var(--d-color);
		border-radius: 75px;
		margin: .5em 0
	}
	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }
	.div3 { grid-area: 1 / 3 / 2 / 4; }
	.div4 { grid-area: 1 / 4 / 2 / 5; }
	.div5 { grid-area: 2 / 2 / 3 / 4; }

	.div1, .div2, .div3 {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.div1 img{
		width: 100%;
		height: auto;
		border-radius: 75px;
		border: 4px solid var(--e-color)
	}
	.div2 h2{
		font-size: 4em;
		font-family: Impact;
		margin: 0;
		padding: 0;
		justify-self: center;
		color: var(--b-color);
		margin-bottom: 10px;
	}
	.div3 {
		padding: 10px;
		text-align: center;
	}
	
	.div3 h4{
		font-size: 1em;
		font-weight: 300;
	}
	.div5{
		padding: 10px;
		text-align: justify;
	}
	.div5 p{
		font-size: .9em;
	}
</style>