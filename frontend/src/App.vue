<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { 
  Monitor, 
  Iphone, 
  Message, 
  Promotion,
  CopyDocument,
  Close,
  VideoPlay
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

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

// 图片大图预览状态
const imageViewerVisible = ref(false)
const currentImage = ref('')

// 视频弹窗状态
const videoDialogVisible = ref(false)
const currentVideo = ref('')
const currentVideoTitle = ref('')

// 项目点击处理
const handleProjectClick = (project: typeof projects[0]) => {
  if (project.type === 'image') {
    // 图片类型：查看大图
    currentImage.value = project.media
    imageViewerVisible.value = true
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

// 视频预览优化：悬停播放
const playVideo = (event: MouseEvent) => {
  const video = event.target as HTMLVideoElement
  video.play().catch(() => {})
}

const pauseVideo = (event: MouseEvent) => {
  const video = event.target as HTMLVideoElement
  video.pause()
  video.currentTime = 0
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
    title: '毕业设计/AI Coding 1V1 辅导', 
    desc: '毕业设计全程指导、代码讲解、AI 编程技巧培训、技术答疑。一对一定制化辅导', 
    icon: Promotion,
    price: '收费咨询'
  }
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
  },
  {
    title: '微信小程序-老年健身社区平台',
    desc: '专注老年人健康生活的线上社区，提供健身课程、健康档案管理及交友互动功能。',
    tags: ['SpringBoot', 'Vue3', 'MySQL', 'MyBatis-Plus'],
    media: 'images/老年健身社区平台.png',
    type: 'image'
  },
  {
    title: '智慧旅游平台',
    desc: '一站式智慧旅游服务平台，支持景点门票预订、旅游路线推荐及攻略分享。',
    tags: ['SpringBoot', 'Vue3', 'MySQL', 'Redis'],
    media: 'images/智慧旅游平台.png',
    type: 'image'
  }
]

// Mouse tracking for glow effects
const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  target.style.setProperty('--mouse-x', `${x}px`);
  target.style.setProperty('--mouse-y', `${y}px`);
};

onMounted(() => {
  const cards = document.querySelectorAll('.service-card, .project-card, .contact-card');
  cards.forEach(card => {
    (card as HTMLElement).addEventListener('mousemove', handleMouseMove);
  });
});
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
        <div class="hero-badge-top">🚀 专业开发</div>
        <h1 class="hero-title">
          让想法变成 <span class="highlight">现实</span>
        </h1>
        <p class="hero-subtitle">
          专注大学生程序辅导 | 全栈开发 | 技术咨询
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
              loading="lazy"
            />
            <video 
              v-else 
              :src="p.media" 
              class="project-video" 
              loop 
              muted 
              playsinline
              preload="metadata"
              @mouseenter="playVideo"
              @mouseleave="pauseVideo"
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
              <p>请备注 "计算机单子" 以便快速通过</p>
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
      <p>© 2026 YAO.DEV | 专注于高质量程序设计与软件开发</p>
    </footer>

    <!-- 图片预览弹窗 -->
    <Teleport to="body">
      <div v-if="imageViewerVisible" class="video-modal image-preview-modal" @click.self="imageViewerVisible = false">
        <div class="video-modal-content image-modal-content">
          <div class="video-modal-header image-modal-header">
            <el-button type="danger" circle :icon="Close" @click="imageViewerVisible = false" />
          </div>
          <img 
            :src="currentImage" 
            class="modal-image" 
            alt="Preview"
          />
        </div>
      </div>
    </Teleport>

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
@use './styles/mixins' as m;

.main-container {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-deep);
  color: var(--text-main);
  position: relative;
  overflow-x: hidden;

  /* Ambient Glow Effects */
  &::before, &::after {
    content: '';
    position: fixed;
    width: 60vw;
    height: 60vw;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
    z-index: 0;
    pointer-events: none;
  }
  
  &::before {
    top: -20%;
    left: -10%;
    background: radial-gradient(circle, var(--color-primary), transparent 70%);
  }
  
  &::after {
    bottom: -20%;
    right: -10%;
    background: radial-gradient(circle, var(--color-accent), transparent 70%);
  }
}

