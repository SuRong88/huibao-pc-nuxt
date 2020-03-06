export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // title: '和元达信息科技有限公司',
    // link: [{
    //   rel: 'icon',
    //   type: 'image/x-icon',
    //   href: '/favicon.ico'
    // }],
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ],
    // 根据项目需要决定是否引入百度地图
    // script: [{
    //     src: 'https://api.map.baidu.com/api?v=2.0&ak=6wY7GTtcCHAfZpM7zA9wiFwBrpTVpxcW&s=1'
    // }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS(使用less，注意下载less-loader和less)
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    '@/assets/css/layout.less',
    '@/assets/css/common.less',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    {
      src: "~/plugins/vue-awesome-swiper.js",
      ssr: false
    },
    // {
    //   src: "~/plugins/axios.js",
    //   ssr: false
    // },
    '@/plugins/axios.js',
    '@/plugins/layout.js',
    '@/plugins/request.js',
    '@/plugins/route.js',
    '@/plugins/format.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  toast: { // toast模块的配置
    position: 'top-center',
    duration: 2000
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    // prefix: '/api2/'
  },
  // 代理的配置项
  proxy: {
    '/api': {
      target: 'http://www.techviewinfo.com/api',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
