<script setup lang="ts">

import { ref } from 'vue'
import { 
  Monitor, 
  Iphone, 
  Message, 
  Promotion,
  Notebook,
  CopyDocument,
  Close,
  VideoPlay
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const copyQQ = () => {
  navigator.clipboard.writeText('735287645').then(() => {
    ElMessage.success('QQ 号码已复制到剪贴板！')
  }).catch(() => {
    ElMessage.error('复制失败，请手动输入：735287645')
  })
}

// 视频弹窗状态
const videoDialogVisible = ref(false)
const currentVideo = ref('')
const currentVideoTitle = ref('')

// 项目点击处理
const handleProjectClick = (project: typeof projects[0]) => {
  if (project.type === 'image') {
    // 图片类型：弹出 QQ 提示
    ElMessageBox.confirm(
      '如需查看完整演示，请添加 QQ 咨询',
      project.title,
      {
        confirmButtonText: '复制 QQ 号码',
        cancelButtonText: '取消',
        type: 'info',
      }
    ).then(() => {
      copyQQ()
    }).catch(() => {})
  } else {
    // 视频类型：弹出视频播放器
    currentVideo.value = project.media
    currentVideoTitle.value = project.title
    videoDialogVisible.value = true
  }
}

// 关闭视频弹窗
const closeVideoDialog = () => {
  videoDialogVisible.value = false
  currentVideo.value = ''
  currentVideoTitle.value = ''
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
    title: '校园零食驿站', 
    desc: '校园零食配送一站式服务平台，支持商品浏览、在线下单、订单管理，涵盖买家端、卖家端与管理后台。', 
    tags: ['SpringBoot', 'Vue3', 'MySQL', 'MyBatis-Plus'],
    media: 'images/零食驿站.png',
    type: 'image'
  },
  { 
    title: 'SBOM 管理系统', 
    desc: '软件成分清单（SBOM）管理平台，支持组件依赖解析、漏洞扫描、许可证合规检测与可视化报告生成。', 
    tags: ['SpringBoot', 'Vue3', 'MySQL', 'CycloneDX'],
    media: 'images/SBOM.mp4',
    type: 'video'
  },
  { 
    title: '智能家居物联网管理系统', 
    desc: '家居物联网设备管控中心，支持设备接入、状态监控、远程控制、场景联动与数据统计分析。', 
    tags: ['SpringBoot', 'Vue3', 'MQTT', 'EMQ'],
    media: 'images/iot.mp4',
    type: 'video'
  }
]
</script>

<template>
  <div class="main-container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">WanHeng.DEV</div>
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
        <div class="hero-badge-top">🚀 专业毕设开发</div>
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
      <div class="hero-bg-glow-secondary"></div>
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
        <div v-for="p in projects" :key="p.title" class="project-card" @click="handleProjectClick(p)">
          <div class="project-preview">
            <img 
              v-if="p.type === 'image'" 
              :src="p.media" 
              :alt="p.title" 
              class="project-image" 
            />
            <video 
              v-else 
              :src="p.media" 
              class="project-video" 
              autoplay 
              loop 
              muted 
              playsinline
            ></video>
            <div class="preview-overlay">
              <el-icon class="play-icon" v-if="p.type === 'video'"><VideoPlay /></el-icon>
              <span class="click-hint">{{ p.type === 'video' ? '点击播放' : '点击查看' }}</span>
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
        <div class="contact-card">
          <h3>🤝 合作流程</h3>
          <el-timeline>
            <el-timeline-item timestamp="Step 1" placement="top">
              <h4>添加 QQ 咨询</h4>
              <p>请备注 "毕业设计" 以便快速通过</p>
            </el-timeline-item>
            <el-timeline-item timestamp="Step 2" placement="top">
              <h4>需求沟通</h4>
              <p>确认功能需求、技术栈、交付时间与报价</p>
            </el-timeline-item>
            <el-timeline-item timestamp="Step 3" placement="top">
              <h4>开发与交付</h4>
              <p>定期汇报进度，满意后交付源码与文档</p>
            </el-timeline-item>
          </el-timeline>
        </div>
        
        <div class="contact-card qq-card">
          <h3>立即联系</h3>
          <div class="qq-content">
             <div class="qq-label">QQ 号码</div>
             <div class="qq-number">735287645</div>
             <el-button type="primary" size="large" :icon="CopyDocument" round class="copy-btn" @click="copyQQ">
               点击复制号码
             </el-button>
             <p class="qq-tip">全天在线，欢迎随时咨询</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 YAO.DEV | 专注于高质量毕业设计与软件开发</p>
    </footer>

    <!-- 视频播放弹窗 -->
    <Teleport to="body">
      <div v-if="videoDialogVisible" class="video-modal" @click.self="closeVideoDialog">
        <div class="video-modal-content">
          <div class="video-modal-header">
            <span class="video-title">{{ currentVideoTitle }}</span>
            <el-button type="danger" circle :icon="Close" @click="closeVideoDialog" />
          </div>
          <video 
            :src="currentVideo" 
            class="modal-video" 
            controls 
            autoplay
          ></video>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
