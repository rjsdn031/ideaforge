'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  onHeightChange?: (height: number) => void;
}

const Header = ({ onHeightChange }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);

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
    <header ref={headerRef} className={styles.header}>
      <Link href="/" className={styles.logo}>Kaca&apos;s IdeaForge</Link>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;