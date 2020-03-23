<template>
  <div class="product-page">
    <v-sidebar></v-sidebar>
    <main class="product-main">
      <div class="product-box">
        <img class="product-banner" src="@/assets/images/others/prouduct.jpg" alt="" />
        <div class="intro-box">
          <img class="intro-tag" src="@/assets/images/culture/tag.png" alt="" />
          <p class="intro-tit">双重抗初老能量 逆转时光焕现美</p>
          <p class="intro-txt">
            利用先进的工艺提取技术，让芦荟的美容护理功效以更温和、更有效的形式完美呈现，舒缓保湿，有效缓解换季、压力、孕期等肌肤不适状况，打败疲惫和脆弱状态，日复一日，肌肤焕发健康光采！
          </p>
        </div>
        <div class="mul-box">
          <ul class="product-list flex">
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/a.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/b.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉眼部精华液</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/c.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/d.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
          </ul>
          <img class="mul-img" src="@/assets/images/others/MyAloneGarden.png" alt="" />
          <div class="view-more">
            <span class="button button-circle">
              <div class="in">
                <div class="t">DETAILS</div>
                <div class="button-svg">
                  <svg viewBox="0 0 160 160">
                    <path class="b" d="M80,10.5A69.5,69.5,0,1,1,10.5,80,69.5,69.5,0,0,1,80,10.5"></path>
                    <path class="f" d="M80,10.5A69.5,69.5,0,1,1,10.5,80,69.5,69.5,0,0,1,80,10.5"></path>
                  </svg>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>


      <!-- 2 -->
      <div class="product-box product-box-type2">
        <img class="product-banner" src="@/assets/images/others/prouduct2.jpg" alt="" />
        <div class="intro-box">
          <img class="intro-tag" src="@/assets/images/culture/tag.png" alt="" />
          <p class="intro-tit">1瓶=3株新鲜芦荟</p>
          <p class="intro-txt">
            特别添加200:1的活性芦荟荟宝素，实现1瓶=3株新鲜芦荟，先进的科学提取工艺，充分保留了天然芦荟原有的活性成分，高效补水保湿，让营养更易吸收，好吸收比新鲜芦荟更有效！
          </p>
        </div>
        <div class="mul-box">
          <ul class="product-list flex">
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/e.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/f.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉眼部精华液</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/g.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
            <li class="product-item">
              <img class="item-img" src="@/assets/images/others/h.jpg" alt="" />
              <p class="item-txt">荟宝芦荟多肽提拉洁面乳</p>
            </li>
          </ul>
          <img class="mul-img" src="@/assets/images/others/MyAloneGarden.png" alt="" />
          <div class="view-more">
            <span class="button button-circle">
              <div class="in">
                <div class="t">DETAILS</div>
                <div class="button-svg">
                  <svg viewBox="0 0 160 160">
                    <path class="b" d="M80,10.5A69.5,69.5,0,1,1,10.5,80,69.5,69.5,0,0,1,80,10.5"></path>
                    <path class="f" d="M80,10.5A69.5,69.5,0,1,1,10.5,80,69.5,69.5,0,0,1,80,10.5"></path>
                  </svg>
                </div>
              </div>
            </span>
          </div>
        </div>
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
  watchQuery: true,
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
      SEOInfo: {}
    };
  },
  computed: {}
};
</script>

<style lang="less">

</style>
