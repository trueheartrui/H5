<template>
  <div class="padding24">
    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('toDo')">日常代办</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('myProject')">医疗账户</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('project')">项目管理</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('patient')">病人管理</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
const handleSkip = (path) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.item{
  width: 100%;
  margin-bottom: 20px;
}
</style>