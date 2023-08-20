<template>
    <van-form class="editPatient">
        <div class="content">
            <h4>基本资料</h4>
            <van-cell-group inset>
                <van-field ref="name" v-model="formData.name" @focus="handleFocus('name')" placeholder="请输入姓名"
                    :rules="[{ required: true, message: '请输入姓名' }]">
                    <template #button>
                        <div v-show="showSaveName" @click="updateUser('name')">
                            <van-icon name="success" color="#1989fa" />
                            <span class="primaryColor">保存</span>
                        </div>
                        <div v-show="!showSaveName" @click="$refs.name.focus()">
                            <van-icon name="edit" color="#1989fa" />
                            <span class="primaryColor">编辑</span>
                        </div>
                    </template>
                </van-field>
                <van-field ref="phone" v-model="formData.phone" @focus="handleFocus('phone')" maxlength="11"
                    placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]">
                    <template #button>
                        <div v-show="showSavePhone" @click="updateUser('phone')">
                            <van-icon name="success" color="#1989fa" />
                            <span class="primaryColor">保存</span>
                        </div>
                        <div v-show="!showSavePhone" @click="$refs.phone.focus()">
                            <van-icon name="edit" color="#1989fa" />
                            <span class="primaryColor">编辑</span>
                        </div>
                    </template>
                </van-field>
            </van-cell-group>

            <h4>项目清单</h4>
            <template v-if="patientItems.length">
                <van-cell-group class="item" v-for="(item, i) in patientItems" :key="item.id" inset>
                    <van-cell title="名称" :value="item.categoryName" />
                    <van-cell title="次数" :value="`${item.number}次`" />
                    <van-cell title="日期" value-class="range" :value="`${item.startTime} 至 ${item.endTime}`" />
                    <van-cell title="时间" :value="item.presetTime" />
                    <van-cell title="备注" :value="item.remark" />
                    <van-row class="operation" justify="end">
                        <span class="editText" @click="edit(item)">
                            <van-icon name="edit" />
                            编辑
                        </span>
                        <span class="delteText" @click="deleteItem(item)">
                            <van-icon name="delete-o" />
                            删除
                        </span>
                        <span class="detail" @click="viewItemRecords(item)">
                            <van-icon name="description" />
                            查看明细
                        </span>
                    </van-row>
                </van-cell-group>
            </template>
            <template v-else>
                <div class="paddingLR16">
                    <van-empty description="暂无项目" />
                </div>
            </template>
        </div>

        <van-button class="footer" round block type="primary" native-type="submit" @click="add">
            添加项目
        </van-button>
    </van-form>
</template>

<script setup lang="ts">
import router from "@/router";
import { showSuccessToast } from "vant";
import { onBeforeMount, reactive, ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()
const $api = proxy.$api

const userId = router.currentRoute.value.query.id

onBeforeMount(function () {
    getDetail()
})

const getDetail = () => {
    $api.get('/tmp/v1/hospital/user/detail', { id: userId }).then(res => {
        if (res.success) {
            fillData(res.data)
        }
    })
}

const formData = reactive({
    name: '',
    phone: '',
})

const patientItems = ref([])

const fillData = (data) => {
    formData.name = data.name
    formData.phone = data.phone

    patientItems.value = data.patientItems
}

const pattern = /\d{11}/;

const add = () => {
    router.push({
        path: 'editProject',
        query: { userId }
    })
}

const edit = (item) => {
    router.push({
        path: 'editProject',
        query: { id: item.id }
    })
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
    message: () => {
      return `<span>确定要删除 <span style="color:#1989fa">${item.categoryName}</span> 该项目吗?</span>`
    },
    beforeClose,
  })
}

const confirmDelete = () => {
  return new Promise<void>((resolve, reject) => {
    $api.get('/tmp/v1/hospital/patientItem/delete', { id: clickItemId.value }).then(res => {
        if (res.success) {
            showSuccessToast('删除成功')
            getDetail()
            resolve(true)
        }
    })
  })
}

const viewItemRecords = (item) => {
    router.push({
        path: '/projectItemRecords',
        query: {
            id: item.id,
            categoryName:item.categoryName
        }
    })
}

const onSubmit = () => {
    router.push('home')
}

const onFailed = (errorInfo) => {
    console.log('failed', errorInfo);
};

const showSaveName = ref(false)
const showSavePhone = ref(false)

const handleFocus = (key) => {
    if (key === 'name') {
        showSaveName.value = true
    } else if (key === 'phone') {
        showSavePhone.value = true
    }
}

const updateUser = (key) => {
    if (key === 'name') {
        $api.post('/tmp/v1/hospital/user/update', { name: formData.name, userId }).then(res => {
            if (res.success) {
                showSuccessToast('修改成功')
                showSaveName.value = false
            }
        })
    } else if (key === 'phone') {
        $api.post('/tmp/v1/hospital/user/update', { phone: formData.phone, userId }).then(res => {
            if (res.success) {
                showSuccessToast('修改成功')
                showSavePhone.value = false
            }
        })
    }
}

const handleBlur = (key) => {
    if (key === 'name') {
        showSaveName.value = false
    } else if (key === 'phone') {
        showSavePhone.value = false
    }
}
</script>

<style lang="scss" scoped>
h4 {
    margin-bottom: 10px;
}

@import '../assets/editPatient.scss'
</style>