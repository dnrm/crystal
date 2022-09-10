import { getProviders, signIn } from "next-auth/react";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function SignIn({ providers }: any) {
  return (
    <>
      <Head>
        <title>Signin | Crystal</title>
      </Head>
      <Navbar />
      <main className="flex flex-col p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
            Sign In
          </h1>
        </div>
        <div className="providers mt-4">
          {Object.values(providers).map((provider: any) => (
            <div
              key={provider.name}
              className="shadow-xl bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer mt-1"
            >
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="w-full flex justify-start items-center gap-4 text-lg text-left p-5"
              >
                <img src="/google.png" className="h-10 w-10" alt="" />
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
