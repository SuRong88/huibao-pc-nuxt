const host = '/api'; // 域名（地址公共部分）
const api = {
  /* 基本信息 */
  getWebInfo: host + '/setting/', // 网站信息
  getBannerList: host + '/index/banner', //首页轮播
  getNavList: host + '/nav', // 网站导航
  getIntroduceList: host + '/index/ProductPage', //产品介绍页
  getSEOInfo: host + '/setting/seo', // 页面seo信息
  getCustomArticle: host + '/index/DetailPage', //详情页面（申请流程，荟宝优势）

  /* 文章类 */
  getArticleType: host + '/article/classify', // 文章分类
  getArticleList: host + '/article/', // 文章列表
  getArticleDetail: host + '/article/', // 文章详情
  getArticleSearch: host + '/article/search', // 文章搜索

  /* 联系我们*/
  submitJoin: host + '/contact/submit', // 联系我们 提交加盟信息
}

export default api
