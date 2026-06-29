'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/game', label: '🩺 MedGuess' },
  { href: '/mcat', label: 'MCAT' },
  { href: '/courses/biol240', label: 'BIOL 240' },
  { href: '/courses/chem101', label: 'CHEM 101' },
  { href: '/courses/chem102', label: 'CHEM 102' },
  { href: '/courses/chem101l', label: 'CHEM 101L' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/resources', label: '🛒 Resources' },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">Med<span>Guess</span></Link>
      <div className="nav-links">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link ${path === l.href ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
