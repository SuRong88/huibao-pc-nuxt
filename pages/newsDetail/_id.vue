<template>
  <div class="news-detail-page">
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
            <h2 class="tit text-c">{{ articleInfo.name }}</h2>
            <p class="others text-r">
              <span class="item-date">{{ articleInfo.create_time | dateformat('YYYY.MM.DD') }}</span>
              <span class="line">|</span>
              <span class="item-type">{{ articleInfo.type || '暂无分类' }}</span>
            </p>
          </div>
        </div>
        <div v-html="articleInfo.body" class="detail-bd edit_textBox"></div>
      </div>
    </main>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
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
  async asyncData({ store, params, route, app }) {
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getArticleDetail, {
        params: {
          id: params.id
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'article_info',
          client: 1,
          module_id: params.id
        }
      })
    ]);
    return {
      articleInfo: res01.data,
      SEOInfo: res02.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: null,
      articleInfo: null
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
