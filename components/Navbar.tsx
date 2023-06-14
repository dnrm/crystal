/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav>
      <ul className="h-22 flex p-4 md:px-8 py-5 justify-between items-center text-gray-700 font-sauce">
        <div className="flex">
          <li className="px-1 md:px-2 tracking-tighter">
            <Link href="/" legacyBehavior>
              <a className={`text-base font-medium`}>Home</a>
            </Link>
          </li>
          <li className="px-1 md:px-2 tracking-tighter">
            <Link href="/dashboard" legacyBehavior>
              <a className={`text-base font-medium`}>Dashboard</a>
            </Link>
          </li>
          <li className="px-1 md:px-2 tracking-tighter">
            <Link href="/create-post" legacyBehavior>
              <a className={`text-base font-medium`}>Publish</a>
            </Link>
          </li>
        </div>
        {session && (
          <Link href={`/account`} legacyBehavior>
            <a className="flex flex-row justify-between items-center">
              {/* @ts-ignore */}
              <p className="text-sm filter drop-shadow-xl hidden md:block">
                {/* @ts-ignore */}
                {session.user.name ? session.user.name : session.user.email}
              </p>
              <img
                // @ts-ignore
                src={session.user.image}
                // @ts-ignore
                alt={"image"}
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
