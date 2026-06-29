import Link from 'next/link';

export const metadata = {
  title: 'CHEM 101L — General Chemistry Lab | MedGuess',
  description: 'UNC Chapel Hill CHEM 101L lab guide. Safety, techniques, data analysis, and exam prep for general chemistry lab.',
};

const labTopics = [
  { emoji: '🦺', title: 'Lab Safety', desc: 'PPE requirements, SDS sheets, chemical disposal, fire extinguisher use, eyewash stations, and emergency procedures.' },
  { emoji: '🧪', title: 'Measurement & Error', desc: 'Significant figures, accuracy vs precision, systematic vs random error, percent error calculations.' },
  { emoji: '⚖️', title: 'Titration Techniques', desc: 'Acid-base titrations, endpoint vs equivalence point, indicator selection, standardization of solutions.' },
  { emoji: '🌡️', title: 'Calorimetry', desc: 'Coffee cup calorimetry, heat of solution, heat of neutralization, specific heat calculations.' },
  { emoji: '💡', title: 'Spectrophotometry', desc: "Beer-Lambert law, absorbance vs transmittance, calibration curves, unknown concentration determination." },
  { emoji: '🔬', title: 'Qualitative Analysis', desc: 'Flame tests, cation/anion identification, precipitation reactions, systematic group analysis.' },
  { emoji: '📊', title: 'Data Analysis', desc: 'Graphing in Excel, linear regression, slope/intercept interpretation, statistical analysis.' },
  { emoji: '📝', title: 'Lab Reports', desc: 'Introduction, methods, results, discussion format. How to write a proper scientific conclusion.' },
];

export default function Chem101LPage() {
  return (
    <main className="page-wrap">
      <div className="page-hero">
        <div className="eyebrow">UNC Chapel Hill · Chemistry Lab</div>
        <h1 className="page-title">CHEM 101L</h1>
        <p className="page-subtitle">
          General Chemistry Lab I. Safety procedures, lab techniques, data analysis, and everything you need before your lab section.
        </p>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, padding: '14px 18px', marginBottom: 32, fontSize: '0.82rem', color: '#fbbf24' }}>
        ⚠️ Always review the lab procedure and safety sheet <strong>before</strong> attending lab. Labs cannot be made up without a valid excused absence.
      </div>

      <div className="section-label">Lab Topics & Techniques</div>
      <div className="card-grid">
        {labTopics.map(t => (
          <div key={t.title} className="card" style={{ cursor: 'default' }}>
            <span className="card-icon">{t.emoji}</span>
            <div className="card-title">{t.title} <span className="coming-soon-badge">Guide Coming</span></div>
            <div className="card-desc" style={{ marginTop: 6 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="notion-cta">
        <div className="notion-cta-text">
          <h3>🗂️ Pre-Med Notion Dashboard</h3>
          <p>Keep lab reports, pre-lab questions, and deadlines organized alongside your full course schedule.</p>
        </div>
        <Link href="/resources" className="btn btn-primary">Get the Template →</Link>
      </div>
    </main>
  );
}
