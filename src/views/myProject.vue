<template>
  <div class="myProject">
    <h4>我的项目</h4>
    <van-cell-group inset>
      
      <template v-if="list.length">
        <van-cell v-for="(item,i) in list" :key="i" :title="item.categoryName" :value="`${item.number}次`" />
      </template>
      
      <div v-else class="emptyOuter">
        <van-empty description="暂无项目"></van-empty>
      </div>
      
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';

const {proxy} = getCurrentInstance()
onMounted(()=>{
  getData()
})

const list = ref([])

const getData = ()=>{
  proxy.$api.get('/tmp/v1/hospital/user/patientAccount').then(res=>{
    if(res.success){
      list.value = res.data.list || []
    }
  })
}
</script>

<style lang="scss" scoped>
.myProject{
  overflow: auto;
}
h4{
  margin-bottom: 10px;
}
</style>