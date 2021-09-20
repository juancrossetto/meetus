import React, { FC, ReactNode } from 'react';
import SidebarWithHeader from './SidebarWithHeader';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <SidebarWithHeader>{children}</SidebarWithHeader>;
};

export default Layout;
