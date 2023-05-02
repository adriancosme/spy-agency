import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { AuthProvider } from "../contexts/Auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes/light-theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
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
  );
}
