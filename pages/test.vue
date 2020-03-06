<template>
  <div class="test-page">{{ JSON.stringify(SEOInfo) }}</div>
</template>

<script>
import URL from '@/plugins/url.js';
import vNav from '@/components/vNav.vue';
import vFooter from '@/components/vFooter.vue';
export default {
  components: {
    vNav,
    vFooter
  },
  async asyncData({ route, app }) {
    let SEOInfo = null;
    await app.$axios
      .get(URL.getSEOInfo, {
        params: {
          name: '/'
        }
      })
      .then(res => {
        // console.log(res);
        res.data && (SEOInfo = res.data);
      })
      .catch(err => {
        // console.log('response报错');
      });
    return {
      SEOInfo: SEOInfo
    };
  },
  created() {
    // if (process.client) {
    //   this.$axios
    //     .get(URL.getSEOInfo, {
    //       params: {
    //         name: '/'
    //       }
    //     })
    //     .then(res => {
    //       console.log('客户端请求成功');
    //       console.log(res.data);
    //     })
    //     .catch(err => {
    //       console.log('客户端请求失败');
    //     });
    // }
  },
  data() {
    let that = this;
    return {
      SEOInfo: {}
    };
  }
};
</script>

<style></style>
