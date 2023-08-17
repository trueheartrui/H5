<template>
    <div>
        <van-form @failed="onFailed" @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="formData.name" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
                <van-field v-model="formData.phone" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />

                <div v-for="(item,i) in items" :key="item.id">
                    <van-field  v-model="item.value" is-link readonly label="地区" placeholder="请选择所在地区" @click="item.show = true" />
                    <van-popup v-model:show="item.show" round position="bottom">
                        <van-cascader v-model="item.code" title="请选择所在地区" :options="options" @close="item.show = false"
                            @finish="onFinish" />
                    </van-popup>
                    
                    <van-cell title="选择单个日期" :value="item.date" @click="item.showSingleDate = true" />
                    <van-calendar v-model:show="item.showSingleDate" @confirm="onConfirmSingleDate" />

                    <van-cell title="选择日期区间" :value="item.range" @click="item.showRange = true" />
                    <van-calendar v-model:show="item.showRange" type="range" @confirm="onConfirmRange" />

                    <van-cell title="选择时间" :value="item.time" @click="item.showTime = true" />
                    <van-popup v-model:show="item.showTime" round position="bottom">
                        <van-time-picker v-model="item.currentTime" title="选择时间" @confirm="onConfirmTime" @cancel="item.showTime = false"/>
                    </van-popup>
                    
                    <van-row justify="space-between">
                        <van-col>
                            {{ item.value }}
                        </van-col>
                        <van-col>
                            <van-stepper v-model="item.itemNumber" theme="round" button-size="22" disable-input />
                        </van-col>
                    </van-row>
                    <van-button type="danger" @click="deleteItem(i)">删除该项目</van-button>
                </div>
                <van-row class="patientItem" justify="end" align="center">
                    <van-col span="8">
                        <van-button type="primary" @click="add">添加项目</van-button>
                    </van-col>
                </van-row>

            </van-cell-group>

            <div style="margin: 16px;" >
                <van-button v-if="type ==='add'" round block type="primary" native-type="submit">
                    添加
                </van-button>
                <van-button v-else round block type="primary" native-type="submit">
                    保存
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onBeforeMount, reactive, ref } from "vue";

onBeforeMount(function(){
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
        id:'',
        value:'',
        show:false,
        code:'',
        date:'',
        showSingleDate:false,
        range:'',
        showRange:false,
        currentTime:['12', '00'],
        showTime:false,
        time:'',
        itemNumber:0
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
    
    const index = items.findIndex(item=>item.show)
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
    const index = items.findIndex(item=>item.showSingleDate)
    items[index].showSingleDate = false;
    items[index].date = formatDate(value);
};

const formatRange = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirmRange = (values) => {
    const index = items.findIndex(item=>item.showRange)
    const [start, end] = values;
    items[index].showRange = false;
    items[index].range = `${formatRange(start)} - ${formatRange(end)}`;
};

const onConfirmTime = ({selectedValues,selectedOptions}) => {
    console.log('====================================');
    console.log(selectedValues,selectedOptions);
    console.log('====================================');
    const index = items.findIndex(item=>item.showTime)
    items[index].time = selectedValues[0]+':'+selectedValues[1]
    items[index].showTime = false
}


const pattern = /\d{11}/;

const add = () => {
    // items.push[{
    //     id:'',
    //     value:''
    // }]
    items[items.length] = {
        id:'',
        value:'',
        show:false,
        code:'',
        showSingleDate:false,
        date:'',
        showRange:false,
        range:'',
        currentTime:['12', '00'],
        showTime:false,
        time:'',
        itemNumber:0
    }
    console.log('====================================');
    console.log(items);
    console.log('====================================');
}

const deleteItem = (i) => {
    items.splice(i,1)
}

const onSubmit = () => {
    router.push('home')
}

const onFailed = (errorInfo) => {
    console.log('failed', errorInfo);
};
</script>

<style lang="scss" scoped></style>