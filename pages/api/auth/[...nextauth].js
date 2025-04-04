import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this matches your .env file
  session: {
    strategy: 'jwt', // Use JWT-based sessions
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Add custom claims to the token
        token.accessToken = account.access_token;
        token.userId = account.providerAccountId; // Add any other custom data here
      }

      return token; // Return the token as an object (do not sign it manually)
    },
    async session({ session, token }) {
      // Attach the access token and other custom data to the session
      session.user.accessToken = token.accessToken;
      session.user.userId = token.userId; // Attach custom claims

      return session;
    },
  },
});