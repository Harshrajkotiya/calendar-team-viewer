// components/Tabs.tsx
import React from 'react';

interface TabsProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  tabs: string[];
}

const Tabs: React.FC<TabsProps> = ({ currentTab, setCurrentTab, tabs }) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-2 rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-1 text-sm font-medium transition-all rounded-lg whitespace-nowrap ${
            currentTab === tab ? 'bg-[#FAFAFA] shadow text-[#232529]' : 'text-[#667085] hover:text-black'
          }`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
