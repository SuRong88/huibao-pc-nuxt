<template>
  <no-ssr>
    <swiper class="swiper-demo" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in 5" class="swiper-item">{{ item }}</swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </no-ssr>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  components: {
   vHeader(resolve) {
     require(['@/components/vHeader'], resolve);
   },
   vFooter(resolve) {
     require(['@/components/vFooter'], resolve);
   }
  },
  created() {
    this.$successToast('成功');
  },
  data() {
    return {
      swiperOption: {
        loop: false,
        speed: 1000,
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 50,
        // direction: 'vertical',
        initialSlide: 0,
        // 鼠标滑轮控制
        mousewheelControl: true,
        // 接受鼠标“拖动”控制
        simulateTouch: false,
        // 分页器
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // 进退按钮
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        // 滚动条
        scrollbar:'.swiper-scrollbar',
        // 滚动条是否自动隐藏
        scrollbarHide : false,
        // 滚动条是否可拖拽
        scrollbarDraggable : true ,
        // 如果设置为true，释放滚动条时slide自动贴合。
        scrollbarSnapOnRelease : true ,
        // 用户操作时停止autplay
        autoplayDisableOnInteraction: true,
        onInit: function(swiper) {
          swiper.slideTo(1)
        },
        onTransitionEnd: function(swiper) {
          console.log(swiper.realIndex);
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style lang="less">
.swiper-demo {
  width: 100vw;
  min-width: 1200px;
  height: 100vh;
  .swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(odd) {
      background-color: pink;
    }
    &:nth-child(even) {
      background-color: hotpink;
    }
    font-size: 100px;
  }
}
</style>
