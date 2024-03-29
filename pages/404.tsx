import React from "react";
import Head from "next/head";
import Image from "next/legacy/image";
import src from "../images/trees.jpeg";

const NotFound = () => {
  return (
    <main className="flex flex-col p-8">
      <Head>
        <title>Not found | dnrm</title>
        <meta property="og:title" content="Not found | dnrm" />
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
          Page Not Found
        </h1>
      </header>
      <section>
        <Image alt="Not found" src={src} layout="responsive" />
      </section>
    </main>
  );
};

export default NotFound;
