# 项目图片管理脚本

本目录包含用于管理项目背景图片的实用脚本。

## 可用脚本

### 1. download-project-images.js

使用 Unsplash API 下载高质量的项目背景图片。

**特点：**
- 🎨 高质量专业图片
- 🔍 根据项目主题搜索
- 📐 自动调整为合适尺寸
- 🆓 完全免费使用

**使用方法：**

```bash
# 1. 注册 Unsplash 开发者账号
# 访问：https://unsplash.com/developers
# 创建应用并获取 Access Key

# 2. 设置环境变量
export UNSPLASH_ACCESS_KEY=your_access_key_here

# 3. 运行脚本
node scripts/download-project-images.js
```

**输出：**
```
🚀 开始下载项目背景图片...

✅ AI客服助手背景图 - llm-chatbot.jpg
✅ 自主任务Agent背景图 - autonomous-agent.jpg
✅ 企业知识库RAG系统背景图 - rag-system.jpg
✅ LLM领域微调平台背景图 - finetuning.jpg
✅ MLOps自动化流水线背景图 - ml-pipeline.jpg

✨ 完成！
```

**自定义搜索关键词：**

编辑 `download-project-images.js` 中的 `projectImages` 数组：

```javascript
const projectImages = [
  {
    filename: 'llm-chatbot.jpg',
    query: 'artificial intelligence chatbot',  // 修改这里
    description: 'AI客服助手背景图'
  },
  // ...
];
```

### 2. generate-placeholder-images.sh

快速生成彩色占位图片，用于开发和测试。

**特点：**
- ⚡ 快速生成
- 🎨 彩色主题匹配项目类别
- 📝 包含项目名称文字
- 🆓 无需 API Key

**使用方法：**

```bash
# 添加执行权限
chmod +x scripts/generate-placeholder-images.sh

# 运行脚本
./scripts/generate-placeholder-images.sh
```

**输出：**
```
🎨 生成项目占位图片...
✅ 完成！图片已保存到 portfolio-website/public/projects
```

**生成的图片：**
- `llm-chatbot.jpg` - 蓝色主题
- `autonomous-agent.jpg` - 紫色主题
- `rag-system.jpg` - 绿色主题
- `finetuning.jpg` - 橙色主题
- `ml-pipeline.jpg` - 靛蓝主题

## 图片规格

所有脚本生成的图片都符合以下规格：

- **尺寸：** 800x450px (16:9 宽高比)
- **格式：** JPEG
- **位置：** `public/projects/`
- **命名：** 与项目 ID 对应

## 手动添加图片

如果你有自己的图片，可以直接复制到 `public/projects/` 目录：

```bash
# 复制图片
cp /path/to/your/image.jpg public/projects/llm-chatbot.jpg

# 确保文件名匹配
ls -la public/projects/
```

**推荐规格：**
- 尺寸：800x450px 或更大（保持 16:9）
- 格式：JPEG（< 100KB）或 WebP（< 50KB）
- 质量：80-85%

## 图片优化

### 使用 ImageMagick

```bash
# 调整尺寸并裁剪
convert input.jpg -resize 800x450^ -gravity center -extent 800x450 output.jpg

# 压缩质量
convert input.jpg -quality 85 output.jpg

# 转换为 WebP
convert input.jpg -quality 80 output.webp
```

### 使用在线工具

- [Squoosh](https://squoosh.app/) - 强大的在线图片压缩工具
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 智能压缩
- [Compressor.io](https://compressor.io/) - 多格式压缩

## 批量处理

### 批量调整尺寸

```bash
# 使用 ImageMagick 批量处理
for img in public/projects/*.jpg; do
  convert "$img" -resize 800x450^ -gravity center -extent 800x450 "$img"
done
```

### 批量压缩

```bash
# 使用 jpegoptim
jpegoptim --size=100k public/projects/*.jpg

# 或使用 ImageMagick
for img in public/projects/*.jpg; do
  convert "$img" -quality 85 "$img"
done
```

## 添加新项目图片

当添加新项目时：

1. **更新脚本配置**

编辑 `download-project-images.js`：

```javascript
const projectImages = [
  // ... 现有项目
  {
    filename: 'new-project.jpg',
    query: 'your search keywords',
    description: '新项目背景图'
  }
];
```

2. **更新项目数据**

编辑 `src/data/projects.ts`：

```typescript
{
  id: 'new-project',
  title: '新项目',
  thumbnail: '/projects/new-project.jpg',  // 添加这行
  // ...
}
```

3. **运行脚本下载图片**

```bash
node scripts/download-project-images.js
```

## 故障排除

### Unsplash API 限流

Unsplash 免费账号限制：
- 每小时 50 次请求
- 每月 5000 次请求

**解决方法：**
- 脚本已添加 1 秒延迟避免限流
- 如果仍然失败，等待一段时间后重试

### 图片下载失败

**检查：**
1. 网络连接是否正常
2. API Key 是否正确
3. 是否超过 API 限制

**解决：**
```bash
# 测试网络连接
curl -I https://api.unsplash.com

# 验证 API Key
echo $UNSPLASH_ACCESS_KEY

# 使用占位图片作为备选
./scripts/generate-placeholder-images.sh
```

### 权限问题

```bash
# 添加执行权限
chmod +x scripts/*.sh

# 检查目录权限
ls -la public/projects/
```

## 最佳实践

1. **开发阶段**：使用占位图片快速开发
2. **测试阶段**：使用 Unsplash 获取真实图片
3. **生产阶段**：使用优化后的自定义图片

4. **图片优化流程**：
   ```
   原始图片 → 调整尺寸 → 压缩质量 → 转换格式 → 部署
   ```

5. **版本控制**：
   - 小图片（< 100KB）可以提交到 Git
   - 大图片建议使用 Git LFS 或 CDN

## 相关文档

- [PROJECT-IMAGES-SETUP.md](../PROJECT-IMAGES-SETUP.md) - 图片设置完整说明
- [PERFORMANCE-OPTIMIZATIONS.md](../PERFORMANCE-OPTIMIZATIONS.md) - 性能优化文档
- [Unsplash API 文档](https://unsplash.com/documentation)
- [Picsum Photos 文档](https://picsum.photos/)

## 支持

如有问题，请查看：
1. 脚本输出的错误信息
2. 浏览器开发者工具的 Network 标签
3. 相关文档和故障排除部分
