import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>Kaca&apos;s IdeaForge</Link>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;