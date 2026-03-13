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
        onClick={toggleExpanded}>

        <div className="flex items-center">
          <span className="text-blue-600 mr-2">{icon}</span>
          {/* 只有最后一个卡片的标题始终为红色，其他卡片标题始终为黑色 */}
          <h2 className={isLast ? "text-red-500" : "text-gray-900"}>最容易结"月子仇"的雷区</h2>
        </div>
        {expanded ?
        <ChevronUp className="h-5 w-5 text-gray-500" /> :

        <ChevronDown className="h-5 w-5 text-gray-500" />
        }
      </div>

      {expanded &&
      <div className="p-4 pt-0">
          <ul className="space-y-3">
            {items.map((item, index) =>
          <li key={index} className="border-b border-gray-100 pb-3 last:border-0 flex justify-center items-center flex-col">
                <div className="text-gray-800 flex">
                  {/* 删除了原来的内容，这里将根据mapIndex重新渲染 */}
                  {index === 0 ? null : (
                    <span className="text-body-md break-words text-left pl-0 font-bold w-[250px]">
                      {index === 1 && "1. 两人一起清点待产包，确认物品位置，你要知道每样东西在哪"}
                      {index === 2 && "2. 术前8小时禁食禁水，帮她记好时间"}
                      {index === 3 && "3. 给老婆做好心理建设，告诉她你会一直在外面等她"}
                      {index === 4 && "4. 月子里甩手不管，让老婆一个人带娃"}
                      {index === 5 && "5. 拒绝过度探视，让老婆精疲力竭应付亲戚"}
                    </span>
                  )}
                </div>
                {item.subItems &&
            <ul className="mt-2 ml-0 space-y-1">
                    {item.subItems.map((subItem, subIndex) =>
              <li key={subIndex} className="text-gray-600 flex justify-center items-center">
                      <span className="mr-1 w-[12px] text-[14px]">•</span>
                      <span className="break-words my-[5px] text-[14px] text-left w-full pl-0">{subItem}</span>
                    </li>
              )}
                  </ul>
            }
              </li>
          )}
          </ul>
        </div>
      }
    </div>);

};

export default CareGuideCard;
