import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
],
secret: process.env.NEXTAUTH_SECRET,

callbacks: {
async signIn({ user, account }) {
    if (account.provider === "google") {
    try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/social-login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
    }),
});

if (response.ok){
user.backendData = data;
return true;
} 
else {
const errorData = await response.json();
return `/login?error=RegistrationFailed`;
}} 
catch (err){
return `/login?error=ConnectionError`;
}
}
return true;
},

async redirect({ url, baseUrl }) {
return url.startsWith(baseUrl) ? url : baseUrl;
},
   async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.user = token.user;
        return session;
    },
  async jwt({ token, user }) {
        if (user && user.backendData){
         token.accessToken = user.backendData.token;
         token.user = user.backendData.user;  
        }
        return token;
    },
},

pages: {
signIn: '/login',
error: '/login',
},
session: {
strategy: "jwt",
},
});

export { handler as GET, handler as POST };