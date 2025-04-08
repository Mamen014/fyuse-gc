'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import VirtualTryOnWrapper from '../components/VirtualTryOnWrapper';
import { useSession, signIn, signOut } from 'next-auth/react';

function AuthActionsInNavbar() {
  const { data: session, status } = useSession();

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
    signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') return null;

  if (status === 'authenticated') {
    const username = session.user?.name || session.user?.email;

    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-white whitespace-nowrap">Welcome, {username}</span>
        <Link href="/profile" passHref>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm px-5 py-2.5 rounded-full font-medium transition-all shadow-md">
            My Profile
          </button>
        </Link>
        <button
          onClick={handleSignOut}
          className="border border-indigo-500 text-indigo-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white text-sm px-5 py-2.5 rounded-full font-medium transition-all shadow-md"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm px-6 py-2.5 rounded-full font-medium transition-all shadow-md"
    >
      Sign In
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Navbar with improved spacing */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] z-50 shadow-md">
        <div className="container mx-auto px-8 py-5 flex justify-between items-center">
          <div className="bg-[#1a1a1a] rounded-full px-5 py-2.5 shadow-sm">
            <h1 className="text-xl font-bold text-white">FYUSE</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow transition hover:from-blue-700 hover:to-indigo-700">Home</a>
            <a href="/features" className="px-4 py-1.5 rounded-full text-sm font-medium text-white hover:text-purple-200 transition">Features</a>
            <a href="/about" className="px-4 py-1.5 rounded-full text-sm font-medium text-white hover:text-purple-200 transition">About</a>
            <a href="/contact" className="px-4 py-1.5 rounded-full text-sm font-medium text-white hover:text-purple-200 transition">Contact</a>
            <AuthActionsInNavbar />
          </div>
        </div>
      </nav>

      {/* Main content with improved spacing */}
      <main className="pt-24">
        {/* Hero section */}
        <section className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Try On Fashion <br className="hidden md:inline" /> With AI
            </h1>
            <p className="text-purple-100 text-lg max-w-lg">
              Upload your photo and see how different styles look on you instantly.
            </p>
            <Link href="#app" passHref>
              <button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-full text-lg font-medium shadow-lg transition-all">
                Upload & Try On Now 🚀
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0" id="app">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8">
              <VirtualTryOnWrapper />
            </div>
          </div>
        </section>

        {/* CTA section with improved spacing */}
        <section className="bg-[#1a1a2f] py-24 text-center px-8 mt-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Start Your Style Transformation Now</h2>
            <p className="text-purple-200 mb-10 max-w-2xl mx-auto">
              Be among the first to experience how AI can revolutionize how you try on clothes. It's fast, fun, and futuristic.
            </p>
            <button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg transition-all"
            >
              Join
            </button>
          </div>
        </section>
      </main>

      {/* Footer with improved spacing */}
      <footer className="bg-[#0f0c29] border-t border-gray-700 py-12 text-center text-purple-200 mt-16">
        <div className="container mx-auto px-8">
          <p>&copy; 2025 FYUSE. All rights reserved.</p>
          <div className="mt-6 flex justify-center gap-8">
            <a href="https://www.instagram.com/fyuse.id/" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}