<template>
    <section>
        <label class="foto">
            <input accept="image/*" type="file" cleanOrientation="true" aria-label="Subir foto de perfil"
                @change="cargar" :style="{
                backgroundImage: valores.imagen.archivo
                    ? `url(${valores.imagen.archivo})`
                    : `url(${require('@/assets/img/camara.png')})`,
                backgroundSize:
                    valores.imagen.orientacion === 0 || valores.imagen.orientacion === 180
                    ? 'auto 100%': '100% auto',
                backgroundColor: valores.imagen.archivo ? '#555': 'var(--d-color)',
                transform: `rotate(${valores.imagen.orientacion}deg)`
            }" :disabled="registrando ? 'disabled': null"/>
        </label>

        <label>
            <span :class="campos.email.error ? 'error': null">
                {{campos.email.texto[locale]}}
            </span>
            <input v-model="valores.email" ref="email"
                type="email" placeholder="Correo electrónico" autocomplete="off" spellcheck="false"
                @blur="validar('email')" :disabled="registrando ? 'disabled': null">
        </label>
        <label>
            <span :class="campos.pass.error ? 'error': null">
                {{campos.pass.texto[locale]}}
            </span>
            <input v-model="valores.pass"
                :type="contrasenaVisible ? 'text': 'password'" placeholder="Ingrese contraseña" autocomplete="off" spellcheck="false"
                @blur="validar('pass')" :disabled="registrando ? 'disabled': null">
            <button :alt="`${contrasenaVisible ? 'ocultar': 'mostrar'} contraseña`"
                :title="`${contrasenaVisible ? 'ocultar': 'mostrar'} contraseña`"
                @click="contrasenaVisible = contrasenaVisible ? false: true" class="visible" :disabled="registrando ? 'disabled': null">
                <i :class="`visibility${contrasenaVisible ? '_off': ''}`" aria-hidden="false"/>
            </button>
        </label>
        <label>
            <span :class="campos.passConf.error ? 'error': null">
                {{campos.passConf.texto[locale]}}
            </span>
            <input v-model="valores.passConf"
                :type="contrasenaVisible ? 'text': 'password'" placeholder="contraseña nuevamente" autocomplete="off" spellcheck="false"
                @blur="validar('passConf')" :disabled="registrando ? 'disabled': null">
            <button :alt="`${contrasenaVisible ? 'ocultar': 'mostrar'} contraseña`"
                :title="`${contrasenaVisible ? 'ocultar': 'mostrar'} contraseña`"
                @click="contrasenaVisible = contrasenaVisible ? false: true" class="visible" :disabled="registrando ? 'disabled': null">
                <i :class="`visibility${contrasenaVisible ? '_off': ''}`" aria-hidden="false"/>
            </button>
        </label>

        <hr>
        <label>
            <span :class="campos.nombre.error ? 'error': null">
                {{campos.nombre.texto[locale]}}
            </span>
            <input v-model="valores.nombre"
                type="text" placeholder="Ingrese su nombre" autocomplete="off" spellcheck="false"
                @blur="validar('nombre')" :disabled="registrando ? 'disabled': null">
        </label>
        <label>
            <span :class="campos.apellido.error ? 'error': null">
                {{campos.apellido.texto[locale]}}
            </span>
            <input v-model="valores.apellido"
                type="text" placeholder="Ingrese su apellido" autocomplete="off" spellcheck="false"
                @blur="validar('apellido')" :disabled="registrando ? 'disabled': null">
        </label>
        <label>
            <span> {{campos.tipoDocumento.texto[locale]}} </span>
            <select v-model="valores.tipoDocumento" :disabled="cargando ? 'disabled': null">
                <option value="CI">{{$t('perfil.default.ci')}}</option>
                <option value="DNI" v-if="locale=='es'">{{$t('perfil.default.dni')}}</option>
                <option value="PAS" v-if="locale=='es'">{{$t('perfil.default.pas')}}</option>
                <option value="OTRO">{{$t('perfil.default.otro')}}</option>
            </select>
        </label>
        <label>
            <span :class="campos.documento.error ? 'error': null">
                {{campos.documento.texto[locale]}}
            </span>
            <input v-model="valores.documento"
                type="text" placeholder="Documento de identidad" autocomplete="off" spellcheck="false"
                @blur="validar('documento')" :disabled="registrando ? 'disabled': null">
        </label>
        <label>
            <span :class="campos.nacimiento.error ? 'error': null">
                {{campos.nacimiento.texto[locale]}}
            </span>
            <input v-model="valores.nacimiento" type="date" max="2016-01-01" min="1920-01-01"
                @blur="validar('nacimiento')" :disabled="registrando ? 'disabled': null">
        </label>
        <label>
            <span>{{campos.sexo.texto[locale]}}</span>
            <select v-model="valores.sexo" :disabled="registrando ? 'disabled': null">
                <option value="M">{{$t('perfil.default.masculino')}}</option>
                <option value="F">{{$t('perfil.default.femenino')}}</option>
            </select>
        </label>





        <hr>
        <label>
            <span :class="campos.tel.error ? 'error': null">
                {{campos.tel.texto[locale]}}
            </span>
            <input v-model="valores.tel"
                type="tel" placeholder="Número de teléfono" autocomplete="off" spellcheck="false"
                @blur="validar('tel')" :disabled="registrando ? 'disabled': null">
        </label>


        <barra v-if="cargando"/>
        <label v-if="paices && paices.length > 0">
            <span>País</span>
            <select v-model="pais" :disabled="registrando ? 'disabled': null">
                <option v-for="pa in paices" :key="pa.idEnc" :value="pa.idEnc">{{pa.nombre}}</option>
            </select>
        </label>

        <barra v-if="cargando"/>
        <label v-if="localidades && localidades.length > 0">
            <span>Localidad</span>
            <select v-model="localidad" :disabled="registrando ? 'disabled': null">
                <option v-for="lo in localidades.filter(loc => {
                    return loc.paisEnc === pais
                })" :key="lo.idEnc" :value="lo.idEnc">{{lo.nombre}}</option>
            </select>
        </label>

        <barra v-if="cargando"/>
        <label v-if="ciudades && ciudades.length > 0">
            <span>Ciudad</span>
            <select v-model="valores.ciudad" :disabled="registrando ? 'disabled': null">
                <option v-for="ci in ciudades.filter(ciu => {
                    return ciu.localidadEnc === localidad
                        && ciu.paisEnc  === pais
                })" :key="ci.idEnc" :value="ci.idEnc">{{ci.nombre}}</option>
            </select>
        </label>



        <label>
            <span :class="campos.direccion.error ? 'error': null">
                {{campos.direccion.texto[locale]}}
            </span>
            <input v-model="valores.direccion"
                type="text" placeholder="Dirección" autocomplete="off" spellcheck="false"
                @blur="validar('direccion')" :disabled="registrando ? 'disabled': null">
        </label>

        <hr>
        <h3>{{$t('perfil.default.carnet')}}</h3>
        <label>
            <span>{{campos.vencimiento.texto[locale]}}</span>
            <input v-model="valores.carnet"
                type="date" :disabled="registrando ? 'disabled': null">
        </label>

        <label>
            <span :class="campos.altura.error ? 'error': null">
                {{campos.altura.texto[locale]}}
            </span>
            <input v-model.number="valores.altura"
                placeholder="0" min=50 max=300 type="number"
                @blur="validar('altura')" @focus="quitarCero('altura')" :disabled="registrando ? 'disabled': null">
        </label>
        <label>
            <span :class="campos.peso.error ? 'error': null">
                {{campos.peso.texto[locale]}}
            </span>
            <input v-model.number="valores.peso"
                placeholder="0" min=20 max=300 type="number"
                @blur="validar('peso')" @focus="quitarCero('peso')" :disabled="registrando ? 'disabled': null">
        </label>

        <hr>
        <label class="amplio">
            <img src="@/assets/img/i_instagram.png" alt="Instagram" aria-label="Instagram" draggable="false">
            <input v-model="valores.instagram" type="text" autocomplete="off" spellcheck="false" :disabled="registrando ? 'disabled': null">
        </label>
        <label class="amplio">
            <img src="@/assets/img/i_facebook.png" alt="Facebook" aria-label="Facebook" draggable="false">
            <input v-model="valores.facebook" type="text" autocomplete="off" spellcheck="false" :disabled="registrando ? 'disabled': null">
        </label>
        <label class="amplio">
            <img src="@/assets/img/i_twitter.png" alt="Twitter" aria-label="Twitter" draggable="false">
            <input v-model="valores.twitter" type="text" autocomplete="off" spellcheck="false" :disabled="registrando ? 'disabled': null">
        </label>

        <p v-if="!registrando && error">{{error}}</p>

        <spinner-circular v-if="registrando" class="spinner"/>
        <div v-else>
            <button class="accion" @click="ev => volver(ev)">{{$t('perfil.default.volver')}}</button>
            <button class="accion principal" @click="registrarme()">{{$t('perfil.default.registrarme')}}</button>
        </div>
    </section>
