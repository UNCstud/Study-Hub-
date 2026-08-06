import Link from 'next/link';

export const metadata = {
  title: 'Biochem Pathways — MedGuess',
  description: 'Every high-yield MCAT biochemistry pathway in one place — carbohydrate, lipid, amino acid, and nucleotide metabolism plus the central dogma.',
};

const categories = [
  {
    id: 'carb',
    emoji: '🍬',
    title: 'Carbohydrate Metabolism',
    pathways: [
      { title: 'Glycolysis', location: 'Cytoplasm', keyEnzyme: 'Phosphofructokinase-1 (rate-limiting)', summary: 'Glucose → 2 pyruvate. Net yield: 2 ATP, 2 NADH. Occurs in every cell, aerobic or anaerobic.' },
      { title: 'Gluconeogenesis', location: 'Liver, kidney cortex', keyEnzyme: 'Fructose-1,6-bisphosphatase', summary: 'Builds glucose from lactate, glycerol, and glucogenic amino acids. Essentially reverse glycolysis with 3 bypass steps.' },
      { title: 'Glycogenesis', location: 'Liver & muscle', keyEnzyme: 'Glycogen synthase', summary: 'Stores excess glucose as glycogen. Stimulated by insulin after a meal.' },
      { title: 'Glycogenolysis', location: 'Liver & muscle', keyEnzyme: 'Glycogen phosphorylase', summary: 'Breaks glycogen into glucose-1-phosphate. Stimulated by glucagon and epinephrine during fasting or exercise.' },
      { title: 'Pentose Phosphate Pathway', location: 'Cytoplasm', keyEnzyme: 'Glucose-6-phosphate dehydrogenase', summary: 'Generates NADPH (for biosynthesis/antioxidant defense) and ribose-5-phosphate (for nucleotides). No ATP produced.' },
      { title: 'Cori Cycle', location: 'Muscle ↔ Liver', keyEnzyme: 'Lactate dehydrogenase', summary: 'Lactate from anaerobic muscle metabolism travels to the liver, is converted back to glucose, and returned to muscle.' },
    ],
  },
  {
    id: 'resp',
    emoji: '⚡',
    title: 'Cellular Respiration',
    pathways: [
      { title: 'Pyruvate Oxidation', location: 'Mitochondrial matrix', keyEnzyme: 'Pyruvate dehydrogenase complex', summary: 'Pyruvate → acetyl-CoA, releasing 1 NADH and 1 CO2 per pyruvate. Links glycolysis to the citric acid cycle.' },
      { title: 'Citric Acid Cycle', location: 'Mitochondrial matrix', keyEnzyme: 'Isocitrate dehydrogenase (rate-limiting)', summary: 'Oxidizes acetyl-CoA. Each turn yields 3 NADH, 1 FADH₂, 1 GTP/ATP, and 2 CO2.' },
      { title: 'Electron Transport Chain', location: 'Inner mitochondrial membrane', keyEnzyme: 'Complexes I–IV', summary: 'Electrons from NADH/FADH₂ pass down the chain, pumping protons into the intermembrane space to build an electrochemical gradient.' },
      { title: 'Oxidative Phosphorylation', location: 'Inner mitochondrial membrane', keyEnzyme: 'ATP synthase (Complex V)', summary: 'The proton gradient drives ATP synthase via chemiosmosis, generating roughly 26–28 ATP per glucose molecule.' },
    ],
  },
  {
    id: 'lipid',
    emoji: '🧈',
    title: 'Lipid Metabolism',
    pathways: [
      { title: 'Beta-Oxidation', location: 'Mitochondrial matrix', keyEnzyme: 'Carnitine acyltransferase I (transport into mitochondria)', summary: 'Fatty acids are broken down 2 carbons at a time into acetyl-CoA, generating NADH and FADH₂.' },
      { title: 'Fatty Acid Synthesis', location: 'Cytoplasm', keyEnzyme: 'Acetyl-CoA carboxylase (rate-limiting)', summary: 'Acetyl-CoA units are assembled into palmitate using NADPH from the pentose phosphate pathway. Stimulated by insulin.' },
      { title: 'Ketogenesis', location: 'Liver mitochondria', keyEnzyme: 'HMG-CoA synthase', summary: 'During fasting or low-glucose states, excess acetyl-CoA is converted into ketone bodies (acetoacetate, β-hydroxybutyrate) for use by the brain and muscle.' },
      { title: 'Ketolysis', location: 'Extrahepatic tissues (brain, muscle)', keyEnzyme: 'Succinyl-CoA:3-ketoacid CoA transferase', summary: 'Ketone bodies are converted back into acetyl-CoA to fuel the citric acid cycle. The liver cannot do this itself — it lacks this enzyme.' },
    ],
  },
  {
    id: 'amino',
    emoji: '🧪',
    title: 'Amino Acid & Nitrogen Metabolism',
    pathways: [
      { title: 'Transamination', location: 'Liver (mainly)', keyEnzyme: 'Aminotransferases (ALT, AST) — require vitamin B6', summary: 'Transfers an amino group from an amino acid to an alpha-keto acid, usually forming glutamate. Key first step in amino acid catabolism.' },
      { title: 'Oxidative Deamination', location: 'Liver mitochondria', keyEnzyme: 'Glutamate dehydrogenase', summary: 'Glutamate releases its amino group as free ammonia (NH3/NH4+), which feeds into the urea cycle.' },
      { title: 'Urea Cycle', location: 'Liver (mitochondria + cytoplasm)', keyEnzyme: 'Carbamoyl phosphate synthetase I (rate-limiting)', summary: 'Converts toxic ammonia into water-soluble urea for excretion by the kidneys. The only way the body disposes of excess nitrogen.' },
    ],
  },
  {
    id: 'nucleotide',
    emoji: '🧬',
    title: 'Nucleotide Metabolism',
    pathways: [
      { title: 'Purine Synthesis', location: 'Cytoplasm', keyEnzyme: 'PRPP synthetase', summary: 'Builds adenine and guanine nucleotides from scratch (de novo) using amino acids, CO2, and folate-derived carbons.' },
      { title: 'Pyrimidine Synthesis', location: 'Cytoplasm', keyEnzyme: 'Carbamoyl phosphate synthetase II', summary: 'Builds the pyrimidine ring first, then attaches ribose-5-phosphate — the opposite order from purine synthesis.' },
      { title: 'Purine Degradation', location: 'Liver', keyEnzyme: 'Xanthine oxidase', summary: 'Purines are broken down to uric acid. Excess uric acid crystallizes in joints, causing gout.' },
    ],
  },
  {
    id: 'central',
    emoji: '🧫',
    title: 'The Central Dogma',
    pathways: [
      { title: 'DNA Replication', location: 'Nucleus (eukaryotes)', keyEnzyme: 'DNA polymerase III (prokaryotes) / δ & ε (eukaryotes)', summary: 'Semiconservative copying of DNA. Leading strand synthesized continuously, lagging strand in Okazaki fragments, sealed by DNA ligase.' },
      { title: 'Transcription', location: 'Nucleus', keyEnzyme: 'RNA polymerase II (mRNA)', summary: 'DNA template is copied into pre-mRNA, which is then capped, polyadenylated, and spliced (introns removed) into mature mRNA.' },
      { title: 'Translation', location: 'Ribosome (cytoplasm/rough ER)', keyEnzyme: 'Aminoacyl-tRNA synthetase', summary: 'mRNA codons are read by tRNA anticodons to assemble a polypeptide chain — initiation, elongation, then termination at a stop codon.' },
      { title: 'Post-Translational Modification', location: 'Rough ER → Golgi', keyEnzyme: 'Various (glycosyltransferases, proteases, etc.)', summary: 'Proteins are folded, glycosylated, cleaved, or otherwise modified before reaching their final functional form.' },
    ],
  },
];

