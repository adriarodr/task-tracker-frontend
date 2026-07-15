import logoutIcon from '../assets/icons/log-in-out.svg';

export default function LogoutButton({ name }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <button className='btn logout-btn' onClick={handleLogout}>
      <img src={logoutIcon} alt='Log out Icon' /> Log out
    </button>
  );
}
