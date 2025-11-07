#!/bin/bash

# 生成项目占位图片
# 使用 placeholder.com 或其他免费服务

OUTPUT_DIR="portfolio-website/public/projects"
mkdir -p "$OUTPUT_DIR"

echo "🎨 生成项目占位图片..."

# 使用 curl 下载占位图片
# 尺寸：800x450 (16:9)

# AI客服助手 - 蓝色主题
curl -o "$OUTPUT_DIR/llm-chatbot.jpg" \
  "https://via.placeholder.com/800x450/3B82F6/FFFFFF?text=AI+Chatbot+System"

# 自主任务Agent - 紫色主题  
curl -o "$OUTPUT_DIR/autonomous-agent.jpg" \
  "https://via.placeholder.com/800x450/9333EA/FFFFFF?text=Autonomous+Agent"

# 企业知识库RAG系统 - 绿色主题
curl -o "$OUTPUT_DIR/rag-system.jpg" \
  "https://via.placeholder.com/800x450/10B981/FFFFFF?text=RAG+Knowledge+Base"

# LLM领域微调平台 - 橙色主题
curl -o "$OUTPUT_DIR/finetuning.jpg" \
  "https://via.placeholder.com/800x450/F97316/FFFFFF?text=Model+Fine-tuning"

# MLOps自动化流水线 - 靛蓝主题
curl -o "$OUTPUT_DIR/ml-pipeline.jpg" \
  "https://via.placeholder.com/800x450/6366F1/FFFFFF?text=ML+Pipeline"

echo "✅ 完成！图片已保存到 $OUTPUT_DIR"
