<template>
  <div>
    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('')">日常代办</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('')">医疗账户</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('')">项目管理</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" class="item" @click="handleSkip('')">病人管理</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script setup>
const handleSkip = () => {

}
</script>

<style lang="scss" scoped>
.item{
  width: 100%;
  margin-bottom: 20px;
}
</style>