<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(d,index) in datos" :key="index" >
		<div class="dPublicaciones">
			<div class="fondo" :style="{ backgroundImage: 'url(' + d.imagen + ')' }" @click="ir('Publicacion',d)">
				<span class="descripcion">{{d.descripcion}}</span>	
			</div>
			<span class="prosker">
				<!-- <img :src="d.foto" alt="publicacion prosk"> -->
				<div class="foto" :style="{ backgroundImage: 'url(' + d.foto + ')' }" @click="ir('Prosker',d.idEncUsuario)" ></div>
				<p class="categoria">{{d.categoria.toLowerCase()}}</p>
				<span>
					<i class="material-icons">favorite</i>
					<p>{{d.like}}</p>
				</span>
			</span>
			<br>
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
	name: 'sliderPublicaciones',
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
				slidesPerView: 4,
				spaceBetween: 10,
				freeMode: true,
				// slidesPerGroup: 5, 
				// centeredSlides: true,
				slideToClickedSlide: true,
				// loop: true,
				// loopFillGroupWithBlank: true,
				autoplay: {
					stopOnLastSlide: true,
					delay: 2000
					},
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
    height: 220px;
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

	.dPublicaciones {
		width: 100%;
		height: auto;
		max-width: 300px;
		max-height: 300px;
		margin: 20px;

	}
	.fondo{
		width: 100%;
		height: 150px;
		/* background-image: url('@/assets/imagen1.jpg'); */
		background-size: 320px auto ;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		
	}

	.fondo span{
		width: 100%;
		height: 30px;
		background-color: rgba(0, 0, 0, .8);
		color: #fff;
		font-size: .8;
		overflow: hidden;

	}

	div img{
		width: 100%;
		height: auto;
	}

	.prosker{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--d-color);
	}
	.prosker .foto{
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		border-radius: 30px;
		margin: 2px;
		/* background-image: url('./foto1.jpg'); */
		background-color: var(--b-color);
		background-size: auto 50px ;
		background-position: center;
		background-repeat: no-repeat;
	}
	.prosker p{
		margin: 0 5px;
	}
	.prosker .categoria{
		text-transform: capitalize;
		line-height: 1;
		

	}
	.prosker span{
		display: flex;
		color: var(--a-color);
		background-color: var(--d-color);
	}

	i{
		color: var(--a-color);
	}
	.descripcion{
		font-size: .9em;
	}




</style>