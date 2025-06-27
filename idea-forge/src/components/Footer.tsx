'use client';

import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.banners}>
        <a href="https://github.com/rjsdn031">github</a>
        <a href="https://example.com">CV</a>
      </div>
      <p>© {new Date().getFullYear()} Geonwoo Choi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;