<template>
  <header class="v-header">
    header
    <ul class="nav-menu">
      <li class="nav-item nav-item-active"></li>
    </ul>
  </header>
</template>

<script>
import URL from '~/plugins/url';
export default {
  created() {
    // 获取导航栏
    // this.$axios.get(URL.getNavList, { client: 1 }).then(res=>{
    //     this.navList = res.data.data.header;
    // });
  },
  computed: {
    // 获取网站信息
    // webInfo() {
    //   return this.$store.state.webInfo;
    // }
  },
  data() {
    return {
      // navList: []
    };
  }
};
</script>

<style lang="less">
  .v-header{}
</style>
