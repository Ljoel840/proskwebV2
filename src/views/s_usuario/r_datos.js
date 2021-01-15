/*
    Datos de usuario
*/

export const valores = {
    code: null,
    nombre: null,
    apellido: null,
    tipoDocumento: 'CI',
    documento: null,
    nacimiento: null,
    sexo: 'M',
    altura: null,
    peso: null,
    tel: null,
    email: null,
    direccion: null,
    box: 1,
    pass: null,
    passConf: null,
    carnet: null,
    imagen: {
        archivo: '',
        nombre: '',
        ext: '',
        orientacion: 0
    },
    facebook: '',
    twitter: '',
    instagram: '',
    ciudad: ''
}

export function limpiar (valores) {
    valores.code = null
    valores.nombre = null
    valores.apellido = null
    valores.tipoDocumento = 'CI'
    valores.documento = null
    valores.nacimiento = null
    valores.sexo = 'M'
    valores.altura = null
    valores.peso = null
    valores.tel = null
    valores.email = null
    valores.direccion = null
    valores.box = 1
    valores.pass = null
    valores.passConf = null
    valores.carnet = null
    valores.imagen = {
        archivo: '',
        nombre: '',
        ext: '',
        orientacion: 0
    }
    valores.facebook = ''
    valores.twitter = ''
    valores.instagram = ''
    valores.ciudad = ''
}