
<template>
  <swiper class="swiper" :options="swiperOption" >
    <swiper-slide v-for="(d,index) in datos" :key="index">
		<div class="dcategorias" @click="ir('Mostrar Categorias',d)">
			<img class="imagen" :src="d.icon" alt="imagenes categorias">
			<span class="tooltiptext">{{d.nombre | capitalize}}</span>
		</div>
	</swiper-slide>
	<div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
	name: 'sliderCategorias',
	title: 'Multiple slides per view',
	components: {
		Swiper,
		SwiperSlide
	},
	props:{
		datos:{
			type: Array,
		},
		totalSlides:{
			type: Number,
			default: 14
		}
	},
	data() {
		return {
			// swiperOption: {
			// 	slidesPerView: this.totalSlides,
			// 	spaceBetween: 1,
			// 	freeMode: true,
			// 	// slidesPerGroup: 5, 
			// 	// centeredSlides: true,
			// 	slideToClickedSlide: true,
			// 	// loop: true,
			// 	loopFillGroupWithBlank: true,
			// 	// autoplay: {
			// 	// 	stopOnLastSlide: true,
			// 	// 	delay: 1500
			// 	// 	},
			// 	navigation: {
			// 		nextEl: '.swiper-button-next',
			// 		prevEl: '.swiper-button-prev'
			// 	},
			// 	// pagination:{
			// 	// 	el: '.swiper-pagination',
			// 	// 	clickable: true
			// 	// }
			// }
		}
	},
	
	filters: {
		capitalize(value) {
			if (!value) return ''
			value = value.toString().toLowerCase()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	computed: {
		ancho (){
			return this.$store.state.ancho
		},
		nSlides(){
			return this.ancho>900 ? 14 : this.ancho>700 ? 9 : this.ancho>500 ? 7 : 5
		},
		swiperOption(){
			return {
				slidesPerView: this.nSlides,
				spaceBetween: 1,
				freeMode: true,
				slideToClickedSlide: true,
				loopFillGroupWithBlank: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
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
	margin-top: 1em;
    width: 80%;
    height: 80px;
	/* padding-left: 20px; */
	/* padding-right: 50px; */
}


.dcategorias {
	width: 50px;
	height: auto;
	max-width: 50px;
	max-height: 50px;
	min-width: 50px;
	/* margin: 10px; */
	text-align: center;
	display: grid;
	grid-template-rows: auto;
	justify-items: center;
	cursor: pointer;

}

.imagen{
	width: 50px !important;
	height: 50px !important;
}
.dcategoria span{
	width: 100%;
	text-align: center;
}

.categorias{
	text-align: center;
	text-transform: capitalize;
	text-decoration: none;
	color: var(--a-color);
	}

.swiper-button-prev:after, .swiper-button-next:after {
	font-size: 22px !important;
	color: var(--a-color);
}
/* .swiper-button-prev,.swiper-button-next{
	width: 40px;
	height: 40px;
	min-width: 22px;
	background-color: rgba(179, 179, 179, .5);;
	border-radius: 20px;
	margin-top: -45px;
} */
.swiper-button-prev,.swiper-button-next{
	width: 40px;
	height: 110px;
	min-width: 22px;
	background-color: #fff;
	margin-top: -70px;
}
.swiper-button-prev{
	left: 0;
}
.swiper-button-next{
	right: 0;
}
.swiper-button-prev.swiper-button-disabled{
	opacity: 0;
}
.swiper-button-next.swiper-button-disabled{
	opacity: 0;
}

.tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 2px 5px;
  font-size: .8em;
  margin-top: 52px;
  position: absolute;
  margin-left: -20px;
  
  /* position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -60px; */
}

.dcategorias:hover .tooltiptext {
  visibility: visible;
}

@media (max-width: 1200px) {
	.swiper-container {
    	width: 90%;
	}
	
}
@media (max-width: 900px) {
	.swiper-container {
    	width: 95%;
	}
	
}


</style>