</template>

<script>
import {valores, limpiar} from './r_datos'
import girarImagen from '@/components/girarImagen'
import campos from './r_campos'
import s_validar from './s_validar'
import x_listas from './x_listas'

export default {
    name: 'o-registro',

    components: {
        spinnerCircular: () => import('@/components/spinnerCircular'),
        barra: () => import('@/components/barra')
    },

    data: () => ({
        mensaje: null,
        cargando: true,
        contrasenaVisible: false,
        paices: [],
        pais: '',
        localidades: [],
        localidad: '',
        ciudades: [],
        objeto: `${process.env.API_URL}dfs50008`,
        valores,
        campos,
        error: null,
        registrando: false
    }),

    watch: {
        pais (nuevo) {
            if (this.localidades.filter(lo => {
                return lo.paisEnc === nuevo
            })[0]) {
                this.localidad = this.localidades.filter(lo => {
                    return lo.paisEnc === nuevo
                })[0].idEnc
            } else {
                this.error = 'Error, localidad sin ciudad asociada'
            }
        },

        localidad (nuevo) {
            if (this.ciudades.filter(ci => {
                return ci.localidadEnc === nuevo
            })[0]) {
                this.valores.ciudad = this.ciudades.filter(ci => {
                    return ci.localidadEnc === nuevo
                        && ci.paisEnc  === this.pais
                })[0].idEnc
            } else {
                this.error = 'Error, localidad sin ciudad asociada'
            }
        }
    },

    created () {
        limpiar (this.valores)
        this.valores.code = window.location.host.split('.')[0], // subdominio
        this.cargando = true
        x_listas (this).then((response) => {
            this.cargando = false
            this.paices = response.data.frontInitFormReg.pais
            this.pais = response.data.frontInitFormReg.pais[0].idEnc
            this.localidades = response.data.frontInitFormReg.localidad
            this.ciudades = response.data.frontInitFormReg.ciudad

            if (response.data.frontInitFormReg.localidad.filter(lo => {
                return lo.paisEnc === this.pais
            })[0]) {
                this.localidad = response.data.frontInitFormReg.localidad.filter(lo => {
                    return lo.paisEnc === this.pais
                })[0].idEnc
            } else {
                this.error = 'Error, país sin localidad asociada'
            }

            if (!this.error) {
                if (response.data.frontInitFormReg.ciudad.filter(ci => {
                    return ci.localidadEnc === this.localidad
                })[0]) {
                    this.valores.ciudad = response.data.frontInitFormReg.ciudad.filter(ci => {
                        return ci.localidadEnc === this.localidad
                    })[0].idEnc
                } else {
                    this.error = 'Error, localidad sin ciudad asociada'
                }
            }
        }).catch(error => {
            this.cargando = false
            this.error = error
        })
    },

    mounted () {
        this.$refs.email.focus()
    },

    methods: {
        volver (ev) {
            ev.preventDefault()
            limpiar (this.valores)
            this.$emit('redir', 'o-login')
        },

        validar (cual) {
            s_validar (this, cual, true)
        },

        quitarCero (cual) {
            if (cual === 'altura' && this.valores.altura === 0) {
                this.valores.altura = null
            }

            if (cual === 'peso' && this.valores.peso === 0) {
                this.valores.peso = null
            }
        },

        cargar (ev) {
            const file = ev.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.valores.imagen.archivo = reader.result
                this.valores.imagen.ext = file.name.split('.').reverse()[0]
                this.valores.imagen.nombre = file.name

                // if (file.size > 3000000) {
                //     this.error = 'Archivo demaciado grande'
                // } else {
                //     this.imagenOk = true
                // }
            }

            if (file) {
                reader.readAsDataURL(file)
                girarImagen(file, (ori) => {
                    switch (ori) {
                        case 1:
                            this.valores.imagen.orientacion = 0
                            break
                        case 6:
                            this.valores.imagen.orientacion = 90
                            break
                        case 3:
                            this.valores.imagen.orientacion = 180
                            break
                        case 8:
                            this.valores.imagen.orientacion = -90
                            break
                    }
                })
            }
        },

        async registrarme () {
            this.registrando = true
            try {
                s_validar (this, null, true)
                await new Promise ((resolve, reject) => {
                    this.error ? reject(this.error): resolve()
                })
                this.mensaje = await this.$store.dispatch('usuario/registro', this.valores)
                limpiar (this.valores)
            }
            catch (error) {
                this.error = error
            }
            this.registrando = false
        }
    },

    computed:{
        locale(){
            return (window.navigator.language.split('-')[0]=='es'||window.navigator.language.split('-')[0]=='pt')?window.navigator.language.split('-')[0]:'es'
        }
    }
}
</script>

