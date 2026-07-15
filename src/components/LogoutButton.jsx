import logoutIcon from '../assets/icons/log-in-out.svg';

export default function LogoutButton({ onLogout }) {
  return (
    <button className='btn logout-btn' onClick={onLogout}>
      <img src={logoutIcon} alt='Log out Icon' /> Log out
    </button>
  );
}
