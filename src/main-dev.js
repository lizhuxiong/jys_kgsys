
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'    //引入 vuex
import './plugins/element.js'
// 导入全局样式
import './assets/scss/global.scss'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入表格树
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
// // 导入富文本编辑器样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// 导入NProgress, 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
/**
 * 运行环境
 * */
// 配置请求根路径
// 本机地址
// axios.defaults.baseURL = 'http://120.25.103.70:9999/'
// 测试地址1
// axios.defaults.baseURL = 'http://39.108.194.125:8888/'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/'
axios.defaults.baseURL = 'http://localhost:8888/'
//前置拦截器 请求前处理
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  NProgress.start()//展示进度条
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.localStorage.getItem('Authorization')
  // 在最后必须 return config
  return config
})


//后置拦截器
axios.interceptors.response.use(config => {
	NProgress.done()//隐藏进度条
	if(config.data.code=== 401){
    window.alert("您的权限不足！")//好看的弹窗
		return false
		// window.alert("您的权限不足！")//不好看的弹窗
	}else if(config.data.code === 405){
    window.alert('用户身份过期，请重新登录!!!')
		window.localStorage.removeItem('Authorization')

		router.push('/login')//退回登录
	}else{
		return config
	}
})
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$http = axios

Vue.config.productionTip = false
// 组件全局注册 表格树
Vue.component('tree-table', TreeTable)
// 全局注册富文本编辑器
// Vue.use(VueQuillEditor)
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
