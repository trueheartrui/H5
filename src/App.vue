<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router';
import { reactive, ref, watchEffect } from 'vue';
import { onMounted } from 'vue';
const type = ref('')

const active = ref(0)
const currentRoute = reactive({
  title: '',
  show: false,
  noShowBottomTab: false
})

onMounted(()=>{
  console.log('====================================');
  console.log(type);
  console.log('====================================');
})

watchEffect(() => {
  // console.log('====================================');
  // console.log(router.currentRoute);
  // console.log('====================================');
  const { title, show, noShowBottomTab } = router.currentRoute.value.meta
  // currentRoute.title = title || ''
  // currentRoute.show = show || false
  currentRoute.noShowBottomTab = noShowBottomTab
  document.title = title
  type.value = localStorage.getItem('type')
})

const onClickLeft = () => {
  router.back()
}

</script>

<template>
  <!-- <van-nav-bar
    v-if="currentRoute.show"
    :title="currentRoute.title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  /> -->
  <div :class="{ hasTabbar: !currentRoute.noShowBottomTab }">
    <RouterView />
  </div>
  <van-tabbar :placeholder="true" v-if="!currentRoute.noShowBottomTab" route>
    <van-tabbar-item v-if="type == 1"
      :class="{ 'van-tabbar-item--active': router.currentRoute.value.path === '/managerHomeVue' }" to="managerHomeVue"
      icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item v-else 
      :class="{ 'van-tabbar-item--active': router.currentRoute.value.path === '/userHomeVue' }"
      to="userHomeVue" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item 
      :class="{ 'van-tabbar-item--active': router.currentRoute.value.path === '/user' }" to="user"
      icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.hasTabbar {
  height: calc(100vh - 50px);
}

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
}</style>
