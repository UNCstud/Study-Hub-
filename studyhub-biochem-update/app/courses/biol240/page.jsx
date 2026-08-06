import Link from 'next/link';

export const metadata = {
  title: 'BIOL 240 — Genetics & Molecular Biology | MedGuess',
  description: 'UNC Chapel Hill BIOL 240 study guide. Genetics and molecular biology concepts, exam tips, and high-yield topics.',
};

const topics = [
  { title: 'DNA Structure & Replication', desc: 'Semiconservative replication, DNA polymerases, Okazaki fragments, proofreading mechanisms.' },
  { title: 'Gene Expression', desc: 'Transcription factors, RNA processing, splicing, translation, and post-translational modifications.' },
  { title: 'Mendelian Genetics', desc: "Dominance, segregation, independent assortment, chi-square analysis, pedigree interpretation." },
  { title: 'Molecular Cloning & Techniques', desc: 'Restriction enzymes, gel electrophoresis, PCR, Southern/Northern blotting, CRISPR.' },
  { title: 'Chromosomal Inheritance', desc: 'Sex-linked traits, linkage, recombination frequency, chromosome mapping.' },
  { title: 'Gene Regulation', desc: 'Operons in prokaryotes, enhancers/silencers in eukaryotes, epigenetic regulation.' },
  { title: 'Mutation & Repair', desc: 'Types of mutations, DNA damage, mismatch repair, nucleotide excision repair, BER.' },
  { title: 'Genomics & Bioinformatics', desc: 'Next-gen sequencing, genome assembly, BLAST, sequence alignment.' },
];

export default function Biol240Page() {
  return (
    <main className="page-wrap">
      <div className="page-hero">
        <div className="eyebrow">UNC Chapel Hill · Biology</div>
        <h1 className="page-title">BIOL 240</h1>
        <p className="page-subtitle">
          Genetics &amp; Molecular Biology. High-yield concepts, study guides, and exam tips built by a UNC bio major.
        </p>
      </div>

      <div className="section-label">High-Yield Topics</div>
      <div className="card-grid">
        {topics.map(t => (
          <div key={t.title} className="card" style={{ cursor: 'default' }}>
            <div className="card-title">{t.title} <span className="coming-soon-badge">Guide Coming</span></div>
            <div className="card-desc" style={{ marginTop: 8 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="notion-cta">
        <div className="notion-cta-text">
          <h3>🗂️ Pre-Med Notion Dashboard</h3>
          <p>Track BIOL 240 assignments, exams, and grades alongside your full pre-med journey.</p>
        </div>
        <Link href="/resources" className="btn btn-primary">Get the Template →</Link>
      </div>
    </main>
  );
}
