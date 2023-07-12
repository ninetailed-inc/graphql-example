import { useNinetailed } from "@ninetailed/experience.js-next";
import Link from "next/link";

import { getContentfulPageData } from "@/api/contentful";
import { getContentstackPageData } from "@/api/contentstack";

import Contentful from "@/components/Contentful";
import Contentstack from "@/components/Contentstack";

export default function Home({
  pageData,
  source,
}: {
  pageData: any;
  source: "contentful" | "contentstack";
}) {
  const { reset: resetProfile } = useNinetailed();
  return (
    <>
      <Link href="pricing">Click Me</Link>
      {/* <Contentful pageData={pageData} /> */}
      <Contentstack pageData={pageData} />
      <button
        style={{ marginTop: "1em", padding: "0.5em" }}
        onClick={() => {
          resetProfile();
        }}
      >
        Reset
      </button>
    </>
  );
}

export async function getStaticProps() {
  // const pageData = await getContentfulPageData();
  const pageData = await getContentstackPageData();

  return {
    props: {
      pageData,
      // source: "contentful",
      // source: "contentstack",
    },
    revalidate: 1, // Demo purposes only!
  };
}
