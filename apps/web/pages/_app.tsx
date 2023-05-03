import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import { AuthProvider } from "../contexts/Auth";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/globals.css";
import { lightTheme } from "../themes/light-theme";
import Head from "next/head";
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
              <Toaster position="bottom-right" toastOptions={{}} />
            </ThemeProvider>
          </AuthProvider>
        </SWRConfig>
      </SessionProvider>
    </CacheProvider>
  );
}
