'use client';

import { UserProvider } from '@/Context/UserContext';
import { FormsProvider } from '@/Context/FormsContext';

export default function AppProviders({ children }) {
  return (
    <UserProvider>
      <FormsProvider>
        {children}
      </FormsProvider>
    </UserProvider>
  );
}
