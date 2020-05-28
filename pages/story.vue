<template>
  <div class="story-page">
    <v-sidebar></v-sidebar>
    <main class="story-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">品牌故事</h2>
          <h2 class="tit-en">Our story</h2>
        </div>
      </div>
      <div class="story-wrapper">
        <section class="sec01 text-c">
          <h2 class="common-tit">关于“我家的芦荟妆园”</h2>
          <p class="common-txt">
            荟宝·我家的芦荟妆园
            <br />
            分享来自大自然智慧的健康护肤理念
            <br />
            用绿色、天然、有爱的芦荟产品
            <br />
            为万千家庭带来关爱、幸福、健康和美丽
            <br />
            帮助中国家庭树立天然健康的绿色生活方式
          </p>
          <div class="common-view-more">
            <p class="line"></p>
            <p class="txt">下滑查看更多</p>
          </div>
        </section>
        <section class="sec02 flex flex-center">
                  我家的芦荟妆园主打绿色、天然、有爱的芦荟产品，
                  <br />
                  分享来自大自然智慧的健康护肤理念。
                </section>
                <section class="sec03">
                  <div class="sec03-item">
                    <img class="item-img" src="@/assets/images/about/img47.jpg" alt="" />
                    <div class="item-tit">芦荟美容食妍室</div>
                    <div class="item-txt" style="margin-bottom: 1.8rem;">
                      品牌创始人的母亲是不折不扣的生活美学家。她的双手拥有魔力，能将花园打造成一片绿意盎然。在所有种植的植物中，母亲对芦荟情有独钟。因其美容的功效，常见母亲在料理室调配芦荟胶的身影。她那专注的神情，就好像做一场有趣的实验。料理室不仅仅是诞生美食的场所，更是她们家的美容食妍室。朋友们对手工护肤品的认可让她倍感成就。于是花更多的时间研究芦荟的美容价值，把这份大自然赋予的美丽分享给更多人。
                    </div>
                    <div class="item-txt">
                      “如今，芦荟护肤成为母女共同的事业。为寻觅更具有美容价值的芦荟品种，她们走遍全球，最终甄选引进128万株”
                      美国库拉索芦荟，并与海南、元江万亩库拉索芦荟种植基地和活性芦荟国际加工厂达成战略合作，由专业团队把关产品品质和安全。”
                    </div>
                  </div>
                  <div class="sec03-item">
                    <img class="item-img" src="@/assets/images/about/img48.jpg" alt="" />
                    <div class="item-tit">芦荟，治愈系植物</div>
                    <div class="item-txt" style="width: 550px;margin: 0 auto;">
                      我们相信，芦荟的价值被远远低估了。在安宁沉稳的外表下，芦荟蕴藏着神奇的治愈能量，对皮肤有着滋润、增白作用。而在所有品种中，库拉索芦荟是至适宜直接美容的芦荟鲜叶。传统的技术浪费了芦荟的美容功效。我家的芦荟妆园研发团队利用先进的科学技术
                      分离出高纯度活性芦荟多糖，使产品更易皮肤吸收。
                    </div>
                  </div>
                  <div class="sec03-item">
                    <img class="item-img" src="@/assets/images/about/img482.jpg" alt="" />
                    <div class="item-tit">芦荟美容，被赋予更多…</div>
                    <div class="item-txt">
                      我家的芦荟妆园采用纯天然芦荟原料，减少化工产品对皮肤的损害。我们推崇的是一种自然护肤方式，更是一种健康环保的生活方式。真正的美丽是“天然去雕饰”。芦荟护肤带来纯净美丽的同时，还提醒我们世界原本的样子，回归那一份朴素单纯。因为我们相信，大自然不仅会给我们美丽的馈赠，还会催生内心的优美、平和。
                    </div>
                  </div>
                </section>
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
          module_id: 'story'
        }
      })
    ]);
    return {
      SEOInfo: res01.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {}
    };
  }
};
</script>

<style lang="less"></style>
