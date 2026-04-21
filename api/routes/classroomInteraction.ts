import express, { type Request, type Response, type NextFunction } from 'express'

const router = express.Router()

// 验证请求数据
const validateClassroomInteractionRequest = (req: Request) => {
  const { knowledgePoint, grade, subject } = req.body
  const errors: string[] = []
  
  if (!knowledgePoint || typeof knowledgePoint !== 'string' || knowledgePoint.trim() === '') {
    errors.push('知识点不能为空')
  }
  
  if (!grade || typeof grade !== 'string' || grade.trim() === '') {
    errors.push('年级不能为空')
  }
  
  if (!subject || typeof subject !== 'string' || subject.trim() === '') {
    errors.push('学科不能为空')
  }
  
  return errors
}

// 生成分层教学方案
const generateLayeredTeaching = (knowledgePoint: string, grade: string) => {
  // 根据年级调整教学内容
  const gradeLevel = {
    '小学': {
      basic: [
        `通过具体例子讲解${knowledgePoint}`,
        '让学生动手操作，用实物或图片理解概念',
        '设计简单的练习题，巩固基本概念',
      ],
      advanced: [
        `${knowledgePoint}的简单应用`,
        '与生活中的实际例子结合',
        '通过游戏加深理解',
      ],
    },
    '初中': {
      basic: [
        `系统讲解${knowledgePoint}的概念和原理`,
        '通过例题演示解题方法',
        '设计基础练习题，巩固知识点',
      ],
      advanced: [
        `${knowledgePoint}的拓展应用`,
        '与其他知识点的联系',
        '解决复杂的实际问题',
      ],
    },
    '高中': {
      basic: [
        `深入讲解${knowledgePoint}的理论基础`,
        '通过推导和证明加深理解',
        '设计综合性练习题',
      ],
      advanced: [
        `${knowledgePoint}的前沿应用`,
        '与大学相关课程的衔接',
        '进行探究性学习活动',
      ],
    }
  }
  
  return gradeLevel[grade as keyof typeof gradeLevel] || gradeLevel['初中']
}

// 生成互动游戏
const generateInteractiveGames = (knowledgePoint: string, grade: string) => {
  const games = {
    '小学': [
      `${knowledgePoint}卡片配对游戏：学生通过配对相关概念来巩固知识点`,
      `${knowledgePoint}接龙：学生依次说出与${knowledgePoint}相关的内容`,
      `${knowledgePoint}大转盘：转动转盘，回答与指针指向内容相关的问题`,
      `${knowledgePoint}角色扮演：通过角色扮演理解${knowledgePoint}的应用`,
    ],
    '初中': [
      `${knowledgePoint}知识竞赛：分小组进行知识问答比赛`,
      `${knowledgePoint}案例分析：通过实际案例分析加深理解`,
      `${knowledgePoint}实验探究：通过实验验证相关原理`,
      `${knowledgePoint}辩论会：就相关话题展开辩论`,
    ],
    '高中': [
      `${knowledgePoint}学术研讨：学生分组进行小课题研究`,
      `${knowledgePoint}模拟实验：通过模拟实验理解抽象概念`,
      `${knowledgePoint}问题解决：小组合作解决复杂问题`,
      `${knowledgePoint}创新设计：设计与${knowledgePoint}相关的创新方案`,
    ]
  }
  
  const gradeGames = games[grade as keyof typeof games] || games['初中']
  // 随机选择3个游戏
  return gradeGames.sort(() => 0.5 - Math.random()).slice(0, 3)
}

// 生成问题脚本
const generateQuestionScripts = (knowledgePoint: string) => {
  return [
    `同学们，我们已经学习了${knowledgePoint}，谁能来说一说什么是${knowledgePoint}？`,
    `关于${knowledgePoint}，你有什么疑问吗？`,
    `你能举出一个生活中应用${knowledgePoint}的例子吗？`,
    `如果我们将${knowledgePoint}应用到实际生活中，会有什么效果？`,
    `你认为${knowledgePoint}与我们之前学习的哪些知识点有关联？`,
  ]
}

// 生成分层练习
const generateLayeredExercises = (knowledgePoint: string, grade: string) => {
  return {
    basic: `基础练习：${knowledgePoint}的基本概念和简单应用`,
    advanced: `提高练习：${knowledgePoint}的综合应用`,
    challenge: `挑战练习：与${knowledgePoint}相关的复杂问题解决`,
  }
}

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // 验证请求数据
    const errors = validateClassroomInteractionRequest(req)
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: '请求参数错误',
        details: errors
      })
    }
    
    const { knowledgePoint, grade, subject } = req.body
    
    // 生成课堂互动方案
    const result = {
      layeredTeaching: generateLayeredTeaching(knowledgePoint, grade),
      interactiveGames: generateInteractiveGames(knowledgePoint, grade),
      questionScripts: generateQuestionScripts(knowledgePoint),
      layeredExercises: generateLayeredExercises(knowledgePoint, grade),
    }
    
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('生成课堂互动方案时发生错误:', error)
    res.status(500).json({
      success: false,
      error: '生成课堂互动方案失败，请稍后重试'
    })
  }
})

export default router