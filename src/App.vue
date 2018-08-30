 <template>
 <div>
   <div class="header">
        <!-- 1.0 导航栏头部 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>黑马买买买</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <span v-show="$store.state.islogin==false">
                        <router-link to="/login">
                            登录
                        </router-link>
                        <strong>|</strong>
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                    <span v-show="$store.state.islogin==true">
                        <a href="" class="">会员中心</a>
                        <strong>|</strong>
                        <a @click="loginout">退出</a>
                        <strong>|</strong>
                    </span>
                   <router-link to="/cart">
                    <!-- <a href="" class=""> -->
                        <i class="iconfont icon-cart"></i>购物车(
                        <span id="shoppingCartCount">
                            <span>{{$store.getters.goodsCounts}}</span>
                        </span>)
                        <!-- </a> -->
                        </router-link>
                </div>
            </div>
        </div>

        <!-- 2.0 导航条 -->
        <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                           <router-link to="/index"> 
                           <span class="out" style="top: 0px;">首页</span></router-link>
                        </li>
                        <li class="news">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                        </li>
                        <li class="video">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">黑马超市</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                        </li>
                        <li class="goods">
                            <a href="" class="">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- 视口 -->
  <router-view></router-view> 
 <div class="footer">
                <div class="section">
                    <div class="foot-nav">
                        <a href="">关于我们</a>
                        <strong>|</strong>
                        <a href="">联系我们</a>
                        <strong>|</strong>
                        <a href="">联系客服</a>
                        <strong>|</strong>
                        <a href="">合作招商</a>
                        <strong>|</strong>
                        <a href="">商家帮助</a>
                        <strong>|</strong>
                        <a href="">营销中心</a>
                        <strong>|</strong>
                        <a href="">隐私政策</a>
                    </div>
                    <div class="foot-box">
                        <div class="copyright">
                            <p>版权所有 黑马买买买 </p>
                            <p>公司地址： 联系电话：</p>
                            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                        </div>
                        <div class="service">
                            <p>周一至周日 9:00-24:00</p>
                            <a href="#">
                                <i class="iconfont icon-phone"></i>在线客服</a>
                        </div>
                    </div>
                </div>
            </div>
 
 
 
 
 
  <Modal v-model="isshow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>你真的要离开?(╥╯^╰╥)</span>
      </p>
      <div style="text-align:center">
        <p>登出了之后,只有重新登录才能够回来啦,你确定你记得密码?</p>
      </div>
      <div slot="footer" style="display:flex;justify-content: center">
        <Button type="success" size="large"   @click="sureExit">确认</Button>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <Button type="error" size="large"   @click="isShow=false">取消</Button>
      </div>
    </Modal>
 
 </div>
</template>

<script>
//引入下载好的jquery
import $ from 'jquery';
import axios from 'axios';
export default {
  name: 'container',
  data:function(){
      return{
          isshow:false
      }
  },
  methods:{
      loginout(){
          this.isshow=true;
      },
      sureExit() {
          //点击登出，改变登录状态
          this.isshow=false;
            axios.get(`http://47.106.148.205:8899/site/account/logout`)
            .then(response=>{
                //判断是否成功登出
               if(response.data.status==0) {
                   //成功登出，改变登录状态
                     this.$store.commit('changeLogin',false);
                     this.$router.push('/login');
               }
            })

      }
  }
  
}
//插件的动画,为a标签增加2个用于动画的span
$(document).ready(function() {
	$("#menu2 li a").wrapInner( '<span class="out"></span>' );
	$("#menu2 li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});

	$("#menu2 li a").hover(function() {
		$(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
		$(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

	}, function() {
		$(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
		$(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
	});

});
</script>

<style>
/* 引入样式 */
  @import url('./assets/statics/site/css/style.css');
  /* 导入jqeury动画的样式 */
  @import url('./assets/lib/css/style.css');
  /* 将动画样式带来的背景图覆盖 */
  #menu2 {
    background-image: none;
  }
  body {
    background-color: transparent;
  }
</style>
