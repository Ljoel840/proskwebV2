<template>
	<section>
		<div class="fondoTitulo">
			<h1>Registro</h1>
		</div>
		
		<div class="contenedor">
			<img src="@/assets/img/separador2.png" alt="separador" class="separador">
			<div class="formulario">
				<h4>Complete los siguientes datos para su registro</h4>
				<label>
					<img src="@/assets/img/i_country.png" alt="icono País" class="iconoForm">
					<select v-model="pais">
						<option value="" hidden selected>País</option>
						<option v-for="p in paises" :key="p.PaisId" :value="p.PaisId">{{p.PaisName}}</option>
					</select>
				</label>
				<p v-if="errorPais">{{errorPais}}</p>
				<label>
					<img src="@/assets/img/i_mail.png" alt="icono email" class="iconoForm">
					<input type="mail" class="form-control " placeholder="Correo Electrónico" autocomplete="off" v-model="correo">
				</label>
				<p v-if="errorCorreo">{{errorCorreo}}</p>
				<label>
					<img src="@/assets/img/i_name.png" alt="icono Nombre" class="iconoForm">
					<input type="text" class="form-control " placeholder="Nombre y Apellido" autocomplete="off" v-model="nombre">
				</label>
				<p v-if="errorNombre">{{errorNombre}}</p>
				<!-- <label>
					<img src="@/assets/img/i_user.png" alt="icono Usuario" class="iconoForm">
					<input type="text" class="form-control " placeholder="Usuario" autocomplete="off" v-model="usuario">
				</label>
				<p v-if="errorUsuario">{{errorUsuario}}</p>
				<label>
					<img src="@/assets/img/i_birth.png" alt="icono Fecha de Nacimiento" class="iconoForm">
					<input type="date" class="form-control " placeholder="Fecha de Nacimiento" autocomplete="off" v-model="fechaNacimiento">
				</label>
				<p v-if="errorFecha">{{errorFecha}}</p>
				<label>
					<img src="@/assets/img/i_gender.png" alt="icono Genero" class="iconoForm">
					<select type="text" class="form-control " autocomplete="off" v-model="genero">
						<option value="" hidden selected>Género</option>
						<option value="1">Femenino</option>
						<option value="2">Masculino</option>
						<option value="3">Otro</option>
					</select>
				</label>
				<p v-if="errorGenero">{{errorGenero}}</p>
				<label>
					<img src="@/assets/img/i_phone.png" alt="icono Teléfono" class="iconoForm">
					<input type="tel" class="form-control" placeholder="Nro. de Teléfono" autocomplete="off" v-model="telefono">
				</label>	
				<p v-if="errorTelefono">{{errorTelefono}}</p> -->
				<label>
					<img src="@/assets/img/i_contrasena.png" alt="icono Password" class="iconoForm">
					<input type="tel" class="form-control" placeholder="Contraseña" autocomplete="off" v-model="contrasena">
				</label>
				<p v-if="errorContrasena">{{errorContrasena}}</p>
				<!-- <label>
					<img src="@/assets/img/i_passconfirm.png" alt="icono Confirmar Password" class="iconoForm">
					<input type="tel" class="form-control" placeholder="Confirmar Contraseña" autocomplete="off" v-model="contrasenaConfirm">
				</label>
				<p v-if="errorContrasenaConfirm">{{errorContrasenaConfirm}}</p>				
				<br> -->
				<div class="terminos">
					<input type="checkbox" v-model="confirmar">
					<a href="https://prosk.org/web/politicas/terminos.pdf" target="_blank">Acepto Términos y Condiciones</a>
				</div>
				<div class="botones">
					<button class="botonAceptar" @click="confirmar ? registrar(): null" :class="!confirmar ? 'desactivar':null">Registrarse</button>					
					<button class="botonAceptar" @click="ir('Home2')">Volver</button>
				</div>
			</div>
		</div>
		<div id="snackbar">{{mensajeEnvio}}</div>
	</section>
</template>
<script>
import valida from './validar'
import extraerPaises from './extraerPaises'
import enviarFormulario from './enviarRegistro'


