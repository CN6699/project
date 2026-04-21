# Hello AI 科技致善 SOLO 教学助手

这是一个为乡村教师打造的零门槛全科教学助手，提供以下核心功能：

- **教案课件生成**：根据年级、学科和课时内容生成详细的教案和PPT大纲
- **作业批改**：自动批改学生作业并提供详细的错误分析和改进建议
- **学情分析**：分析班级学生的学习情况，生成详细的分析报告和教学建议
- **课堂互动设计**：根据知识点生成分层教学方案和互动游戏

## 技术栈

- **前端**：React 18 + TypeScript + Tailwind CSS + Vite
- **后端**：Express 4 + TypeScript
- **API设计**：RESTful API

## 项目结构

- `src/`：前端代码
- `api/`：后端代码
- `dist/`：前端构建输出

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 启动后端服务器

```bash
npm run server:dev
```

## API 端点

- `POST /api/lesson-plan`：生成教案
- `POST /api/homework-grade`：批改作业
- `POST /api/learning-analysis`：分析学情
- `POST /api/classroom-interaction`：生成课堂互动方案
- `POST /api/auth/register`：用户注册
- `POST /api/auth/login`：用户登录
- `POST /api/auth/logout`：用户登出
- `GET /api/health`：健康检查

## 贡献

欢迎贡献代码和提出建议！
