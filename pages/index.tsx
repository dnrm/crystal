import Head from "next/head";
import Image from "next/image";
import Users from "../components/Users";
import src from '../images/cover.jpg'
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/client";

export default function Home() {
    const [session] = useSession();

    return (
        <>
            <Navbar />
            <main className="flex flex-col p-4 md:p-8">
                <Head>
                    <title>Home | Crystal</title>
                    <meta property="og:title" content="Crystal | dnrm" />
                    <meta
                        property="og:description"
                        content="Crystal is a social media site by Daniel Medina"
                    />
                    <meta
                        property="og:image"
                        content="https://source.unsplash.com/random"
                    />
                    <script
                        src="https://kit.fontawesome.com/d465d5991c.js"
                        crossOrigin="anonymous"
                        defer={true}
                    ></script>
                </Head>
                <header className={`flex items-center justify-between`}>
                    <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
                        Welcome
                    </h1>
                    <div className="login flex items-center">
                        {!session && (
                            <Link href={`/dashboard`}>
                                <div className="flex items-center cursor-pointer">
                                    <p className="font-semibold tracking-tighter text-xl md:text-2xl">
                                        Login
                                    </p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 md:h-12 w-8 md:w-12 mx-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        )}
                    </div>
                </header>
                <section>
                    <Image
                        src={src}
                        alt="Cover image"
                        width="100"
                        height="50"
                        className="object-cover"
                        layout="responsive"
                        priority={true}
                        placeholder="blur"
                        blurDataURL={'/'}
                    />
                </section>
                <section id="users">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl tracking-tighter font-bold text-black pt-8 pb-2">
                        Users
                    </h1>
                    <hr />
                    <Users />
                </section>
            </main>
            <Footer />
        </>
    );
}
