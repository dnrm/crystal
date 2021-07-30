import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";

const Post: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const title =
        typeof id === "string"
            ? id
                  ?.split("-")
                  .map((i) => i[0].toUpperCase() + i.substr(1, i.length))
                  .join(" ")
            : null;

    return (
        <div>
            <Head>
                {/* @ts-ignore */}
                <title>
                    { title } | Crystal
                </title>
            </Head>
            <Navbar />
            <main className="flex flex-col p-4 md:p-8 border-t-2 border-gray-300">
                <div className="image h-48">
                    <img
                        src="https://source.unsplash.com/random?nature"
                        className="h-full w-full object-cover"
                        alt=""
                    />
                </div>
                <header className="px-0 md:px-16 pt-0 md:pt-4 flex items-center justify-center">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl tracking-tighter font-bold text-black py-5 max-w-4xl">
                        {/* @ts-ignore */}
                        { title }
                    </h1>
                </header>
                <section
                    id="post-container"
                    className="px-0 md:px-16 w-full flex justify-center items-center"
                >
                    <div className="max-w-4xl">
                        <p className="py-2">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Dolores expedita, praesentium, officiis
                            aliquid laboriosam laudantium minus voluptatem,
                            placeat ut quaerat ullam minima odit eius dolor
                            commodi? Iste voluptatibus possimus maiores?
                            Expedita earum omnis quis ex aut nostrum, vitae
                            beatae! Inventore magni dolorum nemo exercitationem
                            obcaecati voluptates nobis sint beatae eaque et,
                            quam provident voluptatum quidem qui ea, quibusdam
                            id expedita? Dolore animi sunt labore possimus
                            repudiandae similique corrupti qui placeat aut fuga
                            ex iure odit fugiat illum, quisquam totam optio,
                            provident perferendis suscipit facere. Ipsum nisi
                            magnam modi aliquid debitis?
                        </p>
                        <p className="py-2">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Dolores expedita, praesentium, officiis
                            aliquid laboriosam laudantium minus voluptatem,
                            placeat ut quaerat ullam minima odit eius dolor
                            commodi? Iste voluptatibus possimus maiores?
                            Expedita earum omnis quis ex aut nostrum, vitae
                            beatae! Inventore magni dolorum nemo exercitationem
                            obcaecati voluptates nobis sint beatae eaque et,
                            quam provident voluptatum quidem qui ea, quibusdam
                            id expedita? Dolore animi sunt labore possimus
                            repudiandae similique corrupti qui placeat aut fuga
                            ex iure odit fugiat illum, quisquam totam optio,
                            provident perferendis suscipit facere. Ipsum nisi
                            magnam modi aliquid debitis?
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Post;
