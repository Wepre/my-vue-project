<template>
  <div class="manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>器械管理</h2>
          <el-button type="primary" @click="toAdd">添加器械</el-button>
        </div>
      </template>

      <el-table :data="equipmentList" style="width: 100%">
        <el-table-column prop="name" label="器械名称" />
        <el-table-column prop="description" label="使用说明" />
        <el-table-column label="图片">
          <template #default="{ row }">
            <el-image style="width: 100px; height: 100px" :src="row.image" :preview-src-list="[row.image]" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑器械' : '添加器械'" width="500px">
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
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useEquipmentStore } from '../stores/equipment'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useEquipmentStore()
const { equipmentList } = storeToRefs(store)
const dialogVisible = ref(false)
const selectedImage = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const currentId = ref(null)
const router = useRouter()
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
const toAdd = () => {
  router.push('/add')
}
// const showAddDialog = () => {
//   isEdit.value = false
//   form.name = ''
//   form.description = ''
//   form.image = ''
//   dialogVisible.value = true
// }
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
const handleEdit = (row) => {
  isEdit.value = true
  currentId.value = row.id
  form.name = row.name
  form.description = row.description
  form.image = row.image
  selectedImage.value=row.image
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除这个器械吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.deleteEquipment(row.id)
    ElMessage.success('删除成功')
  })
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