/* Navbar */
.navbar {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 72px;
  
  @include m.flex-between;
  padding: 0 var(--space-5);
  
  @include m.glass-effect;
  background: rgba(15, 23, 42, 0.65);
  border-radius: var(--radius-full);
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @include m.md {
    width: auto;
    min-width: 640px;
  }

  /* Mobile Adaptation */
  @include m.xs {
    top: 0;
    width: 100%;
    max-width: none;
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    justify-content: space-between;
    padding: 0 var(--space-3);
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    @include m.text-gradient;
    cursor: pointer;
  }

  .nav-links {
    display: none;
    gap: var(--space-5);
    
    @include m.md {
      display: flex;
    }

    a {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: color var(--transition-fast);
      position: relative;
      cursor: pointer;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%; /* Center start */
        width: 0;
        height: 2px;
        background: var(--color-primary);
        transition: width 0.3s ease, transform 0.3s ease;
        transform: translateX(-50%);
        border-radius: 2px;
      }
      
      &:hover {
        color: var(--text-main);
        
        &::after {
           width: 100%;
        }
      }
    }
  }

  .contact-btn {
    border-radius: var(--radius-full);
    font-weight: 600;
    padding: 20px 28px; /* Correct height via padding */
    transition: transform var(--transition-base);
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
  }
}

/* Hero Section */
.hero {
  min-height: 100vh;
  @include m.flex-center;
  flex-direction: column;
  text-align: center;
  padding: 120px var(--space-4) 80px;
  position: relative;
  
  .hero-content {
    max-width: 900px;
    z-index: 10;
    animation: fadeInUp 1s ease-out;
  }

  .hero-badge-top {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    background: rgba(59, 130, 246, 0.12);
    border: 1px solid rgba(59, 130, 246, 0.25);
    border-radius: var(--radius-full);
    margin-bottom: var(--space-4);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-primary-light);
    backdrop-filter: blur(4px);
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: var(--space-4);
    letter-spacing: -0.03em;
    background: linear-gradient(to bottom, #fff 40%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    .highlight {
      @include m.text-gradient;
      position: relative;
      display: inline-block;
    }
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto var(--space-5);
    line-height: 1.6;
  }

  .hero-badges {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
    flex-wrap: wrap;

    :deep(.el-tag) {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-main);
      padding: 18px 20px;
      font-size: 0.95rem;
    }
  }

  .hero-actions {
    display: flex;
    gap: var(--space-3);
    justify-content: center;
    
    .el-button {
      height: 52px;
      padding: 0 40px;
      font-size: 1.05rem;
      border-radius: var(--radius-md);
      
      &:first-child {
         box-shadow: 0 8px 30px -4px rgba(59, 130, 246, 0.5);
         &:hover { transform: translateY(-3px); }
      }
    }
  }
}

/* Sections Global */
.section {
  padding: 120px var(--space-4);
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 10;

  .section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: var(--space-8);
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: var(--color-primary);
      margin: var(--space-3) auto 0;
      border-radius: var(--radius-full);
      box-shadow: 0 0 20px var(--color-primary);
    }
  }
}

/* Services */
.services-grid {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  .service-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-5);
    @include m.hover-lift;
    position: relative;
    overflow: hidden;

    /* Card Glow on Hover */
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 40%);
      opacity: 0; /* JS implementation for mouse tracking would activate this, purely visual fallback here */
      transition: opacity 0.5s;
    }

    &:hover {
      border-color: rgba(59, 130, 246, 0.3);
      background: linear-gradient(to bottom right, var(--bg-surface), rgba(30, 41, 59, 0.9));
    }
    
    .icon-box {
      width: 64px;
      height: 64px;
      @include m.flex-center;
      background: rgba(59, 130, 246, 0.1);
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-4);
      color: var(--color-primary);
      font-size: 32px;
      transition: all 0.5s ease;
    }
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: var(--space-2);
      color: var(--text-main);
    }
    
    .price {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-success);
      margin-top: var(--space-3);
      display: inline-block;
      padding: 6px 12px;
      background: rgba(16, 185, 129, 0.1);
      border-radius: var(--radius-md);
    }
  }
}

