<template>
  <div class="v-sidebar">
    <!-- 目录按钮 -->
    <div class="sidebar-menu" @click="toggleSide">
      <a href="javascript:void(0);" class="menu-trigger" :class="{ active: isActived }">
        <div></div>
        <div></div>
        <div></div>
      </a>
      <span>|</span>
      <span class="text">{{ isActived ? '返回' : '目录' }}</span>
    </div>
    <!-- logo -->
    <h1 class="sidebar-logo">
      <a
        :href="webInfo.website_domain"
        :style="'background-image: url(' + webInfo.website_logo_top + ');'"
        class="logo"
      >{{ webInfo.website_name }}</a>
    </h1>
    <!-- 搜索 -->
    <div class="sidebar-search">
      <input
        @keyup.enter="searchHandle"
        v-model="keyword"
        class="search"
        placeholder="搜索"
        type="text"
      />
      <img @click="searchHandle" class="search-icon" src="@/assets/images/side/search.png" alt />
    </div>
    <!-- 官方联系 -->
    <div class="sidebar-contact">
      <div class="wechat">
        <img class="qrcode" :src="webInfo.qrcode_pc" alt />
        <button class="btn-wechat flex flex-ver flex-align-center">
          <img class="wechat-icon" src="@/assets/images/side/wechat.png" alt />
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
    <div class="sidebar-nav" :class="{ open: isActived }">
      <ul class="nav-menu" v-if="navList && navList.length > 0">
        <template v-for="(item, index) in navList">
          <!-- 1.无子级 -->
          <li
            v-if="item.children.length <= 0"
            @click="navToggle(index, -1, item.type * 1, item.value, item.open * 1)"
            class="nav-item"
            :class="{ active: index == currentIndex }"
          >
            <span>{{ item.name }}</span>
          </li>
          <!-- 2.有子级 -->
          <li
            v-else
            @click="item.show = !item.show"
            class="nav-item"
            :class="{ active: item.show || index == currentIndex }"
          >
            <span>{{ item.name }}</span>
            <ol @click.stop="" v-show="item.show || index == currentIndex" class="sub-nav-menu">
              <li
                v-for="(subItem, subIndex) in item.children"
                class="sub-nav-item"
                :class="{ active: index == currentIndex && subIndex == currentSubIndex }"
                @click="navToggle(index, subIndex, subItem.type * 1, subItem.value, subItem.open * 1)"
              >{{ subItem.name }}</li>
            </ol>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import URL from "../plugins/url.js";
export default {
  name: "vSidebar",
  created() {
    let that = this;
    this.$axios
      .get(URL.getNavList, {
        params: {
          client: 1
        }
      })
      .then(res => {
        let length = res.data.header.length;
        for (let i = 0; i < length; i++) {
          if (res.data.header[i].children.length > 0) {
            res.data.header[i].show = false;
          }
        }
        that.navList = res.data.header;
      });

    if (process.client) {
      this.isActived = sessionStorage.getItem("isActived") || false;
      this.currentIndex = sessionStorage.getItem("currentIndex") || -1;
      this.currentSubIndex = sessionStorage.getItem("currentSubIndex") || -1;
    }
  },
  data() {
    return {
      isActived: false,
      navList: [],
      keyword: "",
      currentIndex: -1,
      currentSubIndex: -1
    };
  },
  computed: {
    webInfo() {
      return this.$store.state.webInfo;
    }
  },
  watch: {},
  methods: {
    // 侧边栏toggle
    toggleSide() {
      this.isActived = !this.isActived;
    },
    // 导航栏跳转
    navToggle(index, subIndex, type, value, open) {
      console.log(index, subIndex, type, value, open);
      sessionStorage.setItem("currentIndex", index);
      sessionStorage.setItem("currentSubIndex", subIndex);
      sessionStorage.setItem("isActived", true);
      this.navList[index].show = true;
      this.currentIndex = index;
      this.currentSubIndex = subIndex;
      switch (type) {
        // case 0: //不跳转
        //   console.log('不跳转');
        //   break;
        case 1: //首页或栏目
          switch (value * 1) {
            case 0: //首页
              switch (open) {
                case 0: //新页面打开
                  window.open(this.webInfo.website_domain);
                  break;
                case 1: //原页面打开
                  this.$router.push({
                    path: "/"
                  });
                  break;
              }
              break;
            default:
              //栏目
              switch (open) {
                case 0: //新页面打开
                  window.open("/news/" + value);
                  break;
                case 1: //原页面打开
                  this.$router.push({
                    path: "/news/" + value
                  });
                  break;
              }
              break;
          }
          break;
        case 2: //自定义页面
          switch (open) {
            case 0: //新页面打开
              window.open(value);
              break;
            case 1: //原页面打开
              this.$router.push({
                path: "/" + value
              });
              break;
          }
          break;
        case 3: //文章
          switch (open) {
            case 0: //新页面打开
              window.open("/newsDetail/" + value);
              break;
            case 1: //原页面打开
              this.$router.push({
                path: "/newsDetail/" + value
              });
              break;
          }
          break;
        case 4: //外链
          switch (open) {
            case 0: //新页面打开
              window.open(value);
              break;
            case 1: //原页面打开
              window.location.href = value;
              break;
          }
          break;
      }
    },
    // 侧边栏搜索
    searchHandle() {
      if (this.$nullTest(this.keyword)) {
        return this.$errorToast("请输入搜索内容");
      }
      this.$router.push({
        query: {
          keyword: this.keyword
        },
        path: "/search"
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
  .sidebar-nav {
    position: fixed;
    left: -280px;
    top: 0;
    z-index: 800;
    width: 280px;
    height: 100vh;
    overflow-y: auto;
    padding: 168px 20px 100px 55px;
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
  .sidebar-menu {
    width: 130px;
    margin: 0 auto 108px;
    position: relative;
    z-index: 900;
    cursor: pointer;
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
  .sidebar-logo {
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
  .sidebar-search {
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

  .sidebar-contact {
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
