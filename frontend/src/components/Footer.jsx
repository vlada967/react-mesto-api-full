import { useLocation } from 'react-router-dom';

function Footer() {
  const path = useLocation();

  return (
    (path.pathname === '/') ? (
      <footer className="footer">
        <p className="footer__text">&copy; {new Date().getFullYear()} Mesto Russia</p>
      </footer>
    ) : null
  );
}

export default Footer;