import Hero from "@/components/Hero";
import { Experience } from "@ninetailed/experience.js-next";
import { ExperienceMapper } from "@ninetailed/experience.js-utils";

export default function Contentful({ pageData }) {
  return (
    <>
      {pageData.page.sectionsCollection.items.map((section) => {
        const experiences = section.ntExperiencesCollection.items.map(
          (experience) => {
            return {
              name: experience.ntName,
              type: experience.ntType,
              config: experience.ntConfig,
              ...(experience.ntAudience
                ? {
                    audience: {
                      id: experience.ntAudience.ntAudienceId,
                    },
                  }
                : {}),
              id: experience.sys.id,
              variants: experience.ntVariantsCollection.items.map((variant) => {
                return {
                  id: variant.sys.id,
                  ...variant,
                };
              }),
            };
          }
        );

        const mappedExperiences = experiences
          .filter(ExperienceMapper.isExperienceEntry)
          .map(ExperienceMapper.mapExperience);

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
