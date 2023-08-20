<template>
  <div class="project padding16">
    <Draggable v-model="project.value" ref="tree" virtualization :defaultOpen="false">
      <template #default="{ node, stat }">
        <van-cell :title="node.name" icon="label-o" @click="stat.open = !stat.open">

          <template #title>
            <span>
              {{ node.name }}
              <van-icon class="icon" color="#1989fa" name="add-o" @click="add(node)" /> 
              <van-icon class="icon" color="#ee0a24" name="delete-o" @click="deleteItem(node)" /> 
            </span>
            
          </template>
          
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <!-- <van-icon name="search" class="search-icon" /> -->
            <span v-if="stat.children.length">
              <van-icon v-show="stat.open" name="arrow-up" />
              <van-icon v-show="!stat.open" name="arrow-down" />
            </span>
            
          </template>
        </van-cell>

        <!-- <span v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? "-" : "+" }}
        </span>
        {{ node.name }}
        <van-icon name="add-o" @click="add(node)" /> -->
      </template>
    </Draggable>

    <van-button class="add" type="primary" block round  @click="add('')">添加项目</van-button>


    <van-dialog v-model:show="show" :title="parent.name || '添加项目'" show-cancel-button :before-close="handleClose">
      <van-field v-model="name" label="项目名称" placeholder="请输入项目名称" />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { Draggable } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";
import { onMounted } from 'vue';
import { getCurrentInstance,defineComponent } from 'vue';
import router from '@/router';
import { reactive } from 'vue';
import { ref } from 'vue';
import { showSuccessToast } from "vant";
// import data1 from './data.json'

const { proxy } = getCurrentInstance()
const $api = proxy.$api

// const data = ref(data1)

const project = reactive([{
  children: []
}])

const show = ref(false)
const name = ref('')
const parent = ref({ id: '', name: '' })

onMounted(() => {
  getTree()
})

const getTree = ()=>{
  $api.get('/tmp/v1/hospital/category/getTree', { code: '' }, {
    showLoading: true
  }).then(res => {
    project.value = res.data || []
    console.log('====================================');
    console.log(project, 'project=======');
    console.log('====================================');
  })
}

const add = (item) => {
  show.value = true
  if (item) {
    parent.value = item
  } else {
    parent.value = { parentId: '', name: '' }
  }
}

const handleClose = async (action) => {
  if (action === 'cancel') {
    show.value = false
    name.value = ''
    return true
  } else {
    const res = await handleAdd()
    return res
  }
}

const handleAdd = () => {
  return new Promise<void>((resolve, reject) => {
    const data = {
      parentId: parent.value.id || 0,
      name: name.value
    }
    console.log('====================================');
    console.log('ADD', data);
    console.log('====================================');
    $api.post('/tmp/v1/hospital/category/save', data, {
      showLoading: true
    }).then(res => {
      if (res.success) {
        show.value = false
        name.value = ''
        resolve(true)
        getTree()
      }
    })
  })
}

const deleteId = ref(0)

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

const deleteItem = (item) => {
  deleteId.value = item.id
  proxy.$showConfirmDialog({
    title: '提示',
    allowHtml: true,
    className: 'confirmDialog',
    message: () => {
      return `<span>确定要删除 <span style="color:#1989fa">${item.name}</span> 该项目吗?</span>`
    },
    beforeClose,
  })
}

const confirmDelete = () => {
  return new Promise<void>((resolve, reject) => {
    $api.get('/tmp/v1/hospital/category/delete', { id: deleteId.value }).then(res => {
        if (res.success) {
            showSuccessToast('删除成功')
            getTree()
            resolve(true)
        }
    })
  })
}

</script>

<style scoped lang="scss">
@import '../assets/project.scss'
</style>