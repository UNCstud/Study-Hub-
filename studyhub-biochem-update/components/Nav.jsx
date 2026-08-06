'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const topLinks = [
  { href: '/', label: 'Home' },
  { href: '/game', label: '🩺 MedGuess' },
];

const educationLinks = [
  { href: '/mcat.html', label: 'MCAT' },
  { href: '/mcat/biochem-pathways', label: 'Biochem Pathways' },
  { href: '/biol240.html', label: 'BIOL 240' },
  { href: '/chem101.html', label: 'CHEM 101' },
  { href: '/chem101-quiz.html', label: 'CHEM 101 Quiz' },
  { href: '/chem101l.html', label: 'CHEM 101L' },
  { href: '/planner.html', label: 'Timeline' },
];

const endLinks = [
  { href: '/resources', label: '🛒 Resources' },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const educationActive = educationLinks.some(l => l.href === path);

  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">Med<span>Guess</span></Link>
      <div className="nav-links">
        {topLinks.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link ${path === l.href ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}

        <div className="nav-dropdown" ref={menuRef}>
          <button
            type="button"
            className={`nav-link nav-dropdown-trigger ${educationActive ? 'active' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
          >
            📚 Education
            <span className={`nav-dropdown-caret ${open ? 'open' : ''}`}>▾</span>
          </button>
          {open && (
            <div className="nav-dropdown-menu">
              {educationLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-dropdown-item ${path === l.href ? 'active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {endLinks.map(l => (
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
