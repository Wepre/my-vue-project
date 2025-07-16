<template>
  <el-upload v-model:file-list="fileList" list-type="picture-card" :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" :on-change="handleChange">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
const fileList = ref([])
const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleChange = (uploadFile, uploadFiles) => {
  console.log(uploadFile)
  console.log(uploadFiles)
}

</script>
