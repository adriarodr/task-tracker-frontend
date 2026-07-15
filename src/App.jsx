import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import TaskList from './components/TaskList';

import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <main>
      <RegisterForm />
      <LoginForm />

      <TaskList />

      <LogoutButton />
    </main>
  );
}

export default App;
