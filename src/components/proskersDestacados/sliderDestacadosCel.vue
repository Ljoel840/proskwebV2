<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide  v-for="(d,index) in proskersDestacados" :key="index" >
		<div class="contenedorUsuario" :key="index" @click="ir('Prosker',d.idEnc)">
			<div class="imagen" :style="{ backgroundImage: 'url(' + d.foto + ')' }"></div>
			<div class="texto">
				<h1>{{d.nombre}}</h1>
				<h4>{{d.nombreCategoria}}</h4>
				<h4>Uruguay</h4>
			</div>
		</div>
	</swiper-slide>
    
    <div class="swiper-pagination" slot="pagination"></div>
	<div class="swiper-button-prev" slot="button-prev" v-if="ancho>500"></div>
    <div class="swiper-button-next" slot="button-next" v-if="ancho>500"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
	name: 'sliderDestacadosCel',
	title: 'Multiple slides per view',
	components: {
		Swiper,
		SwiperSlide
	},
	data() {
		return {
			// swiperOption: {
			// 	slidesPerView: this.nroSlides,
			// 	spaceBetween: 10,
			// 	freeMode: true,
			// 	slideToClickedSlide: true,
			// 	loop: true,
			// 	autoplay: {
			// 		stopOnLastSlide: true,
			// 		delay: 3000
			// 		},
			// 	navigation: {
			// 		nextEl: '.swiper-button-next',
			// 		prevEl: '.swiper-button-prev'
			// 	},
			// }
		}
	},
	computed: {
		proskersDestacados(){
			return this.$store.state.proskersDestacados
		},
		ancho(){
			return this.$store.state.ancho
		},
		nSlides(){
			return this.ancho>1200 ? 5 : this.ancho>1000 ? 4 : this.ancho>700 ? 3 : this.ancho>600 ? 2 : 1
		},
		swiperOption(){
			return {
				slidesPerView: this.nSlides,
				spaceBetween: 10,
				freeMode: true,
				slideToClickedSlide: true,
				loop: true,
				autoplay: {
					stopOnLastSlide: true,
					delay: 3000
					},
				// navigation: {
				// 	nextEl: '.swiper-button-next',
				// 	prevEl: '.swiper-button-prev'
				// },
			}
		}
	},
	methods: {
		ir (pag,data) {
			// e.preventDefault()
			this.$router.push({
				name: pag, 
				params: {data}
			}).catch(() => {})
		},
	},
}
</script>

<style scoped>
	.swiper-container {
		width: 90%;
		height: 120px;
	}

	.swiper-button-prev:after, .swiper-button-next:after {
		font-size: 22px !important;
		color: var(--a-color);
	}

	.swiper-button-prev,.swiper-button-next{
		width: 40px;
		height: 40px;
		min-width: 22px;
		background-color: rgba(179, 179, 179, .5);
		border-radius: 20px;
	}

	.contenedorUsuario{
		width: 300px;
		height: auto;
		display: flex;
		justify-content: center;
		margin: 10px;
		cursor: pointer;
	}


	.imagen{
		width: 100px;
		height: 100px;
		background-position: center;
		background-size: auto 160px ;
		background-repeat: no-repeat;
		border-radius: 100px;
		border: 2px solid var(--b-color);
	}
	
	.texto{
		width: 140px ;
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.texto h1{
		margin: 0 10px;
		color:  var(--c-color);
		font-size: 1em;
	}
	.texto h4{
		margin: 0 10px;
		color:  var(--b-color);
		font-size: .7em;
	}


	@media (max-width: 1450px) {
		.swiper-container {
			width: 90%;
	
		}
	}
	@media (max-width: 1300px) {
		.swiper-container {
			width: 100%;
	
		}
	}


	@media (max-width: 600px) {
		.contenedorUsuario{
			padding-left: 15px;
		}

	}


</style>