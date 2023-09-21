import { ExperienceMapper } from "@ninetailed/experience.js-utils";
export function parseExperience(experience) {
  return {
    name: experience.ntName,
    type: experience.ntType,
    config: experience.ntConfig,
    ...(experience.ntAudience
      ? {
          audience: {
            id: experience.ntAudience.ntAudienceId,
            name: experience.ntAudience.ntName,
          },
        }
      : {}),
    description: experience.description ?? "",
    id: experience.sys.id,
    variants: experience.ntVariantsCollection.items.map((variant) => {
      return {
        id: variant.sys.id,
        ...variant,
      };
    }),
  };
}

export function filterAndMapExperiences(experiences) {
  return experiences
    .map((experience) => parseExperience(experience))
    .filter(ExperienceMapper.isExperienceEntry)
    .map(ExperienceMapper.mapExperience);
}

export function parseAudience(audience) {
  return {
    id: audience.ntAudienceId,
    name: audience.ntName,
    description: audience.ntDescription ?? "",
  };
}

export function mapAudiences(audiences) {
  return audiences.map((audience) => parseAudience(audience));
}
