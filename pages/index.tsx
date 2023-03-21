import { request, gql } from "graphql-request";
import { Experience, useNinetailed } from "@ninetailed/experience.js-next";
import Section from "@/components/Section";
import { ExperienceMapper } from "@ninetailed/experience.js-utils";
import Link from "next/link";

export default function Home({ pageData }) {
  const { reset: resetProfile } = useNinetailed();
  return (
    <>
      <Link href="pricing">Click Me</Link>
      {pageData.page.sectionsCollection.items.map((section) => {
        const experiences = section.ntExperiencesCollection.items
          .map((experience) => {
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
          })
          .filter(ExperienceMapper.isExperienceEntry)
          .map(ExperienceMapper.mapExperience);

        console.log(`Experiences:${JSON.stringify(experiences, null, 2)}`);

        return (
          <Experience
            {...section}
            key={section.sys.id}
            id={section.sys.id}
            component={Section}
            experiences={experiences}
          />
        );
      })}
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

  async function getPageData() {
    return request({
      url: "https://graphql.contentful.com/content/v1/spaces/cjvmtrvzlutl",
      requestHeaders: {
        Authorization: "Bearer MCMrmDnIMSBjFL2cAkHKb1Ke8_cjc7m77cmCSUKKHz4",
        "Content-Type": "application/json",
      },
      document: query,
    });
  }

  const pageData = await getPageData();

  console.log(JSON.stringify(pageData, null, 2));

  return {
    props: {
      pageData,
    },
    revalidate: 1, // Demo purposes only!
  };
}
