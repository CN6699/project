/**
 * This is a user authentication API route demo.
 * Handle user registration, login, token management, etc.
 */
import { Router, type Request, type Response } from 'express'
import { successResponse, errorResponse } from '../utils/response.js'

const router = Router()

// 模拟用户数据
const users: Array<{ id: string; username: string; password: string; email: string }> = []

/**
 * User Register
 * POST /api/auth/register
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body

    // 验证请求数据
    if (!username || !password || !email) {
      res.status(400).json(errorResponse('用户名、密码和邮箱不能为空'))
      return
    }

    // 检查用户是否已存在
    if (users.some(user => user.username === username || user.email === email)) {
      res.status(400).json(errorResponse('用户名或邮箱已存在'))
      return
    }

    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      email
    }

    users.push(newUser)

    res.status(201).json(successResponse({ id: newUser.id, username: newUser.username, email: newUser.email }, '注册成功'))
  } catch (error) {
    console.error('注册失败:', error)
    res.status(500).json(errorResponse('注册失败，请稍后重试'))
  }
})

/**
 * User Login
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    // 验证请求数据
    if (!username || !password) {
      res.status(400).json(errorResponse('用户名和密码不能为空'))
      return
    }

    // 查找用户
    const user = users.find(user => user.username === username && user.password === password)

    if (!user) {
      res.status(401).json(errorResponse('用户名或密码错误'))
      return
    }

    // 模拟生成token
    const token = `token_${Date.now()}_${user.id}`

    res.status(200).json(successResponse({ id: user.id, username: user.username, email: user.email, token }, '登录成功'))
  } catch (error) {
    console.error('登录失败:', error)
    res.status(500).json(errorResponse('登录失败，请稍后重试'))
  }
})

/**
 * User Logout
 * POST /api/auth/logout
 */
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  try {
    // 验证请求头中的token
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      res.status(401).json(errorResponse('未授权'))
      return
    }

    // 模拟登出逻辑
    res.status(200).json(successResponse(null, '登出成功'))
  } catch (error) {
    console.error('登出失败:', error)
    res.status(500).json(errorResponse('登出失败，请稍后重试'))
  }
})

export default router
