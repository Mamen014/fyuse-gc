'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import VirtualTryOnWrapper from '../components/VirtualTryOnWrapper';
import { useSession, signIn, signOut } from 'next-auth/react'; // Import useSession, signIn, and signOut

function AuthActionsInNavbar() {
  const { data: session, status } = useSession(); // Use useSession instead of useAuth

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      const userData = {
        email: session.user.email,
        name: session.user.name || '',
        idToken: session.accessToken,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        profile: session.user,
      };
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      console.log('✅ User session stored in localStorage', userData);
    }

    if (status !== 'authenticated') {
      localStorage.removeItem('loggedInUser');
    }
  }, [status, session]);

  const handleSignOut = () => {
    localStorage.removeItem('loggedInUser');
    sessionStorage.clear();
    signOut({ callbackUrl: '/' }); // Use signOut from next-auth/react
  };

  if (status === 'loading') return null; // Handle loading state

  if (status === 'authenticated') {
    const username = session.user?.name || session.user?.email;

    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-white whitespace-nowrap">Welcome, {username}</span>
        <Link href="/profile" passHref>
          <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded">
            My Profile
          </button>
        </Link>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => signIn('google')} // Use signIn from next-auth/react
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
      >
        Sign In
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] z-50 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="bg-[#1a1a1a] rounded-full px-4 py-2 shadow-sm">
            <h1 className="text-xl font-bold text-white">FYUSE</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-700 to-indigo-500 shadow transition">Home</a>
            <a href="/features" className="px-4 py-1 rounded-full text-sm font-medium text-white hover:text-purple-200 transition">Features</a>
            <a href="/about" className="px-4 py-1 rounded-full text-sm font-medium text-white hover:text-purple-200 transition">About</a>
            <a href="/contact" className="px-4 py-1 rounded-full text-sm font-medium text-white hover:text-purple-200 transition">Contact</a>
            <AuthActionsInNavbar />
          </div>
        </div>
      </nav>

      <main className="mt-10">
        <section className="pt-10 pb-8 container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Try On Fashion <br className="hidden md:block" /> With AI
            </h1>
            <p className="text-purple-100 text-lg">
              Upload your photo and see how different styles look on you instantly.
            </p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0" id="app">
            <VirtualTryOnWrapper />
          </div>
        </section>

        <section className="bg-[#1a1a2f] py-20 text-center px-6">
          <h2 className="text-4xl font-bold mb-4 text-white">Start Your Style Transformation Now</h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Be among the first to experience how AI can revolutionize how you try on clothes. It's fast, fun, and futuristic.
          </p>
          <Link href="#app" passHref>
            <button
              type="button"
              className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white px-6 py-3 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Upload & Try On Now 🚀
            </button>
          </Link>
        </section>
      </main>

      <footer className="bg-[#0f0c29] border-t border-gray-700 py-8 text-center text-purple-200">
        <p>&copy; 2025 FYUSE. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://www.instagram.com/fyuse.id/" className="hover:text-white">Instagram</a>
        </div>
      </footer>
    </div>
  );
}