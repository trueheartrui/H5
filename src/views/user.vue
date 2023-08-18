<template>
  <div class="user">
      <van-cell title="姓名" value="内容" />
      <van-cell title="手机号" value="内容" />

    <div class="footer">
      <van-button class="logout" plain hairline type="primary">退出登录</van-button>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.user {
  padding-top: 16px;
}
.footer{
  padding: 10px;
  margin-top: 30px;
}
.logout{
  width: 100%;
}
</style>