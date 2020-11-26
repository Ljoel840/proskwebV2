<template>
	<header>
		<img src="@/assets/img/logoprosk.png" alt="logo prosk" class="logo">
		<nav>
			<a href="#">PROSKERS</a>
			<p>/</p>
			<a href="#">PROSK ACADEMY</a>
			<p>/</p>
			<a href="#">QUIENES SOMOS</a>
			<p>/</p>
			<a href="#">CONTACTO</a>
		</nav>
		<!-- <button class="buscar">
			<i class="material-icons">search</i>
		</button> -->
		<button class="botonAceptar">Login</button>
	</header>
</template>
<script>
export default {
	name: 'menupc',

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
	header{
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 9px 0;
		/* background-color: #000; */
	}
	.logo{
		height: 10vh;
		width: auto;
		margin-top: 1%;
		max-height: 60px;
	}
	header nav{
		width: 50%;
		display: flex;
		justify-content: center;


	}
	nav a{
		width: 120px;
		padding: 12px;
		text-align: center;
		text-decoration: none;
		font-size: 12px;
		font-weight: 600;
		color: #000;
		line-height: 1.5em;
		font-style: normal;
		letter-spacing: 1.5px
		
	}
	p{
		padding: 12px 0;
		font-size: 12px;
		font-weight: 500;

	}
	i{
		font-size: 2em;
		color: var(--a-color);
	}
	.buscar{
		border: none;
		background-color: #fff;
		width: 100px;
		margin-top: 5px;

	}
</style>
