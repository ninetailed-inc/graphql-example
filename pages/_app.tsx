import "@/styles/globals.css";
import { NinetailedProvider } from "@ninetailed/experience.js-next";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NinetailedProvider clientId="40edeb83-8a84-432c-8c99-0e1327c50ff9">
      <Component {...pageProps} />
    </NinetailedProvider>
  );
}