:global(:root) {
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #1e40af;
  --accent: #8b5cf6;
  --success: #10b981;
  --bg-dark: #0f172a;
  --bg-card: rgba(15, 23, 42, 0.6);
  --bg-card-hover: rgba(30, 41, 59, 0.8);
  --border-color: rgba(148, 163, 184, 0.1);
  --border-color-hover: rgba(148, 163, 184, 0.2);
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --radius-lg: 20px;
  --radius-md: 12px;
  --spacing-section: 80px;
}

.main-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0f172a 100%);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  overflow-x: hidden;
  position: relative;

  /* Enhanced background shapes */
  &::before {
    content: '';
    position: fixed;
    top: -30%;
    left: -20%;
    width: 100vw;
    height: 100vw;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: fixed;
    bottom: -30%;
    right: -20%;
    width: 80vw;
    height: 80vw;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
}

.navbar {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  min-width: 600px;
  max-width: 90%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 8px 32px 8px 24px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    transform: translateX(-50%) translateY(-2px);
  }

  /* 移动端适配：小屏幕变回全宽底部或顶部 */
  @media (max-width: 768px) {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--border-color);
    padding: 0 20px;
    
    &:hover {
      transform: none;
    }
  }

  .logo {
    font-weight: 800;
    font-size: 1.3rem;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: transform 0.3s ease;
    white-space: nowrap;
    padding-right: 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
      border-right: none;
    }
  }

  .nav-links {
    display: none;
    gap: 32px;
    margin: 0 auto; /* 居中链接 */
    
    @media (min-width: 768px) {
      display: flex;
    }

    a {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: all 0.3s ease;
      position: relative;
      white-space: nowrap;
      padding: 6px 0;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        transition: all 0.3s ease;
        transform: translateX(-50%);
        border-radius: 2px;
      }
      
      &:hover {
        color: var(--text-primary);
        
        &::after {
          width: 20px; /* 小横线指示器，比全宽更精致 */
        }
      }
    }
  }

  .contact-btn {
    font-weight: 600;
    font-size: 0.9rem;
    padding: 8px 20px;
    height: auto;
    background: var(--text-primary);
    color: var(--bg-dark);
    border: none;
    transition: all 0.3s ease;
    white-space: nowrap;
    flex-shrink: 0;
    border-radius: 100px;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
      background: #fff;
    }
  }
}

.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 100px 20px 60px;
  
  .hero-content {
    z-index: 2;
    max-width: 800px;
    position: relative;
    animation: fadeInUp 0.8s ease-out;
  }

  .hero-badge-top {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 100px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-light);
    margin-bottom: 28px;
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(59, 130, 246, 0.15);
      border-color: rgba(59, 130, 246, 0.5);
      transform: translateY(-2px);
    }
  }

  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 1.15;
    margin-bottom: 1.5rem;
    background: linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    .highlight {
      background: linear-gradient(120deg, var(--primary) 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      display: inline-block;
      animation: gradientShift 3s ease-in-out infinite;
    }
  }

  .hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 400;
  }

  .hero-badges {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    
    :deep(.el-tag) {
      background: rgba(59, 130, 246, 0.08);
      border-color: rgba(59, 130, 246, 0.2);
      color: var(--text-primary);
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(59, 130, 246, 0.15);
        border-color: rgba(59, 130, 246, 0.4);
      }
    }
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    
    .el-button {
      padding: 14px 32px;
      height: auto;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 10px;
      transition: all 0.3s ease;
      
      &:first-child {
        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
        border: none;
        
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
        }
      }
      
      &:last-child {
        border: 2px solid var(--primary);
        background: transparent;
        color: var(--primary);
        
        &:hover {
          background: rgba(59, 130, 246, 0.1);
          transform: translateY(-3px);
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0%, 100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(10deg);
  }
}

