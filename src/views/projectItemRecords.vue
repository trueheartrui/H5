<template>
  <div class="myProject">
    <h4>{{categoryName}}</h4>
    <van-cell-group inset>
      
      <template v-if="list.length">
        <van-cell icon="records" v-for="(item,i) in list" :key="i" :title="item.createTime" :value="`${item.type == 1? '+':'-'}${item.number}次`" />
      </template>
      
      <div v-else class="emptyOuter">
        <van-empty description="暂无记录"></van-empty>
      </div>
      
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';

const {proxy} = getCurrentInstance()
const {id,categoryName} = router.currentRoute.value.query
onMounted(()=>{
  getData()
})

const list = ref([])

const getData = ()=>{
  proxy.$api.get('/tmp/v1/hospital/patientItem/itemRecords',{id}).then(res=>{
    if(res.success){
      list.value = res.data || []
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