<style scoped>
    section {
        margin: 2em auto;
        display: grid;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input[type="file"] {
        width: 150px;
        height: 150px;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        padding: 138px 0 0 138px;
        align-self: center;
        margin: 0 auto;
    }

    input::-webkit-file-upload-button {
        visibility: hidden;
    }

    label {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin: .5em 0;
    }

    .error {
        color: red;
    }

    input, select, p {
        width: 100%;
    }

    .visible {
        padding: 0;
        border-radius: 50%;
        display: flex;
        width: 24px;
        margin: auto 6px auto -30px;
        background-color: transparent;
    }

    .visible i {
        color: var(--b-color);
    }

    .visibility::after {
        content: 'visibility';
    }

    .visibility_off::after {
        content: 'visibility_off'
    }

    .visible:hover i,
    .visible:focus i {
        color: var(--a-color);
    }

    img {
        margin: 0 1em 0 0;
        width: 30px;
    }

    .amplio input {
        width: calc(100% - 50px);
    }

    .amplio img {
        border-radius: .5em;
        margin: auto 1em auto 0;
    }

    h3 {
        text-align: left;
        width: 27em;
        max-width: 100%;
        padding: 0;
        margin: 0;
        font-size: 1em;
        font-weight: normal;
        color: var(--b-color);
    }

    p {
        margin: 0;
        text-align: center;
        padding: 1em 0;
        color: var(--a-color);
        min-height: 70px;
    }

    div {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        padding: 2em 0;
    }

    .accion {
        width: 40%;
        margin: .5em;
        max-width: 10em;
        padding: .5em 0;
        background-color: var(--c-color);
    }

    .principal {
        background-color: var(--a-color);
        color: #fff;
    }

    .accion:hover,
    .accion:focus {
        background-color: #666;
    }

    .principal:hover,
    .principal:focus {
        background-color: var(--i-color);
    }

    .accion:active {
        background-color: #444;
    }

    .spinner {
        margin: 3.2em;
    }

    @media (max-width: 640px) {
        section {
            padding: 0 5%;
        }

        .amplio {
            flex-direction: row;
        }

        h3 {
            width: 14em;
            padding: 3px;
        }
    }

    @media (min-width: 900px) {
        section {
            grid-template-columns: 1fr 1fr;
            grid-gap: 0 2em;
            max-width: 800px;
        }

        .foto {
            grid-column: 1;
            grid-row: 1/span 3;
        }

        hr, h3, p, div, .amplio {
            grid-column: 1 /span 2;
        }

        .amplio {
            max-width: 500px;
            margin: .5em auto;
        }
    }
</style>
