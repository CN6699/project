import express, { type Request, type Response, type NextFunction } from 'express'

const router = express.Router()

// 验证请求数据
const validateLearningAnalysisRequest = (req: Request) => {
  const { classData } = req.body
  const errors: string[] = []
  
  if (!classData || typeof classData !== 'string' || classData.trim() === '') {
    errors.push('班级数据不能为空')
  }
  
  return errors
}

// 生成学情分析报告
const generateAnalysisReport = (classData: string) => {
  // 模拟班级数据
  const studentCount = 30
  const subject = '数学'
  const testType = '单元测试'
  
  // 生成随机分数分布
  const scores = []
  for (let i = 0; i < studentCount; i++) {
    scores.push(Math.floor(Math.random() * 41) + 60) // 60-100分
  }
  
  // 计算统计数据
  const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / studentCount)
  const excellentRate = Math.round((scores.filter(score => score >= 90).length / studentCount) * 100)
  const passRate = Math.round((scores.filter(score => score >= 60).length / studentCount) * 100)
  
  // 解析classData字符串，提取高频错误知识点
  const highFrequencyErrors = classData
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.trim())
    .slice(0, 4)
  
  // 如果没有提取到足够的错误知识点，使用默认值
  const defaultErrors = [
    '分数的基本性质应用错误',
    '分数加减法的通分错误',
    '分数与小数的转换错误',
    '应用题中分数的实际应用',
  ]
  
  while (highFrequencyErrors.length < 4) {
    highFrequencyErrors.push(defaultErrors[highFrequencyErrors.length])
  }
  
  // 生成教学建议
  const teachingSuggestions = highFrequencyErrors.map(error => {
    if (error.includes('分数')) {
      return '加强分数相关知识点的练习，多做相关题目巩固。'
    } else if (error.includes('计算')) {
      return '加强计算能力的训练，提高计算准确性。'
    } else if (error.includes('应用')) {
      return '增加应用题的练习，提高实际应用能力。'
    } else {
      return '针对该知识点进行专项练习，加强理解和掌握。'
    }
  })
  
  return {
    report: `本次分析基于班级${studentCount}名学生的${subject}${testType}数据。整体来看，班级平均分为${averageScore}分，其中优秀率（90分以上）为${excellentRate}%，及格率（60分以上）为${passRate}%。主要问题集中在以下几个知识点上。`,
    highFrequencyErrors,
    teachingSuggestions,
    parentCommunication: `各位家长，本次${testType}主要考查了学生对${subject}相关知识的掌握情况。整体来看，班级表现${averageScore >= 75 ? '良好' : '一般'}，但在某些知识点上还需要加强。建议家长在家中多与孩子一起练习相关知识点，帮助孩子巩固所学知识。`,
    statistics: {
      averageScore,
      excellentRate,
      passRate,
      studentCount,
      subject,
      testType
    }
  }
}

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // 验证请求数据
    const errors = validateLearningAnalysisRequest(req)
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: '请求参数错误',
        details: errors
      })
    }
    
    const { classData } = req.body
    
    // 生成学情分析报告
    const result = generateAnalysisReport(classData)
    
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('生成学情分析报告时发生错误:', error)
    res.status(500).json({
      success: false,
      error: '生成学情分析报告失败，请稍后重试'
    })
  }
})

export default router