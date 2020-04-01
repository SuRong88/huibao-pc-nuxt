<template>
  <div class="advantage-page">
    <v-sidebar></v-sidebar>
    <main class="advantage-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">荟宝优势</h2>
          <h2 class="tit-en">Join investment</h2>
        </div>
      </div>
      <!-- 富文本 -->
      <div v-html="detail || '暂无内容'" class="advantage-wrapper text-c edit_textBox"></div>
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
      app.$axios.get(URL.getCustomArticle, {
        params: {
          sign: 'advantage'
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
      detail: res01.data.content,
      SEOInfo: res02.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      detail: ''
    };
  }
};
</script>

<style lang="less"></style>
