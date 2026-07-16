import logoutIcon from '../assets/icons/log-in-out.svg';

export default function LogoutButton({ onLogout }) {
  return (
    <button className='btn logout-btn' onClick={onLogout}>
      <img src={logoutIcon} alt='' className='icon' /> Log out
    </button>
  );
}
