import { useNinetailed } from "@ninetailed/experience.js-next";
import Link from "next/link";

import {
  getAllAudiences,
  getAllExperiences,
  getHomepageData,
} from "@/api/contentful";
import { getContentstackPageData } from "@/api/contentstack";

import Contentful from "@/components/Contentful";
import Contentstack from "@/components/Contentstack";

export default function Home({ pageData }: { pageData: any }) {
  const { reset: resetProfile } = useNinetailed();
  return (
    <>
      <Link href="pricing">Click Me</Link>
      <Contentful pageData={pageData} />
      {/* <Contentstack pageData={pageData} /> */}
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
  const [pageData, allExperiences, allAudiences] = await Promise.all([
    getHomepageData(),
    getAllExperiences(),
    getAllAudiences(),
  ]);
  // const pageData = await getContentstackPageData();

  return {
    props: {
      pageData,
      allExperiences,
      allAudiences,
    },
    revalidate: 1, // Demo purposes only!
  };
}
