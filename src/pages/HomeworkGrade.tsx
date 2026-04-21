import { useState } from 'react';
import { FileText, Download, Copy, Loader2 } from 'lucide-react';

export default function HomeworkGrade() {
  const [formData, setFormData] = useState({
    question: '',
    studentAnswer: '',
    grade: '',
    fullScore: 100,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const grades = ['小学1年级', '小学2年级', '小学3年级', '小学4年级', '小学5年级', '小学6年级', '初中1年级', '初中2年级', '初中3年级'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3080/api/homework-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API调用失败');
      }
      
      const data = await response.json();
      setResult(data.data);
    } catch (error: any) {
      console.error('错误:', error);
      setError(error.message || '批改作业失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  // 表单验证
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.question) {
      errors.question = '请输入题目';
    }
    
    if (!formData.studentAnswer) {
      errors.studentAnswer = '请输入学生作答';
    }
    
    if (!formData.grade) {
      errors.grade = '请选择学生年级';
    }
    
    if (!formData.fullScore || formData.fullScore <= 0) {
      errors.fullScore = '请输入有效的满分分值';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">作业批改</h1>
      
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4">输入信息</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">题目</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.question ? 'border-red-300' : 'border-gray-300'}`}
              rows={3}
              placeholder="请输入作业题目"
              required
            ></textarea>
            {formErrors.question && <p className="text-red-600 text-xs mt-1">{formErrors.question}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">学生作答</label>
            <textarea
              name="studentAnswer"
              value={formData.studentAnswer}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.studentAnswer ? 'border-red-300' : 'border-gray-300'}`}
              rows={3}
              placeholder="请输入学生的作答内容"
              required
            ></textarea>
            {formErrors.studentAnswer && <p className="text-red-600 text-xs mt-1">{formErrors.studentAnswer}</p>}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学生年级</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.grade ? 'border-red-300' : 'border-gray-300'}`}
                required
              >
                <option value="">请选择年级</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {formErrors.grade && <p className="text-red-600 text-xs mt-1">{formErrors.grade}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">满分分值</label>
              <input
                type="number"
                name="fullScore"
                value={formData.fullScore}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.fullScore ? 'border-red-300' : 'border-gray-300'}`}
                min="1"
                required
              />
              {formErrors.fullScore && <p className="text-red-600 text-xs mt-1">{formErrors.fullScore}</p>}
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all flex items-center space-x-2 w-full md:w-auto"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
            <span>{isLoading ? '批改中...' : '批改作业'}</span>
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">批改结果</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">{result.score}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium">批改结果</h3>
                <p className={`text-lg ${result.result === 'correct' ? 'text-green-600' : result.result === 'incorrect' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {result.result === 'correct' ? '正确' : result.result === 'incorrect' ? '错误' : '部分正确'}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">错误分析</h3>
              <p className="text-gray-700">{result.errorAnalysis}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">订正思路</h3>
              <p className="text-gray-700">{result.correction}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">个性化评语</h3>
              <p className="text-gray-700">{result.comment}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">教师辅导建议</h3>
              <p className="text-gray-700">{result.teacherAdvice}</p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-all"
            >
              <Copy className="h-4 w-4" />
              <span>复制结果</span>
            </button>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = '作业批改.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-md transition-all"
            >
              <Download className="h-4 w-4" />
              <span>下载结果</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}