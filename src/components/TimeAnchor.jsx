import React from 'react';
import { Clock, Heart, User, Baby, AlertTriangle } from 'lucide-react';

const TimeAnchor = ({ sections, activeSection, onSectionChange }) => {
  // 为每个部分创建图标映射
  const iconMap = {
    before: <Clock className="h-4 w-4" />,
    day: <Heart className="h-4 w-4" />,
    hospital: <User className="h-4 w-4" />,
    home: <Baby className="h-4 w-4" />,
    warnings: <AlertTriangle className="h-4 w-4" />
  };

  // 方案1: 卡片式导航
  const CardStyleNavigation = () => (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
            activeSection === section.id
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <span className="mb-1 flex items-center justify-center w-8 h-8 rounded-full bg-current/20">
            {React.cloneElement(iconMap[section.id] || <Clock className="h-4 w-4" />, {
              className: "h-4 w-4 text-current"
            })}
          </span>
          <span className="whitespace-nowrap text-sm font-medium">
            {section.title}
          </span>
        </button>
      ))}
    </div>
  );

  // 方案2: 标签式导航
  const TabStyleNavigation = () => (
    <div className="flex space-x-1 overflow-x-auto bg-gray-100 p-1 rounded-lg">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 ${
            activeSection === section.id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="flex items-center justify-center w-5 h-5">
            {React.cloneElement(iconMap[section.id] || <Clock className="h-4 w-4" />, {
              className: "h-3.5 w-3.5 text-current"
            })}
          </span>
          <span className="whitespace-nowrap text-sm font-medium">
            {section.title}
          </span>
        </button>
      ))}
    </div>
  );

  // 方案3: 点状指示器导航
  const DotStyleNavigation = () => (
    <div className="flex justify-center space-x-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`flex items-center justify-center w-3 h-3 rounded-full transition-all duration-200 ${
            activeSection === section.id
              ? 'bg-blue-500 scale-125'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          title={section.title}
        >
          <span className="sr-only">{section.title}</span>
        </button>
      ))}
    </div>
  );

  // 当前使用方案2，可以根据需要切换为方案1或方案3
  return (
    <div className="sticky top-16 bg-white z-10 py-3 overflow-x-auto border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* <CardStyleNavigation /> */}
        <TabStyleNavigation />
        {/* <DotStyleNavigation /> */}
      </div>
    </div>
  );
};

export default TimeAnchor;
