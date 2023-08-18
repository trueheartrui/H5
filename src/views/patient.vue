<template>
    <div class="patient">
        <van-search class="search" v-model="name" show-action @search="onSearch" @cancel="onCancel" placeholder="请输入搜索关键词" />
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row class="patientItem" v-for="item in list" :key="item" justify="space-between" align="center">
                <van-col class="name" span="8">{{item}}</van-col>
                <van-col class="operate">
                    <van-row>
                        <van-col>
                            <span class="edit" @click="edit">编辑</span>
                        </van-col>
                        <van-col>
                            <span class="delete" @click="deleteItem('hh')">删除</span>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>  
        </van-list>
        <van-row justify="end">
            <van-button class="add" type="primary" @click="add">添加</van-button>
        </van-row>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy } = getCurrentInstance()

const name = ref('')
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

onMounted(()=>{
   
})

const onSearch = (val) => {
    console.log('====================================');
    console.log('search',val);
    console.log('====================================');
}

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};

const onCancel = () => {
    console.log('====================================');
    console.log('cancel');
    console.log('====================================');
}

const edit = () => {
    router.push('editPatient')
}

const add = () => {
    router.push({
        path: 'editPatient',
        query: {
            type: 'add'
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
const deleteItem = (name) => {
    proxy.$showConfirmDialog({
        title: '提示',
        allowHtml: true,
        className: 'confirmDialog',
        teleport: '.patient',
        message: () => {
            return `<span>确定要删除 <span style="color:#1989fa">${name}</span> 吗?</span>`
            // `确定要删除${name}吗`
        },
        beforeClose,
    })
}
</script>

<style lang="scss" scoped>
.search{
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
}
.patient {
    background-color: #f5f5f5;
    height: 100vh;
    padding-top: 54px;
}

.add {
    width: 345px;
    height: 40px;
    border-width: 1px;
    margin: 0 auto;
    font-size: 15px;
    margin-top: 40px;
}

.patientItem {
    // width: 345px;
    height: 50px;
    // margin: 0 auto;
    background-color: #fff;
    border-bottom: 0.5px solid #f5f5f5;
}

.name {
    margin-left: 15px;
    font-size: 15px;
}

.edit {
    margin-right: 30px;
    font-size: 15px;
    color: #1989fa;
}

.delete {
    margin-right: 15px;
    font-size: 15px;
    color: #999;
}
</style>