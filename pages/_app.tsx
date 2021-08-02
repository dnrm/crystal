import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { AnimateSharedLayout } from "framer-motion";
import { motion } from "framer-motion";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <Provider session={pageProps.session}>
            <ToastProvider>
                <Component {...pageProps} />
            </ToastProvider>
        </Provider>
    );
}
export default MyApp;
