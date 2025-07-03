<template>
  <el-container>
    <el-header>
      <el-menu
        :router="true"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/about">健身房介绍</el-menu-item>
        <el-menu-item index="/login" v-if="!isAuthenticated">登录</el-menu-item>
        <el-menu-item index="/manage" v-if="isAuthenticated">器械管理</el-menu-item>
        <el-menu-item @click="handleLogout" v-if="isAuthenticated">退出登录</el-menu-item>
      </el-menu>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
})

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<style>
.el-header {
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-main {
  padding: 20px;
  min-height: calc(100vh - 60px);
}
</style>
