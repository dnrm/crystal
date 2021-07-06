import { getProviders, signIn } from "next-auth/client";
import Navbar from "../components/Navbar";

export default function SignIn({ providers }: any) {
    return (
        <>
        <Navbar />
            <main className="flex flex-col p-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-8xl lg:text-9xl tracking-tighter font-bold text-black py-5">
                        Sign In
                    </h1>
                </div>
                <div className="providers mt-4">
                    {Object.values(providers).map((provider: any) => (
                        <div key={provider.name} className="shadow-lg rounded-md hover:bg-blue-300 hover:text-white cursor-pointer mt-1">
                            <button
                                onClick={() =>
                                    signIn(provider.id, { callbackUrl: "/" })
                                }

                                className="w-full text-left p-5"
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}
