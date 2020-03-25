<template>
  <div class="news-page">
    <v-sidebar></v-sidebar>
    <main class="news-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">荟宝动态</h2>
          <h2 class="tit-en">News</h2>
        </div>
      </div>
      <div class="news-wrapper">
        <ul class="nav-list flex flex-align-center">
          <li @click="navToggle('all')" class="nav-item" :class="{ active: type == 'all' }">全部</li>
          <li @click="navToggle('information')" class="nav-item" :class="{ active: type == 'information' }">品牌资讯</li>
          <li @click="navToggle('activity')" class="nav-item" :class="{ active: type == 'activity' }">品牌活动</li>
        </ul>
        <ul v-if="list.length > 0" class="news-list clearfix">
          <nuxt-link tag="li" :to="'/detail/' + item.id" v-for="(item, index) in list" :key="index" class="news-item fl">
            <div class="item-img-box"><img class="item-img" :src="item.coverUrl" alt="" /></div>
            <div class="item-info">
              <p class="item-tit">{{ type }}{{ item.title }}</p>
              <p class="item-desc">{{ item.desc }}</p>
              <p class="item-other">
                <span class="item-type">{{ item.type }}</span>
                <span class="line">|</span>
                <span class="item-date">{{ item.date | dateformat('YYYY.MM.DD') }}</span>
              </p>
            </div>
          </nuxt-link>
        </ul>
        <button @click="" class="view-more">查看更多</button>
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
  // validate({ params, route }) {
  //   // 必须是number类型
  //   return /^\d+$/.test(params.id);
  // },
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
      SEOInfo: {},
      // 类型
      type: 'all',
      //
      list: [
        {
          id: 1,
          title: '新品曝光 | 为了这场见面，我们准备了3年',
          desc: '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领…',
          coverUrl: require('@/assets/images/others/1.jpg'),
          type: '品牌活动',
          date: '2019-01-02 15:01:15'
        },
        {
          id: 2,
          title: '新品曝光 | 为了这场见面，我们准备了3年',
          desc: '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领…',
          coverUrl: require('@/assets/images/others/2.jpg'),
          type: '品牌资讯',
          date: '2019-01-02 15:01:15'
        },
        {
          id: 3,
          title: '新品曝光 | 为了这场见面，我们准备了3年',
          desc: '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领…',
          coverUrl: require('@/assets/images/others/3.jpg'),
          type: '品牌活动',
          date: '2019-01-02 15:01:15'
        },
        {
          id: 4,
          title: '新品曝光 | 为了这场见面，我们准备了3年',
          desc: '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领…',
          coverUrl: require('@/assets/images/others/4.jpg'),
          type: '品牌资讯',
          date: '2019-01-02 15:01:15'
        },
        {
          id: 5,
          title: '新品曝光 | 为了这场见面，我们准备了3年',
          desc: '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领…',
          coverUrl: require('@/assets/images/others/5.jpg'),
          type: '品牌活动',
          date: '2019-01-02 15:01:15'
        },
        {
          id: 6,
          title: '新品曝光 | 为了这场见面，我们准备了3年',
          desc: '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领…',
          coverUrl: require('@/assets/images/others/6.jpg'),
          type: '品牌资讯',
          date: '2019-01-02 15:01:15'
        }
      ]
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
