import React from 'react'
import clsx from 'clsx'

type TabOption = {
    name: string;
    value: string;
};

interface TabOptionsProps {
    options: TabOption[];
    currentTab: string;
    onTabChange: (value: string) => void;
}

const TabOptions: React.FC<TabOptionsProps> = ({options, currentTab, onTabChange}) => {
  return (
    <ul className="flex gap-2 w-max mb-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {options.map((item, key) => {
          return (
            <li key={key} onClick={() => onTabChange(item.value)}>
              <p
                className={clsx(
                  "inline-block p-4 cursor-pointer",
                  {
                    "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500":
                      currentTab == item.value,
                  },
                  {
                    "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300":
                      currentTab != item.value,
                  }
                )}
              >
                {item.name}
              </p>
            </li>
          );
        })}
      </ul>
  )
}

export default TabOptions