<template>
  <div class="v-sidebar">
    <!-- 目录按钮 -->
    <div class="side-menu" @click="toggleSide">
      <a href="javascript:void(0);" class="menu-trigger" :class="{ active: isActived }">
        <div></div>
        <div></div>
        <div></div>
      </a>
      <span>|</span>
      <span class="text">{{ isActived ? '返回' : '目录' }}</span>
    </div>
    <!-- logo -->
    <h1 class="side-logo">
      <!-- 待修改 href -->
      <nuxt-link :style="'background-image: url(' + webInfo.website_logo_top + ');'" to="/" class="logo">{{ webInfo.website_name }}</nuxt-link>
    </h1>
    <!-- 搜索 -->
    <div class="side-search">
      <input @keyup.enter="searchHandle" v-model="keyword" class="search" placeholder="搜索" type="text" />
      <img @click="searchHandle" class="search-icon" src="@/assets/images/side/search.png" alt="" />
    </div>
    <!-- 官方联系 -->
    <div class="side-contact">
      <div class="wechat">
        <img class="qrcode" :src="webInfo.website_qrcode" alt="" />
        <button class="btn-wechat flex flex-ver flex-align-center">
          <img class="wechat-icon" src="@/assets/images/side/wechat.png" alt="" />
          <span>官方微信</span>
        </button>
      </div>
      <p class="copyright">
        <span v-html="webInfo.website_copyright"></span>
        <br />
        <a href="http://www.beian.miit.gov.cn" target="_blank">{{ webInfo.website_icp_numb }}</a>
      </p>
    </div>
    <!-- 导航栏 -->
    <div class="side-nav" :class="{ open: isActived }">
      <ul class="nav-menu" v-if="navList.length">
        <li v-for="(item, index) in navList" class="nav-item active">
          <span>{{ item.name }}</span>
          <ol v-if="item.children.length" class="sub-nav-menu">
            <li v-for="(subItem, subIndex) in item.children" class="sub-nav-item">{{ subItem.name }}</li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vSidebar',
  created() {},
  data() {
    return {
      isActived: false,
      navList: [
        {
          id: 94,
          type: '2',
          open: '1',
          name: '首 页',
          value: '\/',
          template: 0,
          children: []
        },
        {
          id: 95,
          type: '2',
          open: '1',
          name: '关于荟宝',
          value: '\/products',
          template: 0,
          children: [
            {
              id: 95,
              type: '2',
              open: '1',
              name: '品牌故事',
              value: '/about01',
              template: 0,
              children: []
            },
            {
              id: 95,
              type: '2',
              open: '1',
              name: '荟宝文化',
              value: '/about02',
              template: 0,
              children: []
            },
            {
              id: 95,
              type: '2',
              open: '1',
              name: '发展历程',
              value: '/about03',
              template: 0,
              children: []
            }
          ]
        },
        {
          id: 97,
          type: '2',
          open: '1',
          name: '热销榜单',
          value: '\/solutions',
          template: 0,
          children: []
        },
        {
          id: 98,
          type: '2',
          open: '1',
          name: '芦荟多肽系列',
          value: '\/cases',
          template: 0,
          children: []
        },
        {
          id: 99,
          type: '2',
          open: '1',
          name: '荟宝芦荟系列',
          value: '\/about\/profile',
          template: 0,
          children: []
        },
        {
          id: 99,
          type: '2',
          open: '1',
          name: '合作经营',
          value: '\/about\/profile',
          template: 0,
          children: []
        },
        {
          id: 99,
          type: '2',
          open: '1',
          name: '荟宝资讯',
          value: '\/about\/profile',
          template: 0,
          children: []
        }
      ],
      keyword: ''
    };
  },
  computed: {
    webInfo() {
      return this.$store.state.webInfo;
    }
  },
  watch: {},
  methods: {
    // 侧边栏切换
    toggleSide() {
      this.isActived = !this.isActived;
    },
    // 侧边栏搜索
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

<style lang="less">
@color: rgba(45, 85, 51, 1);
.v-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 280px;
  height: 100vh;
  padding: 40px 35px;
  background-color: #fff;
  border-right: 1px solid #b7b7b7;
  .side-nav {
    position: fixed;
    left: -280px;
    top: 0;
    z-index: 800;
    width: 280px;
    height: 100vh;
    overflow-y: auto;
    padding: 168px 20px 20px 55px;
    // padding-left: 55px;
    // padding-right: 20px;
    background: rgba(238, 238, 238, 1);
    opacity: 0;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
    &.open {
      left: 0;
      opacity: 1;
    }
    .nav-menu {
      .nav-item {
        cursor: pointer;
        min-width: 60px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: @color;
        margin-bottom: 34px;
        text-align: justify;
        &:last-child {
          margin-bottom: 0;
        }
        &:hover {
          color: @color;
        }
        &.active {
          span {
            line-height: 1;
            display: inline-block;
            padding-right: 10px;
            padding-bottom: 13px;
            border-bottom: 1px solid @color;
          }
        }
      }
      .sub-nav-menu {
        padding-top: 20px;
        .sub-nav-item {
          font-size: 12px;
          font-family: PingFang SC;
          color: rgba(153, 153, 153, 1);
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          &.active {
            color: @color;
          }
        }
      }
    }
  }
  .side-menu {
    width: 130px;
    margin: 0 auto 108px;
    position: relative;
    z-index: 900;
    .menu-trigger {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      width: 30px;
      height: 18px;
      transition: all 0.4s;
      & > div {
        display: inline-block;
        position: absolute;
        transition: all 0.4s;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #000;
        border-radius: 4px;
        &:nth-of-type(1) {
          top: 0;
        }
        &:nth-of-type(2) {
          top: 8px;
        }
        &:nth-of-type(3) {
          bottom: 0;
        }
      }
      &.active {
        & > div {
          background-color: #333;
          &:nth-of-type(1) {
            -webkit-transform: translateY(8px) rotate(-45deg);
            transform: translateY(8px) rotate(-45deg);
          }
          &:nth-of-type(2) {
            opacity: 0;
          }
          &:nth-of-type(3) {
            -webkit-transform: translateY(-8px) rotate(45deg);
            transform: translateY(-8px) rotate(45deg);
          }
        }
      }
    }
    span {
      line-height: 1;
      display: inline-block;
      vertical-align: middle;
    }
    span:nth-of-type(1) {
      font-size: 15px;
      margin: 0 15px 0 20px;
    }
    .text {
      font-size: 18px;
      font-family: PingFang SC;
      color: @color;
    }
  }
  .side-logo {
    margin-bottom: 42px;
    .logo {
      display: block;
      width: 124px;
      height: 140px;
      margin: 0 auto;
      text-indent: -999px;
      background: center center/cover no-repeat;
    }
  }
  .side-search {
    margin-bottom: 140px;
    border-bottom: 1px solid @color;
    position: relative;
    .search {
      border: none;
      line-height: 52px;
      padding: 0 25px 0 5px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: @color;
      &::-webkit-input-placeholder {
        color: @color;
      }

      &:-moz-placeholder {
        color: @color;
      }

      &::-moz-placeholder {
        color: @color;
      }

      &:-ms-input-placeholder {
        color: @color;
      }
    }
    .search-icon {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -12px;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  .side-contact {
    position: absolute;
    left: 50%;
    // bottom: 182px;
    bottom: 16.8vh;
    width: 100%;
    margin-left: -50%;
  }
  .wechat {
    margin-bottom: 28px;
    position: relative;
    z-index: 3;
    &:hover {
      .qrcode {
        display: block;
      }
    }
    .qrcode {
      width: 206px;
      height: 206px;
      position: absolute;
      left: 50%;
      top: -213px;
      z-index: 2;
      margin-left: -103px;
      display: none;
    }
    .btn-wechat {
      margin: 0 auto;
      width: 200px;
      height: 48px;
      border: 1px solid @color;
      background: none;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: @color;
      .wechat-icon {
        width: 24px;
        height: 24px;
        margin-right: 20px;
      }
    }
  }
  .copyright {
    padding: 0 30px;
    text-align: center;
    * {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
}
</style>
