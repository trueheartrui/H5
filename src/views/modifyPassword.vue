<template>
  <van-form class="toEditPatient" @failed="onFailed" @submit="onSubmit">
    <h4>修改密码</h4>
    <van-cell-group inset>
      <van-field v-model="formData.name" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
      <van-field v-model="formData.phone" maxlength="11" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />
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
    <van-button class="save" type="primary" round block native-type="submit">确定</van-button>
  </van-form>
</template>

<script setup lang="ts">
import router from "@/router";
import { showSuccessToast } from "vant";
import { getCurrentInstance } from "vue";
import { onBeforeMount, reactive, ref } from "vue";
const {proxy} = getCurrentInstance()
const phone = router.currentRoute.value.query.phone || ''
onBeforeMount(function () {
  
})


const formData = reactive({
  name: '',
  phone,
  pwd: '',
  pwd1: '',
})

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
  proxy.$api.post('/tmp/v1/hospital/user/resetPwd',formData).then(res=>{
    if(res.success){
      showSuccessToast('修改成功，请重新登录！')
      localStorage.clear()
      router.replace('/login')
    }
  })
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};

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
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 10px;
}

.toEditPatient{
  overflow: auto;
}

.save{
  width: 345px;
  margin: 0 auto;
  margin-top: 40px;
}

.icon{
  margin-right: 16px;
}
</style>