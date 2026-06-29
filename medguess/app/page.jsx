import Link from 'next/link';

export default function Home() {
  return (
    <main className="page-wrap">
      <section className="page-hero">
        <div className="eyebrow">Pre-Med Study Hub · UNC Chapel Hill</div>
        <h1 className="page-title">Study smarter.<br />Diagnose faster.</h1>
        <p className="page-subtitle">
          Clinical games, MCAT prep, UNC course resources, and your full med school roadmap — all in one place.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Link href="/game" className="btn btn-primary">Play MedGuess →</Link>
          <Link href="/timeline" className="btn btn-outline">Med School Timeline</Link>
        </div>
      </section>

      <div className="section-label">Tools & Resources</div>
      <div className="card-grid">
        <Link href="/game" className="card">
          <span className="card-icon">🩺</span>
          <div className="card-title">MedGuess</div>
          <div className="card-desc">Guess the diagnosis from real clinical cases with labs, vitals, and imaging. A new case every day.</div>
          <span className="card-tag">Daily Game</span>
        </Link>

        <Link href="/mcat" className="card">
          <span className="card-icon">📖</span>
          <div className="card-title">MCAT Review</div>
          <div className="card-desc">Flashcard-style concept review across Bio/Biochem, Chem/Physics, Psych, and CARS.</div>
          <span className="card-tag">Coming Soon</span>
        </Link>

        <Link href="/courses/biol240" className="card">
          <span className="card-icon">🧬</span>
          <div className="card-title">BIOL 240</div>
          <div className="card-desc">Genetics & Molecular Biology. UNC-specific study guides, concept sheets, and exam tips.</div>
          <span className="card-tag">UNC Course</span>
        </Link>

        <Link href="/courses/chem101" className="card">
          <span className="card-icon">⚗️</span>
          <div className="card-title">CHEM 101 / 102</div>
          <div className="card-desc">General Chemistry I & II. Formulas, reaction types, and problem sets tailored to UNC exams.</div>
          <span className="card-tag">UNC Course</span>
        </Link>

        <Link href="/courses/chem101l" className="card">
          <span className="card-icon">🔬</span>
          <div className="card-title">CHEM 101L</div>
          <div className="card-desc">Lab techniques, safety, and data analysis — everything you need before your lab section.</div>
          <span className="card-tag">UNC Course</span>
        </Link>

        <Link href="/timeline" className="card">
          <span className="card-icon">📅</span>
          <div className="card-title">Med School Timeline</div>
          <div className="card-desc">When to shadow, when to take the MCAT, AMCAS deadlines, and everything in between.</div>
          <span className="card-tag">Roadmap</span>
        </Link>
      </div>

      <div className="notion-cta">
        <div className="notion-cta-text">
          <h3>🗂️ Pre-Med Notion Dashboard</h3>
          <p>Track shadowing hours, MCAT prep, applications, GPA, and your full pre-med journey in one Notion workspace.</p>
        </div>
        <Link href="/resources" className="btn btn-primary">Get the Template →</Link>
      </div>
    </main>
  );
}
