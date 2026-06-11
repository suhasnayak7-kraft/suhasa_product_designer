'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const path = usePathname();
  if (path?.startsWith('/admin')) return null;
  const current = (href) => (path === href ? 'page' : undefined);
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Suhasa Nayak — home">
          <img src="/logo.png" alt="Suhasa Nayak logo" />
        </Link>
        <ul className="nav-links">
          <li><Link href="/#work" aria-current={current('/#work')}>Work</Link></li>
          <li><Link href="/#about">About</Link></li>
          <li>
            <a href="/api/resume" target="_blank" rel="noopener" aria-label="Resume PDF (opens in new tab)">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
