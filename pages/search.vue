<template>
  <div class="search-page">
    <v-sidebar></v-sidebar>
    <main class="search-main">
      <div class="search-wrapper">
        <div class="search-box">
          <div class="search-enter-box">
            <input v-model="keyword" @keyup.enter="searchHandle" class="search-enter" placeholder="请输入搜索内容" type="text" />
            <img @click="searchHandle" class="search-icon" src="@/assets/images/side/search.png" alt="" />
          </div>
          <p v-if="list.length > 0" class="search-tip">
            为您找到相关结果
            <span>100</span>
            个
          </p>
        </div>
        <!-- 1.有结果 -->
        <ul v-if="list.length > 0" class="result-list">
          <li v-for="(item, index) in list" class="result-item flex">
            <div class="img-box"><img class="img" :src="item.coverUrl" alt="" /></div>
            <div class="info-box">
              <h2 class="item-tit">{{ item.title }}</h2>
              <p class="item-desc">{{ item.desc }}</p>
              <p class="item-date">{{ item.createTime | dateformat('YYYY.MM.DD') }}</p>
            </div>
          </li>
        </ul>
        <!-- 2.无结果 -->
        <p v-else class="no-result">抱歉，没有找到关于“{{ keyword }}”的相关结果!</p>
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
      keyword: query.keyword
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      keyword: '',
      list: [
        {
          title: '专注芦荟二十年，荟宝为什么能节节攀高？',
          desc:
            '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领域深耕二十年的荟宝至今仍创新不断，继推出3X芦荟系列后，又构建了单品牌店商业新体系。荟宝为什么能持续为芦荟赋能？',
          createTime: '2018-08-07 00:00:00',
          link: '/target01',
          coverUrl: require('@/assets/images/others/1.jpg')
        },
        {
          title: '大事件|追梦20年，荟宝·我家的芦荟妆园20周年盛典璀璨绽放',
          desc:
            '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领域深耕二十年的荟宝至今仍创新不断，继推出3X芦荟系列后，又构建了单品牌店商业新体系。荟宝为什么能持续为芦荟赋能？',
          createTime: '2018-08-07 00:00:00',
          link: '/target01',
          coverUrl: require('@/assets/images/others/2.jpg')
        },
        {
          title: '专注芦荟二十年，荟宝为什么能节节攀高？专注芦荟二十年，荟宝为什么能节节攀高？',
          desc:
            '芦荟护肤的概念早已深入人心，市场上的芦荟品牌也是琳琅满目，而在芦荟领域深耕二十年的荟宝至今仍创新不断，继推出3X芦荟系列后，又构建了单品牌店商业新体系。荟宝为什么能持续为芦荟赋能？',
          createTime: '2018-08-07 00:00:00',
          link: '/target01',
          coverUrl: require('@/assets/images/others/3.jpg')
        }
      ]
    };
  },
  methods: {
    // 搜索
    searchHandle() {
      if (!this.keyword) {
        return false;
      }
      this.$router.push({
        query: {
          keyword: this.keyword
        },
        path: '/search'
      });
    }
  }
};
</script>

<style lang="less"></style>
