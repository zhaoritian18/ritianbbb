import Vue from 'vue'
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router'
// Vue.config.productionTip = false
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
//引入轮播图插件
import ElementUI from 'element-ui';
//引入轮播图的css样式
//引入iview组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import 'element-ui/lib/theme-chalk/index.css';
//导入moment，显示时间戳
import moment from "moment";
Vue.filter('filtersTime', function (value) {
  return moment(value).format("YYYY年MM月DD日");
})
Vue.use(ElementUI);
Vue.use(VueRouter)
//导入首页组件
import Index from './components/01.index.vue';
import Detail from './components/02.detail.vue';

const routes=[
  {
    path:'/index',
    component:Index
  },{
    path:'/',
    redirect:'/index'
  },
  {
    path:'/detail/:id',
    component:Detail
  }
]
const router=new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
