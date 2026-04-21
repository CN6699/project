import express, { type Request, type Response, type NextFunction } from 'express'

const router = express.Router()

// 验证请求数据
const validateHomeworkGradeRequest = (req: Request) => {
  const { question, studentAnswer, grade, fullScore } = req.body
  const errors: string[] = []
  
  if (!question || typeof question !== 'string' || question.trim() === '') {
    errors.push('题目内容不能为空')
  }
  
  if (!studentAnswer || typeof studentAnswer !== 'string' || studentAnswer.trim() === '') {
    errors.push('学生答案不能为空')
  }
  
  if (!grade || typeof grade !== 'string' || grade.trim() === '') {
    errors.push('年级不能为空')
  }
  
  if (typeof fullScore !== 'number' || fullScore <= 0) {
    errors.push('满分必须是正数')
  }
  
  return errors
}

// 生成随机分数
const generateScore = (grade: string, fullScore: number) => {
  const baseAccuracy = {
    '小学': 0.7,
    '初中': 0.6,
    '高中': 0.5
  }
  
  const accuracy = baseAccuracy[grade as keyof typeof baseAccuracy] || 0.6
  const randomFactor = Math.random() * 0.3 + 0.8 // 0.8-1.1
  const score = Math.round(fullScore * accuracy * randomFactor)
  return Math.min(Math.max(score, 0), fullScore)
}

// 生成批改结果
const generateGradeResult = (score: number, fullScore: number, question: string) => {
  const percentage = score / fullScore
  
  if (percentage >= 0.9) {
    return {
      result: 'correct',
      errorAnalysis: '本题回答完全正确，知识点掌握牢固。',
      comment: '太棒了！你的回答非常准确，对知识点的理解很深刻。继续保持这样的学习态度！',
      teacherAdvice: '建议教师在课堂上可以适当增加一些挑战性的问题，进一步拓展学生的思维。'
    }
  } else if (percentage >= 0.6) {
    return {
      result: 'partial',
      errorAnalysis: '本题回答基本正确，但存在一些细节错误。主要问题在于对知识点的应用不够熟练。',
      comment: '你对知识点有一定的理解，这很好！虽然存在一些错误，但只要多练习，一定能够掌握得更好。继续加油！',
      teacherAdvice: '建议教师在课堂上多设计一些类似的练习题，帮助学生巩固知识点的应用。'
    }
  } else {
    return {
      result: 'incorrect',
      errorAnalysis: '本题回答存在较多错误，对知识点的理解不够深入。',
      comment: '不要灰心，学习是一个循序渐进的过程。建议你认真复习相关知识点，多做练习，相信你会取得进步的！',
      teacherAdvice: '建议教师在课堂上加强对基础知识点的讲解，确保学生理解掌握后再进行应用练习。'
    }
  }
}

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // 验证请求数据
    const errors = validateHomeworkGradeRequest(req)
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: '请求参数错误',
        details: errors
      })
    }
    
    const { question, studentAnswer, grade, fullScore } = req.body
    
    // 生成分数
    const score = generateScore(grade, fullScore)
    
    // 生成批改结果
    const { result, errorAnalysis, comment, teacherAdvice } = generateGradeResult(score, fullScore, question)
    
    // 模拟作业批改结果
    const response = {
      result,
      score,
      errorAnalysis,
      correction: '标准回答：XXX',
      comment,
      teacherAdvice,
    }
    
    res.status(200).json({
      success: true,
      data: response
    })
  } catch (error) {
    console.error('批改作业时发生错误:', error)
    res.status(500).json({
      success: false,
      error: '批改作业失败，请稍后重试'
    })
  }
})

export default router