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
import axios from 'axios';
//vue默认提交时是不会带上cookie的，只有这样设置才能进行保持登录状态
axios.defaults.withCredentials = true;
//导入懒加载插件
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  // error:'./static/error.png',
  loading:require('./assets/img/1.jpg')
})
//导入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer)
import 'element-ui/lib/theme-chalk/index.css';
//导入moment，显示时间戳
import moment from "moment";
Vue.filter('filtersTime', function (value) {
  return moment(value).format("YYYY年MM月DD日");
})
Vue.use(ElementUI);
Vue.use(VueRouter)
//导入vuex的数据共享管理插件
import Vuex from 'vuex'
Vue.use(Vuex)
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    goodsCart:JSON.parse(localStorage.getItem('goodslist'))||{},
    FromPath:'',
    islogin:false
  },
  mutations: {
    //为全局添加一个方法，并且在其他组件只能通过this.$store.commit('方法名',参数)
     // 增加购物车数据获取到 id 以及数量
    // 传入的数据是一个对象 格式{goodId:商品id,goodNum:数量}
    addGoods: (state,goodInfo) => {
      //传入的  // 传过来的id 不存在 新增这个id作为属性
        // 直接增加这个属性即可
        // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
        if(state.goodsCart[goodInfo.goodId]==undefined) {
          // state.goodsCart[goodInfo,goodid]=state.goodsCart[goodInfo,goodNum];
          // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.goodsCart,goodInfo.goodId,goodInfo.goodNum)
      }else{
          // 传过来的id 已经存在 累加
          state.goodsCart[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
     // 额外的增加一个修改的方法
    // 逻辑是 直接把传入的 数量 替换掉 默认的数量
    // 格式约定 格式{goodId:商品id,goodNum:数量}
    updategoods:(state,goodInfo)=>{
      // Vue.set(state.goodsCart,goodInfo.goodId,goodInfo.goodNum)
      state.goodsCart[goodInfo.goodId]=goodInfo.goodNum;
    },
      // 额外的增加一个删除的方法
    // goodId就是 商品的id
    deleteOnegood:(state,goodId)=> {
      // delete state.cartDate[goodId];
      // delete 删除的属性不会触发视图更新
      // 需要调用Vue.delete方法才可以
      Vue.delete(state.goodsCart,goodId);
    },
    saveFromPath:(state,FromPath)=>{
      state.FromPath=FromPath;
    },
    changeLogin:(state,islogin)=>{
      state.islogin=islogin;
    }
  },
  getters: {
    //相当于computed计算属性
    goodsCounts:state=>{
      //定义一个变量保存总数
      let num=0;
      //循环保存数据的数组,这里的key是保存的商品id，对应的值是该商品对应的数量
      for (const key in state.goodsCart) {
        num +=state.goodsCart[key];
      }
      return num;
    }
  }
})

window.onbeforeunload=function(){
  window.localStorage.setItem('goodslist',JSON.stringify(store.state.goodsCart))
}
//导入首页组件
import Index from './components/01.index.vue';
import Detail from './components/02.detail.vue';
import shoppingCart from './components/03.shoppingCart.vue';
import Login from './components/04.login.vue';
import Order from './components/05.order.vue'
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
  },
  {
    path:'/cart',
    component:shoppingCart
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/order/:ids',
    component:Order
  }
]
const router=new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
    store.commit('saveFromPath',from.path);
    if(to.path.indexOf('/order/')!=-1) {
      axios.get(`http://47.106.148.205:8899/site/account/islogin`).then(response=>{
        if(response.data.code=='nologin') {
         next('/login');
        }else{
          next();
        }
      })
    }else{
      next(); 
    }
 next();
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
