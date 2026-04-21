import express, { type Request, type Response, type NextFunction } from 'express'

const router = express.Router()

// 验证请求数据
const validateLessonPlanRequest = (req: Request) => {
  const { grade, subject, lesson } = req.body
  const errors: string[] = []
  
  if (!grade || typeof grade !== 'string' || grade.trim() === '') {
    errors.push('年级不能为空')
  }
  
  if (!subject || typeof subject !== 'string' || subject.trim() === '') {
    errors.push('学科不能为空')
  }
  
  if (!lesson || typeof lesson !== 'string' || lesson.trim() === '') {
    errors.push('课时内容不能为空')
  }
  
  return errors
}

// 根据年级、学科和课时生成不同的教案内容
const generateLessonPlan = (grade: string, subject: string, lesson: string) => {
  // 年级特定内容
  const gradeSpecific = {
    '小学': {
      teachingStyle: '生动活泼，注重互动和游戏',
      examples: '生活中的常见现象和简单例子',
      language: '通俗易懂，富有童趣'
    },
    '初中': {
      teachingStyle: '注重概念理解，培养逻辑思维',
      examples: '联系生活实际，引入科学实验',
      language: '清晰准确，循序渐进'
    },
    '高中': {
      teachingStyle: '深入分析，培养创新思维',
      examples: '前沿科学成果，实际应用案例',
      language: '严谨专业，逻辑性强'
    }
  }[grade] || {
    teachingStyle: '根据学生特点调整',
    examples: '适合学生水平的例子',
    language: '符合学生认知水平的表达'
  }

  // 学科特定内容
  const subjectSpecific = {
    '语文': {
      objectives: ['掌握生字词的读写', '理解文章的中心思想', '培养阅读理解能力'],
      focus: ['文章的结构分析', '修辞手法的运用', '情感表达的体会'],
      activities: ['朗读课文', '小组讨论', '写作练习']
    },
    '数学': {
      objectives: ['掌握数学概念和公式', '培养计算能力', '提高解决问题的能力'],
      focus: ['概念的理解', '公式的应用', '解题思路的培养'],
      activities: ['例题讲解', '练习巩固', '小组竞赛']
    },
    '英语': {
      objectives: ['掌握单词和短语', '提高听说读写能力', '培养英语思维'],
      focus: ['词汇的记忆', '语法的运用', '口语的练习'],
      activities: ['对话练习', '角色扮演', '听力训练']
    },
    '物理': {
      objectives: ['理解物理概念和规律', '掌握实验技能', '培养科学探究能力'],
      focus: ['概念的理解', '公式的推导', '实验的设计'],
      activities: ['实验操作', '现象观察', '问题讨论']
    },
    '化学': {
      objectives: ['理解化学概念和原理', '掌握实验技能', '培养科学态度'],
      focus: ['化学反应的原理', '实验的安全操作', '化学与生活的联系'],
      activities: ['实验操作', '现象观察', '小组探究']
    },
    '生物': {
      objectives: ['理解生物概念和规律', '掌握实验技能', '培养环保意识'],
      focus: ['生物结构与功能的关系', '生态系统的平衡', '生物与环境的关系'],
      activities: ['实验观察', '标本制作', '户外考察']
    },
    '历史': {
      objectives: ['了解历史事件和人物', '培养历史思维', '增强民族自豪感'],
      focus: ['历史事件的因果关系', '历史人物的评价', '历史与现实的联系'],
      activities: ['史料分析', '角色扮演', '小组讨论']
    },
    '地理': {
      objectives: ['了解地理概念和规律', '掌握地图阅读技能', '培养全球视野'],
      focus: ['地理现象的成因', '地理环境的影响', '可持续发展的理念'],
      activities: ['地图绘制', '实地考察', '数据分析']
    }
  }[subject] || {
    objectives: ['掌握本节课的核心知识点', '理解相关概念和原理', '能够运用所学知识解决实际问题'],
    focus: ['核心概念的理解', '重点技能的掌握', '知识体系的构建'],
    activities: ['课堂讲解', '练习巩固', '小组讨论']
  }

  return {
    teachingObjectives: {
      knowledge: subjectSpecific.objectives,
      process: ['通过小组讨论培养合作能力', '通过实践活动提高动手能力', '通过问题引导培养思维能力'],
      emotion: ['激发学习兴趣', '培养科学态度', '增强民族自豪感'],
    },
    teachingFocus: {
      keyPoints: subjectSpecific.focus,
      difficulties: ['抽象概念的理解', '复杂问题的解决', '知识的实际应用'],
      solutions: ['通过具体例子讲解', '设计互动游戏', '提供分层练习'],
    },
    teachingProcess: [
      {
        section: '导入',
        duration: 5,
        teacherTalk: `同学们，今天我们要学习${lesson}，先来看一个${gradeSpecific.examples}...`,
        studentActivity: '认真听讲，思考老师提出的问题',
        blackboardDesign: `课题：${lesson}\n导入问题：XXX`,
      },
      {
        section: '新授',
        duration: 20,
        teacherTalk: `现在我们开始学习本节课的核心内容，${gradeSpecific.teachingStyle}...`,
        studentActivity: '跟随老师的讲解，做笔记',
        blackboardDesign: `核心知识点1：XXX\n核心知识点2：XXX`,
      },
      {
        section: '巩固',
        duration: 15,
        teacherTalk: '现在我们来做一些练习，巩固所学知识...',
        studentActivity: subjectSpecific.activities.join('、'),
        blackboardDesign: '练习题目：XXX\n答案：XXX',
      },
      {
        section: '小结',
        duration: 3,
        teacherTalk: '本节课我们学习了...',
        studentActivity: '回顾所学内容',
        blackboardDesign: '小结：XXX',
      },
      {
        section: '作业',
        duration: 2,
        teacherTalk: '今天的作业是...',
        studentActivity: '记录作业内容',
        blackboardDesign: '作业：XXX',
      },
    ],
    classScript: `各位同学，大家好！今天我们要学习的内容是${lesson}。${gradeSpecific.language}`,
    pptOutline: [
      `封面：${lesson}、${grade}、${subject}、教师`,
      '导入：生活中的例子',
      '核心知识点1',
      '核心知识点2',
      '互动练习',
      '小结',
      '作业',
    ],
  }
}

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // 验证请求数据
    const errors = validateLessonPlanRequest(req)
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: '请求参数错误',
        details: errors
      })
    }
    
    const { grade, subject, lesson, textbookVersion, studentLevel, localTags } = req.body
    
    // 根据输入参数生成教案
    const result = generateLessonPlan(grade, subject, lesson)
    
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('生成教案时发生错误:', error)
    res.status(500).json({
      success: false,
      error: '生成教案失败，请稍后重试'
    })
  }
})

export default router