<template>
  <div class="manage">
    <el-card>
      <template>

      </template>
      <template #header>

        <div class="card-header">

          <!-- works before 2.9.9, use 'never' after, removed in 3.0.0 -->
          <el-link :underline="true" @click="back">返回到列表</el-link>
          <el-button type="primary" @click="showAddDialog">添加器械</el-button>
        </div>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="器械名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="使用说明" prop="description">
          <el-input type="textarea" v-model="form.description" />
        </el-form-item>
        <el-form-item label="上传图片" prop="image">
          <input type="file" accept="image/*" @change="handleFileChange" name="image" />
        </el-form-item>
        <div v-if="selectedImage">
          <img :src="selectedImage" alt="Selected Image" style="width: 200px;" />
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>

    </el-card>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useEquipmentStore } from '../stores/equipment'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const store = useEquipmentStore()



const selectedFiles = ref([])
const formRef = ref(null)
const isEdit = ref(false)
const selectedImage = ref(null)
const currentId = ref(null)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)



const form = reactive({
  name: '',
  description: '',
  image: ''
})

const rules = {
  name: [{ required: true, message: '请输入器械名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入使用说明', trigger: 'blur' }],
  image: [{ required: true, message: '请输入图片URL', trigger: 'blur' }]
}
const router = useRouter()
const back = () => {
  router.push('/manage')
}
const handleFileChange = (event) => {
  console.log(event);
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    form.image = e.target.result
    selectedImage.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        store.updateEquipment(currentId.value, form)
        ElMessage.success('更新成功')
      } else {
        store.addEquipment(form)
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}
</script>

<style scoped>
.manage {
  max-width: 1200px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>