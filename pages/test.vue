<template>
  <div class="test-page">
    {{ JSON.stringify(SEOInfo) }}
    <mlayer :layerData="layerData" @close="closeHandle" @cancel="cancelHandle" @confirm="confirmHandle">
      <div>内容区</div>
    </mlayer>
  </div>
</template>

<script>
import URL from '@/plugins/url.js';
export default {
  components: {
    vHeader(resolve) {
      require(['@/components/vHeader'], resolve);
    },
    vFooter(resolve) {
      require(['@/components/vFooter'], resolve);
    },
    mlayer(resolve) {
      require(['@/components/mlayer'], resolve);
    }
  },
  async asyncData({ route, app }) {
    let SEOInfo = null;
    await app.$axios
      .get(URL.getSEOInfo, {
        params: {
          name: '/'
        }
      })
      .then(res => {
        // console.log(res);
        res.data && (SEOInfo = res.data);
      })
      .catch(err => {
        // console.log('response报错');
      });
    return {
      SEOInfo: SEOInfo
    };
  },
  created() {
    // if (process.client) {
    //   this.$axios
    //     .get(URL.getSEOInfo, {
    //       params: {
    //         name: '/'
    //       }
    //     })
    //     .then(res => {
    //       console.log('客户端请求成功');
    //       console.log(res.data);
    //     })
    //     .catch(err => {
    //       console.log('客户端请求失败');
    //     });
    // }
  },
  data() {
    let that = this;
    return {
      SEOInfo: {},
      layerData: {
        isLayer: true, // 弹窗是否渲染
        title: '弹窗标题', // 标题内容
        confirmText: '确定', // 确定按钮文本
        cancelText: '取消', // 取消按钮文本
        isHeader: true, // 头部是否渲染
        isBtn: true, // 按钮是否渲染
        isCancel: true, // 是否需要取消按钮
        isClose: true // 是否需要关闭按钮
      }
    };
  },
  methods: {
    // 确定按钮事件
    confirmHandle() {
      console.log('点击确定');
    },
    // 取消按钮事件
    cancelHandle() {
      console.log('点击取消');
    },
    // 关闭按钮事件
    closeHandle() {
      console.log('点击关闭');
    }
  }
};
</script>

<style></style>
