import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  webInfo: {
    // test
    website_icon: "http://www.techviewinfo.com/api/public/upload/image/20200225/5e5484bfc33c9.jpg",
    website_logo_top: require('@/assets/images/side/logo.png'),
    website_logo_bottom: "http://www.techviewinfo.com/api/public/upload/image/20200211/5e4268e61ef24.jpg",
    website_logo_ph: "http://www.techviewinfo.com/api/public/upload/image/20200212/5e43a70f0700f.jpg",
    website_name: "荟宝",
    website_copyright: "版权所有©<br>广州澳梓美生物科技有限公司",
    email: "tvi@techviewinfo.com",
    website_icp_numb: "粤ICP备16009181号-2",
    website_logo_ph_nav: "http://www.techviewinfo.com/api/public/upload/image/20200212/5e43a71c30c80.jpg",
    kefu_phone: "020-8092 8252",
    kefu_fax: "020-8092 7403",
    address: "广州市新港西路135号中山大学西门中大科技园B座1905室",
    work_time: "周一至周五|9:00-18:00",
    website_logo_ph_bottom: "http://www.techviewinfo.com/api/public/upload/image/20200212/5e43a6938d520.jpg",
    website_qrcode:require('@/assets/images/side/QRcode.png')
  }
}

// 全局函数
const mutations = {
  // 获取网站信息
  SET_WEBINFO(state, data) {
    state.webInfo = data;
  },

}

// todo 与单页面不同，这里要返回函数
export default () => {
  return new Vuex.Store({
    state,
    mutations
  })
}
