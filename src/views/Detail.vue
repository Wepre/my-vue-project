<template>
  <div class="detail" v-if="equipment">
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <h2>{{ equipment.name }}</h2>
        </div>
      </template>
      <div class="detail-content">
        <img :src="equipment.image" class="detail-image">
        <div class="detail-info">
          <h3>使用说明</h3>
          <p>{{ equipment.description }}</p>
          <el-button type="primary" @click="goBack">返回列表</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useEquipmentStore } from '../stores/equipment'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useEquipmentStore()

const equipment = computed(() => 
  store.getEquipmentById(Number(route.params.id))
)

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.detail {
  max-width: 800px;
  margin: 0 auto;
}

.detail-card {
  margin-top: 20px;
}

.detail-content {
  display: flex;
  gap: 20px;
}

.detail-image {
  width: 400px;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.detail-info {
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 