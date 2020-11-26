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

Vue.config.productionTip = false

Vue.use(styglobals,styanimations)

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
	window.addEventListener('resize', () => {
		this.$store.commit('cambiarAncho')
	}, true),
	this.$store.commit('cargarPublicaciones'),
	this.$store.commit('cargarCategorias'),
	this.$store.commit('cargarProskers')
}
}).$mount('#app')
