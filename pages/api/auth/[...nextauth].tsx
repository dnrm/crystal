import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
<<<<<<< HEAD
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: "/signin",
    },
=======
    ],
    jwt: {
        signingKey: process.env.JWT
        
    },
    pages: {
        signIn: "/signin",
    },
    callbacks: {},
    events: {
        
    }
>>>>>>> @feature/custom-auth
});
