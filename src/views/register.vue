<template>
  <van-form @failed="onFailed" @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="formData.name" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
      <van-field v-model="formData.phone" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />
      <van-field v-model="formData.password" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
      <van-field v-model="formData.rePassword" placeholder="请再次输入密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { reactive } from "vue";
const formData = reactive({
  name: '',
  phone: '',
  password: '',
  rePassword: ''
})

const pattern = /\d{11}/;

const onSubmit = () => {
  router.push('home')
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};
</script>

<style lang="scss" scoped></style>