import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { AnimateSharedLayout } from "framer-motion";
import { motion } from "framer-motion";
import { ToastProvider } from "react-toast-notifications";
import { PostsWrapper } from "../context/posts";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <PostsWrapper>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </PostsWrapper>
    </Provider>
  );
}
export default MyApp;
