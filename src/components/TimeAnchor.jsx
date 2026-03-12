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

  return (
    <div className="sticky top-16 bg-white z-10 py-2 overflow-x-auto border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-2 justify-between">
          {sections.map((section) =>
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex flex-col items-center px-3 py-2 rounded-md text-caption-md transition-colors flex-1 min-w-0 ${
            activeSection === section.id ?
            'bg-blue-100 text-blue-700' :
            'bg-gray-50 text-gray-600 hover:bg-gray-100'}`
            }>

              <span className="mb-1">
                {iconMap[section.id] || <Clock className="h-4 w-4" />}
              </span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis w-full text-[12px]">
                {section.title}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>);

};

export default TimeAnchor;
