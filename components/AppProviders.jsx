'use client';

import { UserProvider } from '@/Context/UserContext';
import { FormsProvider } from '@/Context/FormsContext';
import { ProductProvider } from '@/Context/ProductContext';

export default function AppProviders({ children }) {
  return (
    <UserProvider>
      <FormsProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </FormsProvider>
    </UserProvider>
  );
}
