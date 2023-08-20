<template>
  <div class="patient">
    <van-search class="search" v-model="name" show-action @search="onSearch" @cancel="onCancel" placeholder="请输入姓名" />
    <div class="list">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell-group inset>
          <template v-if="list.length">
            <van-cell v-for="item in list" :key="item" title="单元格" icon="user-o">
              <template #title>
                <span>{{ item.name }}</span>
                <span>（{{ item.phone }}）</span>
              </template>
              <template #right-icon>
                <span class="edit" @click="edit(item)">编辑</span>
                <span class="delete" @click="deleteItem(item)">删除</span>
              </template>
            </van-cell>
          </template>

          <div v-else class="emptyOuter">
            <van-empty description="暂无病人"></van-empty>
          </div>
        </van-cell-group>

        <template #loading>
          <span></span>
        </template>
      </van-list>
    </div>

    <van-button class="add" type="primary" block round @click="add">添加</van-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { showSuccessToast } from 'vant';
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy } = getCurrentInstance()
const $api = proxy.$api

const name = ref('')
const list = ref([]);
const cacheList = ref([])
const loading = ref(false);
const finished = ref(false);
const pageObj = ref({
  pageNum: 1,
  pageSize: 10,
  pages: 0
})
const cachePageObj = ref({
  pageNum: 1,
  pageSize: 10,
  pages: 0
})

onMounted(() => {
  getData()
})

const onSearch = (val) => {
  console.log('====================================');
  console.log('search', val);
  console.log('====================================');
  pageObj.value.pageNum = 1
  pageObj.value.pages = 0
  list.value = []
  getData('search')
}

const getData = (type) => {
  if (pageObj.value.pageNum !== 1) {
    if (pageObj.value.pageNum > pageObj.value.pages) {
      finished.value = true;
      return
    }
  }
  loading.value = true

  const data = {
    name: name.value, 
    pageNum: pageObj.value.pageNum, 
    pageSize: pageObj.value.pageSize
  }

  $api.post1('/tmp/v1/hospital/user/list', data, {}, {
    showLoading: true
  }).then(res => {
    if (res.success) {
      list.value = list.value.concat(res.data.list) || []
      pageObj.value.pages = res.data.pages

      if(type !== 'search'){
        cacheList.value = cacheList.value.concat(res.data.list) || []
        cachePageObj.value = {...pageObj.value}
      }
    }
  }).finally(() => {
    console.log('====================================');
    console.log('finally----------');
    console.log('====================================');
    loading.value = false;
    pageObj.value.pageNum++
  })
}

const onLoad = () => {
  console.log('====================================');
  console.log('load----------------------');
  console.log('====================================');
  getData()
};

const onCancel = () => {
  // console.log('====================================');
  // console.log('cancel');
  // console.log('====================================');
  list.value = [...cacheList.value]
  pageObj.value = {...cachePageObj.value}
}

const edit = (item) => {
  router.push({ path: '/editPatient', query: { id: item.id } })
}

const add = () => {
  router.push('addPatient')
}
const beforeClose = (action) =>
  new Promise(async (resolve) => {
    if (action === 'confirm') {
      const res = await confirmDelete()
      resolve(res)
    } else {
      // 拦截取消操作
      resolve(true);
    }
  });

const clickItemId = ref(0)
const deleteItem = (item) => {
  clickItemId.value = item.id
  proxy.$showConfirmDialog({
    title: '提示',
    allowHtml: true,
    className: 'confirmDialog',
    teleport: '.patient',
    message: () => {
      return `<span>确定要删除 <span style="color:#1989fa">${item.name}</span> 吗?</span>`
    },
    beforeClose,
  })
}

const confirmDelete = () => {
  return new Promise<void>((resolve, reject) => {
    $api.get('/tmp/v1/hospital/user/delete', { id: clickItemId.value }, {
      showLoading: true
    }).then(res => {
      if (res.success) {
        showSuccessToast('删除成功')
        pageObj.value.pageNum = 1
        getData()
        resolve(true)
      }
    })
  })
}
</script>

<style lang="scss" scoped>
.search {
  border-radius: 8px;
  margin: 16px;
}

.patient {
  background-color: #f5f5f5;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}

.list {
  flex: 1;
  overflow: auto;
}

.add {
  width: 345px;
  height: 40px;
  border-width: 1px;
  margin: 0 auto;
  font-size: 15px;
  margin-top: 16px;
  margin-bottom: 16px;
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
  margin-right: 10px;
  // font-size: 15px;
  color: #1989fa;
}

.delete {
  // margin-right: 15px;
  // font-size: 15px;
  color: #999;
}
</style>