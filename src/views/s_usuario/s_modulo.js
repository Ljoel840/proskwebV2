/*
    🙍‍ Módulo de usuario
*/

import {local, enviarLocal} from './x_local'
import login from './x_login'
import logout from './x_logout'
import registro from './x_registro'

export default {
    namespaced: true,
    state: {
        ok: false,
        nombre: null,
        idEnc: null,
        vsEnc: null,
        key: null,
		admin: false,
		asociados: [],
		// ok: true,
        // nombre: 'Joel Leal',
        // idEnc: 'khksdhkhkh2k3h42',
        // vsEnc: 'khksdhkhkh2k3h42',
        // key: 'khksdhkhkh2k3h42',
		// admin: false,
		// asociados: [],
    }, 
    mutations: {
        actualizar (state, usuario) {
            state.ok = usuario.ok
            state.nombre = usuario.nombre
            state.idEnc = usuario.idEnc
            state.vsEnc = usuario.vsEnc
            state.key = usuario.key
            state.admin = usuario.admin
			state.asociados = usuario.asociados
			enviarLocal (state)
			// cargarAbonados(state)
		},
    },
    actions: {
        login, logout, local, registro
    }
}