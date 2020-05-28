import Vue from 'vue';
let loading = null;

export default ({
  app
}, inject) => {
  // 错误提示
  inject('nullTest', function(txt) {
    return txt == '' ? true : /^[ ]+$/g.test(txt);
  });
  // 姓名
  inject('checkName', function(txt) {
    return /^([\u4e00-\u9fa5]){2,7}$/g.test(txt);
  });
  // 手机
  inject('checkPhone', function(txt) {
    return /^(1\d{10})$/g.test(txt);
  });
  // 邮箱
  inject('checkEmail', function(txt) {
    return /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/g.test(txt);
  });
}
