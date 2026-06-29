import Link from 'next/link';

export const metadata = {
  title: 'CHEM 101 / 102 — General Chemistry | MedGuess',
  description: 'UNC Chapel Hill CHEM 101 and CHEM 102 study guides. General chemistry concepts, formulas, and exam prep.',
};

const chem101Topics = [
  { title: 'Atomic Structure', desc: 'Quantum numbers, electron configurations, periodic trends in atomic radius, ionization energy, electronegativity.' },
  { title: 'Chemical Bonding', desc: 'Ionic vs covalent bonds, VSEPR theory, molecular geometry, Lewis structures, resonance.' },
  { title: 'Stoichiometry', desc: 'Molar mass, limiting reagents, percent yield, empirical vs molecular formulas.' },
  { title: 'Gas Laws', desc: 'Ideal gas law, Dalton\'s law of partial pressures, kinetic molecular theory, real gases.' },
  { title: 'Thermochemistry', desc: 'Enthalpy, Hess\'s law, calorimetry, standard heats of formation.' },
  { title: 'Solutions', desc: 'Molarity, colligative properties, solubility rules, dissolution thermodynamics.' },
];

const chem102Topics = [
  { title: 'Kinetics', desc: 'Rate laws, reaction order, integrated rate laws, Arrhenius equation, reaction mechanisms.' },
  { title: 'Equilibrium', desc: 'K expressions, Le Chatelier\'s principle, ICE tables, reaction quotient Q.' },
  { title: 'Acid-Base Chemistry', desc: 'Ka/Kb, pH calculations, buffers, Henderson-Hasselbalch, titrations.' },
  { title: 'Electrochemistry', desc: 'Oxidation states, galvanic cells, Nernst equation, electrolysis, standard reduction potentials.' },
  { title: 'Thermodynamics', desc: 'Entropy, Gibbs free energy, spontaneity, relationship between ΔG°, Keq, and E°cell.' },
  { title: 'Nuclear Chemistry', desc: 'Radioactive decay types, half-life calculations, binding energy, nuclear reactions.' },
];

export default function Chem101Page() {
  return (
    <main className="page-wrap">
      <div className="page-hero">
        <div className="eyebrow">UNC Chapel Hill · Chemistry</div>
        <h1 className="page-title">CHEM 101 / 102</h1>
        <p className="page-subtitle">
          General Chemistry I &amp; II. High-yield formulas, concept sheets, and exam tips for UNC students.
        </p>
      </div>

      <div className="section-label">CHEM 101 — General Chemistry I</div>
      <div className="card-grid">
        {chem101Topics.map(t => (
          <div key={t.title} className="card" style={{ cursor: 'default' }}>
            <div className="card-title">{t.title} <span className="coming-soon-badge">Guide Coming</span></div>
            <div className="card-desc" style={{ marginTop: 8 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="section-label" style={{ marginTop: 40 }}>CHEM 102 — General Chemistry II</div>
      <div className="card-grid">
        {chem102Topics.map(t => (
          <div key={t.title} className="card" style={{ cursor: 'default' }}>
            <div className="card-title">{t.title} <span className="coming-soon-badge">Guide Coming</span></div>
            <div className="card-desc" style={{ marginTop: 8 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="notion-cta">
        <div className="notion-cta-text">
          <h3>🗂️ Pre-Med Notion Dashboard</h3>
          <p>Track chemistry exams, problem sets, and lab reports alongside your full pre-med schedule.</p>
        </div>
        <Link href="/resources" className="btn btn-primary">Get the Template →</Link>
      </div>
    </main>
  );
}
