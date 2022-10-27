import { Link, useLocation, useHistory } from 'react-router-dom';
import headerLogoPath from '../images/header-logo.svg';

function Header({ email }) {
  const path = useLocation();
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('token');
    history.push('/signin');
  }

  return (
    <header className="header">
      <img src={headerLogoPath} alt="Логотип место" className="header__logo" />

      {(path.pathname === '/signup') ? (
        <Link to='signin' className="header__link">Войти</Link>
      ) : (path.pathname === '/signin') ? (
        <Link to='signup' className="header__link">Регистрация</Link>
      ) : (path.pathname === '/') ? (
        <div className="header__cont">
          <p className="header__email">{email}</p>
          <button type="button" className="header__button" onClick={() => signOut()} >Выйти</button>
        </div>
      ) : null}

    </header>
  );
}

export default Header;