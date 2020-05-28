<template>
  <div class="advantage-page">
    <v-sidebar></v-sidebar>
    <main class="advantage-main">
      <div class="img-box img-box01"><img class="img" src="@/assets/images/advantage/01.jpg" alt="" /></div>
      <div class="img-box img-box02"><img class="img" src="@/assets/images/advantage/02.jpg" alt="" /></div>
      <div class="img-box img-box03"><img class="img" src="@/assets/images/advantage/03.jpg" alt="" /></div>
      <div class="img-box img-box04"><img class="img" src="@/assets/images/advantage/04.jpg" alt="" /></div>
      <div class="img-box img-box05"><img class="img" src="@/assets/images/advantage/05.jpg" alt="" /></div>
      <div class="img-box img-box06"><img class="img" src="@/assets/images/advantage/06.jpg" alt="" /></div>
      <div class="img-box img-box07"><img class="img" src="@/assets/images/advantage/07.jpg" alt="" /></div>
      <div class="img-box img-box08"><img class="img" src="@/assets/images/advantage/08.jpg" alt="" /></div>
      <div class="img-box img-box09"><img class="img" src="@/assets/images/advantage/09.jpg" alt="" /></div>
      <div class="img-box img-box10">
        <img class="img" src="@/assets/images/advantage/10.jpg" alt="" />
        <!-- 创业者列表 -->
        <div class="inf-list clearfix">
          <div v-for="item in list" class="inf-item fl">
            <div class="item-t"><img class="item-img" :src="item.cover_img" alt="" /></div>
            <div class="item-b">
              <div class="item-tit">{{ item.name }}</div>
              <div class="item-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="img-box img-box11"><img class="img" src="@/assets/images/advantage/11.jpg" alt="" /></div>
      <div class="img-box img-box12">
        <nuxt-link to="/contact" class="link01" href="">
          <img class="link-img" src="@/assets/images/advantage/link01.jpg" alt="" />
        </nuxt-link>
        <img class="img" src="@/assets/images/advantage/link-spe.jpg" alt="" />
        <nuxt-link to="/news/all" class="link02" href="">
          <img class="link-img" src="@/assets/images/advantage/link02.jpg" alt="" />
        </nuxt-link>
       <!-- <img class="img" src="@/assets/images/advantage/12.jpg" alt="" />
        <nuxt-link to="/apply" class="link01" href="">
          <img class="link-img" src="@/assets/images/advantage/join.png" alt="" />
        </nuxt-link>
        <nuxt-link to="/news/all" class="link02" href="">
          <img class="link-img" src="@/assets/images/advantage/hot.png" alt="" />
        </nuxt-link> -->

      </div>
    </main>
    <!--
    <main class="advantage-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">荟宝优势</h2>
          <h2 class="tit-en">Join investment</h2>
        </div>
      </div>
      <div v-html="detail || '暂无内容'" class="advantage-wrapper text-c edit_textBox"></div>
      -->
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
      app.$axios.get(URL.getEntrepreneursList, {
        params: {
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 1,
          module_id: 'advantage'
        }
      })
    ]);
    return {
      list: res01.data.list,
      SEOInfo: res02.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      list:[]
      // detail: ''
    };
  }
};
</script>

<style lang="less"></style>
