import React, { useState } from 'react';
import './VerticalTabs.css';
import Personal from './Personal';
import Languages from './Languages';
import Keybinds from './Keybinds';
import Appearance from './Appearance';
import Academic from './Academic';
import AcademicInfo from './Academic';
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
      content: <div> <AcademicInfo/> </div>
    },
    {
      name: 'Appearance',
      content: <div> <Appearance/> </div>
    },
    {
      name: 'Keybinds',
      content: <div> <Keybinds/> </div>
    },
    {
      name: 'Languages',
      content: <div>  <Languages />  </div>
    },{
      name: 'Accessibility',
      content: <h1 style={{ color: "white" }}>Accessibility</h1>
    },
    {
      name: 'Advanced',
      content: <h1 style={{ color: "white" }}>Advanced</h1>
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
