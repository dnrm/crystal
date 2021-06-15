import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <ul className="flex p-4 justify-start px-8 py-5">
                <li className="px-2">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="px-2">
                    <Link href="/dashboard">
                        <a>Dashboard</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
