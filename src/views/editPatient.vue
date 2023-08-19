<template>
    <van-form class="editPatient" @failed="onFailed" @submit="onSubmit">
        <van-cell-group inset>
            <h4>基本资料</h4>
            <van-field v-model="formData.name" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
            <van-field v-model="formData.phone" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />

            <van-row class="addItem" align="center">
                <h4 style="margin: 0;">添加项目</h4>
                <van-icon class="addIcon" color="#1989fa" name="add-o" @click="add(undefined)" />
            </van-row>
            <div v-for="(item, i) in items" :key="item.id">
                <van-cell title="已选项目" :value="item.value" />
                <van-cell title="日期" :value="item.date" />
                <van-cell title="日期区间" :value="item.range" />
                <van-cell title="时间点" :value="item.time" />
                <van-cell v-show="item.value" :title="item.value" :value="item.itemNumber" />
                <van-row class="operation" justify="end">
                    <span class="editText" @click="add(item)">
                        <van-icon name="edit" />
                        编辑
                    </span>
                    <span class="delteText" @click="deleteItem(i)">
                        <van-icon name="delete-o" />
                        删除
                    </span>
                </van-row>
            </div>
        </van-cell-group>

        <div class="footer">
            <van-button v-if="type === 'add'" round block type="primary" native-type="submit">
                添加
            </van-button>
            <van-button class="save" v-else round block type="primary" native-type="submit">
                保存
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import router from "@/router";
import { onBeforeMount, reactive, ref } from "vue";

onBeforeMount(function () {
    type.value = router.currentRoute.value.query.type
})

let type = ref('')

const formData = reactive({
    name: '',
    phone: '',
    password: '',
    rePassword: ''
})
const items = reactive([
    {
        id: '',
        value: '',
        code: '',
        date: '',
        range: '',
        time: '',
        itemNumber: 0
    }
])
const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
// 选项列表，children 代表子选项，支持多级嵌套
const options = [
    {
        text: '浙江省',
        value: '330000',
        children: [{ text: '杭州市', value: '330100' }],
    },
    {
        text: '江苏省',
        value: '320000',
        children: [{ text: '南京市', value: '320100' }],
    },
];
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {

    const index = items.findIndex(item => item.show)
    console.log('====================================');
    console.log(index);
    console.log('====================================');

    items[index].show = false;
    // fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    items[index].value = selectedOptions.map((option) => option.text).join('/');
    console.log('====================================');
    console.log(cascaderValue);
    console.log('====================================');
};

const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;

const onConfirmSingleDate = (value) => {
    const index = items.findIndex(item => item.showSingleDate)
    items[index].showSingleDate = false;
    items[index].date = formatDate(value);
};

const formatRange = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirmRange = (values) => {
    const index = items.findIndex(item => item.showRange)
    const [start, end] = values;
    items[index].showRange = false;
    items[index].range = `${formatRange(start)} - ${formatRange(end)}`;
};

const onConfirmTime = ({ selectedValues, selectedOptions }) => {
    console.log('====================================');
    console.log(selectedValues, selectedOptions);
    console.log('====================================');
    const index = items.findIndex(item => item.showTime)
    items[index].time = selectedValues[0] + ':' + selectedValues[1]
    items[index].showTime = false
}


const pattern = /\d{11}/;

const add = (item) => {
    if (item) {
        console.log('====================================');
        console.log(item);
        console.log('====================================');
        router.push({
            path: 'toEditPatient',
            query: JSON.stringify(item.value)
        })
    } else {
        router.push({
            path: 'toEditPatient'
        })
    }

}

const deleteItem = (i) => {
    items.splice(i, 1)
}

const onSubmit = () => {
    router.push('home')
}

const onFailed = (errorInfo) => {
    console.log('failed', errorInfo);
};
</script>

<style lang="scss" scoped>
h4 {
    margin-bottom: 10px;
}

@import '../assets/editPatient.scss'
</style>