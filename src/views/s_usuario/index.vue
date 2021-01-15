<template>
    <article>
		<h3>Ingresar</h3>
		<hr color='#E20079'>
        <component :is='contenido' @redir="redir"/>
    </article>
</template>

<script>
export default {
    name: 'Usuario',

    components: {
        oLogin: () => import('./o_login'),
        oOlvido: () => import('./o_olvido'),
		oRegistro: () => import('./o_registro'),
		oCambio: () => import('./o_cambio')
    },

    data: () => ({
		contenido: 'o-login',
		datosQuery: null
    }),

    computed: {
        login () {
            return this.$store.state.usuario.ok
        }
    },

    watch: {
        login (nuevo) { // si vino sólo a loguearse, vuelve
            if (nuevo === true && this.$route.name === 'Ingresar') {
				this.$router.push({
					name: 'Mi Cuenta', 
					params: '0'
				})
                // this.$router.go(-1)
            }
        }
    },

    methods: {
        redir (objeto) {
            this.contenido = objeto
        }
	},
	mounted(){
		this.datosQuery=this.$route.query
		if (this.datosQuery.t) {
			this.$store.commit('actualizarToken',this.datosQuery.t)
			this.redir('o-cambio')
		}
	}
}
</script>

<style scoped>
    article {
        width: 100%;
		padding: 30px;
		min-height: 700px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		animation: aparecer 1s ease; 

    }
	h3{
		color:var(--j-color);
		text-align: Left; 
		font-family: 'Quicksand', sans-serif;
		font-size: 2em;
		

	}	
	@media (max-width: 600px) {
		article{
			padding: 30px 10px;
		}
	}

</style>