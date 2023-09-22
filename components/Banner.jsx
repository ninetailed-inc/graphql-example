export default function Banner(props) {
  return (
    <div>
      <h1>{props.internalName}</h1>
      <h1>{props.headline}</h1>
    </div>
  );
}
