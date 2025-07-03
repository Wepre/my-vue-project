<template>
  <div class="about">
    <el-card class="about-card">
      <template #header>
        <h2>健身房介绍</h2>
      </template>
      
      <div class="about-content">
        <h3>基本信息</h3>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="健身房名称">健康生活健身中心</el-descriptions-item>
          <el-descriptions-item label="地址">城市中心商业区A座</el-descriptions-item>
          <el-descriptions-item label="营业时间">周一至周日 06:00-22:00</el-descriptions-item>
        </el-descriptions>

        <h3>设施介绍</h3>
        <p>本健身房配备先进的健身器材，包括：</p>
        <ul>
          <li>力量训练区：配备全套专业力量训练器械</li>
          <li>有氧训练区：跑步机、椭圆机、动感单车等</li>
          <li>瑜伽室：提供专业的瑜伽课程</li>
          <li>更衣室：配备淋浴设施和储物柜</li>
        </ul>

        <h3>会员服务</h3>
        <p>我们提供专业的私人教练服务，可以根据会员的具体需求制定个性化的训练计划。同时，我们还定期举办各类健身课程，帮助会员更好地达到健身目标。</p>

        <h3>联系方式</h3>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="电话">123-4567-8900</el-descriptions-item>
          <el-descriptions-item label="邮箱">contact@fitness.com</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about-card {
  margin-top: 20px;
}

.about-content {
  padding: 20px;
}

h3 {
  margin: 20px 0 10px;
  color: #409EFF;
}

ul {
  padding-left: 20px;
  line-height: 1.8;
}

p {
  line-height: 1.8;
  color: #606266;
}
</style> 