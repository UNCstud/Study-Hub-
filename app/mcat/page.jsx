import Link from 'next/link';

export const metadata = {
  title: 'MCAT Review — MedGuess',
  description: 'MCAT concept review for pre-med students. Bio/Biochem, Chem/Physics, Psych, and CARS.',
};

const sections = [
  { emoji: '🧬', title: 'Bio/Biochem', topics: ['Molecular Biology', 'Cell Biology', 'Genetics', 'Metabolism', 'Enzyme Kinetics', 'DNA Replication & Repair'] },
  { emoji: '⚗️', title: 'Chem/Physics', topics: ['Atomic Structure', 'Thermodynamics', 'Electrochemistry', 'Optics & Waves', 'Fluids', 'Acid-Base Chemistry'] },
  { emoji: '🧠', title: 'Psych/Soc', topics: ['Sensation & Perception', 'Memory & Learning', 'Social Behavior', 'Research Methods', 'Personality Theories', 'Health & Stress'] },
  { emoji: '📝', title: 'CARS', topics: ['Active Reading', 'Inference Questions', 'Tone & Purpose', 'Passage Mapping', 'Humanities Passages', 'Social Science Passages'] },
];

export default function MCATPage() {
  return (
    <main className="page-wrap">
      <div className="page-hero">
        <div className="eyebrow">MCAT Prep</div>
        <h1 className="page-title">MCAT Review</h1>
        <p className="page-subtitle">
          Concept-by-concept review across all four MCAT sections. Flashcards, quick-reference sheets, and high-yield topics coming soon.
        </p>
      </div>

      <div className="section-label">Sections</div>
      <div className="card-grid">
        {sections.map(s => (
          <div key={s.title} className="card" style={{ cursor: 'default' }}>
            <span className="card-icon">{s.emoji}</span>
            <div className="card-title">{s.title} <span className="coming-soon-badge">Coming Soon</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 }}>
              {s.topics.map(t => (
                <div key={t} style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--border)' }}>—</span> {t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="notion-cta">
        <div className="notion-cta-text">
          <h3>📅 MCAT Study Tracker</h3>
          <p>Track your content review, practice test scores, and weak areas with the pre-med Notion dashboard.</p>
        </div>
        <Link href="/resources" className="btn btn-primary">Get the Template →</Link>
      </div>
    </main>
  );
}
