<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router';
import { reactive, ref, watchEffect } from 'vue';

const active = ref('home')
const currentRoute = reactive({
  title:'',
  show:false,
  noShowBottomTab:false
})

watchEffect(() => {
  // console.log('====================================');
  // console.log(router.currentRoute.value.meta);
  // console.log('====================================');
  const { title, show, noShowBottomTab } = router.currentRoute.value.meta
  currentRoute.title = title || ''
  currentRoute.show = show || false
  currentRoute.noShowBottomTab = noShowBottomTab
})

const onClickLeft = ()=>{
  router.back()
}

const handleTabChange = (active)=>{
  console.log('====================================');
  console.log(active,'active');
  console.log('====================================');
  // router.push(active)
}
</script>

<template>
  <van-nav-bar
    v-if="currentRoute.show"
    :title="currentRoute.title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <RouterView />
  <van-tabbar :placeholder="true" v-if="!currentRoute.noShowBottomTab" route v-model="active" @change="handleTabChange">
    <van-tabbar-item to="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
