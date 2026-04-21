import { useState } from 'react';
import { Book, Download, Copy, Loader2 } from 'lucide-react';

export default function LessonPlan() {
  const [formData, setFormData] = useState({
    grade: '',
    subject: '',
    lesson: '',
    textbookVersion: '',
    studentLevel: 'weak',
    localTags: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('教案');

  const grades = ['小学1年级', '小学2年级', '小学3年级', '小学4年级', '小学5年级', '小学6年级', '初中1年级', '初中2年级', '初中3年级'];
  const subjects = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'];
  const textbookVersions = ['人教版', '北师大版', '苏教版', '沪教版', '鲁教版', '湘教版'];
  const localTagOptions = ['农业生产', '乡村生活', '乡土文化', '农村环境', '留守儿童', '多媒体设备有限'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      localTags: prev.localTags.includes(tag) 
        ? prev.localTags.filter(t => t !== tag)
        : [...prev.localTags, tag]
    }));
  };

  // 表单验证
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.grade) {
      errors.grade = '请选择年级';
    }
    
    if (!formData.subject) {
      errors.subject = '请选择学科';
    }
    
    if (!formData.lesson) {
      errors.lesson = '请输入课时名称';
    }
    
    if (!formData.textbookVersion) {
      errors.textbookVersion = '请选择教材版本';
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
      const response = await fetch('http://localhost:3080/api/lesson-plan', {
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
      setError(error.message || '生成教案失败，请重试');
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
      <h1 className="text-2xl font-bold mb-6">教案课件生成</h1>
      
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4">参数设置</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">年级</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.grade ? 'border-red-300' : 'border-gray-300'}`}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">学科</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.subject ? 'border-red-300' : 'border-gray-300'}`}
                required
              >
                <option value="">请选择学科</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {formErrors.subject && <p className="text-red-600 text-xs mt-1">{formErrors.subject}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课时名称</label>
              <input
                type="text"
                name="lesson"
                value={formData.lesson}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.lesson ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="例如：分数的基本性质"
                required
              />
              {formErrors.lesson && <p className="text-red-600 text-xs mt-1">{formErrors.lesson}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">教材版本</label>
              <select
                name="textbookVersion"
                value={formData.textbookVersion}
                onChange={handleInputChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${formErrors.textbookVersion ? 'border-red-300' : 'border-gray-300'}`}
                required
              >
                <option value="">请选择教材版本</option>
                {textbookVersions.map(version => (
                  <option key={version} value={version}>{version}</option>
                ))}
              </select>
              {formErrors.textbookVersion && <p className="text-red-600 text-xs mt-1">{formErrors.textbookVersion}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">学生基础水平</label>
            <div className="flex space-x-4">
              {['薄弱', '中等', '良好'].map(level => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="studentLevel"
                    value={level === '薄弱' ? 'weak' : level === '中等' ? 'medium' : 'good'}
                    checked={formData.studentLevel === (level === '薄弱' ? 'weak' : level === '中等' ? 'medium' : 'good')}
                    onChange={handleInputChange}
                    className="text-green-600"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">乡土素材标签</label>
            <div className="flex flex-wrap gap-2">
              {localTagOptions.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagChange(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${formData.localTags.includes(tag) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {tag}
                </button>
              ))}
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
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all flex items-center space-x-2 w-full md:w-auto"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Book className="h-5 w-5" />}
            <span>{isLoading ? '生成中...' : '生成教案'}</span>
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">生成结果</h2>
          
          <div className="border-b border-gray-200 mb-4">
            <div className="flex space-x-4">
              {['教案', 'PPT大纲', '课堂逐字稿'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 border-b-2 ${activeTab === tab ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {activeTab === '教案' && (
              <div>
                <h3 className="text-lg font-medium mb-2">教学目标</h3>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">知识与技能</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.teachingObjectives.knowledge.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">过程与方法</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.teachingObjectives.process.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">情感态度与价值观</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.teachingObjectives.emotion.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2">教学重难点</h3>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">重点</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.teachingFocus.keyPoints.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">难点</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.teachingFocus.difficulties.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">解决方法</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.teachingFocus.solutions.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2">教学过程</h3>
                <div className="mb-4">
                  {result.teachingProcess.map((process: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{process.section}</h4>
                        <span className="text-sm text-gray-500">{process.duration}分钟</span>
                      </div>
                      <div className="space-y-2">
                        <p><strong>教师话术：</strong>{process.teacherTalk}</p>
                        <p><strong>学生活动：</strong>{process.studentActivity}</p>
                        <p><strong>板书设计：</strong>{process.blackboardDesign}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'PPT大纲' && (
              <div>
                <ul className="list-decimal list-inside space-y-2">
                  {result.pptOutline.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === '课堂逐字稿' && (
              <div>
                <p className="whitespace-pre-wrap">{result.classScript}</p>
              </div>
            )}
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
                a.download = '教案.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-md transition-all"
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