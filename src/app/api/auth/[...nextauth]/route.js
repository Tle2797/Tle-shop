import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LineProvider from "next-auth/providers/line";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "login username/password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        try {
          // ค้นหา user จาก API login
          const res = await fetch("http://localhost:3080/api/authen/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });    
                
          const user = await res.json();
          if (user.error) {
            throw new Error(user.message);
          }
          

          
          return {
            id: user.id,
            email: user.email,
            name: user.full_name,
            role: user.role,
          }; // ✅ แก้ไขการ return
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("🚀 ~ signIn ~ email:", email)
      // console.log("🚀 ~ signIn ~ profile:", profile)
      // console.log("🚀 ~ signIn ~ account:", account)
      // console.log("🚀 ~ signIn ~ user:", user)

      // user.role = "customer";
      
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.type = "tester"
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // ✅ แก้จาก mexAge เป็น maxAge
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
