'use client';

import { UserProvider } from '@/dataContext/UserContext';
import { FormsProvider } from '@/dataContext/FormsContext';

export default function AppProviders({ children }) {
  return (
    <UserProvider>
      <FormsProvider>
        {children}
      </FormsProvider>
    </UserProvider>
  );
}
