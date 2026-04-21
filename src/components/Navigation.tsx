import { Link, useLocation } from 'react-router-dom';
import { Book, FileText, BarChart3, Users, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      path: '/',
      label: '首页',
      icon: Book,
    },
    {
      path: '/lesson-plan',
      label: '教案课件',
      icon: FileText,
    },
    {
      path: '/homework-grade',
      label: '作业批改',
      icon: FileText,
    },
    {
      path: '/learning-analysis',
      label: '学情分析',
      icon: BarChart3,
    },
    {
      path: '/classroom-interaction',
      label: '课堂互动',
      icon: Users,
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="h-6 md:h-8 w-6 md:w-8" />
            <span className="text-sm md:text-xl font-bold">Hello AI 乡村教师助手</span>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all ${location.pathname === item.path ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-all ${location.pathname === item.path ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;