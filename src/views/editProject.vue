<template>
  <van-form class="toEditPatient" @submit="onSubmit">
    <h4>{{ id ? '编辑项目' : '添加项目' }}</h4>
    <van-cell-group inset>
      <van-field :disabled="id ? true : false" v-model="item.categoryName" is-link readonly label="项目" placeholder="请选择项目"
        @click="handleSelectProject(item)" />
      <van-popup v-model:show="item.show" round position="bottom">
        <van-cascader v-model="item.categoryId" :field-names="{ text: 'name', value: 'id' }" title="请选择项目"
          :options="project" @close="item.show = false" @finish="onFinish" />
      </van-popup>

      <van-cell title="次数">
        <template #right-icon>
          <van-stepper v-model="item.number" integer />
        </template>
      </van-cell>

      <van-cell title="选择日期" allow-same-day value-class="range" :value="item.range"
        @click="item.showRange = true" />
      <van-calendar ref="range" :default-date="defaultDate" v-model:show="item.showRange" type="range" @confirm="onConfirmRange" />

      <van-cell title="选择时间" :value="item.presetTime" @click="item.showTime = true" />
      <van-popup v-model:show="item.showTime" round position="bottom">
        <van-time-picker v-model="item.currentTime" title="选择时间" @confirm="onConfirmTime"
          @cancel="item.showTime = false" />
      </van-popup>

      <van-field v-model="item.remark" input-align="right" rows="1" autosize label="备注" type="textarea"
        placeholder="请输入备注" />
    </van-cell-group>

    <van-button class="save" type="primary" round block native-type="submit">保存</van-button>
  </van-form>
</template>

<script setup lang="ts">
import router from "@/router";
import { onBeforeMount, reactive, ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()
const $api = proxy.$api
const { userId, id } = router.currentRoute.value.query


onBeforeMount(function () {
  getProject()
  if (id) {
    getData()
  }
})

const item = ref(
  {
    id,
    userId,
    categoryId: 0,
    categoryName: '',
    show: false,
    range: '',
    startTime: '',
    endTime: '',
    showRange: false,
    currentTime: ['12', '00'],
    showTime: false,
    presetTime: '',
    number: 0,
    remark: ''
  }
)

const defaultDate = ref([])

const getData = () => {
  $api.get('/tmp/v1/hospital/patientItem/findById', { id }, {
    showLoading: true
  }).then(res => {
    if (res.success) {
      console.log('====================================');
      console.log(proxy.$refs.range);
      console.log('====================================');
      item.value =
      {
        ...item.value,
        ...res.data,
        range: `${res.data.startTime}  至  ${res.data.endTime}`,
        currentTime: res.data.presetTime?.split(':'),
      }

      defaultDate.value = [new Date(res.data.startTime),new Date(res.data.endTime)]
    }
  })
}

const project = ref([])
const getProject = () => {
  $api.get('/tmp/v1/hospital/category/getTree', { code: '' }, {
    showLoading: true
  }).then(res => {
    project.value = res.data || []
  })
}

const handleSelectProject = (item) => {
  console.log('====================================');
  console.log(id, 'id-----');
  console.log('====================================');
  if (id) return
  item.show = true
}

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  const res = selectedOptions[selectedOptions.length - 1]
  item.value.show = false;
  item.value.categoryName = selectedOptions.map((option) => option.name).join('/');
  item.value.categoryId = res.id
  // item.categoryId = 
  console.log('====================================');
  console.log(selectedOptions, item);
  console.log('====================================');
};

const fromatRq = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
const onConfirmRange = (values) => {
  const [start, end] = values;
  item.value.showRange = false;
  item.value.range = `${fromatRq(start)} 至 ${fromatRq(end)}`;
  item.value.startTime = fromatRq(start)
  item.value.endTime = fromatRq(end)
  console.log('====================================');
  console.log(item);
  console.log('====================================');
};

const onConfirmTime = ({ selectedValues, selectedOptions }) => {
  console.log('====================================');
  console.log(selectedValues, selectedOptions);
  console.log('====================================');
  item.value.presetTime = selectedValues[0] + ':' + selectedValues[1]
  item.value.showTime = false
}

const onSubmit = () => {
  const { categoryId, endTime, id, number, presetTime, remark, startTime, userId } = item.value
  const data = { categoryId, endTime, id, number, presetTime, remark, startTime, userId }
  if (!data.id) {
    $api.post('/tmp/v1/hospital/patientItem/save', data, {
      showLoading: true
    }).then(res => {
      if (res.success) {
        proxy.$showSuccessToast('添加成功')
        router.back()
      }
    })
  } else {
    $api.post('/tmp/v1/hospital/patientItem/update', data, {
      showLoading: true
    }).then(res => {
      if (res.success) {
        proxy.$showSuccessToast('编辑成功')
        router.back()
      }
    })
  }
}
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

:deep(.range) {
  flex: none;
}
</style>