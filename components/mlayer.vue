<template>
  <transition name="layer-trans">
    <section class="layer-box" @click="closeLayer" v-if="layerData.isLayer">
      <div class="layer-sbox">
        <div class="layer" @click="layerPrevent">
          <!-- 标题 -->
          <header class="layer-header" v-if="layerData.isHeader">
            <h3 class="layer-title">{{ layerData.title }}</h3>
          </header>
          <!-- 标题 end -->

          <!-- 内容区 -->
          <div class="layer-content"><slot></slot></div>
          <!-- 内容区 end -->

          <!-- 按钮区 -->
          <div class="layer-btnbox" v-if="layerData.isBtn">
            <a href="javascript:;" class="layer-confirm" :class="{ on: !layerData.isCancel }" @click="layerConfirm">{{ layerData.confirmText }}</a>
            <a href="javascript:;" class="layer-cancel" v-if="layerData.isCancel" @click="layerCancel">{{ layerData.cancelText }}</a>
          </div>
          <!-- 按钮区 end -->

          <!-- 关闭按钮 -->
          <a href="javascript:;" class="layer-close" v-if="layerData.isClose" @click="closeLayer"><img class="layer-close-icon" src="@/assets/images/icons/close.png" alt="" /></a>
          <!-- 关闭按钮 end-->
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: {
    layerData: {
      type: Object,
      default: {
        isLayer: true, // 弹窗是否渲染
        isHeader: true, // 头部是否渲染
        isBtn: true, // 按钮是否渲染
        title: '弹窗标题', // 标题内容
        confirmText: '确定', // 确定按钮文本
        cancelText: '取消', // 取消按钮文本
        isCancel: true, // 是否需要取消按钮
        isClose: true // 是否需要关闭按钮
      }
    }
  },
  methods: {
    // 点击阴影关闭弹窗
    closeLayer() {
      // this.layerData.isLayer = false
      this.$emit('close');
    },
    // 点击内容区防冒泡（避免关闭弹窗）
    layerPrevent() {
      event.stopPropagation();
    },
    // 确定按钮事件（无默认事件）
    layerConfirm() {
      this.$emit('confirm');
    },
    // 取消按钮事件（默认关闭弹窗）
    layerCancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped lang="less">
.layer-trans-enter,
.layer-trans-leave-to {
  opacity: 0;
}
.layer-trans-enter-active,
.layer-trans-leave-active,
.layer-trans-leave-active .layer {
  transition: all 0.5s;
}
.layer-trans-leave-to .layer {
  // transform: translateY(20%);
}

.layer-box {
  background: rgba(0, 0, 0, 0.5);
  display: table;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.layer-sbox {
  display: table-cell;
  font-size: 0;
  line-height: 0;
  /*padding-bottom: 20%;*/
  text-align: center;
  vertical-align: middle;
}
.layer {
  background-color: #fff;
  -ms-border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  min-width: 500px;
  padding: 40px 0 60px 0;
}

.layer-header {
  /*border-bottom: 1px solid #eee;*/
  /*padding: .6rem 0;*/
  margin-bottom: 30px;
}

.layer-header .layer-title {
  color: #333;
  font-size: 18px;
  font-weight: normal;
  line-height: 20px;
}

.layer-content {
  font-size: 14px;
  line-height: 22px;
  color: #333;
  padding: 20px 50px;
  max-height: 70vh;
  overflow-y: scroll;
}

.layer-content::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.layer-content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.5);
}

.layer-btnbox {
  /*border-top: 1px solid #d2d3d5;*/
  font-size: 0;
  overflow: hidden;
  margin-top: 30px;
}

.layer-btnbox a {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 2px;
  /*float: left;*/
  /*color: #fff;*/
  display: inline-block;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  width: 130px;
}

.layer-confirm {
  background: #ff6600;
  color: #fff;
}

.layer-cancel {
  background-color: #f9f9f9;
  border: 1px solid #e3e3e3;
  color: #333;
  margin-left: 20px;
  &:hover {
    // color: #FF6600;
  }
}

/*.layer-confirm.on{width: 100%;}*/
.layer-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
}

.layer-close .layer-close-icon {
  height: 30px;
}
</style>
