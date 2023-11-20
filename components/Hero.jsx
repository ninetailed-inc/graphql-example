export default function Hero(props) {
  return (
    <div>
      <h1>{props.internalName ?? null}</h1>
    </div>
  );
}
