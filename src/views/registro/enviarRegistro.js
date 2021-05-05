import axios from 'axios'

export default (entrada) => new Promise ((resolve, reject) => {
	axios
	.post(`${process.env.API_URL}dfs30009`, entrada)
	.then(response => {
		if (!response.data) {
			reject('No hay retorno del backend')
		} else {
			console.log('Enviado', response.data)
			resolve(response.data)            
		}
	})
	.catch(error => {
		reject(error)
	})
})
