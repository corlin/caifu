# AI技术专家个人网站

基于React + TypeScript + Tailwind CSS的极简主义个人网站，专注展示AI/LLM技术能力和项目经验。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **路由**: React Router v6
- **图标**: Lucide React
- **动画**: Framer Motion
- **状态管理**: Zustand
- **部署**: Cloudflare Pages

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 部署到Cloudflare Pages

### 方法1: 通过Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Pages 部分
3. 点击 "Create a project"
4. 连接你的 Git 仓库（GitHub/GitLab）
5. 配置构建设置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
   - **Node版本**: 18 或更高
6. 点击 "Save and Deploy"

### 方法2: 使用Wrangler CLI

```bash
# 安装Wrangler
npm install -g wrangler

# 登录Cloudflare
wrangler login

# 部署
npm run build
wrangler pages deploy dist
```

### 环境变量（可选）

在Cloudflare Pages设置中添加以下环境变量：

```
VITE_SITE_URL=https://yoursite.pages.dev
VITE_CONTACT_EMAIL=your@email.com
```

## 项目结构

```
src/
├── components/          # 可复用组件
│   └── layout/         # 布局组件
├── pages/              # 页面组件
├── types/              # TypeScript类型定义
└── App.tsx             # 主应用组件
```

## 功能特性

- ✅ 响应式设计，支持移动端
- ✅ 简洁的导航系统
- ✅ 技术栈展示
- ✅ 专业领域介绍
- ✅ 社交媒体链接
- 🚧 项目展示（开发中）
- 🚧 博客系统（开发中）
- 🚧 联系表单（开发中）

## License

MIT
