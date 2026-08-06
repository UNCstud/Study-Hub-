export const metadata = {
  title: 'Pre-Med Resources — MedGuess',
  description: 'Pre-med Notion dashboard template and resources for UNC pre-med students.',
};

const features = [
  { emoji: '📅', title: 'MCAT Study Tracker', desc: 'Log content review by section, track practice test scores, and flag weak areas.' },
  { emoji: '🏥', title: 'Shadowing & Clinical Hours Log', desc: 'Track physician shadowing and volunteer hours with auto-totals.' },
  { emoji: '🔬', title: 'Research Tracker', desc: 'Log lab hours, projects, and publications for your application.' },
  { emoji: '📋', title: 'Application Timeline', desc: 'AMCAS deadlines, school list tracker, secondary status, and interview tracker.' },
  { emoji: '📊', title: 'GPA Calculator', desc: 'Track semester and cumulative GPA across your pre-med courses.' },
  { emoji: '🗓️', title: 'Weekly Planner', desc: 'Balancing class, MCAT prep, research, and clinical hours — all in one view.' },
];

export default function ResourcesPage() {
  return (
    <main className="page-wrap">
      <div className="page-hero">
        <div className="eyebrow">Pre-Med Resources</div>
        <h1 className="page-title">Pre-Med Notion Dashboard</h1>
        <p className="page-subtitle">
          One Notion workspace to track your entire pre-med journey — built by a UNC Biology student who lives this every day.
        </p>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #182030 0%, #0f1f35 100%)', border: '1px solid var(--accent)', borderRadius: 12, padding: '36px 32px', marginBottom: 48, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>🗂️</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Available Now</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Pre-Med Master Dashboard</div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text2)', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
          Everything a pre-med student needs to stay organized, track progress, and hit med school deadlines — in one Notion template.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent2)' }}>$12</div>
          {/* Replace href with your actual Gumroad link */}
          <a href="https://gumroad.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '1rem', padding: '12px 28px' }}>
            Get the Template →
          </a>
        </div>
        <div style={{ marginTop: 12, fontSize: '0.72rem', color: 'var(--text3)' }}>
          Instant download · Notion template link · Works on free Notion plan
        </div>
      </div>

      <div className="section-label">What's Included</div>
      <div className="card-grid">
        {features.map(f => (
          <div key={f.title} className="card" style={{ cursor: 'default' }}>
            <span className="card-icon">{f.emoji}</span>
            <div className="card-title">{f.title}</div>
            <div className="card-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px 28px' }}>
        <div className="section-label">Why trust this?</div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.8 }}>
          Built by a UNC Chapel Hill Biology major navigating the pre-med journey right now. Every tracker, every deadline, every feature came from a real need — not a template copied off the internet. If you go to UNC or are pre-med anywhere, this dashboard was made for you.
        </p>
      </div>
    </main>
  );
}
