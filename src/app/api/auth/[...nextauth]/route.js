import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

          if (!res.ok) {
            throw new Error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
          }

          if(res.error){
            throw new Error(res.message)
          }

          const user = await res.json();
          return user; // ✅ แก้ไขการ return
        } catch (error) {
          console.log("🚀 ~ authorize ~ error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
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
