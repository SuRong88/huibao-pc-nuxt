<template>
  <div class="search-page">
    <v-sidebar></v-sidebar>
    <main class="search-main">
      <div class="search-wrapper">
        <div class="search-box">
          <div class="search-enter-box">
            <input v-model="keyword0" @keyup.enter="searchHandle" class="search-enter" placeholder="请输入搜索内容" type="text" />
            <img @click="searchHandle" class="search-icon" src="@/assets/images/side/search.png" alt="" />
          </div>
          <p v-if="list.length > 0" class="search-tip">
            为您找到相关结果
            <span>{{ total }}</span>
            个
          </p>
        </div>
        <!-- 1.有结果 -->
        <template v-if="list.length > 0">
          <ul class="result-list">
            <nuxt-link tag="li" :to="'/newsDetail/' + item.id" v-for="(item, index) in list" :key="index" class="result-item flex pointer">
              <div class="img-box"><img class="img" :src="item.img" alt="" /></div>
              <div class="info-box">
                <h2 class="item-tit">{{ item.name }}</h2>
                <p class="item-desc">{{ item.summary }}</p>
                <p class="item-date">{{ item.time | dateformat('YYYY.MM.DD') }}</p>
              </div>
            </nuxt-link>
          </ul>
          <!-- 分页器 -->
          <div class="flex flex-center">
            <el-pagination
              v-if="list.length"
              @current-change="handleCurrentChange"
              class="pagination"
              background
              layout="prev, pager, next"
              :page-size="limit"
              :current-page="current_page"
              :page-count="total_page"
            ></el-pagination>
          </div>
        </template>
        <!-- 2.无结果 -->
        <p v-else class="no-result">抱歉，没有找到关于“{{ keyword }}”的相关结果!</p>
      </div>
    </main>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  validate({ query, params, route }) {
    // 必须是非空文本
    return !/^[ ]+$/g.test(query.keyword);
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
  async asyncData({ store, params, query, route, app }) {
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getArticleSearch, {
        params: {
          keyword: query.keyword,
          page: query.page || 1,
          rownum: 8
        }
      }),
      //全站通用seo
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 0,
          client: 1,
          module_id: 0
        }
      })
    ]);
    console.log(res01.data.list);
    let pagination = res01.data.pagination;
    return {
      SEOInfo: res02.data,
      keyword: query.keyword,
      list: res01.data.list,
      total_page: pagination.total_page,
      current_page: pagination.current,
      limit: pagination.rownum,
      total: pagination.total
    };
  },
  created() {
    if (this.$nullTest(this.$route.query.keyword)) {
      this.$errorToast('请输入搜索内容');
    }
  },
  data() {
    return {
      SEOInfo: {},
      // url
      keyword: '',
      // 输入框
      keyword0: '',
      list: [],
      limit: 8,
      current_page: 1,
      total_page: 0,
      total: 0
    };
  },
  methods: {
    // 搜索
    searchHandle() {
      if (this.$nullTest(this.keyword)) {
        return this.$errorToast('请输入搜索关键字');
      }
      this.$router.push({
        query: {
          keyword: this.keyword0,
          page: 1
        }
        // path: '/search'
      });
    },
    handleCurrentChange(page) {
      let query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = page || 1;
      this.$router.push({
        query: query
      });
    }
  }
};
</script>

<style lang="less"></style>
