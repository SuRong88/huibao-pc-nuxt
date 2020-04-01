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
          <li v-for="(item, index) in typeList" :key="index" @click="navToggle(item.id)" class="nav-item" :class="{ active: type == item.id }">{{ item.name }}</li>
        </ul>
        <ul v-if="list.length > 0" class="news-list clearfix">
          <nuxt-link tag="li" :to="'/newsDetail/' + item.id" v-for="(item, index) in list" :key="index" class="news-item fl">
            <div class="item-img-box"><img class="item-img" :src="item.img" alt="" /></div>
            <div class="item-info">
              <p class="item-tit">{{ item.name }}</p>
              <p class="item-desc">{{ item.summary }}</p>
              <p class="item-other">
                <span class="item-type">{{ item.type || '暂无分类' }}</span>
                <span class="line">|</span>
                <span class="item-date">{{ item.time | dateformat('YYYY.MM.DD') }}</span>
              </p>
            </div>
          </nuxt-link>
        </ul>
        <button v-show="!isLastPage" @click="viewMore" class="view-more">查看更多</button>
      </div>
    </main>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
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
    // 文章分类id
    let type = (params.type == '-1' || !params.type) ? -1 : params.type;
    console.log('type' + type);
    let [res01, res02, res03] = await Promise.all([
      app.$axios.get(URL.getArticleType),
      app.$axios.get(URL.getArticleList, {
        params: {
          classify_id: type,
          client: 1,
          page: 1,
          rownum: 6
        }
      }),
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'article_list',
          client: 1,
          module_id: type
        }
      })
    ]);
    res01.data.unshift({
      id: 'all',
      name: '全部',
      template: 'article_default'
    });
    let pagination = res02.data.pagination;
    return {
      type: params.type == -1 ? 'all' : params.type,
      typeList: res01.data,
      list: res02.data.list,
      currentPage: pagination.current,
      isLastPage: pagination.current == pagination.total_page,
      SEOInfo: res03.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      typeList: [],
      // 类型
      type: 'all',
      currentPage: 1,
      isLastPage: false,
      //
      list: []
    };
  },
  methods: {
    // 分类切换
    navToggle(type) {
      this.$router.push({
        params: {
          type: type
        }
      });
    },
    // 查看更多
    viewMore() {
      let type = (this.$route.params.type == '-1' || !this.$route.params.type) ? -1 : this.$route.params.type;
      let that = this;
      this.$axios
        .get(URL.getArticleList, {
          params: {
            classify_id: type,
            client: 1,
            page: ++that.currentPage,
            rownum: 6
          }
        })
        .then(res => {
          let data = res.data;
          that.list = that.list.concat(data.list);
          that.isLastPage = data.pagination.current == data.pagination.total_page;
        })
        .catch(err => {
          return this.$errorToast('数据获取失败');
        });
    }
  }
};
</script>

<style lang="less"></style>
