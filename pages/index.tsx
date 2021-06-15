import Head from "next/head";
import Image from "next/image";
import src from "../images/cover.jpeg";
import Users from "../components/Users";

export default function Home() {
    return (
        <main className="flex flex-col p-8">
            <Head>
                <title>User Profiles | dnrm</title>
                <meta property="og:title" content="Home | dnrm" />
                <meta
                    property="og:description"
                    content="Social media site by Daniel Medina"
                />
                <meta
                    property="og:image"
                    content="https://source.unsplash.com/random"
                />
            </Head>
            <header className="flex items-center justify-between">
                <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-10">
                    Welcome
                </h1>
                <div className="icons flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                    </svg>
                </div>
            </header>
            <section>
                <Image src={src} layout="responsive" />
            </section>
            <section id="users">
                <h1 className="text-4xl md:text-6xl lg:text-8xl tracking-tighter font-bold text-black pt-8 pb-2">
                    Users
                </h1>
                <hr />
                <Users />
            </section>
        </main>
    );
}
