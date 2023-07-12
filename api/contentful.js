import { request, gql } from "graphql-request";

const query = gql`
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

export async function getContentfulPageData() {
  return request({
    url: "https://graphql.contentful.com/content/v1/spaces/cjvmtrvzlutl",
    requestHeaders: {
      Authorization: "Bearer MCMrmDnIMSBjFL2cAkHKb1Ke8_cjc7m77cmCSUKKHz4",
      "Content-Type": "application/json",
    },
    document: query,
  });
}
