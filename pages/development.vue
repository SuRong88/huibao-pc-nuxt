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
              <span>
                广州澳梓美生物科技有限公司成立于1999年，是一家集营销运作、加盟连锁为一体的大型化妆品公司，营销网络已遍布全国。旗下品牌为专注芦荟护肤21年的荟宝品牌，化妆品行业杰出芦荟品牌，以及目前全国拥有3200多家芦荟单品牌店“荟宝·我家的芦荟妆园”加盟店。“荟宝·我家的芦荟妆园”是一家以芦荟为核心的单品牌店，也是中国特色芦荟家庭护理品牌，
                “荟”聚世界好芦荟产品，拥有丰富的芦荟品类结构，有护肤系列、彩妆产品、洗护产品、婴童、孕妇等家庭护理产品，满足家庭所有人群的需求，真正实现一站式购物，快捷方便。
              </span>
            </p>
          </div>
          <div class="about-r">
            <img class="img" src="@/assets/images/culture/1.jpg" alt="" />
            <img class="img" src="@/assets/images/culture/2.jpg" alt="" />
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
        <div class="our-news-box"><h3 class="news-tit">我们的大事件</h3></div>
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

<style lang="less"></style>
