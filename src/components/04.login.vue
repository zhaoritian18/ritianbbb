<template>
    <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                       <el-input v-model="name" placeholder="请输入内容"></el-input>
                       <el-input v-model="password" placeholder="请输入内容"></el-input>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>


</div>
</template>

<script>
import axios from 'axios';
export default {
    data:function(){
        return {
            name:'admin',
            password:'123'
        }
    },
    methods:{
        login() {
            axios.post('http://47.106.148.205:8899/site/account/login',{
                user_name:this.name,
                password:this.password
            })
            .then(response=>{
                //验证是否登录成功
               if(response.data.status==0) {
                   //登录成功跳转到上次跳转过来的页面
                   this.$store.commit('changeLogin',true);
                   this.$router.push(this.$store.state.FromPath);
               }
            })
        }
    }
}
</script>


<style>

</style>
