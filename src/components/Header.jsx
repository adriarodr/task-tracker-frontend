import LogoutButton from './LogoutButton';

export default function Header({ onLogout, token }) {
  return (
    <header>
      <h1>Task Tracker</h1>

      {token && <LogoutButton onLogout={onLogout} />}
    </header>
  );
}
