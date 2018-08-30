<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" 
                                :base-zoomer-options="zoomerOptions"></ProductZoomer>
                                 -->
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                
                                                    <el-input-number v-model="buyCounts" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-show="!showDiscuss" v-html="goodsinfo.content">
                                
                            </div>
                            <div class="tab-content"  v-show="showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitcoms" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="commentList.length!=0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | filtersTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                      
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                       <Page :total="totalcount" show-elevator show-sizer placement="top"
                                       @on-change="pagechange"
                                       @on-page-size-change="pageSizechange"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                           
                                            
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            
                                            <span>{{item.add_time |filtersTime}}</span>
                                        </div>
                                    </li>
                                  
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    <BackTop></BackTop>
     <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery';
export default {
    name:"detail",
    data: function() {
    return {
     productId:undefined,
     goodsinfo:{},
     hotgoodslist:[],
     imglist:[],
     showDiscuss:false,
     buyCounts:0,
     commentList:[],
      page:1,
      pageSize:10,
      totalcount:0,
      txtContent:'',
     images: {                                             
     normal_size:  // required                          
      [                                             
         
      ]                                               
    },
      zoomerOptions: {
        zoomFactor: 5, // 放大倍数
        pane: "container-round", // container-round 小放大镜
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: false, // true 点击切换
        scroll_items: 7,
        choosed_thumb_border_color: "yellowgreen" // 框的颜色
      }
     
    };
  },
  methods:{
    handleChange() {
     console.log('改变了');
     
      },
    getgoodDetail(){
       this.productId=this.$route.params.id;
        axios.get(`http://47.106.148.205:8899/site/goods/getgoodsinfo/${this.productId}`)
      .then(response=>{
        //   console.log(response);
          
         this.goodsinfo=response.data.message.goodsinfo;
         this.hotgoodslist=response.data.message.hotgoodslist;
         this.imglist=response.data.message.imglist;
        let arrtem=[];
        this.imglist.forEach((v,i) => {
            arrtem.push({
                id:v.id,
                url:v.original_path
            })
        });
        this.images.normal_size=arrtem;
      })
    },
    getcommonts(){
        axios.get(`http://47.106.148.205:8899/site/comment/getbypage/goods/${this.productId}?pageIndex=${this.page}&pageSize=${this.pageSize}`)
        .then(response=>{
            // console.log(response);
            this.commentList=response.data.message;
            this.totalcount=response.data.totalcount;
        })
    },
    pagechange(page) {
        this.page=page;
        this.getcommonts();
    },
    pageSizechange(size) {
        this.pageSize=size;
        if(page==1) {
            this.getcommonts();
        }
    },
    submitcoms() {
        if(!txtContent) {
            this.$Message.error('请输入一些内容吧');
            return;
        }
        axios.post(`http://47.106.148.205:8899/site/validate/comment/post/goods/${this.productId}`,{
             "commenttxt":this.txtContent 
        }).then(response=>{
            console.log(response);
            
            this.$Message.success(response.data.message);
            this.getcommonts();
            this.txtContent='';

        })
    },
      // 加入购物车的逻辑
    // 使用jq来实现
    cartAdd() {
    if (this.buyCounts == 0) {
        this.$Message.error("哥们,买点呗,不买怎么加入购物车呀 (づ￣ 3￣)づ");
        return;
      }
      // 获取加入购物车位置
      let cartOffset = $('.add').offset();
    //   console.log(cartOffset);
      // 获取购物车位置
      let targetOffset = $('.icon-cart').offset();
    //   console.log(targetOffset);
      // 使用动画的方式 移动图片
      // 移动到按钮位置 显示出来 动画移动到目标位置
      $(".moveImg").stop().show().addClass('move').css(cartOffset).animate(targetOffset,function(){
          $(this).hide().removeClass('move');
      });
      // 动画完结以后
      // 	隐藏图片
      // 	增加购物车中的显示内容n
        // 测试 增加数据
      //   this.$store.commit("increment", 68);
      // 直接修改购物车商品数据
      this.$store.commit("addGoods",{goodId:this.productId,goodNum:this.buyCounts});
    }
  },
  created() {
      this.getgoodDetail();
      this.getcommonts();
  },
  watch:{
       $route(val, oldVal) {
      //   console.log(val);
      //   console.log(oldVal);
      //   console.log('改变啦');
      // 认为让他 强制生成 v-if 数组长度 
      // 数组长度为0 直接销毁 
      this.images.normal_size = [];
      
      // 重新调用接口 获取数据 渲染页面
      // 回调函数中重新复制 再次 生成
      this.getgoodDetail();
    }
  }
}
</script>
<style lang="less">
    .tab-content img {
        display: block;
    }
    // lang=less 让vue 使用less 来解析 这里的样式
/* 设置 内容区域 图片样式 */
.tab-content img {
  width: 100%;
  /* 去除图片底部的 间隙 */
  display: block;
}
/* iview的回到顶部 */
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list{
      display: flex;
      justify-content: center;
      img{
          width: 80px;
          height: 80px;
          margin: 2px;
      }
  }
  .control{
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items:center;
  }
}
// 移动图片的样式
.moveImg {
  position: absolute;
  width: 50px;
  //   display: none;
  // top:0;
  // left:0;
}
.moveImg.move {
  transition: transform 1s, opacity 1s;
  opacity: 0.5;
  transform: scale(0.2) rotate(7200deg);
}
</style>
