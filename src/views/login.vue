<template>
  <van-form class="outer" @failed="onFailed" @submit="onSubmit">
    <h3>手机密码登录</h3>
    <van-cell-group inset>
      <van-field v-model="account" name="pattern" type="tel" maxlength="11" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />
      <van-row justify="space-between" align="center">
        <van-col span="20">
          <van-field v-model="password" name="validator" :type="inputType" placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]" />
        </van-col>
        <van-col>
          <van-icon class="icon" v-show="inputType === 'text'" @click="changeInputType" name="eye-o" />
          <van-icon class="icon" v-show="inputType === 'password'" @click="changeInputType" name="closed-eye" />
        </van-col>
      </van-row>
      
      
    </van-cell-group>
    
    

    <div class="margin16 footer">
      <div class="toRegister">
        <router-link class="register" to="/register">立即注册</router-link>
      </div>
      <van-button class="login" round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';
import router from '@/router';

const { proxy } = getCurrentInstance()
const $api = proxy.$api

const account = ref('13834382097');
const password = ref('wd123456');
const inputType = ref('password');
const pattern = /\d{11}/;

const changeInputType = () => {
  if (inputType.value === 'text') {
    inputType.value = 'password'
  } else {
    inputType.value = 'text'
  }
}

const onSubmit = () => {
  $api.post('test/usercenter/v1/account/login',{
    account:account.value,
    password:password.value
  },{
    showLoading:true
  }).then(res=>{
    console.log('====================================');
    console.log(res,'RES');
    console.log('====================================');
    localStorage.setItem('token','aaaaa')
    router.push('home')
  })
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};

</script>

<style lang="scss" scoped>
.icon{
  margin-right: 16px;
}
.toRegister{
  text-align: right;
  margin-bottom: 10px;
}
.login,.register{
  font-size: 14px;
}

.margin16{
  margin: 16px;
}

h3{
  margin-left: 32px;
}

.footer{
  margin-top: 20px;
}
.outer{
  margin-top: 30px;
}
</style>