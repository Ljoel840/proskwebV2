
<template>
  <swiper class="swiper" :options="swiperOption" >
    <swiper-slide v-for="(d,index) in datos" :key="index">
		<div class="dcategorias" @click="ir('Mostrar Categorias',d)">
			<img class="imagen" :src="d.icon" alt="imagenes categorias">
			<span>
				<a href="#" class="categorias">
					{{d.nombre.toLowerCase()}}
				</a>
			</span>	
		</div>
	</swiper-slide>
    
    <div class="swiper-pagination" slot="pagination"></div>
	<div class="swiper-button-prev" slot="button-prev"></div>
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
	},
	data() {
		return {
			swiperOption: {
				slidesPerView: 8,
				spaceBetween: 10,
				freeMode: true,
				// slidesPerGroup: 5, 
				// centeredSlides: true,
				slideToClickedSlide: true,
				loop: true,
				loopFillGroupWithBlank: true,
				// autoplay: {
				// 	stopOnLastSlide: true,
				// 	delay: 1500
				// 	},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				// pagination:{
				// 	el: '.swiper-pagination',
				// 	clickable: true
				// }
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
    width: 80%;
    height: 120px;
}


.dcategorias {
	width: 120px;
	height: auto;
	max-width: 120px;
	max-height: 120px;
	min-width: 100px;
	margin: 10px;
	text-align: center;
	display: grid;
	grid-template-rows: auto;
	justify-items: center;
	cursor: pointer;

}

.imagen{
	width: 80px !important;
	height: 80px !important;
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
.swiper-button-prev,.swiper-button-next{
	width: 40px;
	height: 40px;
	min-width: 22px;
	background-color: rgba(179, 179, 179, .5);;
	border-radius: 20px;
}

</style>