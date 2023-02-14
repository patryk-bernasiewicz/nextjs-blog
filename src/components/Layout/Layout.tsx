import { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="layout">
    <main className="container max-w-[1024px] mx-auto">{children}</main>
  </div>
);

export default Layout;
