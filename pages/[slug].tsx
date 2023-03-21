import Link from "next/link";

export default function Page(props) {
  return (
    <>
      <Link href="/">Click Me</Link>
      <p style={{ fontSize: "2em" }}>
        Hey, thanks for visiting the <b>{props.params.slug}</b> page
      </p>
    </>
  );
}

export function getStaticProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { slug: "about" } }, { params: { slug: "pricing" } }],
    fallback: false,
  };
}
