import Vue from 'vue';
let loading = null;

export default ({
    app
}, inject) => {
    // 错误提示
    inject('errorToast', function(msg) {
            if (msg) {
                this.$message({
                    message: msg,
                    type: 'error',
                    duration: 3000,
                    showClose: true,
                });
            }
        });

        // 成功提示
        inject('successToast', function(msg) {
            if (msg) {
                this.$message({
                    message: msg,
                    type: 'success',
                    duration: 3000,
                    showClose: true
                });
            }
        });

        // 加载
        // 显示loading
        inject('loadStart', function(text = '加载中...') {
            loading = this.$loading({
                // lock: true,
                text: text,
                background: 'rgba(255,255,255,0.7)'
            });

        });

        // 隐藏loading
        inject('loadEnd', function() {
            loading.close();
        });

        // 弹窗
        // 注意：原弹窗按钮样式是左取消右确定，但项目UI需要左确定右取消，所以取消与确定的文本和事件对换
        inject('wDialog', function(title, content, cancelButtonText, confirmButtonText, showConfirmButton, cb_ok,
            cb_err) {
            this.$confirm(content, title, {
                cancelButtonText: cancelButtonText || '确定',
                confirmButtonText: confirmButtonText || '取消',
                showConfirmButton: showConfirmButton,
                dangerouslyUseHTMLString: true,
                center: true,
                customClass: 'myDialogBox',
                distinguishCancelAndClose: true,
                callback: function(action) {
                    if (action == "confirm") {
                        cb_err && cb_err();
                    } else if (action == "cancel") {
                        cb_ok && cb_ok();
                    }
                }
            })
        });

        // 指定滚动条位置
        inject('wSetScroll', function(top) {
            if (document.documentElement.scrollTop || document.documentElement.scrollTop == 0) {
                document.documentElement.scrollTop = top;
            } else if (window.pageYOffset || window.pageYOffset == 0) {
                window.pageYOffset = top;
            } else if (document.body.scrollTop || document.body.scrollTop == 0) {
                document.body.scrollTop = top;
            }
        });

        // 返顶
        inject('wToTop', function() {
            this.$wSetScroll(0);
        });

        // textarea格式转换
        inject('textFormat', function(str) {
            if (str) {
                return str.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
            } else {
                return '';
            }

        });

        // 判断页面是否滚动到底部
        inject('scrollBottom', function(cb) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollTop + windowHeight == scrollHeight) {
                cb && cb();
            }

        });
        
        // 基础接口
        /*
         ** options: 接口数组
         ** cb_ok_array: 成功回调函数数组（数组下标对应接口数组下标）
         ** cb_ok: 成功总回调函数（每个接口对应的成功回调函数执行完毕后执行）
         ** cb_err_array: 失败回调函数数组（数组下标对应接口数组下标）
         */
        inject('admin_base', function(options, cb_ok_array, cb_ok, cb_err_array) {
            this.$loadStart();
            let array = [];
            let error = false;
            this.$axiosAll(options).then(res => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].code == 0) {
                        cb_ok_array && cb_ok_array[i] && cb_ok_array[i](res[i]);
                    } else {
                        this.$errorCode(res[i], cb_err_array && cb_err_array[i]);
                    }
                }
                cb_ok && cb_ok();
                this.$loadEnd();
            }, res => {
                this.$errorToast('系统出错，请稍后再试');
            })
        });
        
        // 状态码管理
        inject('errorCode', function(res, cb_err) {
            switch (parseInt(res.code)) {

                default:
                    this.$errorToast(res.msg);
                    break;

            }
        });
        
        // 导航栏fix,滚动指定distance之后显示背景颜色
        inject('fixHeader', function(page, distance) {
            window.onscroll = function() {
                if (document.documentElement.scrollTop && document.documentElement.scrollTop >= distance) {
                    return (page.show = true);
                } else if (window.pageYOffset && window.pageYOffset >= distance) {
                    return (page.show = true);
                } else if (document.body.scrollTop && document.body.scrollTop >= distance) {
                    return (page.show = true);
                } else {
                    return (page.show = false);
                }
            };
            window.onscroll();
        })

}