export default {
	name: 'Registro',

	components: {
		barra: () => import('@/components/barra'),
	},
	data() {
		return {
			pais: '',
			correo: '',
			nombre: '',
			usuario: '',
			fechaNacimiento: '',
			genero: '',
			telefono: '',
			contrasena: '',
			contrasenaConfirm: '',
			errorPais: null,
			errorNombre: null,
			errorUsuario: null,
			errorCorreo: null,
			errorTelefono: null,
			errorFecha: null,
			errorGenero: null,
			errorContrasena: null,
			errorContrasenaConfirm: null,
			mensajeEnvio: null,
			errors: false,
			paises: null,
			enviado: false,
			error: null,
			envioFormulario: null,
			confirmar: false
		}
	},
	created() {
		this.cargarPaises()
	},
	methods: {
		snack() {
			var x = document.getElementById("snackbar");
			x.className = "show";
		    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		},
		esperar(x) { 
			return new Promise(resolve => {
				setTimeout(() => {
				resolve(x);
				}, 3000);
			})
		},
		async registrar(){
			valida(this)
			if (!this.errors) {
				this.enviarRegistro()
				console.log(this.error)
				if (this.error) {
					this.limpiarDatos()
				}
				 
			}
		},
		limpiarDatos(){
			this.pais= ''
			this.correo= ''
			this.nombre= ''
			this.usuario= ''
			this.fechaNacimiento= ''
			this.genero= ''
			this.telefono= ''
			this.contrasena= ''
			this.contrasenaConfirm= ''
			this.error= null,
			this.confirmar= false
		},
		
		async cargarPaises(){
			try{
				this.paises = await extraerPaises()
			}
			catch(error){
				this.mensajeEnvio= error
				this.snack()
			}
		},
		async enviarRegistro(){
			try{
				this.envioFormulario = await enviarFormulario({
					UserCode: this.correo,
					PaisId: parseInt(this.pais),
					UserName: this.nombre,
					UserNameDisplay: this.usuario,
					UserPhone: this.telefono,
					UserBirthdate: this.fechaNacimiento,
					UserSex: this.genero,
					Password: this.contrasena
				})
				if (this.envioFormulario.userid!='0') {
					this.enviado = true
					this.confirmar= false
					this.mensajeEnvio= 'Registro Exitoso'
					this.snack()
					this.ingresar()
				}else {
					this.mensajeEnvio= this.envioFormulario.Message
					this.snack()
					this.limpiarDatos()
				}
			}
			catch(error){
				this.error = error
				console.log(this.error)
				this.mensajeEnvio=this.error
				this.snack()
				this.limpiarDatos()
			}
		},
		async ir(pag,data){
			await this.esperar(10)
			this.$router.push({
				name: pag, 
				params: {data}
			}).catch(() => {})
		},
		async ingresar () {
			try {
				await this.$store.dispatch('usuario/login', {
					email: this.correo,
					pass: this.contrasena,
				})
				this.ir('Home2')
			} catch (error) {
				this.error = error
			}
		},

	},


}
</script>
<style scoped>
	section{
		width: 100%;
		height: auto;
		min-height: 75vh;
	}
	section img {
		width: 100%;
		height: auto;
	}
	h1{
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		/* margin-top: 1.5em; */
	
	}
	h2{
		font-size: 2em;
	}
	h3{
		color: var(--a-color);
		font-size: 1.2em;
	}
	.fondoTitulo{
		width: 100%;
		height: 80px;
		position: absolute;
		top: 0;
		z-index: -1;
		background-color: var(--a-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 3em;
	}
	.separador{
		margin-top: -50px;
		width: 100%;
		height: 60px;
		background-color: transparent;
		border: none;
	}
	.contenedor{
		width: 100%;
		height: auto;
		padding: 2em 0;
		min-height: 75vh;
		background-image: url('../../assets/img/f_registro.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		margin-top: 60px;
	}

	.formulario{
		display: flex;
		/* grid-template-columns: 1fr; */
		justify-content: center;
		flex-wrap: wrap;
		background-color:var(--d-color);
		margin: .5em auto;
		width: 100%;
		max-width: 500px;
		padding: 1em 30px ;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.formulario h4{
		color: var(--c-color);
		margin: 1em 0 ;
		text-align: center;
		
	}

	.formulario label{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 10px;
	}

	.formulario input,textarea, select{
		padding: 10px;
	}

	.formulario div{
		display: flex;
		padding: 5px
	}
	.formulario p{
		font-size: .8em;
		color: var(--a-color);
	}

	.form-control{
		width: 80%;
		background-color:var(--e-color);
		color: var(--c-color);
		border: none;
	}
	select{
		width: 84% !important;
		border: none;
	}


	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	color: var(--h-color);
	opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	color:  var(--h-color);
	}

	::-ms-input-placeholder { /* Microsoft Edge */
	color:  var(--h-color);
	}


	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
	-webkit-appearance: none; 
	margin: 0; 
	}

	input[type=number] { -moz-appearance:textfield; }

	.iconoForm{
		width: 30px;
		height: 30px;
		padding: 5px 20px;
		
	} 
	.botones{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.terminos{
		width: 100%;
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.desactivar{
		background-color: var(--h-color);
		cursor: auto;
	}
	.desactivar:hover{
		background-color: var(--h-color);
	}
	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 150px;
		}
		.contenedor{
			margin-top: 180px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: -5px;
		}
	}

	#snackbar {
		visibility: hidden;
		min-width: 250px;
		margin-left: -125px;
		background-color: var(--f-color);
		color: #fff;
		text-align: center;
		border-radius: 2px;
		padding: 16px;
		position: fixed;
		z-index: 1;
		left: 50%;
		Bottom: 30px;
		font-size: 17px;
	}

	#snackbar.show {
		visibility: visible;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
	}

	@media (max-width: 1000px) {
		.separador{
			margin-top: -60px;
		}
	}
	@media (max-width: 600px) {
		.formulario{
			max-width: 300px;
			padding: 5px;
		}
		.formulario label{
			width: 80%;
		}
		.iconoForm{
			padding: 5px ;
		} 
	}

</style>