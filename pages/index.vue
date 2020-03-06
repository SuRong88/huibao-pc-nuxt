<template>
  <div class="index-page">
    <v-header></v-header>
    <main></main>
    <v-footer></v-footer>
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
  components: {
    vHeader(resolve) {
      require(['@/components/vHeader'], resolve);
    },
    vFooter(resolve) {
      require(['@/components/vFooter'], resolve);
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
  }
};
</script>

<style lang="less"></style>
