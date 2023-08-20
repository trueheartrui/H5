<template>
  <div class="user">
    <h4>个人资料</h4>
    <van-cell-group inset>
      <van-cell title="姓名" :value="userInfo.name" />
      <van-cell title="手机号" :value="userInfo.phone" />
      <van-cell title="修改密码" is-link :to="`/modifyPassword?phone=${userInfo.phone}`" />
    </van-cell-group>

    <template v-if="type == 1">
      <h4>项目管理</h4>
      <van-cell-group inset>
        <van-cell title="项目管理" is-link to="/project" />
      </van-cell-group>
    </template>

    <template v-else>
      <h4>我的项目</h4>
      <van-cell-group inset>
        <van-cell title="我的项目" is-link to="/myProject" />
      </van-cell-group>
    </template>

    <div class="footer">
      <van-button class="logout" plain hairline type="primary" @click="handleLogout">退出登录</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';
const {proxy} = getCurrentInstance()

const type = localStorage.getItem('type')

const userInfo = ref({
  name:'',
  phone:''
})
onMounted(()=>{
  getData()
})

const getData = ()=>{
  proxy.$api.get('/tmp/v1/hospital/user/userInfo').then(res=>{
    if(res.success){
      userInfo.value.name = res.data.name
      userInfo.value.phone = res.data.phone
    }
  })
}

const handleLogout = ()=>{
  localStorage.clear()
  router.replace('login')
}
</script>

<style lang="scss" scoped>
.user {
  overflow: auto;
}
.footer{
  padding: 10px;
  margin-top: 30px;
  padding-left: 16px;
  padding-right: 16px;
}
.logout{
  width: 100%;
}
</style>