import { request, gql } from "graphql-request";
import { filterAndMapExperiences, mapAudiences } from "../lib/helpers";

const homepageContentQuery = gql`
  fragment SysId on Entry {
    sys {
      id
    }
  }

  fragment SectionFields on Section {
    ...SysId
    title
    subheading
  }

  fragment NtExperienceFields on NtExperience {
    ...SysId
    ntName
    ntType
    ntConfig
    ntAudience {
      ntAudienceId
    }
  }

  query {
    page(id: "6FBbwAY8QDXL8MtWNZ2RbT") {
      ...SysId
      sectionsCollection(limit: 10) {
        items {
          ...SectionFields
          ntExperiencesCollection(limit: 10) {
            items {
              ...NtExperienceFields
              ntVariantsCollection(limit: 10) {
                items {
                  ...SectionFields
                }
              }
            }
          }
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
            # This might work to get all IDs without having to define each variant content type
            ... on Entry {
              sys {
                id
              }
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

export async function getHomepageData() {
  return request({
    url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CTFL_SPACE_ID}`,
    requestHeaders: {
      Authorization: `Bearer ${process.env.CTFL_API_KEY}`,
      "Content-Type": "application/json",
    },
    document: homepageContentQuery,
  });
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
