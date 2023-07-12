import Hero from "@/components/Hero";
import { Experience } from "@ninetailed/experience.js-next";
import { ExperienceMapper } from "@ninetailed/experience.js-utils";

export default function Contentstack({ pageData }) {
  return (
    <>
      {pageData.page.sectionsConnection.edges.map(({ node: sectionNode }) => {
        const experiences = sectionNode.nt_experiencesConnection.edges.map(
          ({ node: experienceNode }) => {
            return {
              name: experienceNode.nt_name,
              type: experienceNode.nt_type,
              config: experienceNode.nt_config,
              ...(experienceNode.nt_audienceConnection
                ? {
                    audience: {
                      id: experienceNode.nt_audienceConnection.edges[0].node
                        .nt_audience_id,
                    },
                  }
                : {}),
              id: experienceNode.system.id,
              variants: experienceNode.nt_variantsConnection.edges.map(
                ({ node: variantNode }) => {
                  return {
                    id: variantNode.system.id,
                    ...variantNode,
                  };
                }
              ),
            };
          }
        );

        const mappedExperiences = experiences
          .filter(ExperienceMapper.isExperienceEntry)
          .map(ExperienceMapper.mapExperience);

        return (
          <Experience
            {...sectionNode}
            key={sectionNode.system.id}
            id={sectionNode.system.id}
            component={Hero}
            experiences={mappedExperiences}
          />
        );
      })}
    </>
  );
}
