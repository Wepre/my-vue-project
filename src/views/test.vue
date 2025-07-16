<template>
  <div>
    <input type="file" accept="image/*" @change="handleFileChange" />
    <div v-if="selectedImage">
      <img :src="selectedImage" alt="Selected Image" style="width: 200px;" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const selectedImage = ref(null);
const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log(file);
  
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage.value = e.target.result;
      console.log(e);
      
    };
    reader.readAsDataURL(file);
  }
}

</script>