<template>
  <div class="index-page">
    <v-sidebar></v-sidebar>
    <main class="index-main">
      <no-ssr>
        <swiper v-if="bannerList.length" class="index-banner" :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="item in bannerList" class="swiper-item">
            <nuxt-link tag="div" class="swiper-item-inner" :style="'background-image: url(' + item.coverUrl + ');'" :to="'/'" :title="item.title"></nuxt-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </no-ssr>
      <div v-show="swiperIndex < bannerList.length - 1" class="view-more">
        <div class="line"></div>
        <p class="txt">下滑查看更多</p>
      </div>
    </main>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  // default模板
  // layout: function(context) {
  //   return 'default-demo';
  // },
  // 参数校验（失败直接跳转至404页面）
  // validate({ params, route }) {
  //   // 必须是number类型
  //   return /^\d+$/.test(params.id);
  // },
  components: {
    vSidebar(resolve) {
      require(['@/components/vSidebar'], resolve);
    }
  },
  head() {
    return {
      title: this.SEOInfo.seo_title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.SEOInfo.seo_keyword
        },
        {
          hid: 'description',
          name: 'description',
          content: this.SEOInfo.seo_desc
        }
      ]
    };
  },
  async asyncData({ store, params, route, app }) {
    let SEOInfo = null;
    await app.$axios
      .get(URL.getSEOInfo, {
        params: {
          name: '/'
        }
      })
      .then(res => {
        SEOInfo = res.data;
        console.log('async请求成功');
      })
      .catch(err => {
        console.log(err);
        console.log('async请求失败');
      });
    return {
      SEOInfo: SEOInfo
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      swiperIndex: 0,
      swiperOption: {
        loop: false,
        speed: 1000,
        direction: 'vertical',
        mousewheelControl: true,
        // 接受鼠标“拖动”控制
        simulateTouch: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplayDisableOnInteraction: true,
        onInit: function(swiper) {},
        onTransitionStart: swiper => {
          console.log(swiper.realIndex);
          this.swiperIndex = swiper.realIndex;
        }
        // onTransitionEnd: swiper => {
        //   console.log(swiper.realIndex);
        //   console.log(this);
        //   this.swiperIndex = swiper.realIndex;
        // }
      },
      bannerList: [
        {
          title: '轮播title1',
          link: '/target01',
          coverUrl: require('@/assets/images/index/banner.jpg')
        },
        {
          title: '轮播title2',
          link: '/target02',
          coverUrl: require('@/assets/images/index/banner.jpg')
        },
        {
          title: '轮播title3',
          link: '/target03',
          coverUrl: require('@/assets/images/index/banner.jpg')
        }
      ]
    };
  }
};
</script>

<style lang="less"></style>
