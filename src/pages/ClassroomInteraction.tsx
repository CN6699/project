import { useState } from 'react';
import { Users, Download, Copy, Loader2 } from 'lucide-react';

export default function ClassroomInteraction() {
  const [formData, setFormData] = useState({
    knowledgePoint: '',
    grade: '',
    subject: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const grades = ['小学1年级', '小学2年级', '小学3年级', '小学4年级', '小学5年级', '小学6年级', '初中1年级', '初中2年级', '初中3年级'];
  const subjects = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'];

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
      const response = await fetch('http://localhost:3080/api/classroom-interaction', {
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
      setError(error.message || '生成互动方案失败，请重试');
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
    
    if (!formData.knowledgePoint) {
      errors.knowledgePoint = '请输入知识点';
    }
    
    if (!formData.grade) {
      errors.grade = '请选择年级';
    }
    
    if (!formData.subject) {
      errors.subject = '请选择学科';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">课堂互动设计</h1>
      
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4">输入信息</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">知识点</label>
            <input
              type="text"
              name="knowledgePoint"
              value={formData.knowledgePoint}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.knowledgePoint ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="例如：分数的基本性质"
              required
            />
            {formErrors.knowledgePoint && (
              <p className="mt-1 text-sm text-red-600">{formErrors.knowledgePoint}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">年级</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.grade ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">请选择年级</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {formErrors.grade && (
                <p className="mt-1 text-sm text-red-600">{formErrors.grade}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学科</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.subject ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">请选择学科</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {formErrors.subject && (
                <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>
              )}
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
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-all flex items-center space-x-2 w-full md:w-auto"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Users className="h-5 w-5" />}
            <span>{isLoading ? '生成中...' : '生成互动方案'}</span>
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">互动方案</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">分层教学方案</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">基础层</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.layeredTeaching.basic.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">进阶层</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.layeredTeaching.advanced.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">课堂互动游戏</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.interactiveGames.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">提问脚本</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.questionScripts.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">分层课堂练习</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.layeredExercises.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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
                a.download = '课堂互动方案.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-md transition-all"
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