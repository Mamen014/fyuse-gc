// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Log environment variables for debugging
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
console.log('NEXT_PUBLIC_GOOGLE_CLIENT_ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
console.log('NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET);

export default NextAuth({
  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],

  // Use a secret for signing cookies and tokens
  secret: process.env.NEXTAUTH_SECRET,

  // Use JWT-based sessions
  session: {
    strategy: 'jwt',
  },

  // Custom callbacks for handling JWT and session data
  callbacks: {
    async jwt({ token, account }) {
      try {
        // Add custom claims to the token if an account is present
        if (account) {
          console.log('JWT Callback - Account:', account);
          token.accessToken = account.access_token;
          token.userId = account.providerAccountId; // Add any other custom data here
        }
        return token;
      } catch (err) {
        console.error('JWT Callback Error:', err);
        throw err; // Rethrow the error to prevent silent failures
      }
    },

    async session({ session, token }) {
      try {
        // Attach custom claims to the session
        if (!session.user) {
          session.user = {}; // Ensure session.user exists
        }
        session.user.accessToken = token.accessToken;
        session.user.userId = token.userId; // Attach custom claims

        console.log('Session Callback - Session:', session);
        return session;
      } catch (err) {
        console.error('Session Callback Error:', err);
        throw err; // Rethrow the error to prevent silent failures
      }
    },
  },

  // Optional: Add debug logging for development
  debug: process.env.NODE_ENV !== 'production',
});