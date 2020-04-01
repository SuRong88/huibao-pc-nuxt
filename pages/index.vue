<template>
  <div class="index-page">
    <v-sidebar></v-sidebar>
    <main class="index-main">
      <no-ssr>
        <swiper v-if="bannerList.length" class="index-banner" :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="item in bannerList" class="swiper-item">
            <!-- 1外链 -->
            <a v-if="item.link_type == 1" target="_blank" class="swiper-item-inner" :style="'background-image: url(' + item.img + ');'" :href="item.link" :title="item.name"></a>
            <!-- 2内链 -->
            <nuxt-link v-else class="swiper-item-inner" :style="'background-image: url(' + item.img + ');'" :to="item.link" :title="item.name"></nuxt-link>
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
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getBannerList, {
        params: {
          client: 1
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 1,
          module_id: '/'
        }
      })
    ]);
    return {
      bannerList: res01.data,
      SEOInfo: res02.data
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
        simulateTouch: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplayDisableOnInteraction: true,
        onInit: function(swiper) {},
        onTransitionStart: swiper => {
          console.log(swiper.realIndex);
          this.swiperIndex = swiper.realIndex;
        }
      },
      bannerList: []
    };
  }
};
</script>

<style lang="less"></style>
