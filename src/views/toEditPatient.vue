<template>
  <van-form class="toEditPatient" @failed="onFailed" @submit="onSubmit">
    <h4>基本资料</h4>
    <van-cell-group inset>

      <van-field v-model="formData.name" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
      <van-field v-model="formData.phone" placeholder="请输入手机号" :rules="[{ pattern, message: '请输入正确的手机号' }]" />




    </van-cell-group>

    <h4>添加项目</h4>
    <van-cell-group inset>
        <van-field v-model="item.value" is-link readonly label="地区" placeholder="请选择所在地区" @click="item.show = true" />
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
          <van-time-picker v-model="item.currentTime" title="选择时间" @confirm="onConfirmTime"
            @cancel="item.showTime = false" />
        </van-popup>

        <van-cell v-if="item.value" :title="item.value">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <!-- <van-icon name="search" class="search-icon" /> -->
            <van-stepper v-model="item.itemNumber" theme="round" button-size="22" disable-input />
          </template>
        </van-cell>

        <van-field
          v-model="item.remark"
          rows="1"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入备注"
        />
    </van-cell-group>

    <van-button class="save" type="primary" round block native-type="submit">保存</van-button>
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
const item = reactive(
  {
    id: '',
    value: '',
    show: false,
    code: '',
    date: '',
    showSingleDate: false,
    range: '',
    showRange: false,
    currentTime: ['12', '00'],
    showTime: false,
    time: '',
    itemNumber: 0,
    remark:''
  }
)
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
  item.show = false;
  item.value = selectedOptions.map((option) => option.text).join('/');
  console.log('====================================');
  console.log(cascaderValue);
  console.log('====================================');
};

const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;

const onConfirmSingleDate = (value) => {
  item.showSingleDate = false;
  item.date = formatDate(value);
};

const formatRange = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirmRange = (values) => {
  const [start, end] = values;
  item.showRange = false;
  item.range = `${formatRange(start)} - ${formatRange(end)}`;
};

const onConfirmTime = ({ selectedValues, selectedOptions }) => {
  console.log('====================================');
  console.log(selectedValues, selectedOptions);
  console.log('====================================');
  item.time = selectedValues[0] + ':' + selectedValues[1]
  item.showTime = false
}


const pattern = /\d{11}/;

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

.toEditPatient{
  overflow: auto;
}

.save{
  width: 345px;
  margin: 0 auto;
  margin-top: 40px;
}
</style>