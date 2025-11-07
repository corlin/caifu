# 项目背景图片设置说明

## ✅ 已完成

### 1. 图片下载
使用 Picsum Photos 免费服务下载了 5 张高质量占位图片：

```
public/projects/
├── llm-chatbot.jpg          (27 KB)
├── autonomous-agent.jpg     (18 KB)
├── rag-system.jpg          (70 KB)
├── finetuning.jpg          (38 KB)
└── ml-pipeline.jpg         (31 KB)
```

**图片规格：**
- 尺寸：800x450px (16:9 宽高比)
- 格式：JPEG
- 来源：Picsum Photos (免费使用)

### 2. 项目数据更新
已为所有项目添加 `thumbnail` 字段：

```typescript
{
  id: 'llm-chatbot',
  title: 'AI客服助手',
  thumbnail: '/projects/llm-chatbot.jpg',  // ✅ 已添加
  // ...
}
```

### 3. 组件支持
ProjectCard 组件已支持：
- ✅ 优先显示真实图片（如果提供了 thumbnail）
- ✅ 使用 LazyImage 组件实现懒加载
- ✅ 图片加载失败时降级到渐变背景
- ✅ 渐进式加载动画

## 工作原理

### 图片加载流程

```
1. 检查 project.thumbnail 是否存在
   ↓
2. 如果存在 → 使用 LazyImage 组件加载
   ↓
3. LazyImage 使用 Intersection Observer
   - 图片进入视口前 50px 开始加载
   - 显示占位符（灰色背景 + 脉冲动画）
   - 图片加载完成后淡入显示
   ↓
4. 如果不存在或加载失败 → 显示渐变背景 + 图标
```

### 性能优化

1. **懒加载**：只加载可见区域的图片
2. **占位符**：避免布局偏移（CLS）
3. **渐进式加载**：平滑的淡入动画
4. **降级策略**：图片失败时显示美观的渐变背景

## 替换为自定义图片

### 方法 1：直接替换文件

```bash
# 将你的图片复制到 public/projects/ 目录
cp your-image.jpg portfolio-website/public/projects/llm-chatbot.jpg
```

**图片要求：**
- 推荐尺寸：800x450px (16:9)
- 格式：JPEG 或 WebP
- 文件大小：< 100KB（优化后）

### 方法 2：使用脚本下载

我已经创建了两个脚本供你选择：

#### A. 使用 Unsplash API（高质量图片）

```bash
# 1. 注册 Unsplash 开发者账号
# https://unsplash.com/developers

# 2. 设置 API Key
export UNSPLASH_ACCESS_KEY=your_key_here

# 3. 运行脚本
node portfolio-website/scripts/download-project-images.js
```

#### B. 使用占位图片服务（快速测试）

```bash
# 运行脚本生成彩色占位图
chmod +x portfolio-website/scripts/generate-placeholder-images.sh
./portfolio-website/scripts/generate-placeholder-images.sh
```

### 方法 3：使用在线工具优化图片

推荐工具：
- [Squoosh](https://squoosh.app/) - 在线图片压缩
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 压缩
- [Cloudinary](https://cloudinary.com/) - 图片 CDN 和优化

## 图片优化建议

### 1. 尺寸优化
```bash
# 使用 ImageMagick 调整尺寸
convert input.jpg -resize 800x450^ -gravity center -extent 800x450 output.jpg
```

### 2. 质量优化
```bash
# 压缩 JPEG（质量 85%）
convert input.jpg -quality 85 output.jpg

# 转换为 WebP（更小的文件）
convert input.jpg -quality 80 output.webp
```

### 3. 响应式图片（未来改进）

可以生成多个尺寸的图片：

```typescript
// 未来可以这样使用
<picture>
  <source srcset="/projects/llm-chatbot-800.webp" type="image/webp" />
  <source srcset="/projects/llm-chatbot-800.jpg" type="image/jpeg" />
  <img src="/projects/llm-chatbot-800.jpg" alt="AI客服助手" />
</picture>
```

## 验证

### 检查图片是否正确加载

1. **开发环境**
```bash
npm run dev
# 访问 http://localhost:5173/projects
```

2. **生产构建**
```bash
npm run build
npm run preview
```

3. **检查网络请求**
- 打开浏览器开发者工具
- 切换到 Network 标签
- 筛选 Images
- 确认图片状态码为 200

### 性能检查

使用 Lighthouse 检查：
- LCP (Largest Contentful Paint) 应该 < 2.5s
- CLS (Cumulative Layout Shift) 应该 < 0.1
- 图片应该使用懒加载

## 故障排除

### 问题：图片不显示

**检查清单：**
1. ✅ 图片文件是否存在于 `public/projects/` 目录
2. ✅ 文件名是否与代码中的路径匹配
3. ✅ 图片格式是否正确（JPEG/PNG/WebP）
4. ✅ 文件权限是否正确

**解决方法：**
```bash
# 检查文件是否存在
ls -la portfolio-website/public/projects/

# 检查文件大小
du -h portfolio-website/public/projects/*

# 验证图片格式
file portfolio-website/public/projects/*.jpg
```

### 问题：图片加载慢

**优化方法：**
1. 压缩图片文件
2. 使用 WebP 格式
3. 启用 CDN
4. 配置浏览器缓存

### 问题：构建后图片路径错误

**检查 Vite 配置：**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/', // 确保基础路径正确
  // ...
})
```

## 部署到 Cloudflare Pages

图片会自动包含在构建输出中：

```bash
npm run build
# dist/ 目录包含所有资源，包括 projects/ 图片
```

Cloudflare Pages 会自动：
- ✅ 提供全球 CDN 加速
- ✅ 自动压缩图片
- ✅ 启用浏览器缓存
- ✅ 支持 HTTP/2 和 HTTP/3

## 总结

✅ **已完成：**
- 下载了 5 张项目背景图片
- 更新了项目数据添加 thumbnail 字段
- 实现了懒加载和降级策略
- 构建验证通过

🎨 **视觉效果：**
- 真实图片 + 懒加载动画
- 加载失败时显示渐变背景
- 保持良好的用户体验

⚡ **性能优化：**
- 懒加载减少初始加载
- 占位符避免布局偏移
- 渐进式加载提升体验

现在你的项目卡片会显示真实的背景图片了！
