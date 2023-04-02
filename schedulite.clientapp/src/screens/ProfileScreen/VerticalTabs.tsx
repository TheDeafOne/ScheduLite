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
      name: 'User Settings',
      content: <div> <Personal /> </div>
    },
    {
      name: 'Academic Info',
      content: <div> Academic Info </div>
    },
    {
      name: 'Appearance',
      content: <div> Appearance </div>
    },
    {
      name: 'Accessibility',
      content: <div> Accessibility </div>
    },
    {
      name: 'Keybinds',
      content: <div> Keybinds </div>
    },
    {
      name: 'Languages',
      content: <div> Languges </div>
    },
    {
      name: 'Advanced',
      content: <div> Advanced </div>
    }
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
