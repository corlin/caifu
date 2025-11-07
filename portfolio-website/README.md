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

### 快速部署（推荐）

使用提供的部署脚本一键部署：

```bash
# 运行部署脚本
./deploy.sh
```

这个脚本会自动：
1. 清理旧的构建文件
2. 运行构建命令
3. 显示构建信息
4. 部署到 Cloudflare Pages

### 方法1: 使用 Wrangler CLI

```bash
# 安装Wrangler
npm install -g wrangler

# 登录Cloudflare
wrangler login

# 构建项目
npm run build

# 部署到新项目
wrangler pages deploy dist --project-name=my-portfolio

# 或部署到已有项目
wrangler pages deploy dist --project-name=caifu
```

部署成功后会显示访问URL，例如：`https://abc123.my-portfolio.pages.dev`

### 部署后测试

使用测试脚本验证部署：

```bash
# 运行测试脚本（替换为你的实际 URL）
./test-deployment.sh https://your-site.pages.dev
```

这会自动检查：
- 网站可访问性
- 主要路由
- 客户端路由支持
- 静态资源
- 安全头部
- 页面加载时间

### 方法2: Git 集成自动部署

1. 推送代码到 GitHub
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 "Workers & Pages" > "Create application" > "Pages"
4. 点击 "Connect to Git" 并授权访问 GitHub
5. 选择要部署的仓库
6. 配置构建设置：
   - **项目名称**: 输入项目名称
   - **生产分支**: `main`
   - **框架预设**: Vite
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
   - **根目录**: `portfolio-website`（如果在子目录）
7. 点击 "Save and Deploy"

之后每次推送到 `main` 分支都会自动触发部署。

### 配置客户端路由支持

创建 `public/_redirects` 文件：
```
/*    /index.html   200
```

### 环境变量配置

在 Cloudflare Pages 设置中添加环境变量：

**本地开发** - 创建 `.env` 文件：
```env
VITE_SITE_URL=https://caifu.social
VITE_CONTACT_EMAIL=info@caifu.social
VITE_GITHUB_URL=https://github.com/corlin
```

**生产环境** - 在 Cloudflare Dashboard 中配置：
1. 进入 Pages 项目 > Settings > Environment variables
2. 添加变量：
   - `VITE_SITE_URL`: `https://caifu.social`
   - `VITE_CONTACT_EMAIL`: `info@caifu.social`

### 自定义域名（可选）

1. 在 Pages 项目中选择 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入域名并按提示配置 DNS
4. Cloudflare 自动提供免费 SSL 证书

### 部署文档

- **快速开始**: `DEPLOYMENT-SUMMARY.md` - 部署准备完成总结
- **快速参考**: `README-DEPLOYMENT.md` - 快速部署指南
- **详细指南**: `.kiro/specs/minimalist-portfolio-website/deployment-guide.md` - 完整部署文档
- **验证清单**: `VALIDATION-CHECKLIST.md` - 部署后验证清单
- **优化指南**: `POST-DEPLOYMENT-GUIDE.md` - 部署后优化指南
- **环境变量**: `.env.example` - 环境变量模板

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
- ✅ 项目展示和筛选功能
- ✅ 项目详情模态框
- ✅ 流畅的动画效果
- ✅ Cloudflare Pages 部署支持
- 🚧 博客系统（计划中）
- 🚧 联系表单（计划中）
- 🚧 技术实验室页面（计划中）

## License

MIT
