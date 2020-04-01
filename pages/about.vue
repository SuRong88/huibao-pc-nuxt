<template>
  <div class="about-page">
    <v-sidebar></v-sidebar>
    <main class="about-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">荟宝文化</h2>
          <h2 class="tit-en">About us</h2>
        </div>
      </div>
      <div class="about-wrapper">
        <ul class="base-list">
          <li class="base-item">
            <h3 class="item-tit">云南元江20000亩高山芦荟种植基地</h3>
            <p class="item-txt">
              云南元江，中国芦荟之乡，野生芦荟发源地，是亚洲较大的库拉索芦荟种植基地。这里得天独厚的热带自然气候，充足的阳光和地理环境条件，
              <br />
              在红河谷和高山包围下孕育了2万亩肥沃健硕的芦荟，芦荟多糖含量超高，活性更强，对老化肌肤的修护能力更有效。
              <br />
              工厂采用超高水准的设备、工艺流程及先进工艺和严格的生产管理，从根本上保证了芦荟原料的一流质量。
            </p>
            <img class="item-img" src="@/assets/images/culture/aboutus1.jpg" alt="" />
          </li>
          <li class="base-item">
            <h3 class="item-tit">海南5000亩芦荟种植基地</h3>
            <p class="item-txt">
              库拉索岛是世界上好芦荟的原产地，而中国著名的库拉索芦荟产地在海南，这里得天独厚，与库拉索岛同一纬度，常年气温在 26-28° C,
              <br />
              温暖干燥和阳光充足造就了优质芦荟的生长。荟宝在海南的 5000 亩芦荟种植基地，采用与美国 Aloecorp 相同的农场管理 SOP，
              <br />
              坚持以 4Q 黄金标准供应芦荟原料,确保芦荟生长和采集达到较优品质。
            </p>
            <img class="item-img" src="@/assets/images/culture/aboutus2.jpg" alt="" />
          </li>
        </ul>
        <ul class="show-list">
          <li class="show-item flex flex-jcsb">
            <div class="item-l"><img class="item-img" src="@/assets/images/culture/Quality-Breed.jpg" alt="" /></div>
            <div class="item-r mul">
              <img class="mul-icon" src="@/assets/images/culture/Quality-Breed.png" alt="" />
              <p class="mul-tit">黄金芦荟品质</p>
              <p class="mul-line"></p>
              <p class="mul-txt">正宗美国原产库拉索芦荟</p>
            </div>
          </li>
          <li class="show-item flex flex-jcsb">
            <div class="item-l mul">
              <img class="mul-icon" src="@/assets/images/culture/Quality-Plant.png" alt="" />
              <p class="mul-tit">黄金农场种植</p>
              <p class="mul-line"></p>
              <p class="mul-txt">先天地理条件，露天农场种植</p>
            </div>
            <div class="item-r"><img class="item-img" src="@/assets/images/culture/Quality-Plant.jpg" alt="" /></div>
          </li>
          <li class="show-item flex flex-jcsb">
            <div class="item-l"><img class="item-img" src="@/assets/images/culture/Quality-Picking.jpg" alt="" /></div>
            <div class="item-r mul">
              <img class="mul-icon" src="@/assets/images/culture/Quality-Picking.png" alt="" />
              <p class="mul-tit">黄金时期收割</p>
              <p class="mul-line"></p>
              <p class="mul-txt">只收割处三年黄金生长期芦荟</p>
            </div>
          </li>
          <li class="show-item flex flex-jcsb">
            <div class="item-l mul">
              <img class="mul-icon" src="@/assets/images/culture/Quality-Extrac.png" alt="" />
              <p class="mul-tit">黄金原汁萃取</p>
              <p class="mul-line"></p>
              <p class="mul-txt">99%只采用新鲜芦荟萃取</p>
            </div>
            <div class="item-r"><img class="item-img" src="@/assets/images/culture/Quality-Extrac.jpg" alt="" /></div>
          </li>
          <div class="line-box">
            <div class="line-dot"></div>
            <div class="line-dot"></div>
            <div class="line-dot"></div>
            <div class="line-dot"></div>
          </div>
        </ul>
        <div class="research" v-if="currentSlide">
          <h3 class="research-tit">芦荟研发实力</h3>
          <p class="research-txt">荟宝长期致力于芦荟在美容护肤领域的开发与研究，生产可被人体较大吸收的好芦荟产品。</p>
          <div class="screen">
            <div class="screen-top"><img class="img" :src="currentSlide.iconUrl" alt="" /></div>
            <div class="screen-bottom">
              <h3 class="b-tit">{{ currentSlide.title }}</h3>
              <p class="b-txt">{{ currentSlide.txt }}</p>
            </div>
            <div class="screen-control">
              <div class="img-box"><img class="img" :src="currentSlide.imgUrl" alt="" /></div>
              <div class="control">
                <img class="btn-l" src="@/assets/images/culture/left.png" alt="" />
                <span class="line"></span>
                <img class="btn-r" src="@/assets/images/culture/right.png" alt="" />
              </div>
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
          module_id: 'about'
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
      SEOInfo: {},
      slideList: [
        {
          title: '跨时代的科学发现：芦荟多糖',
          txt:
            '荟宝用了6年时间，对灵芝、香菇、螺旋藻、芦荟等几十种植物进行了深入细致的对比研究，发现植物对人体之所以有很好的活性作用，是因为各种植物中或多或少的含有多糖成分，其中以芦荟多糖的效应较佳。芦荟多糖，经研究证明是超级活性物质，对人体有非常强的生理作用，具有提高免疫力、护肤、消炎、杀菌等生物活性。经研究发现：芦荟多糖是芦荟制品中重要的理化指标,芦荟多糖的浓度决定芦荟产品品质的高低！好的芦荟精粹不仅芦荟多糖含量高,更重要的是要能被人体吸收。研究表明只有处于 50-200KD 的芦荟多糖,才能被人体较大吸收,才是真正的活性芦荟。我们将分离出的高纯度活性芦荟多糖命名为 : 活性芦荟荟宝素。',
          iconUrl: require('@/assets/images/culture/huibao.png'),
          imgUrl: require('@/assets/images/culture/12.png')
        }
      ]
    };
  },
  computed: {
    currentSlide() {
      return this.slideList[0];
    }
  }
};
</script>

<style lang="less"></style>