export default function BiochemPathwaysPage() {
  return (
    <main className="page-wrap">
      <div className="page-hero">
        <div className="eyebrow">MCAT · Bio/Biochem</div>
        <h1 className="page-title">Biochem Pathways</h1>
        <p className="page-subtitle">
          Every high-yield metabolic and molecular pathway tested on the MCAT — organized by category with location, key regulatory enzyme, and a quick summary for each.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
        {categories.map(c => (
          <a key={c.id} href={`#${c.id}`} className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '8px 14px' }}>
            {c.emoji} {c.title}
          </a>
        ))}
      </div>

      {categories.map(cat => (
        <div key={cat.id} id={cat.id} style={{ scrollMarginTop: 80 }}>
          <div className="section-label">{cat.emoji} {cat.title}</div>
          <div className="card-grid" style={{ marginBottom: 40 }}>
            {cat.pathways.map(p => (
              <div key={p.title} className="card" style={{ cursor: 'default' }}>
                <div className="card-title">{p.title}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent2)', marginTop: 2 }}>{p.location}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 6, fontFamily: 'var(--mono)' }}>
                  Key enzyme: {p.keyEnzyme}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: 10, lineHeight: 1.5 }}>{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="notion-cta">
        <div className="notion-cta-text">
          <h3>📖 Full MCAT Review</h3>
          <p>See all four MCAT sections and the 13 core metabolic processes in the main review hub.</p>
        </div>
        <Link href="/mcat" className="btn btn-primary">Back to MCAT Review →</Link>
      </div>
    </main>
  );
}
