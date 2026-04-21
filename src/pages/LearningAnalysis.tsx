import { useState } from 'react';
import { BarChart3, Download, Copy, Loader2 } from 'lucide-react';

export default function LearningAnalysis() {
  const [formData, setFormData] = useState({
    classData: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 表单验证
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.classData.trim()) {
      errors.classData = '请输入班级作业或考试的错题数据';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      const response = await fetch('http://localhost:3080/api/learning-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classData: formData.classData }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API调用失败');
      }
      
      const data = await response.json();
      setResult(data.data);
    } catch (error: any) {
      console.error('错误:', error);
      setError(error.message || '分析学情失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">学情分析</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">输入班级数据</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">班级作业/考试错题数据</label>
            <textarea
              name="classData"
              value={formData.classData}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${formErrors.classData ? 'border-red-300' : 'border-gray-300'}`}
              rows={6}
              placeholder="请输入班级作业或考试的错题数据，例如：\n1. 分数的基本性质：30%的学生出错\n2. 分数加减法：25%的学生出错\n3. 分数与小数转换：20%的学生出错"
              required
            ></textarea>
            {formErrors.classData && <p className="text-red-600 text-xs mt-1">{formErrors.classData}</p>}
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md transition-all flex items-center space-x-2 w-full md:w-auto"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <BarChart3 className="h-5 w-5" />}
            <span>{isLoading ? '分析中...' : '分析学情'}</span>
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">分析报告</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">分析报告</h3>
              <p className="text-gray-700">{result.report}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">高频错误知识点</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.highFrequencyErrors.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">教学建议</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.teachingSuggestions.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">家校沟通话术</h3>
              <p className="text-gray-700">{result.parentCommunication}</p>
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
                a.download = '学情分析.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md transition-all"
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