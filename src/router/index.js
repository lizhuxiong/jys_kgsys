/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ProtecRegion from '@/components/forest/ProtecRegion'

// 路由懒加载
//登录主页
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Login.vue')
const Welcome = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/welcome/Welcome.vue')
//布局
const Main = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Main')


//1、防火模块
const FireInfo = () => import(/* webpackChunkName: "Order_Report" */ '../components/firePrevention/FireInfo')
const FirePreResource = () => import(/* webpackChunkName: "Order_Report" */ '../components/firePrevention/FirePreResource')
const FirePreTeam = () => import(/* webpackChunkName: "Order_Report" */ '../components/firePrevention/FirePreTeam')

//2、森林资源模块
const ForestResource = () => import(/* webpackChunkName: "Order_Report" */ '../components/forest/ForestResource')
const MonitorEquip = () => import(/* webpackChunkName: "Order_Report" */ '../components/forest/MonitorEquip')
const ProRegion = () => import(/* webpackChunkName: "Order_Report" */ '../components/forest/ProtecRegion')

//3 护林巡查
const ForestPatrol = () => import(/* webpackChunkName: "Order_Report" */ '../components/forestPatrol/ForestPatrol')

const ResidentInfo = () => import(/* webpackChunkName: "Order_Report" */ '../components/resident/ResidentInfo')


//4 KG
const KG = () => import(/* webpackChunkName: "Order_Report" */ '../components/kg/kg')


Vue.use(VueRouter)


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Main,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      //1、防火模块
      { path: '/fireInfo', component: FireInfo },
      { path: '/firePreResource', component: FirePreResource },
      { path: '/firePreTeam', component: FirePreTeam },

      //2、森林资源模块
      { path: '/forestResource', component: ForestResource },
      { path: '/monitorEquip', component: MonitorEquip },
      { path: '/protecRegion', component: ProRegion },

    //3 护林巡查
      { path: '/forestPatrol', component: ForestPatrol },
      // 4 居民点
      { path: '/residentInfo', component: ResidentInfo },
      // kg
      { path: '/kg', component: KG },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.localStorage.getItem('Authorization')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
