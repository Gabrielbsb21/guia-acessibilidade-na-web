import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { IChildren } from '@/interfaces/IChildren';

export const Layout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
