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

const metabolicProcesses = [
  { num: 1, title: 'Glycolysis', location: 'Cytoplasm', summary: 'Glucose is split into 2 pyruvate. Net yield: 2 ATP, 2 NADH.' },
  { num: 2, title: 'Pyruvate Oxidation', location: 'Mitochondrial matrix', summary: 'Pyruvate is converted to acetyl-CoA, releasing 1 NADH and CO2 per pyruvate.' },
  { num: 3, title: 'Citric Acid Cycle', location: 'Mitochondrial matrix', summary: 'Acetyl-CoA is oxidized. Each turn yields 3 NADH, 1 FADH2, and 1 GTP/ATP.' },
  { num: 4, title: 'Electron Transport Chain', location: 'Inner mitochondrial membrane', summary: 'Electrons from NADH/FADH2 pass through complexes I–IV, pumping protons to build an electrochemical gradient.' },
  { num: 5, title: 'Oxidative Phosphorylation', location: 'Inner mitochondrial membrane', summary: 'The proton gradient drives ATP synthase, generating ~26–28 ATP per glucose.' },
  { num: 6, title: 'Gluconeogenesis', location: 'Liver (mainly)', summary: 'Glucose is synthesized from non-carbohydrate precursors like lactate, glycerol, and amino acids.' },
  { num: 7, title: 'Glycogenesis', location: 'Liver & muscle', summary: 'Excess glucose is stored as glycogen; stimulated by insulin.' },
  { num: 8, title: 'Glycogenolysis', location: 'Liver & muscle', summary: 'Glycogen is broken down into glucose-1-phosphate; stimulated by glucagon and epinephrine.' },
  { num: 9, title: 'Pentose Phosphate Pathway', location: 'Cytoplasm', summary: 'Generates NADPH and ribose-5-phosphate for biosynthesis; produces no ATP.' },
  { num: 10, title: 'Fatty Acid Synthesis', location: 'Cytoplasm', summary: 'Acetyl-CoA units are built into palmitate using NADPH (lipogenesis).' },
  { num: 11, title: 'Beta-Oxidation', location: 'Mitochondrial matrix', summary: 'Fatty acids are broken down into acetyl-CoA units, producing NADH and FADH2.' },
  { num: 12, title: 'Ketogenesis', location: 'Liver mitochondria', summary: 'Acetyl-CoA is converted into ketone bodies during fasting or low-glucose states.' },
  { num: 13, title: 'Urea Cycle', location: 'Liver', summary: 'Toxic ammonia from amino acid catabolism is converted into urea for excretion.' },
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

      <div className="section-label">Learning</div>
      <div className="page-hero" style={{ padding: '0 0 20px', textAlign: 'left' }}>
        <h2 className="page-title" style={{ fontSize: '1.4rem' }}>The 13 Core Metabolic Processes</h2>
        <p className="page-subtitle" style={{ margin: 0 }}>
          A high-yield map of energy metabolism for the Bio/Biochem section — from glycolysis through the urea cycle.
        </p>
      </div>
      <div className="card-grid">
        {metabolicProcesses.map(p => (
          <div key={p.title} className="card" style={{ cursor: 'default' }}>
            <span className="card-icon" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text3)' }}>{String(p.num).padStart(2, '0')}</span>
            <div className="card-title">{p.title}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text3)', marginTop: 2 }}>{p.location}</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: 8, lineHeight: 1.4 }}>{p.summary}</p>
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
