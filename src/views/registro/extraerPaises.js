import axios from 'axios'

export default () =>new Promise ((resolve, reject) => {
    axios
    .post(`${process.env.API_URL}dfs30008`,{})
    .then(response => {
        if (!response.data) {
            reject('Error')
		} else {
			resolve(response.data.SDTPais)
		}

    })
    .catch(error => reject(error))
})