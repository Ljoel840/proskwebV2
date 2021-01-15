
import axios from 'axios'

export default (datos) => new Promise ((resolve, reject) => {
    axios
    .post(`${process.env.API_URL}dfs90018`,datos)
    .then(response => {
        if (!response.data) {
            reject('No hay retorno de login')
        } else if (!response.data.ErrorSDT) {
            reject('No hay retorno del ErrorSDT')
        } else if (response.data.ErrorSDT.ErrorCode === 0) {
            resolve('Se ha enviado un correo con los pasos para recuperar su contraseña')
        } else {
            reject(response.data.ErrorSDT.ErrorDescription)
        }
    })
    .catch(error => reject(error))
})
