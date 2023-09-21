import "@/styles/globals.css";
import { NinetailedProvider } from "@ninetailed/experience.js-next";
import NinetailedPreviewPlugin from "@ninetailed/experience.js-plugin-preview";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NinetailedProvider
      clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID || ""}
      plugins={[
        new NinetailedPreviewPlugin({
          experiences: pageProps.allExperiences || [],
          audiences: pageProps.allAudiences || [],
        }),
      ]}
    >
      <Component {...pageProps} />
    </NinetailedProvider>
  );
}
