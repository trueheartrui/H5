<template>
  <van-form @failed="onFailed" @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="account" name="pattern" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />
      <van-field v-model="password" name="validator" :type="inputType" placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]" />
      <van-icon v-show="inputType === 'text'" @click="changeInputType" name="eye-o" />
      <van-icon v-show="inputType === 'password'" @click="changeInputType" name="closed-eye" />
    </van-cell-group>

    <router-link to="/register">立即注册</router-link>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
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
  // router.push('home')
  $api.post('test/usercenter/v1/account/login',{
    account:account.value,
    password:password.value
  },{
    headers: { 'showLoading': true }
  }).then(res=>{
    console.log('====================================');
    console.log(res);
    console.log('====================================');
  })
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};

</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: red;

  .inner {
    width: 20px;
    height: 20px;
    background-color: black;
  }
}
</style>