import React from 'react';

const TimeAnchor = ({ sections, activeSection, onSectionChange }) => {
  // 卡片式导航 - 响应式优化
  const CardStyleNavigation = () => (
    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm font-medium ${
            activeSection === section.id
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  );

  return (
    <div className="sticky top-16 bg-white z-10 border-b border-gray-100 py-3">
      <div className="container mx-auto px-4">
        <CardStyleNavigation />
      </div>
    </div>
  );
};

export default TimeAnchor;
