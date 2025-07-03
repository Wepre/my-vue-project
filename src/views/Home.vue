<template>
  <div class="home">
    <h2>健身器械列表</h2>
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in equipmentList" :key="item.id">
        <el-card class="equipment-card" :body-style="{ padding: '0px' }">
          <img :src="item.image" class="equipment-image">
          <div style="padding: 14px;">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <el-button type="primary" @click="viewDetail(item.id)">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useEquipmentStore } from '../stores/equipment'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const store = useEquipmentStore()
const router = useRouter()
const { equipmentList } = storeToRefs(store)

const viewDetail = (id) => {
  router.push(`/detail/${id}`)
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.equipment-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.equipment-card:hover {
  transform: translateY(-5px);
}

.equipment-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style> 