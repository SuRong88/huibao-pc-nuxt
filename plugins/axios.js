export default function(app) {
    let axios = app.$axios;
    // 基本配置
    axios.defaults.timeout = 10000
    // axios.defaults.baseURL = `http://www.techviewinfo.com/api/`
    axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

    // 拦截器1 推荐
    axios.interceptors.request.use(req => {
        // console.log('request拦截');
        return req
    }, err => {
        return Promise.reject(err);
    })
    axios.interceptors.response.use(res => {
        // console.log('response拦截');
        if (res.data.code != 0) {
            return Promise.reject(res);
        }
        return res.data
    }, err => {
        return Promise.reject(err);
    })
    // 拦截器2 有效但是不太明确与1的区别 目前使用1
    // // 请求回调
    // axios.onRequest(config => {
    //     console.log('request')
    //     console.log(config.url)
    // })

    // // 返回回调
    // axios.onResponse(res => {
    //     console.log('response')
    //     console.log(res.data.code)
    // })

    // // 错误回调（好像没啥用）
    // axios.onError(error => {
    //     console.log('error')
    //     console.log(error)
    // })
}
