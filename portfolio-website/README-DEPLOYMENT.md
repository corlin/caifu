# 快速部署指南

## 本地构建测试 ✅

已完成本地构建测试：
- ✅ 构建成功（420ms）
- ✅ 构建产物大小：468KB
- ✅ 本地预览正常（http://localhost:4173）
- ✅ _redirects 文件已配置

## 部署到 Cloudflare Pages

### 方式 1: 使用部署脚本（推荐）

```bash
./deploy.sh
```

这个脚本会自动：
1. 清理旧的构建文件
2. 运行构建命令
3. 显示构建信息
4. 部署到 Cloudflare Pages

### 方式 2: 手动部署

```bash
# 1. 构建项目
npm run build

# 2. 部署到 Cloudflare Pages
wrangler pages deploy dist --project-name=caifu
```

### 方式 3: Git 自动部署

推送代码到 GitHub main 分支会自动触发部署（需要先在 Cloudflare Dashboard 配置 Git 集成）。

## 部署前检查清单

- [x] 本地构建成功
- [x] 本地预览正常
- [x] _redirects 文件存在
- [x] wrangler.toml 配置正确
- [ ] Wrangler CLI 已登录（运行 `wrangler login`）
- [ ] 准备好项目名称（caifu）

## 部署后验证清单

### 功能验证
- [ ] 首页正常显示
- [ ] 所有路由可访问（/projects, /about, /contact）
- [ ] 刷新页面不会出现 404
- [ ] 项目筛选功能正常
- [ ] 项目详情模态框正常打开和关闭
- [ ] 响应式布局在移动端正常
- [ ] 所有链接（GitHub、Demo）可点击
- [ ] 图片和静态资源正常加载
- [ ] 导航菜单在移动端正常工作
- [ ] 错误边界和 404 页面正常

### 性能验证
使用 Lighthouse 测试（Chrome DevTools）：
- [ ] Performance Score > 90
- [ ] Accessibility Score > 90
- [ ] Best Practices Score > 90
- [ ] SEO Score > 90

关键性能指标目标：
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

### 移动端测试
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)

## 构建信息

当前构建性能：
- 构建时间: ~420ms
- 总大小: ~468KB
- HTML: 0.46 kB (gzip: 0.29 kB)
- CSS: 32.02 kB (gzip: 6.93 kB)
- JS: 234.47 kB (gzip: 75.57 kB)

## 环境变量（可选）

如需配置环境变量，在 Cloudflare Dashboard 中添加：
- `VITE_SITE_URL`: https://caifu.pages.dev
- `VITE_CONTACT_EMAIL`: your@email.com

## 故障排查

### 问题：刷新页面出现 404
**解决方案**: 确保 `public/_redirects` 文件存在且内容为 `/*    /index.html   200`

### 问题：Wrangler 未登录
**解决方案**: 运行 `wrangler login` 并在浏览器中授权

### 问题：构建失败
**解决方案**: 
1. 删除 `node_modules` 和 `package-lock.json`
2. 运行 `npm install`
3. 重新构建 `npm run build`

## 相关文档

- 详细部署指南: `.kiro/specs/minimalist-portfolio-website/deployment-guide.md`
- 部署记录: `DEPLOYMENT.md`
- Cloudflare Pages 文档: https://developers.cloudflare.com/pages/

## 下一步

部署成功后：
1. 使用 Lighthouse 进行性能测试
2. 在不同设备上测试响应式布局
3. 配置自定义域名（如需要）
4. 设置环境变量（如需要）
5. 配置 Git 自动部署（推荐）

---

准备就绪！运行 `./deploy.sh` 开始部署。
