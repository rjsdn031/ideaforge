import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>Kaca's IdeaForge</Link>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;