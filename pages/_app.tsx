import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "react-toast-notifications";
import { PostsWrapper } from "../context/posts";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <PostsWrapper>
        <ToastProvider>
          <Component {...pageProps} />
          <Toaster position={`top-right`} toastOptions={{ duration: 5000 }} />
        </ToastProvider>
      </PostsWrapper>
    </Provider>
  );
}
export default MyApp;
