<template>
  <div class="swiper-container" :class="{detail:isDetail}">
    <el-carousel indicator-position="none" arrow="never">
      <el-carousel-item v-for="(str, index) in listImg" :key="index">
        <div class="swiper-slide" :style="{backgroundImage: 'url(' + str.path + ')' }"></div>
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(str, index) in listImg" :key="index" :style="{backgroundImage: 'url(' + str.path + ')' }"></div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div> -->
    <v-login v-if='showLogin'></v-login>
  </div>
</template>

<script>
  //安装：npm install --save swiper
  /*import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';*/
  import login from '@/components/login/loginContainer'

  export default {
    props: ['listImg','isDetail','showLogin'],
    mounted() {
      if(this.listImg.length<=1){
        return;
      }
      /*var swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        //分页器
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: {
          delay:3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        onTouchEnd: function () {
          swiper.startAutoplay()
        },
        observer:true,
        observeParents:true
      });*/
    },
    components:{
      'v-login':login
    }
  }
</script>

<style lang="less">
  .swiper-container{
    height:768px;
  }
  .el-carousel__container{
    height:768px;
  }
  .el-carousel{
    width:100%;
    overflow-y:hidden;
  }
  .swiper-container {
    width: 100%;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      background-repeat:no-repeat;
      background-position: center;
      background-size: 100% 100%;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination-bullet {
      width: 0.833rem;
      height: 0.833rem;
      display: inline-block;
      background: #7c5e53;
    }
  }
</style>
