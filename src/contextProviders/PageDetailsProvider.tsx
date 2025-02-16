import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

import { PageDetailsContextProps } from '@type/app.types';

const PageDetailsContext = createContext<PageDetailsContextProps | undefined>(undefined);

export const PageDetailsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  const [isFixedLayout, setIsFixedLayout] = useState<boolean>(false);

  const value = useMemo(() => ({ title, setTitle, isFixedLayout, setIsFixedLayout }), [
    title,
    setTitle,
    isFixedLayout,
    setIsFixedLayout,
  ]);

  return (
    <PageDetailsContext.Provider value={value}>
      {children}
    </PageDetailsContext.Provider>
  );
};

export const usePageDetails = (): PageDetailsContextProps => {
  const context = useContext(PageDetailsContext);
  if (!context) {
    throw new Error('usePageDetails must be used within a PageDetailsProvider');
  }
  return context;
};
