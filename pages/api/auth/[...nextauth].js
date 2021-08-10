import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import * as Fauna from "faunadb";
import { FaunaAdapter } from "@next-auth/fauna-adapter";

const client = new Fauna.Client({
    secret: process.env.FAUNA || "",
});

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    adapter: FaunaAdapter({ faunaClient: client }),
});
