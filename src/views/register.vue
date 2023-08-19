<template>
  <van-form class="outer" @failed="onFailed" @submit="onSubmit">
    <h3>账号注册</h3>
    <van-cell-group inset>
      <van-field v-model="formData.name" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
      <van-field v-model="formData.phone" placeholder="请输入手机号" type="tel" maxlength="11" :rules="[{ pattern, message: '请输入正确的手机号' }]" />
      <van-row justify="space-between" align="center">
        <van-col span="20">
          <van-field v-model="formData.pwd" :type="inputType" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
        </van-col>
        <van-col>
          <van-icon class="icon" v-show="inputType === 'text'" @click="changeInputType(1)" name="eye-o" />
          <van-icon class="icon" v-show="inputType === 'password'" @click="changeInputType(1)" name="closed-eye" />
        </van-col>
      </van-row>

      <van-row justify="space-between" align="center">
        <van-col span="20">
          <van-field v-model="formData.pwd1" :type="inputType2" placeholder="请再次输入密码" name="validatorMessage" :rules="[{ validator: validatorMessage }]" />
        </van-col>
        <van-col>
          <van-icon class="icon" v-show="inputType2 === 'text'" @click="changeInputType(2)" name="eye-o" />
          <van-icon class="icon" v-show="inputType2 === 'password'" @click="changeInputType(2)" name="closed-eye" />
        </van-col>
      </van-row>
      
    </van-cell-group>

    <div class="margin16">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import router from '@/router';

const { proxy } = getCurrentInstance()
const $api = proxy.$api

const formData = reactive({
  name: '',
  phone: '',
  pwd: '',
  pwd1: '',
  type:0
})

const inputType = ref('password');
const inputType2 = ref('password');

const changeInputType = (val) => {
  if(val === 2){
    if (inputType2.value === 'text') {
      inputType2.value = 'password'
    } else {
      inputType2.value = 'text'
    }
  }else{
    if (inputType.value === 'text') {
      inputType.value = 'password'
    } else {
      inputType.value = 'text'
    }
  }
}

const pattern = /\d{11}/;

// 校验函数可以直接返回一段错误提示
const validatorMessage = (val) => {
  if(!val){
    return '请再次输入密码'
  }else if(val !== formData.pwd){
    return '两次密码不一致'
  }
};

const onSubmit = () => {
  $api.post('/tmp/v1/user/register',formData,{
    showLoading:true
  }).then(res=>{
    if(res.success){
      console.log('====================================');
      console.log(res,'RES');
      console.log('====================================');
      localStorage.setItem('token','aaaaa')
      router.push('home')
    }
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
  margin-right: 16px;
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

.outer{
  margin-top: 30px;
}
</style>