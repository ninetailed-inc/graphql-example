import { request, gql } from "graphql-request";
import { filterAndMapExperiences, mapAudiences } from "../lib/helpers";

const homepageContentQuery = gql`
  fragment SysId on Entry {
    sys {
      id
    }
    __typename
  }

  fragment HeroEntry on Hero {
    ...SysId
    internalName
  }

  fragment CtaEntry on Cta {
    ...SysId
    internalName
  }

  fragment NtExperienceFields on NtExperience {
    ...SysId
    ntName
    ntType
    ntConfig
    ntAudience {
      ntAudienceId
      ntName
    }
  }

  fragment NinetailedHero on Hero {
    ...HeroEntry
    ntExperiencesCollection(limit: 10) {
      items {
        ...NtExperienceFields
        ntVariantsCollection(limit: 10) {
          items {
            ...HeroEntry
            ...SysId
          }
        }
      }
    }
  }

  query NinetailedPageQuery($pageId: String!) {
    page(id: $pageId) {
      ...SysId
      sectionsCollection(limit: 10) {
        items {
          ...NinetailedHero
          ...CtaEntry
          ...SysId
        }
      }
    }
  }
`;

const allExperiencesQuery = gql`
  {
    # Change limit to get all
    ntExperienceCollection(limit: 20, preview: true) {
      items {
        sys {
          id
        }
        ntName
        ntConfig
        ntType
        ntAudience {
          ntAudienceId
          ntName
          ntDescription
        }
        ntDescription
        ntVariantsCollection(limit: 10) {
          items {
            ... on Entry {
              sys {
                id
              }
              __typename
            }
          }
        }
      }
    }
  }
`;

const allAudiencesQuery = gql`
  {
    ntAudienceCollection(limit: 100, preview: true) {
      items {
        ntAudienceId
        ntName
        ntDescription
      }
    }
  }
`;

export async function getContentfulPageData(pageId) {
  const data = await request({
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`,
    document: homepageContentQuery,
    variables: {
      pageId,
    },
    requestHeaders: {
      Authorization: `Bearer ${process.env.CTFL_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function getAllExperiences() {
  const rawExperiences = await request({
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`,
    requestHeaders: {
      Authorization: `Bearer ${process.env.CTFL_API_KEY}`,
      "Content-Type": "application/json",
    },
    document: allExperiencesQuery,
  });

  return filterAndMapExperiences(rawExperiences.ntExperienceCollection.items);
}

export async function getAllAudiences() {
  const rawAudiences = await request({
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`,
    requestHeaders: {
      Authorization: `Bearer ${process.env.CTFL_API_KEY}`,
      "Content-Type": "application/json",
    },
    document: allAudiencesQuery,
  });

  return mapAudiences(rawAudiences.ntAudienceCollection.items);
}