/* Portfolio */
.portfolio-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));

  .project-card {
    border-radius: var(--radius-xl);
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    overflow: hidden;
    @include m.hover-lift;
    display: flex;
    flex-direction: column;

    .project-preview {
      height: 240px;
      position: relative;
      background: #000;
      overflow: hidden;
      
      img, video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
      }
      
      .preview-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        @include m.flex-center;
        flex-direction: column;
        gap: var(--space-2);
        opacity: 0;
        transition: opacity 0.3s ease;
        
        .play-icon { font-size: 3rem; color: #fff; }
        .click-hint { color: #fff; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
      }
    }

    &:hover {
      .project-preview img, .project-preview video { transform: scale(1.05); }
      .preview-overlay { opacity: 1; }
    }

    .project-info {
        padding: var(--space-5);
        flex: 1;
        display: flex;
        flex-direction: column;

        h3 { font-size: 1.4rem; color: var(--text-main); margin-bottom: var(--space-2); }
        p { flex: 1; font-size: 0.95rem; line-height: 1.6; margin-bottom: var(--space-4); }
        
        .tags {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          
          :deep(.el-tag) {
            border: none;
            background: rgba(148, 163, 184, 0.1);
            color: var(--text-secondary);
          }
        }
    }
  }
}

/* Contact */
.contact-container {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 1fr;
  
  @include m.md {
    grid-template-columns: 1.2fr 0.8fr;
  }
  
  .contact-card {
    background: var(--bg-surface);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    border: 1px solid var(--border-light);
    @include m.hover-lift;
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: var(--space-5);
      border-bottom: 1px solid var(--border-light);
      padding-bottom: var(--space-3);
    }
  }
  
  .qq-card {
    @include m.flex-center;
    flex-direction: column;
    text-align: center;
    background: linear-gradient(145deg, var(--bg-surface) 0%, rgba(59, 130, 246, 0.08) 100%);
    
    .qq-number {
      font-family: 'Monaco', monospace;
      font-size: 3rem;
      @include m.text-gradient;
      font-weight: 800;
      margin: var(--space-4) 0;
    }
    
    .copy-btn {
      width: 100%;
      height: 50px;
      font-size: 1.1rem;
    }
  }
}

/* Footer */
.footer {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  color: var(--text-tertiary);
  border-top: 1px solid var(--border-light);
  margin-top: 80px;
  background: var(--bg-deep);
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Element Plus deeply scoped overrides */
:deep(.el-timeline-item__content h4) {
  font-size: 1.1rem;
  color: var(--text-main);
  margin-bottom: 4px;
}
:deep(.el-timeline-item__timestamp) {
  color: var(--color-primary);
  font-weight: 600;
}
</style>

<style>
/* Global Modal Styles (outside scoped) */
.video-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.video-modal-content {
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 0 100px rgba(59, 130, 246, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
}

.video-modal-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 30px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-modal-content:hover .video-modal-header {
  opacity: 1;
}

.video-title {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.modal-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
  outline: none;
}

/* Image Modal Variants */
.image-preview-modal {
  padding: 40px;
}

.image-modal-content {
  background: transparent;
  box-shadow: none;
  aspect-ratio: auto;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image-modal-header {
  justify-content: flex-end;
  background: transparent;
  padding: 0;
  top: -20px;
  right: -20px;
  left: auto;
  opacity: 1;
}

.video-modal-content.image-modal-content:hover .video-modal-header {
  opacity: 1;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .video-modal {
    padding: 16px;
  }
  
  .image-preview-modal {
    padding: 16px;
  }
  
  .image-modal-header {
    top: -10px;
    right: -10px;
  }
}
</style>
