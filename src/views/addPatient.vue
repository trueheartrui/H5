<template>
  <van-form class="toEditPatient" @failed="onFailed" @submit="onSubmit">
    <h4>基本资料</h4>
    <van-cell-group inset>
      <van-field v-model="formData.name" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
      <van-field v-model="formData.phone" maxlength="11" placeholder="请输入手机号"
        :rules="[{ pattern, message: '请输入正确的手机号' }]" />
    </van-cell-group>
    <van-button class="save" type="primary" round block native-type="submit">添加</van-button>
  </van-form>
</template>

<script setup lang="ts">
import router from "@/router";
import { showSuccessToast } from "vant";
import { getCurrentInstance } from "vue";
import { onBeforeMount, reactive, ref } from "vue";
const { proxy } = getCurrentInstance()

onBeforeMount(function () {

})


const formData = reactive({
  name: '',
  phone: '',
})

const pattern = /\d{11}/;

const onSubmit = () => {
  proxy.$api.post('/tmp/v1/hospital/user/add', formData).then(res => {
    if (res.success) {
      showSuccessToast('添加成功')
      router.replace({
        path: 'editPatient',
        query: { userId: res.data }
      })
    }
  })
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 10px;
}

.toEditPatient {
  overflow: auto;
}

.save {
  width: 345px;
  margin: 0 auto;
  margin-top: 40px;
}
</style>