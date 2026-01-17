<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  Monitor, 
  Iphone, 
  Platform, 
  Message, 
  Promotion,
  Notebook
} from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const services = [
  { 
    title: 'Web 系统开发', 
    desc: '企业官网、后台管理系统、SaaS 平台。技术栈：SpringBoot, Vue3, React', 
    icon: Monitor,
    price: '¥500 起'
  },
  { 
    title: '移动端开发', 
    desc: '微信小程序、H5 应用、跨端 APP 开发。技术栈：Uni-app, Taro', 
    icon: Iphone,
    price: '¥800 起'
  },
  { 
    title: '毕业设计辅导', 
    desc: '从选题开题到答辩全流程指导，源码讲解，文档撰写辅助', 
    icon: Notebook,
    price: '咨询报价'
  },
]

const projects = [
  { 
    title: '校园智慧点餐系统', 
    desc: '基于 SpringBoot + Vue 的前后端分离点餐平台，包含用户端、商户端和骑手端。', 
    tags: ['SpringBoot', 'Vue3', 'MySQL'],
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  { 
    title: '个人财务可视化大屏', 
    desc: 'Python 数据分析项目，通过 Echarts 实现多维度财务数据可视化展示。', 
    tags: ['Python', 'Echarts', 'DataAnalysis'],
    bg: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)'
  },
  { 
    title: '二手图书交易小程序', 
    desc: '校园二手书循环利用平台，支持扫码发布、即时通讯、线下交易。', 
    tags: ['Uni-app', 'Node.js', 'MongoDB'],
    bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)'
  }
]

