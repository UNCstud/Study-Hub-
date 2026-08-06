import Link from 'next/link';

export const metadata = {
  title: 'Biochem Pathways — MedGuess',
  description: 'Exam-depth MCAT biochemistry pathway reference — every metabolic pathway, its regulation, key enzymes, and high-yield traps, organized by category.',
};

const categories = [
  {
    id: 'carb',
    emoji: '🍬',
    title: 'Carbohydrate Metabolism',
    pathways: [
      {
        title: 'Glycolysis',
        location: 'Cytoplasm, all cells',
        keyEnzyme: 'Phosphofructokinase-1 (PFK-1)',
        regulation: 'PFK-1 activated by AMP & fructose-2,6-bisphosphate; inhibited by ATP & citrate. Hexokinase inhibited by its product, G6P.',
        summary: 'Glucose → 2 pyruvate. Net yield: 2 ATP, 2 NADH per glucose (substrate-level phosphorylation only).',
        tip: 'Glucokinase (liver) has a high Km and is NOT inhibited by G6P — this lets the liver keep taking up glucose even when blood sugar is high. A classic trap on Km/Vmax questions.',
      },
      {
        title: 'Gluconeogenesis',
        location: 'Liver, kidney cortex',
        keyEnzyme: 'Fructose-1,6-bisphosphatase',
        regulation: 'Activated by glucagon, cortisol; inhibited by fructose-2,6-bisphosphate & AMP. Reciprocally regulated with glycolysis.',
        summary: 'Builds glucose from lactate, glycerol, and glucogenic amino acids using 3 irreversible bypass reactions around glycolysis\'s committed steps.',
        tip: 'Fatty acids CANNOT be used for gluconeogenesis — acetyl-CoA cannot be net-converted to pyruvate (both carbons are lost as CO2 in the citric acid cycle).',
      },
      {
        title: 'Glycogenesis',
        location: 'Liver & skeletal muscle',
        keyEnzyme: 'Glycogen synthase',
        regulation: 'Activated by insulin (via dephosphorylation/activation of glycogen synthase). Inhibited by glucagon & epinephrine.',
        summary: 'Glucose-1-P is activated to UDP-glucose, then added to a growing glycogen chain; branching enzyme creates α-1,6 branch points.',
        tip: 'Insulin and glucagon/epinephrine act through OPPOSITE phosphorylation states on the same enzymes — a phosphorylated glycogen synthase is inactive, but a phosphorylated glycogen phosphorylase is active.',
      },
      {
        title: 'Glycogenolysis',
        location: 'Liver & skeletal muscle',
        keyEnzyme: 'Glycogen phosphorylase',
        regulation: 'Activated by glucagon (liver) and epinephrine (liver & muscle) via PKA-mediated phosphorylation; also activated by AMP and Ca²⁺ in muscle.',
        summary: 'Cleaves glucose-1-phosphate off glycogen; debranching enzyme removes α-1,6 branch points.',
        tip: 'Only the liver can release free glucose into the blood (has glucose-6-phosphatase). Muscle glycogen stays in muscle — it lacks this enzyme and uses G6P internally for glycolysis.',
      },
      {
        title: 'Pentose Phosphate Pathway',
        location: 'Cytoplasm',
        keyEnzyme: 'Glucose-6-phosphate dehydrogenase (G6PD, rate-limiting)',
        regulation: 'Activated by NADP⁺ availability (i.e., when NADPH is being consumed); inhibited by NADPH itself.',
        summary: 'Oxidative phase generates NADPH + ribulose-5-P; non-oxidative phase interconverts sugars to make ribose-5-P for nucleotide synthesis. Produces zero ATP.',
        tip: 'G6PD deficiency (X-linked) leaves red blood cells without enough NADPH to regenerate reduced glutathione, causing oxidative hemolysis — classically triggered by fava beans or antimalarial drugs.',
      },
      {
        title: 'Fructose & Galactose Metabolism',
        location: 'Liver (mainly)',
        keyEnzyme: 'Fructokinase; Galactose-1-P uridyltransferase (GALT)',
        regulation: 'Fructose bypasses PFK-1 entirely, entering glycolysis downstream — this is why fructose metabolism is largely unregulated.',
        summary: 'Fructose is converted to fructose-1-P then split into DHAP and glyceraldehyde; galactose is converted to glucose-1-P via the Leloir pathway.',
        tip: 'Classic MCAT genetic disease pairing: essential fructosuria (fructokinase deficiency, benign) vs. hereditary fructose intolerance (aldolase B deficiency, severe) vs. classic galactosemia (GALT deficiency, causes cataracts & liver damage).',
      },
      {
        title: 'Cori Cycle',
        location: 'Muscle ↔ Liver',
        keyEnzyme: 'Lactate dehydrogenase',
        regulation: 'Driven by anaerobic conditions in muscle (high NADH/NAD⁺ ratio favors pyruvate → lactate).',
        summary: 'Lactate produced during anaerobic exercise travels to the liver, is oxidized back to pyruvate, and converted to glucose via gluconeogenesis, which returns to muscle.',
        tip: 'This cycle costs the liver net ATP — it\'s shifting the energetic burden from muscle to liver, not creating energy.',
      },
    ],
  },
  {
    id: 'resp',
    emoji: '⚡',
    title: 'Cellular Respiration',
    pathways: [
      {
        title: 'Pyruvate Oxidation',
        location: 'Mitochondrial matrix',
        keyEnzyme: 'Pyruvate dehydrogenase complex (PDC)',
        regulation: 'Inhibited by its own products (acetyl-CoA, NADH) and by ATP; activated by ADP, Ca²⁺. Requires 5 cofactors: TPP, lipoic acid, CoA, FAD, NAD⁺.',
        summary: 'Pyruvate → acetyl-CoA, releasing 1 NADH and 1 CO2 per pyruvate. Irreversible — links glycolysis to the citric acid cycle.',
        tip: 'PDC deficiency and arsenic poisoning both disable this step by targeting lipoic acid — high-yield biochemistry-meets-toxicology crossover.',
      },
      {
        title: 'Citric Acid Cycle',
        location: 'Mitochondrial matrix',
        keyEnzyme: 'Isocitrate dehydrogenase (rate-limiting)',
        regulation: 'Isocitrate dehydrogenase activated by ADP, Ca²⁺; inhibited by ATP, NADH. Also regulated at citrate synthase and α-ketoglutarate dehydrogenase.',
        summary: 'Each turn oxidizes one acetyl-CoA, yielding 3 NADH, 1 FADH₂, 1 GTP/ATP, and 2 CO2. Runs twice per glucose (once per pyruvate).',
        tip: 'Succinate dehydrogenase is the only CAC enzyme embedded in the inner mitochondrial membrane — it doubles as Complex II of the ETC, directly linking the two pathways.',
      },
      {
        title: 'Electron Transport Chain',
        location: 'Inner mitochondrial membrane',
        keyEnzyme: 'Complexes I–IV',
        regulation: 'Rate is controlled by ADP availability (chemiosmotic coupling) — the "acceptor control" that links ETC speed to actual energy demand.',
        summary: 'Electrons from NADH (Complex I) and FADH₂ (Complex II) pass down the chain to O2, pumping protons at Complexes I, III, and IV to build the proton-motive force.',
        tip: 'Cyanide and CO block Complex IV; uncouplers like 2,4-DNP (and brown fat\'s thermogenin/UCP1) let protons leak back without making ATP — energy is released as heat instead.',
      },
      {
        title: 'Oxidative Phosphorylation',
        location: 'Inner mitochondrial membrane',
        keyEnzyme: 'ATP synthase (Complex V)',
        regulation: 'Chemiosmotic — driven entirely by the proton gradient generated by the ETC.',
        summary: 'Protons flow back through ATP synthase down their gradient, driving rotation that catalyzes ADP + Pi → ATP. Generates roughly 26–28 ATP per glucose in total.',
        tip: 'Oligomycin blocks ATP synthase directly (backs up the whole gradient and stops the ETC too), which is mechanistically distinct from an uncoupler — a favorite MCAT distinction.',
      },
    ],
  },
  {
    id: 'lipid',
    emoji: '🧈',
    title: 'Lipid Metabolism',
    pathways: [
      {
        title: 'Beta-Oxidation',
        location: 'Mitochondrial matrix',
        keyEnzyme: 'Carnitine acyltransferase I (rate-limiting, controls entry into mitochondria)',
        regulation: 'CAT-I inhibited by malonyl-CoA — the same molecule that signals active fatty acid synthesis, preventing the two pathways from running simultaneously (futile cycle prevention).',
        summary: 'Each cycle removes 2 carbons as acetyl-CoA, generating 1 NADH and 1 FADH₂. An 16-carbon fatty acid yields 8 acetyl-CoA after 7 cycles.',
        tip: 'Odd-chain fatty acids leave a 3-carbon propionyl-CoA at the end, which is converted to succinyl-CoA (needs B12 & biotin) and enters the CAC — the only way fat can contribute (indirectly) to glucose.',
      },
      {
        title: 'Fatty Acid Synthesis',
        location: 'Cytoplasm',
        keyEnzyme: 'Acetyl-CoA carboxylase (rate-limiting)',
        regulation: 'Activated by insulin & citrate (allosteric activator); inhibited by glucagon, epinephrine, and its own product palmitoyl-CoA.',
        summary: 'Citrate shuttles acetyl-CoA out of the mitochondria to the cytoplasm; malonyl-CoA units are added 2 carbons at a time using NADPH, building palmitate.',
        tip: 'NADPH for this pathway comes from the pentose phosphate pathway AND the citrate shuttle (via malic enzyme) — know both sources.',
      },
      {
        title: 'Ketogenesis',
        location: 'Liver mitochondria only',
        keyEnzyme: 'HMG-CoA synthase',
        regulation: 'Driven by high glucagon/low insulin states (starvation, prolonged exercise, untreated type 1 diabetes) that flood the liver with acetyl-CoA faster than the CAC can process it.',
        summary: 'Excess acetyl-CoA is converted into acetoacetate and β-hydroxybutyrate to fuel extrahepatic tissues, especially the brain, during fasting.',
        tip: 'Diabetic ketoacidosis is the classic pathologic version of this — unregulated lipolysis + ketogenesis from absolute insulin deficiency, producing an anion-gap metabolic acidosis.',
      },
      {
        title: 'Ketolysis',
        location: 'Extrahepatic tissue (brain, heart, muscle)',
        keyEnzyme: 'Succinyl-CoA:3-ketoacid CoA transferase (thiophorase)',
        regulation: 'Simply follows ketone body availability — no major hormonal control of its own.',
        summary: 'Ketone bodies are reconverted to acetyl-CoA to fuel the CAC in tissues that can use them.',
        tip: 'The liver makes ketones but can\'t use them — it lacks thiophorase. This forces the liver to export ketones for everyone else, a frequently tested asymmetry.',
      },
      {
        title: 'Cholesterol Synthesis',
        location: 'Cytoplasm/ER, mainly liver',
        keyEnzyme: 'HMG-CoA reductase (rate-limiting)',
        regulation: 'Inhibited by cholesterol itself (feedback) and by statins (drug class); activated by insulin.',
        summary: 'Acetyl-CoA is built up through mevalonate into cholesterol, the precursor for steroid hormones, bile acids, and vitamin D.',
        tip: 'Statins competitively inhibit HMG-CoA reductase — same enzyme family/logic as the rate-limiting steps you\'ll see tested elsewhere in metabolism, a useful pattern to recognize.',
      },
      {
        title: 'Lipoprotein Transport',
        location: 'Bloodstream',
        keyEnzyme: 'Lipoprotein lipase (capillary endothelium)',
        regulation: 'LPL activity induced by insulin in adipose tissue; apolipoproteins (ApoB-100, ApoC-II, ApoE) direct receptor recognition and enzyme activation.',
        summary: 'Chylomicrons carry dietary fat from intestine; VLDL carries liver-made triglycerides; LDL delivers cholesterol to tissues; HDL returns excess cholesterol to the liver ("reverse cholesterol transport").',
        tip: 'Remember it as: chylomicrons = dietary fat, VLDL = endogenous fat, LDL = "bad" (delivers cholesterol, drives atherosclerosis), HDL = "good" (removes it).',
      },
    ],
  },
  {
    id: 'amino',
    emoji: '🧪',
    title: 'Amino Acid & Nitrogen Metabolism',
    pathways: [
      {
        title: 'Transamination',
        location: 'Liver (mainly), all tissues',
        keyEnzyme: 'Aminotransferases (ALT, AST) — require pyridoxal phosphate (vitamin B6)',
        regulation: 'Near-equilibrium reactions; direction depends on substrate/product concentrations, not allosteric control.',
        summary: 'Transfers an amino group from an amino acid to an alpha-keto acid (usually alpha-ketoglutarate), forming glutamate and a new keto acid.',
        tip: 'Elevated ALT/AST in blood work signals hepatocyte damage — ALT is more liver-specific, AST is also found in heart/muscle.',
      },
      {
        title: 'Oxidative Deamination',
        location: 'Liver mitochondria',
        keyEnzyme: 'Glutamate dehydrogenase',
        regulation: 'Activated by ADP; inhibited by ATP and GTP — links nitrogen disposal to the cell\'s energy state.',
        summary: 'Glutamate releases its amino group as free ammonia (NH3/NH4+), which feeds directly into the urea cycle as a nitrogen source.',
        tip: 'This is one of the few enzymes that can use either NAD⁺ or NADP⁺ as a cofactor — a detail sometimes tested directly.',
      },
      {
        title: 'Urea Cycle',
        location: 'Liver (mitochondria + cytoplasm, spans both)',
        keyEnzyme: 'Carbamoyl phosphate synthetase I (rate-limiting)',
        regulation: 'CPS-I activated by N-acetylglutamate, which itself rises with amino acid intake — a way of upregulating nitrogen disposal after a protein-rich meal.',
        summary: 'Combines ammonia + CO2 + aspartate\'s nitrogen into urea across 5 steps, using both the mitochondria (first 2 steps) and cytoplasm (last 3).',
        tip: 'Urea cycle enzyme deficiencies cause hyperammonemia; ornithine transcarbamylase (OTC) deficiency is the most common and the only X-linked one — high-yield genetics crossover.',
      },
      {
        title: 'One-Carbon Metabolism',
        location: 'Cytoplasm/mitochondria',
        keyEnzyme: 'Methionine synthase (needs B12); Methylenetetrahydrofolate reductase',
        regulation: 'Folate (B9) carries one-carbon units; B12 is required to regenerate methionine from homocysteine and to remove folate from its "trapped" methyl form.',
        summary: 'Shuttles single-carbon groups for purine/thymidine synthesis and methylation reactions (e.g., converting homocysteine back to methionine).',
        tip: 'B12 or folate deficiency both cause megaloblastic anemia by impairing DNA synthesis, but only B12 deficiency causes neurologic symptoms (subacute combined degeneration) — a classic differentiator.',
      },
    ],
  },
  {
    id: 'nucleotide',
    emoji: '🧬',
    title: 'Nucleotide Metabolism',
    pathways: [
      {
        title: 'Purine Synthesis (de novo)',
        location: 'Cytoplasm',
        keyEnzyme: 'PRPP synthetase; Glutamine-PRPP amidotransferase (rate-limiting)',
        regulation: 'Feedback inhibited by the final purine nucleotides (AMP, GMP, IMP) on the amidotransferase step.',
        summary: 'Builds the purine ring atom-by-atom directly onto ribose-5-phosphate, using glycine, aspartate, glutamine, and folate-derived carbons.',
        tip: 'Unlike pyrimidines, purines are built ON the ribose sugar from the start — the ring never exists as a free base first.',
      },
      {
        title: 'Pyrimidine Synthesis (de novo)',
        location: 'Cytoplasm',
        keyEnzyme: 'Carbamoyl phosphate synthetase II (cytoplasmic, distinct from CPS-I of the urea cycle)',
        regulation: 'Feedback inhibited by UTP; activated by PRPP and ATP.',
        summary: 'Builds the pyrimidine ring first as orotate, then attaches ribose-5-phosphate afterward — the reverse order from purine synthesis.',
        tip: 'CPS-I (urea cycle, mitochondrial) vs. CPS-II (pyrimidine synthesis, cytoplasmic) is a frequently confused pair — different locations, different regulators, different purposes.',
      },
      {
        title: 'Purine Degradation',
        location: 'Liver',
        keyEnzyme: 'Xanthine oxidase',
        regulation: 'Inhibited pharmacologically by allopurinol (gout treatment).',
        summary: 'Purines are broken down through hypoxanthine and xanthine to uric acid, which is excreted by the kidneys.',
        tip: 'Excess uric acid crystallizes as needle-shaped, negatively birefringent crystals in joints (gout) — contrast with the rhomboid, positively birefringent crystals of pseudogout (calcium pyrophosphate).',
      },
      {
        title: 'Nucleotide Salvage',
        location: 'Cytoplasm, most tissues',
        keyEnzyme: 'HGPRT (hypoxanthine-guanine phosphoribosyltransferase)',
        regulation: 'Energetically cheaper than de novo synthesis — cells prefer salvage when free bases are available.',
        summary: 'Recycles free purine bases (from normal turnover) back into nucleotides instead of building them from scratch.',
        tip: 'Complete HGPRT deficiency causes Lesch-Nyhan syndrome — excess purine degradation to uric acid plus self-mutilating behavior, a distinctive board-exam pairing.',
      },
    ],
  },
  {
    id: 'heme',
    emoji: '🩸',
    title: 'Heme Metabolism',
    pathways: [
      {
        title: 'Heme Synthesis',
        location: 'Mitochondria + cytoplasm (alternating), mainly liver & bone marrow',
        keyEnzyme: 'ALA synthase (rate-limiting, needs vitamin B6)',
        regulation: 'ALA synthase inhibited by heme itself (negative feedback) and induced by drugs that upregulate cytochrome P450 (e.g., barbiturates, alcohol).',
        summary: 'Glycine + succinyl-CoA start an 8-step pathway alternating between mitochondria and cytoplasm, ending in heme (iron + protoporphyrin IX).',
        tip: 'Lead poisoning inhibits ALA dehydratase and ferrochelatase, causing a buildup of ALA and protoporphyrin — this is why lead poisoning mimics some porphyrias and causes microcytic anemia.',
      },
      {
        title: 'Heme Degradation',
        location: 'Spleen (macrophages) → Liver',
        keyEnzyme: 'Heme oxygenase',
        regulation: 'Triggered by red blood cell turnover (~120 day lifespan); not tightly hormonally regulated.',
        summary: 'Heme → biliverdin (green) → unconjugated bilirubin, which travels to the liver, is conjugated with glucuronic acid, and excreted in bile.',
        tip: 'Jaundice classification is high-yield: unconjugated bilirubin ↑ = hemolysis or liver uptake problem; conjugated bilirubin ↑ = biliary obstruction or excretion problem.',
      },
    ],
  },
  {
    id: 'kinetics',
    emoji: '📈',
    title: 'Enzyme Kinetics & Regulation',
    pathways: [
      {
        title: 'Michaelis-Menten Kinetics',
        location: 'Conceptual/biochemical framework',
        keyEnzyme: 'N/A — applies to enzymes generally',
        regulation: 'Km = substrate concentration at half-Vmax (inversely related to enzyme affinity — low Km = high affinity). Vmax depends on enzyme concentration.',
        summary: 'Describes the hyperbolic relationship between reaction rate and substrate concentration for non-cooperative enzymes.',
        tip: 'Allosteric enzymes (like PFK-1) don\'t follow Michaelis-Menten — they show sigmoidal kinetics due to cooperative binding, similar to hemoglobin\'s oxygen binding curve.',
      },
      {
        title: 'Enzyme Inhibition',
        location: 'Conceptual/biochemical framework',
        keyEnzyme: 'N/A — applies to enzymes generally',
        regulation: 'Competitive: ↑Km, same Vmax (overcome by more substrate). Noncompetitive: same Km, ↓Vmax. Uncompetitive: ↓Km AND ↓Vmax (binds only the enzyme-substrate complex).',
        summary: 'Three classic reversible inhibition types, distinguished by Lineweaver-Burk plots and how they respond to added substrate.',
        tip: 'On Lineweaver-Burk (double reciprocal) plots: competitive inhibitors share the same y-intercept as uninhibited enzyme; noncompetitive inhibitors share the same x-intercept. Memorize this pairing — it\'s tested constantly.',
      },
      {
        title: 'Covalent & Allosteric Regulation',
        location: 'Conceptual/biochemical framework',
        keyEnzyme: 'N/A — applies to enzymes generally',
        regulation: 'Covalent modification (phosphorylation, etc.) is fast and reversible via kinases/phosphatases; allosteric regulation is instantaneous via small-molecule binding at a site other than the active site.',
        summary: 'These two mechanisms, alongside changes in gene expression (slow) and proteolytic activation (irreversible), are the four general ways cells regulate enzyme activity.',
        tip: 'Zymogen activation (e.g., trypsinogen → trypsin) is irreversible proteolytic cleavage — a one-way switch, unlike phosphorylation which can be reversed.',
      },
    ],
  },
  {
    id: 'central',
    emoji: '🧫',
    title: 'The Central Dogma',
    pathways: [
      {
        title: 'DNA Replication',
        location: 'Nucleus (eukaryotes) / cytoplasm (prokaryotes)',
        keyEnzyme: 'DNA polymerase III (prokaryotes) / δ & ε (eukaryotes)',
        regulation: 'Initiated at the origin of replication by helicase; replication licensing restricts each origin to firing once per cell cycle.',
        summary: 'Semiconservative copying. Leading strand synthesized continuously; lagging strand made in Okazaki fragments, primed by RNA primase, sealed by DNA ligase.',
        tip: 'All DNA and RNA polymerases synthesize 5\' → 3\' only, and read the template 3\' → 5\'. This directionality rule explains why the lagging strand needs fragments in the first place.',
      },
      {
        title: 'DNA Repair',
        location: 'Nucleus',
        keyEnzyme: 'Mismatch repair: MSH2/MLH1. Nucleotide excision repair: XP proteins. Base excision repair: glycosylases',
        regulation: 'Each system targets a different kind of damage and acts at a different point in/after replication.',
        summary: 'Mismatch repair fixes replication errors missed by proofreading; nucleotide excision repair fixes bulky lesions (e.g., UV-induced thymine dimers); base excision repair fixes small base modifications.',
        tip: 'Xeroderma pigmentosum (NER defect) and Lynch syndrome/HNPCC (mismatch repair defect) are the two classic disease pairings — both dramatically increase cancer risk.',
      },
      {
        title: 'Transcription',
        location: 'Nucleus',
        keyEnzyme: 'RNA polymerase II (mRNA); I (rRNA); III (tRNA)',
        regulation: 'Controlled by transcription factors, enhancers/promoters, and chromatin state (histone acetylation loosens DNA for transcription; methylation typically silences it).',
        summary: 'DNA template is copied into pre-mRNA, which is 5\' capped, 3\' polyadenylated, and spliced (introns removed by the spliceosome) into mature mRNA.',
        tip: 'Alternative splicing lets one gene encode multiple protein isoforms by including/excluding different exons — a key concept for questions about how limited gene number produces greater protein diversity.',
      },
      {
        title: 'Translation',
        location: 'Ribosome (cytoplasm/rough ER)',
        keyEnzyme: 'Aminoacyl-tRNA synthetase',
        regulation: 'Initiation is often the rate-limiting, most-regulated step (e.g., via eIF2 phosphorylation during cellular stress).',
        summary: 'mRNA codons are read by tRNA anticodons to assemble a polypeptide — initiation at the start codon, elongation, then termination at a stop codon.',
        tip: 'The genetic code is degenerate (multiple codons per amino acid) but not ambiguous (each codon specifies only one amino acid) — a precise wording distinction the MCAT likes to test.',
      },
      {
        title: 'Post-Translational Modification',
        location: 'Rough ER → Golgi',
        keyEnzyme: 'Various (glycosyltransferases, proteases, kinases)',
        regulation: 'Sequential processing through the ER and Golgi, often with a signal sequence directing initial routing.',
        summary: 'Proteins are folded (often with chaperones), glycosylated, cleaved, or phosphorylated before reaching their final functional form and destination.',
        tip: 'Misfolded proteins are tagged with ubiquitin and degraded by the proteasome — the cell\'s main quality-control mechanism, distinct from lysosomal degradation.',
      },
    ],
  },
  {
    id: 'signaling',
    emoji: '📡',
    title: 'Cell Signaling',
    pathways: [
      {
        title: 'GPCR – cAMP – PKA Pathway',
        location: 'Plasma membrane → cytoplasm',
        keyEnzyme: 'Adenylate cyclase; Protein kinase A (PKA)',
        regulation: 'Gs proteins activate adenylate cyclase (↑cAMP); Gi proteins inhibit it (↓cAMP). Signal terminated by phosphodiesterase breaking down cAMP.',
        summary: 'Hormone binds a GPCR, activating a G-protein that alters adenylate cyclase activity, changing cAMP levels, which activates/inhibits PKA to phosphorylate downstream targets.',
        tip: 'Glucagon and epinephrine (β-receptors) both use this pathway to trigger glycogenolysis — the mechanistic link between "fight or flight"/fasting and blood glucose that ties multiple pathway questions together.',
      },
      {
        title: 'RTK – Ras – MAPK Pathway',
        location: 'Plasma membrane → nucleus',
        keyEnzyme: 'Receptor tyrosine kinase; Ras (small GTPase)',
        regulation: 'Ligand binding causes receptor dimerization and autophosphorylation, activating Ras, which triggers a MAPK phosphorylation cascade.',
        summary: 'Used by growth factors (e.g., insulin, EGF) to relay signals from the membrane to gene expression changes in the nucleus, driving cell growth and proliferation.',
        tip: 'Ras is a GTPase — it\'s "on" when bound to GTP and "off" when it hydrolyzes to GDP. Many cancers involve mutated Ras that\'s stuck in the "on" (GTP-bound) state.',
      },
      {
        title: 'Steroid Hormone Signaling',
        location: 'Cytoplasm → nucleus',
        keyEnzyme: 'Nuclear hormone receptors (act as transcription factors)',
        regulation: 'Lipophilic hormones (steroids, thyroid hormone) diffuse directly through the plasma membrane rather than binding a surface receptor.',
        summary: 'Hormone binds an intracellular receptor, and the hormone-receptor complex enters the nucleus to directly alter gene transcription.',
        tip: 'This mechanism is inherently slower than membrane-receptor signaling (requires new protein synthesis) but produces longer-lasting effects — a comparison the MCAT likes to test conceptually.',
      },
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
          A deep, exam-ready reference across all major MCAT biochemistry pathways — location, rate-limiting enzyme, hormonal/allosteric regulation, and a high-yield trap for each one.
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
                <div style={{ fontSize: '0.75rem', color: 'var(--text2)', marginTop: 10, lineHeight: 1.5, padding: '8px 10px', background: 'var(--surface2)', borderRadius: 6 }}>
                  <strong style={{ color: 'var(--accent3)' }}>Regulation: </strong>{p.regulation}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text2)', marginTop: 8, lineHeight: 1.5, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 6 }}>
                  <strong style={{ color: 'var(--accent)' }}>MCAT Tip: </strong>{p.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="notion-cta">
        <div className="notion-cta-text">
          <h3>📖 Full MCAT Review</h3>
          <p>See all four MCAT sections and the core metabolic overview in the main review hub.</p>
        </div>
        <Link href="/mcat" className="btn btn-primary">Back to MCAT Review →</Link>
      </div>
    </main>
  );
}
