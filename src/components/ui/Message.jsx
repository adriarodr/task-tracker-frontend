export default function Message({ type, text }) {
  return <p className={`message ${type}`}>{text}</p>;
}
