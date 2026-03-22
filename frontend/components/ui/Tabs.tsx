'use client';

import { createContext, useContext, useState, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue>({ activeTab: '', setActiveTab: () => {} });

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
}

export function Tabs({ defaultValue, children, className = '', ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex gap-1 p-1 bg-white/5 rounded-lg border border-white/10 overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
        isActive ? 'text-navy' : 'text-gray-400 hover:text-white'
      } ${className}`}
    >
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute inset-0 bg-gold rounded-md"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, children, className = '', ...props }: TabsContentProps) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