// Contact Form
const formRef = ref<FormInstance>()
const form = reactive({
  name: '',
  contact: '',
  content: ''
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入您的称呼', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系方式（微信/QQ/手机）', trigger: 'blur' }],
  content: [{ required: true, message: '请输入咨询内容', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('消息已发送，我会通过微信/QQ联系您！')
      formEl.resetFields()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="main-container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">YAO.DEV</div>
      <div class="nav-links">
        <a @click="scrollTo('home')">首页</a>
        <a @click="scrollTo('services')">服务</a>
        <a @click="scrollTo('portfolio')">作品</a>
        <a @click="scrollTo('contact')">联系</a>
      </div>
      <el-button type="primary" round class="contact-btn" @click="scrollTo('contact')">
        立即咨询
      </el-button>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          让想法变成 <span class="highlight">现实</span>
        </h1>
        <p class="hero-subtitle">
          专注大学生毕业设计辅导 | 全栈开发 | 技术咨询
        </p>
        <div class="hero-badges">
          <el-tag effect="dark" round>⚡️ 快速交付</el-tag>
          <el-tag effect="dark" type="success" round>🛡️ 售后保障</el-tag>
          <el-tag effect="dark" type="warning" round>🎓 源码讲解</el-tag>
        </div>
        <div class="hero-actions">
          <el-button type="primary" size="large" :icon="Promotion" @click="scrollTo('portfolio')">
            查看作品
          </el-button>
          <el-button size="large" :icon="Message" @click="scrollTo('contact')">
            联系我
          </el-button>
        </div>
      </div>
      <div class="hero-bg-glow"></div>
    </section>

    <!-- Services -->
    <section id="services" class="section">
      <h2 class="section-title">我的服务</h2>
      <div class="services-grid">
        <div v-for="s in services" :key="s.title" class="service-card">
          <div class="icon-box">
            <component :is="s.icon" />
          </div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <div class="price">{{ s.price }}</div>
        </div>
      </div>
    </section>

    <!-- Portfolio -->
    <section id="portfolio" class="section">
      <h2 class="section-title">精选作品</h2>
      <div class="portfolio-grid">
        <div v-for="p in projects" :key="p.title" class="project-card">
          <div class="project-preview" :style="{ background: p.bg }">
            <!-- Optional: Replace with img tag later -->
            <div class="preview-overlay">
              <Platform style="width: 48px; height: 48px; color: white; opacity: 0.8;" />
            </div>
          </div>
          <div class="project-info">
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="tags">
              <el-tag v-for="t in p.tags" :key="t" size="small" effect="plain">{{ t }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section">
      <h2 class="section-title">联系我</h2>
      <div class="contact-container">
        <div class="contact-info">
          <div class="info-item">
            <h3>🤝 合作流程</h3>
            <el-timeline>
              <el-timeline-item timestamp="Step 1" placement="top">
                <h4>需求沟通</h4>
                <p>确认功能需求、技术栈、交付时间</p>
              </el-timeline-item>
              <el-timeline-item timestamp="Step 2" placement="top">
                <h4>开发实现</h4>
                <p>定期汇报进度，查看阶段性成果</p>
              </el-timeline-item>
              <el-timeline-item timestamp="Step 3" placement="top">
                <h4>交付验收</h4>
                <p>源码交付、部署调试、远程协助</p>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        
        <div class="contact-form-card">
          <h3>快速留言</h3>
          <el-form ref="formRef" :model="form" :rules="rules" status-icon label-position="top">
            <el-form-item label="您的称呼" prop="name">
              <el-input v-model="form.name" placeholder="同学 / 先生 / 女士" />
            </el-form-item>
            <el-form-item label="联系方式" prop="contact">
              <el-input v-model="form.contact" placeholder="微信 ID 或 QQ 号" />
            </el-form-item>
            <el-form-item label="需求描述" prop="content">
              <el-input v-model="form.content" type="textarea" :rows="4" placeholder="简要描述您的需求..." />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="submitForm(formRef)">
                发送消息
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 YAO.DEV | 专注于高质量毕业设计与软件开发</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  min-height: 100vh;
  background-color: #0d1117;
  color: #e6edf3;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(12px);
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  box-sizing: border-box;

  .logo {
    font-weight: 800;
    font-size: 1.5rem;
    background: linear-gradient(120deg, #409eff, #a0cfff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-links {
    display: none;
    gap: 32px;
    @media (min-width: 768px) {
      display: flex;
    }

    a {
      cursor: pointer;
      font-size: 1rem;
      color: #8b949e;
      transition: color 0.3s;
      &:hover {
        color: #fff;
      }
    }
  }
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 0 20px;

  .hero-content {
    z-index: 2;
    max-width: 800px;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    
    .highlight {
      color: #409eff;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 8px;
        background: rgba(64, 158, 255, 0.3);
        z-index: -1;
      }
    }
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: #8b949e;
    margin-bottom: 2rem;
  }

  .hero-badges {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 3rem;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
  }

  .hero-bg-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(64, 158, 255, 0.15) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
  }
}

.section {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;

  .section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 60px;
    font-weight: 700;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  .service-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 30px;
    border-radius: 16px;
    transition: transform 0.3s, background 0.3s;
    
    &:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.06);
    }

    .icon-box {
      width: 50px;
      height: 50px;
      margin-bottom: 20px;
      color: #409eff;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 12px;
    }

    p {
      color: #8b949e;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .price {
      font-weight: 700;
      color: #67c23a;
      font-size: 1.1rem;
    }
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;

  .project-card {
    background: #161b22;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .project-preview {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .project-info {
      padding: 24px;

      h3 {
        font-size: 1.25rem;
        margin-bottom: 8px;
      }

      p {
        color: #8b949e;
        margin-bottom: 16px;
        font-size: 0.9rem;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }
  }
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  .contact-info {
    padding: 20px;
  }

  .contact-form-card {
    background: rgba(255, 255, 255, 0.03);
    padding: 30px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    h3 {
      margin-bottom: 24px;
    }
  }
}

.footer {
  text-align: center;
  padding: 40px;
  color: #484f58;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Element Plus Overrides */
:deep(.el-input__wrapper), :deep(.el-textarea__inner) {
  background-color: rgba(255,255,255,0.05);
  box-shadow: none;
  color: white;
}
:deep(.el-form-item__label) {
  color: #8b949e;
}
</style>
