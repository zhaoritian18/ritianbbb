<template>
    <div  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width:65px"></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td><el-input-number size="mini" @change="numChange($event,item.id)" :min="0" v-model="item.buycount"></el-input-number></td>
                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td><el-button type="danger" @click="deleteOne(item.id)"  icon="el-icon-delete" circle></el-button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalmoney}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                            <button class="button" >继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


</div>
</template>
<script>
import axios from 'axios';
export default {
    name:'shoppingCart',
    data:function() {
        return {
            message:[],
            loading:false
        }
    },
    created() {
        let ids='';
        //获取加入购物车的商品
        let goodids=this.$store.state.goodsCart;
        //遍历整个对象，提取出所有id
        for (const key in goodids) {
           ids+=key;
           ids+=',';
        }
        // console.log(goodids);
        ids=ids.slice(0,-1);
        // console.log(ids);
        axios.get(`http://47.106.148.205:8899/site/comment/getshopcargoods/${ids}`)
        .then(response=>{
            // console.log(response);
            response.data.message.forEach(v => {
                v.buycount=goodids[v.id];
                v.selected=true;
            });
            this.message=response.data.message;
        })
    },
    methods:{
        numChange(num,id){
            // console.log(1111);
            //提交载荷commit，调用定义在store对象mutations中的函数
           this.$store.commit("updategoods",{goodId:id,goodNum:num});
        },
        deleteOne(id) {
            // console.log(111);
            //获取加入购物车的所有商品
        //      let goodlist=this.$store.state.goodsCart;
        //    for (const key in goodlist) {
        //        //遍历商品与传入要删除商品id的进行删除
        //        if(key==id) {
        //            console.log(111);
        //          this.$store.commit("deleteOnegood",id);
        //        }
        //    }
        //不需要遍历对象判断id是否与删除的相同，因为只有点击删除的时候才会将商品id传过去
        this.$store.commit("deleteOnegood",id);
        
        this.message.forEach((v,i)=>{
            //遍历整个message数组，将删除传过来的id与数组拥有相同id进行匹配
            //将匹配到的元素进行删除
            if(v.id==id) {
                this.message.splice(i,1);
            }
        })
        },
        checkAndSubmit() {
            if(this.totalmoney==0) {
                this.$Message.error('不买东西，你还想走???')
                return;
            }
            let ids='';
            this.message.forEach(v=>{
                ids+=v.id;
                ids+=',';
            })
            ids=ids.slice(0,-1);
            axios.get(`http://47.106.148.205:8899/site/account/islogin`)
            .then(response=>{
                console.log(response);
                if(response.data.code=='nologin') {
                    
                    this.$router.push('/login');
                }else{
                    //登录成功时，点击结算跳转到订单详情页面
                    this.$router.push('/order/ids');
                }
            })
            
            // this.loading=true;
            // axios.get(`http://47.106.148.205:8899/site/account/islogin`)
            // .then(response=>{
            //     setTimeout(()=>{
            //     if(response.data.code=='nologin') {
            //         //没有登录，打回登录页面
            //         this.loading=false;
            //         this.$router.push('/login')
            //     }else{
            //         //登录了，跳转
            //         this.router.push('/order/ids')
            //     }
            //     },1000)
               
            // })
        }
    },
    computed:{
        totalCount(){
            let num=0;
            this.message.forEach((v,i)=>{
                if(v.selected) {
                    num+=v.buycount;
                }
            })
            return num;
        },
        totalmoney() {
            let money=0;
             this.message.forEach((v,i)=>{
                if(v.selected) {
                    money+=v.buycount*v.sell_price;
                }
            })
            return money;
        }
    }
}

</script>
<style>

</style>
