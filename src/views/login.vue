<template>
  <van-form @failed="onFailed" @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="phone" name="pattern" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />
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
import router from '@/router';

const phone = ref('');
const password = ref('abc');
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
  router.push('home')
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