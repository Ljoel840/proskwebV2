<template>
    <section>
        <h2>Recuperar contraseña</h2>
        <p v-if="!mensaje">
            Para recuperar su contraseña ingrese los datos solicitados
            <br>
            Enviaremos un mail con los pasos para restaurar su contraseña.
        </p>
        <p v-else>{{mensaje}}</p>

        <span v-if="error" class="error">{{error}}</span>
        <spinner-circular v-if="enviando" class="spinner"/>

        <label v-if="!enviando && !mensaje">
			<img src="@/assets/img/i_mail.png" alt="icono documento" class="iconoForm">
            <input v-model="documento"  
                type="text" placeholder="Cédula de Identidad" autocomplete="off" spellcheck="false">
        </label>
        <label v-if="!enviando && !mensaje">
			<img src="@/assets/img/i_mail.png" alt="icono abonado" class="iconoForm">
            <input v-model="nroAbonado"  
                type="text" placeholder="Nro. de Abonado" autocomplete="off" spellcheck="false">
        </label>
		<p class="mensajeError" v-if="errorDatos">{{errorMensaje}}</p> 

        <div v-if="!enviando">
            <button class="accion" @click="volver()">Volver</button>
            <button v-if="!mensaje" class="accion principal" @click="valid()">Enviar</button>
        </div>
		<div id="snackbar">{{mensajeEnvio}}</div>
    </section>
</template>

<script>
import x_olvido from './x_olvido'
import validar from './validar'

export default {
    name: 'olvido',

    components: {
        spinnerCircular: () => import('@/components/spinnerCircular')
    },

    data: () => ({
        email: null,
        enviando: false,
        error: null,
		mensaje: null,
		documento: '',
		nroAbonado: '',
		errorDatos: false,
		errorMensaje: '',
		mensajeEnvio:''
    }),

    // mounted () {
    //     this.$refs.email.focus()
    // },

    methods: {
		snack() {
			var x = document.getElementById("snackbar");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		},
        volver () {
            this.$emit('redir', 'o-login')
		},
		
		valid (){
			validar(this)
			if (!this.errorDatos) {
				this.enviar()
			}

		},

        async enviar () {
			try {
				this.enviando = true
                this.error = null
                this.mensaje = await x_olvido ({
					document: this.documento,
					abonado: parseInt(this.nroAbonado)
				})
				this.mensajeEnvio='Por favor, revise su correo'
            }
            catch (error) {
				this.error = error
				this.mensajeEnvio= this.error
            }
            this.enviando = false
			this.snack()
        }
    }
}
</script>

<style scoped>
    section {
        padding: 2em 3em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 500px;
        margin: 5em auto;
		background-color: rgba(0, 0, 0, .5)

    }

    h2 {
        margin: 0;
        text-align: center;
        color:  var(--a-color);
    }

    p {
        margin: 2em 0;
        line-height: 1.5;
        color: #fff;
    }

    label {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        margin: .5em 0;
	}

    span {
        min-width: 4em;
        display: block;
        margin: .5em auto .5em 0;
    }

    input {
        width: 80%;
		background-color: rgba(0, 0, 0, .3);
		border-radius: 8px;
		border: 1px solid var(--a-color);
		color: #fff
    }

	.iconoForm{
		width: 45px;
		height: 45px;
		padding: 5px;
		
	} 

    .error {
        color: red;
    }

	.accion{
		width: 150px;
		border: 1px solid #fff;
		border-radius: 50px;
		color: white;
		background: transparent;
		background-image: linear-gradient(var(--e-color), var(--f-color));
		padding: 5px 30px;
		margin: 4px 2px;
		transition-duration: 0.4s;
		cursor: pointer;
		text-decoration: none;
		text-transform: uppercase;
		text-align: center;
		outline: none;
	}

	.accion:hover{
		cursor:pointer;
		color: white;
		background: linear-gradient(var(--c-color), var(--d-color));
   }
    .principal {
        margin-left: 10px;
        background: linear-gradient(var(--a-color), var(--b-color));
        color: #fff;
    }
	/* Change Autocomplete styles in Chrome*/
	input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		border: 1px solid var(--a-color);
		-webkit-text-fill-color: #fff;
		box-shadow: 0 0 0px 1000px #000 inset;
		transition: background-color 5000s ease-in-out 0s;
	}

    .spinner {
        margin: 1.6em;
    }

    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
		margin-top: 20px;
    }

    @media (max-width: 640px) {
        section {
            padding: 1em 1.5em;
        }

        label {
            flex-direction: column;
            align-items: flex-start;
        }

        span {
            margin: 5px;
        }

        .visible {
            align-self: flex-end;
            margin: -28px 6px 4px -30px;
        }

        .accion {
            width: 5em;
        }
	}
	.mensajeError{
		font-size: .8em;
		color: var(--a-color);
	}
	#snackbar {
		visibility: hidden;
		min-width: 250px;
		margin-left: -125px;
		background-color: var(--b-color);
		color: #fff;
		text-align: center;
		border-radius: 2px;
		padding: 16px;
		position: fixed;
		z-index: 1;
		left: 50%;
		bottom: 30px;
		font-size: 17px;
	}

	#snackbar.show {
		visibility: visible;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
	}
</style>
