import Hero from "@/components/Hero";
import { Experience } from "@ninetailed/experience.js-next";
import { filterAndMapExperiences } from "@/lib/helpers";

export default function Contentful({ pageData }) {
  return (
    <>
      {pageData.page.sectionsCollection.items.map((section) => {
        const mappedExperiences = filterAndMapExperiences(
          section.ntExperiencesCollection.items
        );

        return (
          <Experience
            {...section}
            id={section.sys.id}
            key={section.sys.id}
            component={Hero}
            experiences={mappedExperiences}
          />
        );
      })}
    </>
  );
}
