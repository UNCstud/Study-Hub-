import Link from 'next/link';

export const metadata = {
  title: 'Med School Timeline — MedGuess',
  description: 'Complete pre-med to medical school timeline. When to shadow, take the MCAT, apply, and what to do each year.',
};

const timeline = [
  {
    year: 'Freshman Year',
    tag: 'Year 1',
    color: '#3b82f6',
    items: [
      { month: 'Fall', text: 'Focus on GPA — organic chemistry and bio grades matter most to adcoms.' },
      { month: 'Spring', text: 'Join pre-med club, volunteer at a hospital or clinic. Start building hours early.' },
      { month: 'Year-Round', text: 'Find a research lab on campus. Even 5 hrs/week adds up significantly by senior year.' },
    ]
  },
  {
    year: 'Sophomore Year',
    tag: 'Year 2',
    color: '#10b981',
    items: [
      { month: 'Fall', text: 'Begin physician shadowing. Target 100+ hours total across specialties.' },
      { month: 'Spring', text: 'Take a diagnostic MCAT practice test to assess your baseline and plan your prep timeline.' },
      { month: 'Summer', text: 'Clinical internship or summer research program (SURF, REU programs). Excellent for letters of rec.' },
    ]
  },
  {
    year: 'Junior Year',
    tag: 'Year 3',
    color: '#f59e0b',
    items: [
      { month: 'Fall', text: 'Ask professors and physicians for letters of recommendation. Give them plenty of lead time.' },
      { month: 'Jan–Mar', text: 'Take the MCAT. Aim to have your score back before AMCAS opens in May.' },
      { month: 'May', text: 'AMCAS opens. Submit your primary application as early as possible — rolling admissions.' },
      { month: 'Summer', text: 'Complete secondaries quickly (within 2 weeks of receipt). Interviews begin in August.' },
    ]
  },
  {
    year: 'Senior Year',
    tag: 'Year 4',
    color: '#8b5cf6',
    items: [
      { month: 'Aug–Nov', text: 'Interview season. Prepare your "Why medicine?" story and school-specific answers.' },
      { month: 'Oct 15', text: 'AMCAS regular decision deadline for most schools.' },
      { month: 'Mar 15', text: 'Traffic Day — multiple acceptances must be narrowed to one school by this date.' },
      { month: 'May', text: 'Graduation 🎓. Med school starts in July or August.' },
    ]
  },
];

const keyNumbers = [
  { num: '510+', label: 'Target MCAT Score', sub: '(top ~75th percentile)' },
  { num: '3.7+', label: 'Target GPA', sub: 'science + cumulative' },
  { num: '100+', label: 'Shadowing Hours', sub: 'across 2+ specialties' },
  { num: '150+', label: 'Clinical Hours', sub: 'volunteer or paid' },
];

export default function TimelinePage() {
  return (
    <main className="page-wrap">
      <div className="page-hero">
        <div className="eyebrow">Pre-Med Roadmap</div>
        <h1 className="page-title">Med School Timeline</h1>
        <p className="page-subtitle">
          Everything you need to do, and when to do it — from freshman year through your first day of med school.
        </p>
      </div>

      <div className="section-label">Key Benchmarks</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 48 }}>
        {keyNumbers.map(k => (
          <div key={k.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{k.num}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{k.label}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="section-label">Year-by-Year Plan</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {timeline.map(y => (
          <div key={y.year} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: `${y.color}18`, borderBottom: `1px solid ${y.color}33`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', background: y.color, color: '#000', borderRadius: 4, padding: '2px 8px', fontWeight: 700 }}>{y.tag}</span>
              <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.95rem' }}>{y.year}</span>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {y.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: y.color, minWidth: 80, paddingTop: 2, fontWeight: 600 }}>{item.month}</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.6 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="notion-cta" style={{ marginTop: 48 }}>
        <div className="notion-cta-text">
          <h3>📅 Track Your Entire Journey</h3>
          <p>The pre-med Notion dashboard includes an application timeline tracker, shadowing log, MCAT prep planner, and more.</p>
        </div>
        <Link href="/resources" className="btn btn-primary">Get the Template →</Link>
      </div>
    </main>
  );
}
