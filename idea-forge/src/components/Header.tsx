'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  onHeightChange?: (height: number) => void;
}

const Header = ({ onHeightChange }: HeaderProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false); // 아래로 스크롤
      } else {
        setShowHeader(true); // 위로 스크롤
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current && onHeightChange) {
        onHeightChange(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [onHeightChange]);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${showHeader ? styles.show : styles.hide}`}
    >
      <Link href="/" className={styles.logo}>
        <span className="hidden sm:inline">Kaca&apos;s IdeaForge</span>

        <svg
          className="sm:hidden"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M70 85H10V25H70V85Z" />
          <path d="M70 275H10V115H70V275Z" />
          <path d="M290 25L256.4 85H149.999V115H239.5L206 175H149.999V275H90.0029V175H90V115H90.0029V85H90V25H290Z" />
        </svg>
      </Link>

      <nav className={styles.nav}>
        <Link href="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;