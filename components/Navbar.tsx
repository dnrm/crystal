import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/fonts.module.css";
import { useSession } from "next-auth/react";
import { useUserContext } from "../context/user";

const Navbar = () => {
  const { data: session, status } = useSession();

  let user = useUserContext();

  console.log(user);

  return (
    <nav>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ul className="h-22 flex p-4 md:px-8 py-5 justify-between items-center">
        <div className="flex">
          <li className="px-1 md:px-2 tracking-tighter">
            <Link href="/">
              <a className={`${styles.mono} text-lg font-normal`}>Home</a>
            </Link>
          </li>
          <li className="px-1 md:px-2 tracking-tighter">
            <Link href="/dashboard">
              <a className={`${styles.mono} text-lg font-normal`}>Dashboard</a>
            </Link>
          </li>
        </div>
        {session && (
          <Link href={`/account`}>
            <a className="flex flex-row justify-between items-center">
              {/* @ts-ignore */}
              <p className="text-sm text-gray-500 filter drop-shadow-xl hidden md:block">
                {/* @ts-ignore */}
                {session.user.name ? session.user.name : session.user.email}
              </p>
              <img
                // @ts-ignore
                src={session.user.image}
                // @ts-ignore
                alt={session.user?.name}
                className="rounded-full w-12 h-12 ml-4 shadow-2xl"
              />
            </a>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
