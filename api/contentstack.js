import { request, gql } from "graphql-request";

const query = gql`
  query {
    page(uid: "blt938d83019c86c2f8") {
      system {
        id: uid
      }
      sectionsConnection(limit: 1) {
        edges {
          node {
            ... on Hero {
              system {
                id: uid
              }
              title
              subheading
              nt_experiencesConnection(limit: 1) {
                edges {
                  node {
                    ... on NtExperience {
                      system {
                        id: uid
                      }
                      nt_name
                      nt_description
                      nt_audienceConnection {
                        edges {
                          node {
                            ... on NtAudience {
                              system {
                                id: uid
                              }
                              nt_name
                              nt_audience_id
                            }
                          }
                        }
                      }
                      nt_config
                      nt_type
                      nt_variantsConnection(limit: 1) {
                        edges {
                          node {
                            ... on Hero {
                              system {
                                id: uid
                              }
                              title
                              subheading
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getContentstackPageData() {
  return request({
    url: "https://graphql.contentstack.com/stacks/bltc506242f88e62402?environment=production",
    requestHeaders: {
      access_token: "cs7a9fb2df37341543a3327895",
      branch: "main",
    },
    document: query,
  });
}
