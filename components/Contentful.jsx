import Banner from "@/components/Banner";
import { Experience } from "@ninetailed/experience.js-next";
import { filterAndMapExperiences } from "@/lib/helpers";

export default function Contentful({ pageData }) {
  const { banner } = pageData.pageLanding;
  const mappedExperiences = filterAndMapExperiences(
    banner.ntExperiencesCollection.items
  );
  return (
    <Experience
      {...banner}
      id={banner.sys.id}
      key={banner.sys.id}
      component={Banner}
      experiences={mappedExperiences}
    />
  );
}
