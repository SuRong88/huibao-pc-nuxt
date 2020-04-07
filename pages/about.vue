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
        <div class="research">
          <h3 class="research-tit">芦荟研发实力</h3>
          <p class="research-txt">荟宝长期致力于芦荟在美容护肤领域的开发与研究，生产可被人体较大吸收的好芦荟产品。</p>
          <div class="screen">
            <div class="screen-top"><img class="img" :src="slideList[swiperIndex].iconUrl" alt="" /></div>
            <!-- <div class="screen-bottom text-l">
              <h3 class="b-tit">{{ currentSlide.title }}</h3>
              <p class="b-txt" v-html="currentSlide.txt"></p>
            </div> -->
            <no-ssr>
              <swiper class="screen-bottom text-l" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,inde) in slideList" class="swiper-item">
                 <h3 class="b-tit">{{ item.title }}</h3>
                 <p class="b-txt" v-html="item.txt"></p>
                </swiper-slide>
              </swiper>
            </no-ssr>
            <div class="screen-control">
              <div class="img-box" :style="'background-image: url(' + slideList[swiperIndex].imgUrl + ');'">
                <!-- <img class="img" :src="slideList[swiperIndex].imgUrl" alt="" /> -->
              </div>
              <div class="control">
                <img @click="slidePrev" id="prevBtn" class="btn-l" src="@/assets/images/culture/left.png" alt="" />
                <span class="line"></span>
                <img @click="slideNext" id="nextBtn" class="btn-r" src="@/assets/images/culture/right.png" alt="" />
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
      swiperIndex: 0,
      swiperOption: {
        loop: true,
        speed: 800,
        direction: 'vertical',
        onTransitionStart: swiper => {
          this.swiperIndex = swiper.realIndex;
        }
      },
      slideList: [
        {
          title: '跨时代的科学发现：芦荟多糖',
          txt:
            '荟宝用了6年时间，对灵芝、香菇、螺旋藻、芦荟等几十种植物进行了深入细致的对比研究，发现植物对人体之所以有很好的活性作用，是因为各种植物中或多或少的含有多糖成分，其中以芦荟多糖的效应较佳。芦荟多糖，经研究证明是超级活性物质，对人体有非常强的生理作用，具有提高免疫力、护肤、消炎、杀菌等生物活性。<br>经研究发现：芦荟多糖是芦荟制品中重要的理化指标,芦荟多糖的浓度决定芦荟产品品质的高低！好的芦荟精粹不仅芦荟多糖含量高,更重要的是要能被人体吸收。研究表明只有处于 50-200KD 的芦荟多糖,才能被人体较大吸收,才是真正的活性芦荟。<br>我们将分离出的高纯度活性芦荟多糖命名为 : 活性芦荟荟宝素。',
          iconUrl: require('@/assets/images/culture/huibao.png'),
          imgUrl: require('@/assets/images/culture/12.png')
        },
        {
          title: '荟宝素:比新鲜芦荟更有效',
          txt: '荟宝,致力于生产可被人体较大吸收的好芦荟产品,我们将分离出的高纯度活性芦荟多糖命名为 : 全球首创活性芦荟荟宝素。荟宝健康芦荟(亚太)研究中心证明,活性芦荟荟宝素不仅是人体吸收率较高的芦荟精粹,同时荟宝坚持在生产、独家添加 200:1 的活性芦荟精华,确保每一只产品相当于同等重量、去除了有害物质的一支天然芦荟精华。<br>【上佳产地】<br>只精选在上佳产地具有至高芦荟多糖含量的库拉索芦荟<br>【活性酶解】<br>经过活性芦荟酶解技术促使芦荟多糖活性化<br>【柔性干燥】<br>采用柔性干燥技术以经济方式使芦荟活性成分工业化<br>【至高纯度】<br>200:1 活性芦荟精萃比天然芦荟更多养分',
          iconUrl: require('@/assets/images/culture/huibao.png'),
          imgUrl: require('@/assets/images/culture/13.png')
        },
        {
          title: '荟宝素的十大功效',
          txt: '补水舒缓 / 滋润保湿 / 舒敏镇静 / 消炎杀菌 / 美白净肤<br>平滑肌肤 / 弹力嫩肤 / 祛痘控油 / 紧致毛孔 / 晒后修复',
          iconUrl: require('@/assets/images/culture/huibao.png'),
          imgUrl: require('@/assets/images/culture/12.png')
        }
      ]
    };
  },
  computed: {
    swiper(){
      return this.$refs.mySwiper.swiper
    }
  },
  methods:{
    slidePrev(){
      this.swiper.slidePrev()
    },
    slideNext(){
      this.swiper.slideNext()
    }
  }
};
</script>

<style lang="less"></style>
