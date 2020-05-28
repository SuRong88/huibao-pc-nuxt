<template>
  <div class="development-page">
    <v-sidebar></v-sidebar>
    <main class="development-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">发展历程</h2>
          <h2 class="tit-en">Development history</h2>
        </div>
      </div>
      <div class="development-wrapper">
        <div class="about-box flex flex-jcsb">
          <div class="about-l">
            <p class="about-tit">公司概况</p>
            <p class="about-txt text-j">
              <span>
                广州澳梓美生物科技有限公司成立于1999年，是一家集营销运作、加盟连锁为一体的大型化妆品公司，营销网络已遍布全国。旗下品牌为专注芦荟护肤21年的荟宝品牌，化妆品行业杰出芦荟品牌，以及目前全国拥有3200多家芦荟单品牌店“荟宝·我家的芦荟妆园”加盟店。“荟宝·我家的芦荟妆园”是一家以芦荟为核心的单品牌店，也是中国特色芦荟家庭护理品牌，
                “荟”聚世界好芦荟产品，拥有丰富的芦荟品类结构，有护肤系列、彩妆产品、洗护产品、婴童、孕妇等家庭护理产品，满足家庭所有人群的需求，真正实现一站式购物，快捷方便。
              </span>
             <!-- <span>
                广州澳梓美生物科技有限公司成立于1999年，是一家集营销运作、加盟连锁为一体的大型化妆品公司，营销网络已遍布全国。旗下品牌为专注芦荟护肤21年的荟宝品牌，化妆品行业杰出芦荟品牌，以及目前全国拥有3200多家芦荟单品牌店“荟宝·我家的芦荟妆园”加盟店。“荟宝·我家的芦荟妆园”是一家以芦荟为核心的单品牌店，也是中国特色芦荟家庭护理品牌，
                “荟”聚世界好芦荟产品，拥有丰富的芦荟品类结构，有护肤系列、彩妆产品、洗护产品、婴童、孕妇等家庭护理产品，满足家庭所有人群的需求，真正实现一站式购物，快捷方便。
              </span> -->
            </p>
          </div>
          <div class="about-r">
            <img class="img" src="@/assets/images/about/img13.jpg" alt="" />
            <!-- <img class="img" src="@/assets/images/culture/2.jpg" alt="" /> -->
          </div>
        </div>
        <div class="mul-box">
          <ul class="mul-list flex flex-jcsb">
            <li class="mul-item">
              <img class="item-img" src="@/assets/images/culture/3yewu.jpg" alt="" />
              <p class="item-tit">公司业务</p>
              <p class="item-desc">生产研发、培训教育、营销运作、加盟连锁</p>
            </li>
            <li class="mul-item">
              <img class="item-img" src="@/assets/images/culture/4linan.jpg" alt="" />
              <p class="item-tit">品牌理念</p>
              <p class="item-desc">高品质、高形象、高服务</p>
            </li>
            <li class="mul-item">
              <img class="item-img" src="@/assets/images/culture/5jiazhiguan.jpg" alt="" />
              <p class="item-tit">核心价值观</p>
              <p class="item-desc">
                直接表达想法 高效相互协作
                <br />
                维护契约精神 一起快乐工作
              </p>
            </li>
          </ul>
        </div>
        <div class="our-news-box">
          <h3 class="news-tit">我们的大事件</h3>
          <div class="news-box flex">
            <div class="box-l"><ul class="news-pagination swiper-pagination" slot="pagination"></ul></div>
            <div class="box-r">
              <no-ssr>
                <swiper v-if="newsList.length" class="news-swiper" :options="swiperOption" ref="mySwiper">
                  <swiper-slide v-for="(item, index) in newsList" class="swiper-item">
                    <div class="slide-top flex flex-ver flex-end">
                      <span class="date">{{ item.date | dateformat('YYYY.MM') }}</span>
                      <img class="date-icon" src="@/assets/images/icons/year.png" alt="" />
                    </div>
                    <div class="slide-bottom">
                      <p class="slide-tit">{{ index }}{{ item.title }}</p>
                      <img v-if="item.coverUrl" class="slide-img" :src="item.coverUrl" alt="" />
                    </div>
                  </swiper-slide>
                </swiper>
              </no-ssr>
            </div>
          </div>
        </div>
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
  async asyncData({ store, params, query, route, app }) {
    let [res01] = await Promise.all([
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 1,
          module_id: 'development'
        }
      })
    ]);
    return {
      SEOInfo: res01.data
    };
  },
  created() {},
  data() {
    let that = this;
    return {
      SEOInfo: {},
      swiperOption: {
        loop: false,
        speed: 800,
        direction: 'vertical',
        // mousewheelControl: true,
        simulateTouch: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: (swiper, index, className) => {
          return '<li class="' + className + '">' + that.$formatDate(this.newsList[index].date,'YYYY') + ' ~</li>';
        },
        effect: 'coverflow',
        slidesPerView: 3,
        spaceBetween: 5,
        centeredSlides: true,
        slidesPerView: 3,
        initialSlide:1,
        loopFillGroupWithBlank: true,
        coverflow: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false
        },
        autoplayDisableOnInteraction: true
      },
      newsList: [
        {
          title: '占位',
          date: '1970-12-01 15:01:22',
          coverUrl: require('@/assets/images/culture/6.jpg')
        },
        {
          title: '荟宝三大系列108单品亮相全国。',
          date: '2001-12-01 15:01:22',
          coverUrl: require('@/assets/images/culture/6.jpg')
        },
        {
          title: '荟宝三大系列108单品亮相全国。',
          date: '2002-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/1.jpg')
        },
        {
          title: '荟宝三大系列108单品亮相全国。',
          date: '2003-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/2.jpg')
        },
        {
          title: '荟宝三大系列108单品亮相全国。',
          date: '2004-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/3.jpg')
        },
        {
          title: '荟宝三大系列108单品亮相全国。',
          date: '2005-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/4.jpg')
        },
        {
          title: '荟宝三大系列108单品亮相全国。',
          date: '2006-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/5.jpg')
        },
        {
          title: '荟宝三大系列108单品亮相全国。',
          date: '2006-12-01 15:01:22',
          coverUrl: require('@/assets/images/others/5.jpg')
        },
        // {
        //   title: '占位',
        //   date: '2006-12-01 15:01:22',
        //   coverUrl: require('@/assets/images/others/5.jpg')
        // }
      ]
    };
  },
  computed: {}
};
</script>

<style lang="less">
</style>
