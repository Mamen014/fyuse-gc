'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

function AuthInitializer() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;

    const userData = {
      email: session.user.email,
      name: session.user.name || '',
      idToken: session.accessToken,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      profile: session.user,
    };

    const existing = localStorage.getItem('loggedInUser');
    if (!existing || JSON.stringify(userData) !== existing) {
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      console.log('✅ Auth user session stored in localStorage:', userData);
    }
  }, [session]);

  return null;
}

export default function GoogleAuthProvider({ children }) {
  return (
    <>
      <AuthInitializer />
      {children}
    </>
  );
}