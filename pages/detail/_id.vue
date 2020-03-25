<template>
  <div class="detail-page">
    <v-sidebar></v-sidebar>
    <main class="detail-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">荟宝动态</h2>
          <h2 class="tit-en">News</h2>
        </div>
      </div>
      <div class="detail-wrapper">
        <div class="detail-hd">
          <div class="hd-inner">
            <h2 class="tit">大事件|追梦20年，荟宝·我家的芦荟妆园20周年盛典璀璨绽放</h2>
            <p class="others text-r">
              <span class="item-date">2019.03.05</span>
              <span class="line">|</span>
              <span class="item-type">品牌资讯</span>
              <!-- <span class="item-type">{{ item.type }}</span>
              <span class="line">|</span>
              <span class="item-date">{{ item.date | dateformat('YYYY.MM.DD') }}</span> -->
            </p>
          </div>
        </div>
        <div class="detail-bd edit_textBox">
          <img src="@/assets/images/others/13.jpg" alt="" />
          芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领域深耕二十年的荟宝至今仍创新不断，继推出3X芦荟系列后，又构建了单品牌店商业新体系。
          荟宝为什么能持续为芦荟赋能？ 聚焦芦荟时代，汇集星光力量
          成立于1999年的荟宝品牌，自诞生之初就推出了荟宝化妆品日本木立芦荟系列，芦荟美肤的概念由此在国内市场广为传播。一路走来，荟宝已在芦荟领域深耕二十年。
          自创立之初，荟宝就坚持“专心专意做芦荟”，致力于打造芦荟家庭护理品牌NO.1，一直以来不断研发优质商品，为每个家庭带来美丽与健康，从而获得了“芦荟之宝”的美称。
          为寻觅最具有美容价值的芦荟品种，荟宝走遍全球，并由专业团队把关产品品质和安全。 早在十多年前，荟宝就着力于树立品牌形象，并通过挑选具有热度的明星代言人来进行品牌宣传。
          2008年，荟宝启用当红影视歌舞四栖明星金巧巧作为荟宝形象代言人，正式发起全国知名品牌的战略攻势。第二年，荟宝首创了化妆品品牌代言明星歌友会模式，引发了区域销售联动效应。2011年，“超级女声”首届冠军、中国草根选秀第一人安又琪成为公司品牌形象代言人，进一步推动了荟宝在市场上的传播热度。其后，荟宝又携手著名主持人李湘，推出了芦荟胶、芦荟原液、芦荟原汁、芦荟面膜等产品，并荣获中国化妆品年度“最佳芦荟品牌奖”。而在今年11月23日，荟宝20周年的会议上，又将有全新的明星代言人亮相登场。
          打造3X芦荟系列，走进千家万户
          英敏特数据表示，2012年我国芦荟产业产值已超300亿元，2017年产值达500亿元，未来的产业产值非常可观。同时亚洲化妆品市场对芦荟类护肤品的青睐不断提高，比例由2010年的11%上升到2014年的15%，而在2016年，中国化妆品行业的芦荟需求量占了全球芦荟总需求量的45%以上，芦荟制品有着巨大发展空间。
          基于此，荟宝将“专心专意做芦荟”作为自己的发展理念，并坚持选用更好的原材料，从源头保证产品质量。2014年，荟宝推出全新的3X芦荟系列，这是由荟宝健康芦荟（亚太）研究中心历时2年研发而成，独家添加全球首创的活性芦荟荟宝素，确保每款产品都相当于一支同等重量、去除了有害物质的天然芦荟精华，换句话说，一瓶荟宝产品，等同于3株新鲜芦荟。
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
  validate({ params, route }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  },
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
    let type = params.type || 'all';
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
      SEOInfo: SEOInfo,
      type: type
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {}
    };
  },
  methods: {
    navToggle(type) {
      this.$router.push({
        params: {
          type: type
        }
      });
    }
  }
};
</script>

<style lang="less"></style>
