import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import styglobals from './assets/css/styglobals.css'
import styanimations from './assets/css/styanimations.css'

//--- AwesomeSwiper - Slider
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, Navigation } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay, Navigation])
Vue.use(getAwesomeSwiper(SwiperClass))
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, Swiper)
//--- AwesomeSwiper - Slider

//--- Google Maps ----
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
	load: {
	  key: "AIzaSyCNooIeXDvdlfzJbrQ6EJvPCh7hnnibd04",
	},
  });

//--- Vue-Meta ---
import VueMeta from 'vue-meta'
Vue.use(VueMeta)



Vue.config.productionTip = false

Vue.use(styglobals,styanimations)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
	this.$store.dispatch('usuario/local'),
	window.addEventListener('resize', () => {
		this.$store.commit('cambiarAncho')
	}, true),
	this.$store.commit('cargarPublicaciones'),
	this.$store.commit('cargarCategorias'),
	this.$store.commit('cargarProskers'),
	this.$store.commit('cargarCategoriasFAQ'),
	this.$store.commit('cargarCategoriasBlog'),
	this.$store.commit('cargarTagsBlog'),
	this.$store.commit('setearHora'),
	this.$store.commit('cargarPosicion'),
	this.$store.commit('cargarVideosAcademy'),
	setInterval(() => {
		this.$store.commit('setearHora')
	}, 8000)

}
}).$mount('#app')
