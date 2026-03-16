import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CareGuideCard = ({ title, icon, items, isLast }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mtd-card overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center flex-1 min-w-0">
          <span className="text-blue-600 mr-2 flex-shrink-0">{icon}</span>
          <h2 className={`truncate ${isLast ? "text-blue-500" : "text-gray-900"}`}>
            {isLast ? "最容易结\"月子仇\"的雷区" : title}
          </h2>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0 ml-2" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 ml-2" />
        )}
      </div>

      {expanded && (
        <div className="p-4 pt-0">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="text-gray-800">
                  <span className="text-body-md break-words text-left block font-semibold">
                    {item.text}
                  </span>
                </div>
                {item.subItems && (
                  <ul className="mt-2 ml-4 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="text-gray-600 flex items-start">
                        <span className="mr-2 flex-shrink-0">•</span>
                        <span className="text-sm break-words text-left flex-1">
                          {subItem}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareGuideCard;
