import React, { useState } from 'react';
import './VerticalTabs.css';
import Personal from './Personal';
interface Tab {
  name: string;
  content: JSX.Element;
}

const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: Tab[] = [
    {
      name: 'Personal',
      content: <div> <Personal/> </div>
    },
    {
      name: 'Display',
      content: <div>This is the display tab content.</div>
    },
    {
      name: 'Previous Courses',
      content: <div>This is the previous courses tab content.</div>
    },
    {
      name: 'Advisor',
      content: <div>This is the advisor tab content.</div>
    },
  ];

  return (
    <div className="vertical-tabs">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default VerticalTabs;
