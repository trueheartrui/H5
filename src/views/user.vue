<template>
  <div class="user">
    <h4>个人资料</h4>
    <van-cell-group inset>
      <van-cell title="姓名" value="内容" />
      <van-cell title="手机号" value="内容" />
    </van-cell-group>

    <div class="footer">
      <van-button class="logout" plain hairline type="primary">退出登录</van-button>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.user {
  overflow: auto;
}
.footer{
  padding: 10px;
  margin-top: 30px;
  padding-left: 16px;
  padding-right: 16px;
}
.logout{
  width: 100%;
}
</style>