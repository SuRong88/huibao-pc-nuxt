<template>
  <div class="product-page">
    <v-sidebar></v-sidebar>
    <main class="product-main">
      <div v-for="(item, index) in list" class="product-box">
        <img class="product-banner" :src="item.bg_img" alt="" />
        <!-- 修改为隐藏 -->
        <div v-show="false" class="intro-box">
          <img class="intro-tag" :src="item.tag_img" alt="" />
          <p class="intro-tit">{{ item.propaganda }}</p>
          <p class="intro-txt">{{ item.profiles }}</p>
        </div>
        <div class="mul-box">
          <ul class="product-list flex">
            <li v-for="(subItem, subIndex) in item.product_data" class="product-item">
              <div class="item-img-box"><img class="item-img" :src="subItem.product_img" alt="" /></div>
              <p class="item-txt">{{ subItem.product_title }}</p>
            </li>
          </ul>
          <img class="mul-img" src="@/assets/images/others/MyAloneGarden.png" alt="" />
          <a :href="item.link_url" target="_blank" class="view-more">
            <div id="wrap" style="width: 77px;height: 77px;">
              <svg viewBox="0 0 100 100">
                <path d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0" fill="none" stroke="#999" stroke-width="2">></path>
                <path
                  d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
                  fill="none"
                  stroke="#2C5432"
                  stroke-linecap="round"
                  class="my-svg-path"
                  transform="rotate(180,50,50)"
                  stroke-width="4"
                ></path>
              </svg>
              <p class="txt">查看更多</p>
            </div>
          </a>
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
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getProductList, {
        params: {
          type: 2,
          client: 1
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 1,
          module_id: 'product'
        }
      })
    ]);
    console.log({ res01 });
    return {
      list: res01.data,
      SEOInfo: res02.data
    };
  },
  data() {
    return {
      SEOInfo: {},
      list: []
    };
  }
};
</script>

<style lang="less"></style>
