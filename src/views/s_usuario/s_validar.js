export default (componente, cual, nuevo) => {

    if (cual === 'nombre' || !cual) {
        if (!componente.valores.nombre || componente.valores.nombre === '' || componente.valores.nombre === ' ') {
            componente.campos.nombre = {
                texto: 'Nombre vacío',
                error: true
            }
        } else {
            componente.campos.nombre = {
                texto: 'Nombre',
                error: false
            }
        }
    }

    if (cual === 'apellido' || !cual) {
        if (!componente.valores.apellido || componente.valores.apellido === '' || componente.valores.apellido === ' ') {
            componente.campos.apellido = {
                texto: 'Apellido vacío',
                error: true
            }
        } else {
            componente.campos.apellido = {
                texto: 'Apellido',
                error: false
            }
        }
    }

    if (cual === 'documento' || !cual) {
        if (!componente.valores.documento || componente.valores.documento === '') {
            componente.campos.documento = {
                texto: 'Documento vacío',
                error: true
            }
        } else {
            let puntero = componente.valores.documento.split('')
            puntero.forEach((letra, index) => {
                if (letra !== '0' && !parseInt(letra) > 0) {
                    puntero.splice(index,1,'')
                }
            })
            componente.valores.documento = puntero.join('')
            if (componente.valores.documento.length < 8 || componente.valores.documento.length > 15) {
                componente.campos.documento = {
                    texto: 'Documento incorrecto',
                    error: true
                }
            } else {
                componente.campos.documento = {
                    texto: 'Documento',
                    error: false
                }
            }
        }
    }

    if (cual === 'nacimiento' || !cual) {
        if (!componente.valores.nacimiento || componente.valores.nacimiento === '' || componente.valores.nacimiento === ' ') {
            componente.campos.nacimiento.error = true
        } else {
            let ahora = new Date()
            let zeudoEdad = ahora.getFullYear() - Number(componente.valores.nacimiento.split('-')[0])
            componente.campos.nacimiento.error = zeudoEdad < 5 || zeudoEdad > 100 ? true: false
        }
    }

    if (cual === 'altura' || !cual) {
        if (!componente.valores.altura) {
            componente.valores.altura = 0
            componente.campos.altura = {
                texto: 'Altura (cm)',
                error: false
            }
        } else if (componente.valores.altura < 100 && componente.valores.altura > 0) {
            componente.campos.altura = {
                texto: 'Altura (cm) no válida',
                error: true
            }
        } else if (componente.valores.altura > 250) {
            componente.campos.altura = {
                texto: 'Altura (cm) no válida',
                error: true
            }
        } else {
            componente.campos.altura = {
                texto: 'Altura (cm)',
                error: false
            }
        }
    }

    if (cual === 'peso' || !cual) {
        if (!componente.valores.peso) {
            componente.valores.peso = 0
            componente.campos.peso = {
                texto: 'Peso (Kg)',
                error: false
            }
        } else if (componente.valores.peso < 40 && componente.valores.peso > 0) {
            componente.campos.peso = {
                texto: 'Peso (Kg) no válido',
                error: true
            }
        } else if (componente.valores.peso > 500) {
            componente.campos.peso = {
                texto: 'Peso (Kg) no válido',
                error: true
            }
        } else {
            componente.campos.peso = {
                texto: 'Peso (Kg)',
                error: false
            }
        }
    }

    if (cual === 'tel' || !cual) {
        if (!componente.valores.tel || componente.valores.tel === '' || componente.valores.tel === ' ') {
            componente.campos.tel = {
                texto: 'Teléfono vacío',
                error: true
            }
        } else {
            let puntero = componente.valores.tel.split('')
            puntero.forEach((letra, index) => {
                if (letra !== '0' && !parseInt(letra) > 0) {
                    puntero.splice(index,1,'')
                }
            })
            componente.valores.tel = puntero.join('')
            if (componente.valores.tel.length < 8 || componente.valores.tel.length > 15) {
                componente.campos.tel = {
                    texto: 'Teléfono incorrecto',
                    error: true
                }
            } else {
                componente.campos.tel = {
                    texto: 'Teléfono',
                    error: false
                }
            }
        }
    }

    if (nuevo) {
        if (cual === 'email' || !cual) {
            if (!componente.valores.email || componente.valores.email === '' || componente.valores.email === ' ') {
                componente.campos.email = {
                    texto: 'Email vacío',
                    error: true
                }
            } else {
                const reg = /^((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)|(\s*))$/
                componente.campos.email = {
                    texto: reg.test(componente.valores.email) ? 'Email': 'Email no válido',
                    error: reg.test(componente.valores.email) ? false: true
                }
            }
        }
    }

    if (cual === 'direccion' || !cual) {
        if (!componente.valores.direccion || componente.valores.direccion === '' || componente.valores.direccion === ' ') {
            componente.campos.direccion = {
                texto: 'Dirección vacía',
                error: true
            }
        } else {
            componente.campos.direccion = {
                texto: 'Dirección',
                error: false
            }
        }
    }

    if (nuevo) {
        if (cual === 'pass' || !cual) {
            if (!componente.valores.pass || componente.valores.pass === '' || componente.valores.pass === ' ') {
                componente.campos.pass = {
                    texto: 'Contraseña vacía',
                    error: true
                }
            } else {
                componente.campos.pass = {
                    texto: 'Contraseña',
                    error: false
                }
            }
        }

        if (cual === 'passConf' || cual === 'pass' || !cual) {
            if (!componente.valores.passConf || componente.valores.passConf === '' || componente.valores.passConf === ' ') {
                componente.campos.passConf = {
                    texto: cual === 'pass' ? 'Repita la Contraseña': 'Confirmación vacía',
                    error: cual === 'pass' ? false: true
                }
            } else if (componente.valores.pass !== componente.valores.passConf) {
                componente.campos.passConf = {
                    texto: 'No es igual',
                    error: true
                }
            } else {
                componente.campos.passConf = {
                    texto: 'Repita la Contraseña',
                    error: false
                }
            }
        }
    }

    if (componente.campos.nombre.error
    || componente.campos.apellido.error
    || componente.campos.documento.error
    || componente.campos.nacimiento.error
    || componente.campos.altura.error
    || componente.campos.peso.error
    || componente.campos.tel.error
    || componente.campos.email.error
    || componente.campos.direccion.error
    || componente.campos.pass.error
    || componente.campos.passConf.error) {
        componente.error = 'Verifique los datos'
    } else {
        componente.error = navigator.onLine ? null: 'Sin conexión'
    }
}
