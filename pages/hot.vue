<template>
  <div class="hot-page">
    <v-sidebar></v-sidebar>
    <main class="hot-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">热销榜单</h2>
          <h2 class="tit-en">Hot sale</h2>
        </div>
      </div>
      <div class="hot-wrapper">
        <div class="hot-list clearfix">
          <div v-for="(item, index) in list" class="hot-item fl">
            <div class="item-hd"><img class="item-img" :src="item.cover_img" alt="" /></div>
            <div class="item-bd">
              <div class="item-tit">{{ item.title }}</div>
              <div class="item-desc">{{ item.desc }}</div>
              <a :href="item.buy_url" target="_blank" class="item-btn">立即购买</a>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="flex flex-center">
          <el-pagination
            v-if="list.length"
            @current-change="handleCurrentChange"
            id="pagination"
            class="pagination"
            background
            layout="prev, pager, next"
            :page-size="limit"
            :current-page="current_page"
            :page-count="total_page"
          ></el-pagination>
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
  watchQuery: true,
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
    console.log(query.page);
    let [res01, res02] = await Promise.all([
      app.$axios.get(URL.getHotList, {
        params: {
          page: query.page || 1,
          rownum: 8
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
    let pagination = res01.data.pagination;
    console.log(res01);
    return {
      list: res01.data.list,
      limit: pagination.rownum,
      current_page: pagination.current,
      total_page: pagination.total_page,
      total: pagination.total,
      SEOInfo: res02.data
    };
  },
  data() {
    return {
      SEOInfo: {},
      list: [],
      limit: 8,
      current_page: 1,
      total_page: 0,
      total: 0
    };
  },
  methods: {
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
