export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Adrian Rodriguez. All Rights Reserved.</p>
    </footer>
  );
}
