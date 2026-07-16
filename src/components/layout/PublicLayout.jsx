import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

export default function PublicLayout({ onLogin }) {
  return (
    <main>
      <RegisterForm />
      <LoginForm onSuccess={onLogin} />
    </main>
  );
}
