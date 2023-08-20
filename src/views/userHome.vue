<template>
  <div class="padding10 todo">
    <h4>日常代办</h4>
    <van-steps v-if="list.length" class="steps" direction="vertical" :active="active">
      <van-step v-for="(item,i) in list" :key="i">
        <h3>{{item.categoryName}}</h3>
        <p>{{item.startTime}}</p>
      </van-step>
    </van-steps>

    <div v-else class="emptyOuter" >
      <van-empty description="暂无代办事项"></van-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';

const active = ref(99999)

const {proxy} = getCurrentInstance()
onMounted(()=>{
  getData()
})

const list = ref([])

const getData = ()=>{
  proxy.$api.get('/tmp/v1/hospital/user/patientTodo').then(res=>{
    if(res.success){
      list.value = res.data || []
    }
  })
}


</script>

<style lang="scss" scoped>
:deep(.van-empty){
    border-radius: 8px;
    background-color: #fff;
}
.todo{
  height: 100%;
  box-sizing: border-box;
}
  .steps{
    // height: 100%;
    border-radius: 8px;
  }
</style>