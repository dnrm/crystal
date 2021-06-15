import React from "react";
import { useRouter } from "next/router";
import Head from 'next/head';

const User = () => {
    const router = useRouter();
    const { user } = router.query;

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Head>
                <title>{user} | dnrm</title>
                <meta name="description" content={`View ${user}'s profile!`} />
            </Head>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter">{user}</h1>
        </div>
    );
};

export default User;
