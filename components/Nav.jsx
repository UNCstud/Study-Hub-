'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/game', label: '🩺 MedGuess' },
  { href: '/mcat.html', label: 'MCAT' },
  { href: '/biol240.html', label: 'BIOL 240' },
  { href: '/chem101.html', label: 'CHEM 101' },
  { href: '/chem101-quiz.html', label: 'CHEM 101 Quiz' },
  { href: '/chem101l.html', label: 'CHEM 101L' },
  { href: '/planner.html', label: 'Timeline' },
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
