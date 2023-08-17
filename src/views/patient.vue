<template>
    <div class="patient">
        <van-search v-model="name" show-action @search="onSearch" @cancel="onCancel" placeholder="请输入搜索关键词" />
        <van-row class="patientItem" justify="space-between" align="center">
            <van-col class="name" span="8">小李</van-col>
            <van-col class="operate" span="8">
                <van-row>
                    <van-col>
                        <van-button type="primary" @click="edit">编辑</van-button>
                    </van-col>
                    <van-col>
                        <van-button type="danger" @click="deleteItem('haha')">删除</van-button>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row justify="end">
            <van-button type="primary" @click="add">添加</van-button>
        </van-row>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { getCurrentInstance, ref } from 'vue';
const { proxy } = getCurrentInstance()

const name = ref('')

const onSearch = ()=>{
    console.log('====================================');
    console.log('search');
    console.log('====================================');
}

const onCancel = ()=>{
    console.log('====================================');
    console.log('cancel');
    console.log('====================================');
}

const edit = ()=>{
    router.push('editPatient')
}

const add = ()=>{
    router.push({
        path:'editPatient',
        query:{
            type:'add'
        }
    })
}
const beforeClose = (action) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'confirm') {
        resolve(true);
      } else {
        // 拦截取消操作
        resolve(false);
      }
    }, 1000);
  });
const deleteItem = (name)=>{
    proxy.$showConfirmDialog({
        title: '提示',
        allowHtml:true,
        className:'confirmDialog',
        teleport:'.patient',
        message:()=>{
            return `<span>确定要删除 <span style="color:#1989fa">${name}</span> 吗?</span>`
            // `确定要删除${name}吗`
        },
        beforeClose,
    })
}
</script>

<style lang="scss" scoped>

</style>