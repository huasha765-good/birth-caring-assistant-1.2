import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CareGuideCard = ({ title, icon, items }) => {
  const [expanded, setExpanded] = useState(true);
  const [completedItems, setCompletedItems] = useState(
    items.map(() => false)
  );

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleItemCompletion = (index) => {
    const newCompletedItems = [...completedItems];
    newCompletedItems[index] = !newCompletedItems[index];
    setCompletedItems(newCompletedItems);
  };

  return (
    <div className="apple-card overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <span className="text-blue-600 mr-2">{icon}</span>
          <h2 className="text-headline-sm text-gray-900">{title}</h2>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" /> 
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>

      {expanded && (
        <div className="p-4 pt-0">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div 
                  className="flex items-start cursor-pointer"
                  onClick={() => toggleItemCompletion(index)}
                >
                  <div className={`mt-1 mr-3 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    completedItems[index] ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {completedItems[index] && (
                      <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className={`${completedItems[index] ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    <span className="text-body-sm break-words">{item.text}</span>
                    {item.subItems && (
                      <ul className="mt-2 ml-5 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex} className="text-caption-lg text-gray-600 flex items-start">
                            <span className="mr-1">•</span>
                            <span className="break-words">{subItem}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareGuideCard;
