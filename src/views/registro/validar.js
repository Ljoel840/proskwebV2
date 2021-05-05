export default (componente) => {
	componente.errorPais= null,
	componente.errorNombre= null,
	// componente.errorUsuario= null,
	componente.errorCorreo= null,
	// componente.errorTelefono= null,
	// componente.errorFecha= null,
	// componente.errorGenero= null,
	componente.errorContrasena= null,
	// componente.errorContrasenaConfirm= null,
	componente.errors = false
	if (!componente.pais) {
		componente.errorPais = 'El País no puede estar vacío'
		componente.errors = true
	}	
	if (!componente.nombre) {
		componente.errorNombre = 'El Nombre no puede estar vacío'
		componente.errors = true
	}
	// if (!componente.usuario) {
	// 	componente.errorUsuario = 'El Usuario no puede estar vacío'
	// 	componente.errors = true
	// }
	if (!componente.correo) {
		componente.errorCorreo = 'El Correo no puede estar vacío'
		componente.errors = true
	}else if (!validEmail(componente.correo)){
		componente.errorCorreo = 'Correo Inválido'
		componente.errors = true
	}
	// if (!componente.telefono) {
	// 	componente.errorTelefono = 'El Teléfono no puede estar vacío'
	// 	componente.errors = true
	// }else if (!validTelefono(componente.telefono)){
	// 	componente.errorTelefono = 'Teléfono Inválido'
	// 	componente.errors = true
	// }
	// if (!componente.fechaNacimiento) {
	// 	componente.errorFecha = 'Agregue su fecha de nacimiento'
	// 	componente.errors = true
	// }
	// if (!componente.genero) {
	// 	componente.errorGenero = 'El campo no puede estar vacío'
	// 	componente.errors = true
	// }
	if (!componente.contrasena) {
		componente.errorContrasena = 'Agregue una Contraseña'
		componente.errors = true
	}
	// if (!componente.contrasenaConfirm) {
	// 	componente.errorContrasenaConfirm = 'Confirme la contraseña'
	// 	componente.errors = true
	// }else if (componente.contrasena != componente.contrasenaConfirm) {
	// 	componente.errorContrasenaConfirm = 'Las contraseñas no son iguales'
	// 	componente.errors = true
	// }
	
	function validEmail (email) {
	var re = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	return re.test(email);
	}
	// function validTelefono (phone) {
	// var re = /^([0-9]+){8}$/;
	// return re.test(phone);
	// }
	
}