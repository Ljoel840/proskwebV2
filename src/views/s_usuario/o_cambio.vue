<template>
    <section>
        <h2>Cambio de contraseña</h2>
		<br>
		<label>
            <img src="@/assets/img/i_mail.png" alt="icono usuario" class="iconoForm">
            <input v-model="cedula"
                type="text" placeholder="Número de Cédula" autocomplete="new-text" spellcheck="false">
        </label>
		<label>
			<img src="@/assets/img/i_contrasena.png" alt="icono Numeral" class="iconoForm">
			<input :type="visible2 ? 'text': 'password'" name="clave" id="clave" class="form-control " placeholder="Nueva clave" autocomplete="new-password"  v-model="pass">
			<button :alt="`${visible2 ? 'ocultar': 'mostrar'} contraseña`"
			:title="`${visible2 ? 'ocultar': 'mostrar'} contraseña`"
			@click="visible2 = visible2 ? false: true" class="visible">
				<i class="material-icons" aria-hidden="false" >{{visible ? 'visibility' : 'visibility_off'}}</i>
			</button>
		</label>
		<label>
			<img src="@/assets/img/i_contrasena.png" alt="icono Numeral" class="iconoForm">
			<input :type="visible3 ? 'text': 'password'" name="confirmar_clave" id="confirmar_clave" class="form-control " placeholder="Confirmar Clave" autocomplete="off" v-model="passConfirmar">
			<button :alt="`${visible3 ? 'ocultar': 'mostrar'} contraseña`"
			:title="`${visible3 ? 'ocultar': 'mostrar'} contraseña`"
			@click="visible3 = visible3 ? false: true" class="visible">
				<i class="material-icons" aria-hidden="false" >{{visible ? 'visibility' : 'visibility_off'}}</i>
			</button>
		</label>
			<p class="mensajeError" v-if="errorDatos">{{errorMensaje}}</p> 
		<p>Todos los campos son obligatorios</p>

        <spinner-circular v-if="enviando" style="margin: 2em auto"/>
        <div v-if="!enviando">
            <button class="accion" @click="volver()">Volver</button>
            <button v-if="!mensaje" class="accion principal" @click="valid()">Enviar</button>
        </div>
		<div id="snackbar">{{mensajeEnvio}}</div>
    </section>
</template>

<script>
import x_cambio from './x_cambio'

export default {
    name: 'cambio',

    components: {
        spinnerCircular: () => import('@/components/spinnerCircular')
    },

    data: () => ({
		cedula: '',
		pass: '',
		passConfirmar: '',
		errorDatos: false,
		errorMensaje: '',
		mostrar: false,
        enviando: false,
        error: null,
		mensaje: null,
		visible: false,
		visible2: false,
		visible3:false,
		mensajeEnvio:'', 
	}),
	computed: {
		token (){
			return this.$store.state.token
		}
	},

    methods: {
		snack() {
			var x = document.getElementById("snackbar");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		},

        volver () {
            this.$emit('redir', 'o-login')
        },

		validar(){
			this.errorDatos = false
			this.errorMensaje = ''
			if (this.usuario===''||this.pass===''||this.passConfirmar===''){
				this.errorMensaje='Los campos son obligatorios'
				this.errorDatos = true
			}else {
				if (this.pass!=this.passConfirmar) {
					this.errorMensaje='Las contraseñas no coinciden'
					this.errorDatos = true
				}
			}
		},
		valid(){
			this.validar()
			if (!this.errorDatos) {
				this.enviar()
				this.volver()
			}
		},
        async enviar () {
            try {
                this.enviando = true
                this.error = null
				this.mensaje = await x_cambio ({
					key: this.token,
					user: this.cedula,
					pass: this.pass
				})
				this.mensajeEnvio='Contraseña cambiada'
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
        margin: 1em 0;
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

	.visible {
        padding: 0;
        border: none;
        display: flex;
        width: 24px;
        margin: auto 6px auto -30px;
        background-color: transparent;
		outline:none;
    }

    .visible i {
        color: var(--j-color);
    }

    .visibility::after {
        content: 'visibility';
    }

    .visibility_off::after {
        content: 'visibility_off'
    }

    .visible:hover i,
    .visible:focus i {
        color: var(--j-color);
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
