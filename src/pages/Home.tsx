import { Link } from 'react-router-dom';
import { Book, FileText, BarChart3, Users, Clock, CheckCircle, Award, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: '教案课件生成',
      description: '一键生成学情适配的教案和课件，支持全学科、全版本新课标教材',
      icon: Book,
      path: '/lesson-plan',
      color: 'from-green-500 to-green-700',
    },
    {
      title: '作业批改',
      description: '支持全类型主观题批改，生成个性化评语和教师辅导建议',
      icon: FileText,
      path: '/homework-grade',
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: '学情分析',
      description: '自动生成学情分析报告，定位高频错误知识点，给出补弱教学方案',
      icon: BarChart3,
      path: '/learning-analysis',
      color: 'from-yellow-500 to-yellow-700',
    },
    {
      title: '课堂互动设计',
      description: '生成分层教学方案和无需电子设备的课堂互动小游戏',
      icon: Users,
      path: '/classroom-interaction',
      color: 'from-purple-500 to-purple-700',
    },
  ];

  const benefits = [
    {
      title: '节省时间',
      description: '单课时备课时长从2小时压缩至2分钟',
      icon: Clock,
    },
    {
      title: '提高效率',
      description: '作业批改效率提升90%以上',
      icon: Zap,
    },
    {
      title: '零门槛使用',
      description: '无需下载安装，无需编程基础',
      icon: CheckCircle,
    },
    {
      title: '乡村适配',
      description: '完美适配乡村低网络、低设备条件',
      icon: Award,
    },
  ];

  const steps = [
    {
      number: '1',
      title: '选择功能模块',
      description: '根据您的需求选择相应的功能模块',
    },
    {
      number: '2',
      title: '输入相关信息',
      description: '按照引导输入年级、学科、课时等基本信息',
    },
    {
      number: '3',
      title: '生成内容',
      description: '系统自动生成完整可用的教学内容',
    },
    {
      number: '4',
      title: '使用与调整',
      description: '直接使用生成的内容，或根据需要进行调整',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl shadow-lg p-8 mb-12 transform transition-all duration-500 hover:shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Hello AI 乡村教师助手</h1>
          <p className="text-lg md:text-xl mb-6 animate-fade-in-delay">
            为乡村教师打造的零门槛全科教学助手，解决备课教研资源匮乏、多学科授课负担重、作业批改与学情分析效率低的核心痛点
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <Link
                key={feature.path}
                to={feature.path}
                className={`bg-white/20 hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-lg flex items-center space-x-2 transform hover:scale-105 ${index === 0 ? 'animate-fade-in-delay-1' : index === 1 ? 'animate-fade-in-delay-2' : index === 2 ? 'animate-fade-in-delay-3' : 'animate-fade-in-delay-4'}`}
              >
                <feature.icon className="h-5 w-5" />
                <span>{feature.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center animate-fade-in">核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2 ${index === 0 ? 'animate-fade-in-delay-1' : index === 1 ? 'animate-fade-in-delay-2' : index === 2 ? 'animate-fade-in-delay-3' : 'animate-fade-in-delay-4'}`}
              >
                <div className={`bg-gradient-to-r ${feature.color} p-4 text-white`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center animate-fade-in">为什么选择我们</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className={`bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2 ${index === 0 ? 'animate-fade-in-delay-1' : index === 1 ? 'animate-fade-in-delay-2' : index === 2 ? 'animate-fade-in-delay-3' : 'animate-fade-in-delay-4'}`}>
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center animate-fade-in">使用步骤</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2 ${index === 0 ? 'animate-fade-in-delay-1' : index === 1 ? 'animate-fade-in-delay-2' : index === 2 ? 'animate-fade-in-delay-3' : 'animate-fade-in-delay-4'}`}>
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 hover:bg-blue-200">
                <span className="text-blue-600 font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl shadow-lg p-8 text-center transition-all duration-500 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 animate-fade-in">开始使用 Hello AI 乡村教师助手</h2>
        <p className="mb-6 animate-fade-in-delay">零门槛、高适配、可落地、全免费</p>
        <Link
          to="/lesson-plan"
          className="bg-white text-green-600 hover:bg-gray-100 transition-all duration-300 px-8 py-3 rounded-lg font-medium transform hover:scale-105 animate-fade-in-delay-2"
        >
          立即开始
        </Link>
      </div>
    </div>
  );
}