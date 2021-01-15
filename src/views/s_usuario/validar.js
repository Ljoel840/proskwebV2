export default (componente) => {
	componente.errorDatos = false
		componente.errorMensaje = ''
		if (componente.documento===''||componente.nroAbonado===''){
			componente.errorMensaje='Los campos son obligatorios'
			componente.errorDatos = true
		}else {
			if (!validNumero(componente.documento)||!validNumero(componente.nroAbonado) ){
				componente.errorMensaje='Por favor corrija los datos'
				componente.errorDatos = true
			}	
		}
		
	function validNumero (numero) {
		var re = /^([0-9]+){1}$/;
		return re.test(numero);
	}

}