.section {
  padding: var(--spacing-section) 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  .section-title {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    text-align: center;
    margin-bottom: 50px;
    font-weight: 800;
    letter-spacing: -1px;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      margin: 16px auto 0;
      border-radius: 2px;
      opacity: 0.9;
    }
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .service-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    padding: 32px;
    border-radius: var(--radius-lg);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-8px);
      border-color: var(--border-color-hover);
      background: var(--bg-card-hover);
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
      
      &::before {
        opacity: 1;
      }

      .icon-box {
        transform: scale(1.1) rotateY(10deg);
        background: rgba(59, 130, 246, 0.15);
        border-color: rgba(59, 130, 246, 0.4);
      }
    }

    .icon-box {
      width: 56px;
      height: 56px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.2);
      color: var(--primary);
      transition: all 0.4s ease;
      
      svg {
        width: 28px;
        height: 28px;
      }
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: 12px;
      font-weight: 700;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .price {
      font-size: 1rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
      padding: 6px 14px;
      background-color: rgba(59, 130, 246, 0.1);
      border-radius: 8px;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .project-card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    group: card;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 48px rgba(59, 130, 246, 0.2);
      border-color: var(--border-color-hover);
      background: var(--bg-card-hover);

      .project-image, .project-video {
        transform: scale(1.08);
      }
      
      .preview-overlay {
        opacity: 1;
        backdrop-filter: blur(4px);
      }
    }

    .project-preview {
      height: 200px;
      position: relative;
      overflow: hidden;
      background: #000;
    }

    .project-image, .project-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .preview-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(0px);
      opacity: 0;
      transition: all 0.4s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      
      .play-icon {
        font-size: 48px;
        color: white;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
        transition: transform 0.3s ease;
      }
      
      .click-hint {
        color: white;
        font-size: 0.95rem;
        font-weight: 600;
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
      }
    }

    .project-info {
      padding: 24px;
      flex: 1;
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        font-weight: 700;
        color: var(--text-primary);
      }

      p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 18px;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        
        :deep(.el-tag) {
          border: 1px solid rgba(59, 130, 246, 0.2);
          background: rgba(59, 130, 246, 0.08);
          color: var(--primary-light);
          height: 24px;
          padding: 0 10px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.3s ease;
          
          &:hover {
            background: rgba(59, 130, 246, 0.15);
            border-color: rgba(59, 130, 246, 0.4);
          }
        }
      }
    }
  }
}

.contact-container {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 28px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .contact-card {
    background: var(--bg-card);
    padding: 36px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      border-color: var(--border-color-hover);
      background: var(--bg-card-hover);
      box-shadow: 0 16px 40px rgba(59, 130, 246, 0.1);
      
      &::before {
        opacity: 1;
      }
    }
    
    h3 {
      font-size: 1.3rem;
      margin-bottom: 28px;
      font-weight: 700;
      color: var(--text-primary);
    }
  }
}

.qq-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
  }

  .qq-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .qq-number {
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--text-primary);
    margin: 16px 0 24px;
    font-family: 'SF Mono', 'Monaco', monospace;
    letter-spacing: -1px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .copy-btn {
    width: 100%;
    margin-top: auto;
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    border: none;
    font-weight: 700;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
    }
  }

  .qq-tip {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 16px;
    font-weight: 500;
  }
}

:deep(.el-timeline-item__content) {
  h4 {
    font-size: 1.05rem;
    margin-bottom: 6px;
    color: var(--text-primary);
    font-weight: 700;
  }
  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
}

:deep(.el-timeline-item__timestamp) {
  color: var(--primary);
  font-weight: 700;
}

.footer {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  margin-top: 60px;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--text-primary);
  }
}

/* Element Plus Overrides */
:deep(.el-input__wrapper), :deep(.el-textarea__inner) {
  background-color: rgba(59, 130, 246, 0.05);
  box-shadow: none;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--border-color-hover);
  }
  
  &:focus {
    border-color: var(--primary);
    background-color: rgba(59, 130, 246, 0.08);
  }
}

:deep(.el-form-item__label) {
  color: var(--text-secondary);
  font-weight: 600;
}
</style>

<style>
/* 视频弹窗样式 - 不使用 scoped 因为使用了 Teleport */
.video-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
}

.video-modal-content {
  width: 100%;
  max-width: 1100px;
  background: #0f172a;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.1);
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 30px 80px rgba(0,0,0,0.8);
  animation: scaleIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.92);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.video-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  background: rgba(15, 23, 42, 0.8);
}

.video-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f1f5f9;
}

.modal-video {
  width: 100%;
  aspect-ratio: 16/9;
  display: block;
  background: black;
}
</style>
