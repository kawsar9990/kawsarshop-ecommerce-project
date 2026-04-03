import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        }
      }
    })
  ],
callbacks: {
async redirect({ url, baseUrl}) {
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  else if (new URL(url).origin === baseUrl) return baseUrl;
  return baseUrl;
},

async signIn({ user, account }) {
if (account.provider === "google") {
try {
    const payload = {
    name: user.name,
    email: user.email,
    image: user.image,
    provider: "google"
};
 const response = await fetch("https://kawsarshop-ecommerce-backend.onrender.com/api/auth/social-login", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(payload),
 });

if (response.ok) {
  const data = await response.json();
  user._id = data.user.id || data.user._id; 
  user.backendData = data.user;
  return true;
}
return false;
} catch (err) {
return false;
 }
}
return true;
},
async jwt({ token, user }) {
  if (user) {
    token.user = user.backendData || user;
    token.sub = user._id || user.id;
}
return token;
},
async session({ session, token }) {
  if (token.user) {
    session.user = token.user;
    session.user._id = token.sub;
 }
return session;
}
},
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/', error: '/not-found' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };