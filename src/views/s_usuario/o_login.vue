<template>
    <section>
        <h2>Complete los Datos</h2>
        <label>
            <img src="@/assets/img/i_mail.png" alt="icono numero" class="iconoForm">
            <input ref="document" v-model="document" @keypress.enter="ingresar()"
                type="text" placeholder="Ingrese Documento" autocomplete="new-text" spellcheck="false"  @keypress="onlyNumberKey($event)" >
				
        </label>
        <label>
			<img src="@/assets/img/i_contrasena.png" alt="icono Numeral" class="iconoForm">
            <input v-model="pass" @keypress.enter="ingresar()" :type="visible ? 'text': 'password'" placeholder="Ingrese contraseña" autocomplete="off" spellcheck="false">
            <button :alt="`${visible ? 'ocultar': 'mostrar'} contraseña`"
                :title="`${visible ? 'ocultar': 'mostrar'} contraseña`"
                @click="visible = visible ? false: true" class="visible">
                <!-- <i :class="`visibility${visible ? '_off': ''}`" aria-hidden="false"/> -->
				<i class="material-icons" aria-hidden="false" >{{visible ? 'visibility' : 'visibility_off'}}</i>
            </button>
        </label>
        <p v-if="error">{{error}}</p>
        <spinner-circular v-if="enviando" style="margin: 2em auto"/>
        <button v-else class="olvido" @click="olvido()">Olvidé mi contraseña</button>
        <div v-if="!enviando" class="botones">
            <!-- <button class="accion" @click="registrarme()">Registrarse</button> -->
            <button class="accion" @click="ir('Registro')">Registrarse</button>
            <button class="accion principal" @click="ingresar()">Ingresar</button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'OLogin',

    components: {
        spinnerCircular: () => import('@/components/spinnerCircular')
    },

    data: () => ({
        visible: false,
        document: null,
        pass: null,
        enviando: false,
        error: null
    }),

    // mounted () {
    //     this.$refs.document.focus()
    // },

    methods: {
		onlyNumberKey($event){
			if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
				return true
			} else {
				$event.preventDefault();
			}
		},
        async ingresar () {
            try {
                this.error = null
                this.enviando = true
                await this.$store.dispatch('usuario/login', {
                    // code: window.location.host.split('.')[0], // subdominio
					document: this.document,
					pass: this.pass,
					// document: '43244324',
					// pass: '12345678'
					
                })
            } catch (error) {
                this.error = error
            }
            this.enviando = false
        },

        registrarme () {
            this.$emit('redir', 'o-registro')
        },

        olvido () {
            this.$emit('redir', 'o-olvido')
		},
		ir (pag,para) {
			// e.preventDefault()
			this.$router.push({
				name: pag, 
				params: para
			}).catch(() => {})
		},
		
    }
}
</script>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 500px;
        margin: 5em auto;
		background-color: rgba(0, 0, 0, .5)

    }

	h2{
        font-weight: normal;
        color: var(--j-color);
		font-size: 1.5em;
		margin-bottom: 1em;
		padding: 2em 0;

	}

    h4 {
        font-weight: normal;
        color: var(--b-color);
    }

    label {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        margin: .5em 0;
    }


    input {
        width: 80%;
		background-color: rgba(0, 0, 0, .3);
		border-radius: 8px;
		border: 1px solid var(--a-color);
		color: #fff
    }

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
		color: var(--j-color);
		opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
		color:  var(--j-color);
	}

	::-ms-input-placeholder { /* Microsoft Edge */
		color:  var(--j-color);
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

    p {
        margin: 0;
        text-align: center;
        padding: .5em 0;
        color: red;
    }

    .olvido {
        background-color: transparent;
        margin: 1em 0 0 0;
        border: 1px solid transparent;
        border-radius: 6px;
        padding: .5em 1em;
        color: var(--j-color);
		cursor: pointer;
		outline: none;
    }

    .olvido:hover,
    .olvido:focus {
        border: 1px solid #ddd;
    }

	.iconoForm{
		width: 45px;
		height: 45px;
		padding: 5px;
		
	} 

    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 2em 0;
        width: 100%;
        max-width: 400px;
		flex-wrap: wrap;
    }

    /* .accion {
        background-color: var(--b-color);
        width: 40%;
        max-width: 10em;
        padding: .5em 0;
    }


    .accion:hover,
    .accion:focus {
        background-color: #666;
    }

    .principal:hover,
    .principal:focus {
        background-color: var(--i-color);
    }

    .accion:active {
        background-color: #444;
    } */

	.accion{
		width: 150px;
		border: 1px solid #fff;
		border-radius: 50px;
		color: white;
		background: transparent;
		background-image: linear-gradient(var(--e-color), var(--f-color));
		padding: 10px 30px;
		margin: 4px 5px;
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
        /* margin-left: 10px; */
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
		-webkit-box-shadow: 0 0 0px 1000px #000 inset;
		transition: background-color 5000s ease-in-out 0s;
	}

	@media (max-width: 600px) {
		label{
			width:90%
		}
	}


</style>