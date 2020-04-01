<template>
  <div class="contact-page">
    <v-sidebar></v-sidebar>
    <main class="contact-main">
      <div class="main-banner common-banner">
        <div class="banner-title-box">
          <h2 class="tit-cn">联系我们</h2>
          <h2 class="tit-en">Contact us</h2>
        </div>
      </div>
      <div class="contact-wrapper flex">
        <div class="contact-info">
          <a class="info-logo"><img class="logo" :src="webInfo.website_logo_top" alt="" /></a>
          <p class="tel-txt">总部加盟咨询服务热线：</p>
          <p class="tel">{{ webInfo.customer_service_phone }}</p>
        </div>
        <div class="contact-enter">
          <h3 class="enter-tit">加盟“我家的荟宝妆园”</h3>
          <div class="enter-list clearfix">
            <input v-model="surname" @keyup.enter="submitHandle" class="enter-item fl" placeholder="姓氏" type="text" />
            <input v-model="name" @keyup.enter="submitHandle" class="enter-item fl" placeholder="名字" type="text" />
            <input v-model="email" @keyup.enter="submitHandle" class="enter-item fl" placeholder="电子邮箱" type="text" />
            <input v-model="website" @keyup.enter="submitHandle" class="enter-item fl" placeholder="网址" type="text" />
            <textarea v-model="leaveMsg" @keyup.enter="submitHandle" class="enter-item enter-item-mul fl" placeholder="留言" type="text"></textarea>
          </div>
          <button class="btn-submit" @click="submitHandle">联系我们</button>
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
    let [res01] = await Promise.all([
      app.$axios.get(URL.getSEOInfo, {
        params: {
          type: 'custom',
          client: 1,
          module_id: 'contact'
        }
      })
    ]);
    return {
      SEOInfo: res01.data
    };
  },
  created() {},
  data() {
    return {
      SEOInfo: {},
      surname: '',
      name: '',
      email: '',
      website: '',
      leaveMsg: ''
    };
  },
  methods: {
    submitHandle() {
      if (this.$nullTest(this.surname)) {
        return this.$errorToast('请输入姓氏');
      }
      if (this.$nullTest(this.name)) {
        return this.$errorToast('请输入名字');
      }
      if (this.$nullTest(this.email)) {
        return this.$errorToast('请输入邮箱');
      }
      if (!this.$checkEmail(this.email)) {
        return this.$errorToast('邮箱格式有误');
      }
      if (this.$nullTest(this.website)) {
        return this.$errorToast('请输入网址');
      }
      if (this.$nullTest(this.leaveMsg)) {
        return this.$errorToast('请填写留言');
      }
      // 提交加盟信息
      this.$axios
        .post(URL.submitJoin, {
          surname: this.surname,
          name: this.name,
          email: this.email,
          website: this.website,
          leave_msg: this.leaveMsg
        })
        .then(res => {
          this.$successToast('提交成功');
          this.surname = '';
          this.name = '';
          this.email = '';
          this.website = '';
          this.leaveMsg = '';
        })
        .catch(err => {
          return this.$errorToast(err.data.msg);
        });
    }
  },
  computed: {
    webInfo() {
      return this.$store.state.webInfo;
    }
  }
};
</script>

<style lang="less"></style>
