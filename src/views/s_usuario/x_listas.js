import axios from 'axios'

export default (componente) => new Promise ((resolve, reject) => {
    axios
    .post(componente.objeto,{})
    .then(response => {
        if (!response.data) {
            reject('datos vacío')
        } else if (!response.data.frontInitFormReg) {
            reject('error iniciando datos')
        } else if (!response.data.frontInitFormReg.pais 
                || !response.data.frontInitFormReg.localidad
                || !response.data.frontInitFormReg.ciudad) {
            reject('error iniciando datos de paices, localidades, o ciudades')
        } else if (response.data.frontInitFormReg.pais.length === 0 
                || response.data.frontInitFormReg.localidad.length === 0
                || response.data.frontInitFormReg.ciudad.length === 0) {
            reject('error iniciando datos vacíos')
        } else {
            resolve(response)
        }
    })
    .catch(e => reject(e))
})
