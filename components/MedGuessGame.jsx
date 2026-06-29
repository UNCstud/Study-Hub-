'use client';
import { useState, useEffect, useCallback } from "react";

// ─── CASE DATA ────────────────────────────────────────────────────────────────
const CASES = [
  {
    id: 1,
    age: 54, sex: "M",
    chiefComplaint: "Chest pain, shortness of breath, sweating for 2 hours",
    symptoms: ["Crushing chest pain", "Diaphoresis", "Dyspnea", "Nausea", "Radiation to left arm"],
    vitals: { BP: "162/98", HR: "110", RR: "22", Temp: "37.2°C", SpO2: "94%" },
    diagnosis: "ST-Elevation Myocardial Infarction",
    system: "Cardiology",
    explanation: "STEMI occurs when a coronary artery is completely occluded by thrombus, causing full-thickness (transmural) myocardial infarction. The inferior STEMI pattern (elevation in II, III, aVF) typically involves the right coronary artery. Troponin I rises within 3–6 hours and is the gold-standard biomarker. Time is myocardium — door-to-balloon PCI under 90 minutes is the goal. Risk factors include hypertension, hyperlipidemia, diabetes, and smoking.",
    keyTests: ["ECG", "Troponin I", "BNP", "Chest X-Ray"],
    tests: {
      CBC: { result: "WBC 13.2 K/µL ↑ (stress response), Hgb 14.8 g/dL, Platelets 278K", flag: "mildly abnormal" },
      "Troponin I": { result: "Troponin I 8.4 ng/mL ↑↑↑ (normal <0.04)", flag: "critical" },
      BMP: { result: "Na 138, K 4.1, Cr 1.1, BUN 18, Glucose 142 ↑", flag: "mildly abnormal" },
      "Chest X-Ray": { result: "Mild pulmonary vascular congestion. No pneumothorax.", flag: "abnormal" },
      ECG: { result: "ST elevation in leads II, III, aVF. Q waves forming. Reciprocal changes in I, aVL. → Inferior STEMI pattern", flag: "critical" },
      "Lipid Panel": { result: "LDL 168 mg/dL ↑, HDL 32 mg/dL ↓, TG 210 mg/dL ↑, TC 242 mg/dL ↑", flag: "abnormal" },
      "BNP": { result: "BNP 480 pg/mL ↑ (normal <100)", flag: "abnormal" },
    }
  },
  {
    id: 2,
    age: 45, sex: "F",
    chiefComplaint: "Weight gain, fatigue, and feeling cold all the time for 6 months",
    symptoms: ["Weight gain (12 lbs)", "Cold intolerance", "Fatigue", "Constipation", "Dry skin", "Hair loss", "Brain fog"],
    vitals: { BP: "118/76", HR: "54", RR: "14", Temp: "36.1°C", SpO2: "99%" },
    diagnosis: "Hypothyroidism",
    system: "Endocrinology",
    explanation: "Hypothyroidism results from insufficient thyroid hormone, most commonly due to Hashimoto's autoimmune thyroiditis. TSH rises as the pituitary compensates; Free T4 falls. Anti-TPO antibodies confirm autoimmune etiology. The constellation of bradycardia, weight gain, cold intolerance, constipation, and dry skin reflects slowed metabolism. Hyperlipidemia is a common complication. Treatment is lifelong levothyroxine replacement.",
    keyTests: ["TSH", "Free T4", "Thyroid Antibodies", "Lipid Panel"],
    tests: {
      TSH: { result: "TSH 18.4 mIU/L ↑↑ (normal 0.4–4.0)", flag: "critical" },
      "Free T4": { result: "Free T4 0.4 ng/dL ↓ (normal 0.8–1.8)", flag: "abnormal" },
      CBC: { result: "Hgb 10.8 g/dL ↓ (normocytic), MCV 90 fL, WBC 5.2K", flag: "mildly abnormal" },
      BMP: { result: "Na 133 mEq/L ↓, K 4.0, Cr 0.9, Glucose 102 — mild hyponatremia", flag: "mildly abnormal" },
      "Lipid Panel": { result: "LDL 182 mg/dL ↑, HDL 48 mg/dL, TG 190 mg/dL ↑, TC 256 mg/dL ↑", flag: "abnormal" },
      "Thyroid Antibodies": { result: "Anti-TPO Ab 840 IU/mL ↑↑ (normal <35) — consistent with Hashimoto's", flag: "abnormal" },
      "Chest X-Ray": { result: "No acute findings. Mild cardiomegaly.", flag: "mildly abnormal" },
    }
  },
  {
    id: 3,
    age: 32, sex: "M",
    chiefComplaint: "Productive cough, fever, and difficulty breathing for 4 days",
    symptoms: ["Cough with yellow sputum", "Fever", "Chills", "Dyspnea", "Pleuritic chest pain", "Fatigue"],
    vitals: { BP: "124/82", HR: "102", RR: "24", Temp: "38.9°C", SpO2: "92%" },
    diagnosis: "Community-Acquired Pneumonia",
    system: "Pulmonology",
    explanation: "CAP is a lower respiratory tract infection acquired outside of healthcare settings. Streptococcus pneumoniae is the most common bacterial cause. Lobar consolidation on chest X-ray with fever, productive cough, and leukocytosis is classic. Procalcitonin helps distinguish bacterial from viral etiology. Blood cultures are critical in moderate-severe disease. The CURB-65 score guides inpatient vs outpatient management decisions.",
    keyTests: ["Chest X-Ray", "CBC", "Blood Culture", "Procalcitonin", "Sputum Culture"],
    tests: {
      CBC: { result: "WBC 18.4 K/µL ↑↑ with 88% neutrophils, Bands 12% ↑ (left shift), Hgb 13.9, Plt 389K ↑", flag: "critical" },
      "Chest X-Ray": { result: "Right lower lobe consolidation with air bronchograms. No effusion. Consistent with pneumonia.", flag: "critical" },
      BMP: { result: "Na 134 ↓, K 3.7, Cr 1.0, BUN 22 ↑, Glucose 118", flag: "mildly abnormal" },
      "Sputum Culture": { result: "Gram stain: gram-positive diplococci. Culture pending (Streptococcus pneumoniae suspected)", flag: "abnormal" },
      "Blood Culture": { result: "2/2 bottles: Streptococcus pneumoniae isolated, sensitivities pending", flag: "abnormal" },
      "Procalcitonin": { result: "Procalcitonin 4.2 ng/mL ↑↑ (normal <0.1) — bacterial infection likely", flag: "critical" },
      "Iron Panel": { result: "Ferritin 380 ng/mL ↑ (acute phase reactant), serum iron low-normal", flag: "mildly abnormal" },
    }
  },
  {
    id: 4,
    age: 62, sex: "M",
    chiefComplaint: "Increased urination, thirst, and blurred vision for weeks",
    symptoms: ["Polyuria", "Polydipsia", "Blurred vision", "Fatigue", "Unintentional weight loss", "Tingling feet"],
    vitals: { BP: "148/92", HR: "84", RR: "16", Temp: "37.0°C", SpO2: "98%" },
    diagnosis: "Type 2 Diabetes Mellitus",
    system: "Endocrinology",
    explanation: "Type 2 DM results from progressive insulin resistance and eventual beta-cell exhaustion. Onset is gradual and often diagnosed incidentally. HbA1c reflects average glucose over 3 months and is diagnostic at ≥6.5%. Microalbuminuria is the earliest sign of diabetic nephropathy. Peripheral neuropathy (tingling feet) and retinopathy (blurred vision) indicate long-standing disease. Management combines lifestyle changes, metformin, and escalating pharmacotherapy.",
    keyTests: ["HbA1c", "BMP", "Urinalysis", "Microalbumin/Cr", "Lipid Panel"],
    tests: {
      BMP: { result: "Glucose 342 mg/dL ↑↑↑, Na 131 ↓ (dilutional), K 4.2, Cr 1.3 ↑, BUN 24 ↑, HCO3 22", flag: "critical" },
      "HbA1c": { result: "HbA1c 11.2% ↑↑ (normal <5.7%, diabetic ≥6.5%)", flag: "critical" },
      "Urinalysis": { result: "Glucose 4+ ↑↑, Ketones trace, Protein 1+ ↑, no nitrites/LE", flag: "abnormal" },
      CBC: { result: "WBC 8.2K, Hgb 13.1 g/dL, Hct 39%, Plt 312K — essentially normal", flag: "normal" },
      "Lipid Panel": { result: "LDL 148 mg/dL ↑, HDL 38 mg/dL ↓, TG 320 mg/dL ↑↑, TC 232 mg/dL ↑", flag: "abnormal" },
      TSH: { result: "TSH 1.8 mIU/L — normal", flag: "normal" },
      "Microalbumin/Cr": { result: "Urine albumin-creatinine ratio 68 mg/g ↑ (normal <30) — early nephropathy", flag: "abnormal" },
    }
  },
  {
    id: 5,
    age: 19, sex: "F",
    chiefComplaint: "Sore throat, fever, and extreme fatigue for 1 week",
    symptoms: ["Severe sore throat", "Fever", "Fatigue", "Swollen lymph nodes", "Difficulty swallowing", "Mild rash after amoxicillin"],
    vitals: { BP: "112/72", HR: "102", RR: "18", Temp: "38.7°C", SpO2: "98%" },
    diagnosis: "Infectious Mononucleosis",
    system: "Infectious Disease",
    explanation: "EBV-associated mono classically presents in adolescents and young adults with fever, pharyngitis, and lymphadenopathy. The pathognomonic finding is a maculopapular rash after amoxicillin/ampicillin due to immune complex deposition. Atypical lymphocytes on CBC and a positive Monospot confirm the diagnosis. Splenomegaly is common — contact sports must be avoided for 3–4 weeks to prevent splenic rupture. Hepatitis occurs in most cases.",
    keyTests: ["Monospot Test", "EBV Antibodies", "CBC", "Liver Function Tests"],
    tests: {
      CBC: { result: "WBC 14.8 K/µL ↑, Lymphocytes 62% ↑ (atypical lymphocytes noted), Hgb 12.8, Plt 118K ↓", flag: "abnormal" },
      "Monospot Test": { result: "Positive heterophile antibody test", flag: "critical" },
      "EBV Antibodies": { result: "VCA IgM positive ↑, VCA IgG positive ↑, EA positive ↑, EBNA negative — consistent with acute EBV infection", flag: "critical" },
      "Liver Function Tests": { result: "ALT 88 U/L ↑, AST 72 U/L ↑, ALP 140 U/L ↑, Bilirubin 1.4 mg/dL ↑ — mild hepatitis pattern", flag: "abnormal" },
      BMP: { result: "Na 138, K 3.8, Cr 0.7, BUN 10, Glucose 92 — normal", flag: "normal" },
      "Throat Culture": { result: "No group A Streptococcus isolated", flag: "normal" },
      "Chest X-Ray": { result: "No acute findings. No splenomegaly visible on plain film.", flag: "normal" },
    }
  },
  {
    id: 6,
    age: 67, sex: "M",
    chiefComplaint: "Progressive shortness of breath and leg swelling for 2 weeks",
    symptoms: ["Dyspnea on exertion", "Orthopnea", "Bilateral leg edema", "Fatigue", "Paroxysmal nocturnal dyspnea", "Weight gain (8 lbs in 2 weeks)"],
    vitals: { BP: "158/96", HR: "94", RR: "22", Temp: "37.0°C", SpO2: "91%" },
    diagnosis: "Congestive Heart Failure",
    system: "Cardiology",
    explanation: "CHF results from impaired cardiac output leading to fluid congestion in the lungs (left-sided) and periphery (right-sided). BNP, released from ventricular myocytes under wall stress, is the most sensitive biomarker. Classic CXR findings include cardiomegaly, Kerley B lines, and cephalization. Hyponatremia and cardiorenal syndrome reflect systemic effects. Treatment: diuretics, ACE inhibitors, beta-blockers, and fluid/sodium restriction.",
    keyTests: ["BNP", "Chest X-Ray", "ECG", "BMP"],
    tests: {
      "BNP": { result: "BNP 1240 pg/mL ↑↑↑ (normal <100) — severely elevated, consistent with significant cardiac stress", flag: "critical" },
      "Chest X-Ray": { result: "Cardiomegaly, bilateral interstitial infiltrates, Kerley B lines, cephalization of pulmonary vasculature — pulmonary edema pattern", flag: "critical" },
      ECG: { result: "Sinus tachycardia. LVH by voltage criteria. Nonspecific ST-T changes. No acute ischemia.", flag: "abnormal" },
      CBC: { result: "WBC 8.4K, Hgb 11.2 g/dL ↓ (normocytic), Plt 204K", flag: "mildly abnormal" },
      BMP: { result: "Na 132 ↓ (dilutional), K 3.4 ↓, Cr 1.6 ↑, BUN 32 ↑, Glucose 108 — cardiorenal pattern", flag: "abnormal" },
      "Troponin I": { result: "Troponin I 0.06 ng/mL (borderline, likely demand ischemia, not primary ACS)", flag: "mildly abnormal" },
      "Lipid Panel": { result: "LDL 142 mg/dL ↑, HDL 34 mg/dL ↓, TG 188 mg/dL ↑, TC 218 mg/dL ↑", flag: "abnormal" },
    }
  },
  {
    id: 7,
    age: 24, sex: "F",
    chiefComplaint: "Joint pain, facial rash, and fatigue for 3 months",
    symptoms: ["Butterfly facial rash", "Joint pain (bilateral hands/wrists)", "Fatigue", "Hair loss", "Mouth ulcers", "Photosensitivity", "Fever"],
    vitals: { BP: "118/74", HR: "88", RR: "16", Temp: "37.8°C", SpO2: "99%" },
    diagnosis: "Systemic Lupus Erythematosus",
    system: "Rheumatology",
    explanation: "SLE is a systemic autoimmune disease predominantly affecting women of reproductive age. The malar butterfly rash, photosensitivity, and oral ulcers are hallmarks. ANA is highly sensitive; anti-dsDNA and anti-Sm are highly specific for SLE. Low complement (C3/C4) indicates active immune complex consumption. Lupus nephritis — RBC casts + proteinuria — is a serious complication requiring aggressive immunosuppression with cyclophosphamide or mycophenolate.",
    keyTests: ["ANA Panel", "Complement", "Urinalysis", "CBC"],
    tests: {
      "ANA Panel": { result: "ANA positive 1:640 (speckled pattern) ↑↑, Anti-dsDNA 180 IU/mL ↑↑ (normal <30), Anti-Sm positive ↑", flag: "critical" },
      CBC: { result: "WBC 3.2 K/µL ↓ (leukopenia), Hgb 9.8 g/dL ↓ (normocytic), Plt 88K ↓ (thrombocytopenia)", flag: "critical" },
      "Complement": { result: "C3 58 mg/dL ↓ (normal 90–180), C4 8 mg/dL ↓ (normal 16–47) — consumed complement, active disease", flag: "abnormal" },
      BMP: { result: "Na 138, K 3.9, Cr 1.1, BUN 18, Glucose 90 — normal", flag: "normal" },
      "Urinalysis": { result: "Protein 2+ ↑, RBC casts present ↑↑ — lupus nephritis pattern", flag: "critical" },
      "ESR/CRP": { result: "ESR 88 mm/hr ↑↑, CRP 2.4 mg/dL ↑ — elevated inflammatory markers", flag: "abnormal" },
      "Coagulation Studies": { result: "PTT prolonged at 48 sec ↑ — antiphospholipid antibody effect suspected", flag: "abnormal" },
    }
  },
  {
    id: 8,
    age: 41, sex: "M",
    chiefComplaint: "Sudden severe headache — worst of my life — with neck stiffness",
    symptoms: ["Thunderclap headache", "Neck stiffness", "Photophobia", "Nausea", "Vomiting", "Brief loss of consciousness"],
    vitals: { BP: "178/104", HR: "68", RR: "16", Temp: "37.3°C", SpO2: "99%" },
    diagnosis: "Subarachnoid Hemorrhage",
    system: "Neurology",
    explanation: "SAH is a neurosurgical emergency, most commonly from rupture of a berry aneurysm at the circle of Willis. The hallmark is a sudden 'thunderclap' headache — the worst headache of their life. CT head detects blood in ~98% within 12 hours; LP showing xanthochromia is diagnostic when CT is negative. Complications include rebleeding, vasospasm causing delayed ischemia, and hydrocephalus. Mortality is ~30% at 30 days.",
    keyTests: ["CT Head", "Lumbar Puncture", "MRI Brain"],
    tests: {
      "CT Head": { result: "Hyperdense blood in basal cisterns and sylvian fissures bilaterally. No midline shift. — Subarachnoid hemorrhage pattern", flag: "critical" },
      "Lumbar Puncture": { result: "Opening pressure 28 cmH2O ↑, xanthochromia present ↑↑, RBCs 85,000/µL ↑↑ (non-clearing), WBC 120/µL ↑", flag: "critical" },
      BMP: { result: "Na 140, K 3.8, Cr 0.9, BUN 14, Glucose 128 ↑ (stress response) — otherwise normal", flag: "mildly abnormal" },
      CBC: { result: "WBC 14.2 K/µL ↑ (stress leukocytosis), Hgb 14.6 g/dL, Plt 298K", flag: "mildly abnormal" },
      ECG: { result: "Diffuse T-wave inversions, prolonged QT interval — neurogenic cardiac changes", flag: "abnormal" },
      "Coagulation Studies": { result: "PT 12.4 sec, INR 1.1, PTT 28 sec — normal coagulation", flag: "normal" },
      "MRI Brain": { result: "Confirms subarachnoid blood. No underlying mass. Berry aneurysm at anterior communicating artery suspected.", flag: "critical" },
    }
  },
  {
    id: 9,
    age: 38, sex: "F",
    chiefComplaint: "Right upper quadrant pain, fever, and nausea after fatty meal",
    symptoms: ["RUQ abdominal pain", "Fever", "Nausea", "Vomiting", "Pain radiating to right shoulder", "Murphy's sign positive"],
    vitals: { BP: "128/82", HR: "106", RR: "18", Temp: "38.6°C", SpO2: "98%" },
    diagnosis: "Acute Cholecystitis",
    system: "Gastroenterology",
    explanation: "Acute cholecystitis results from cystic duct obstruction by a gallstone, leading to gallbladder inflammation. The 4 F's (Fat, Forty, Female, Fertile) describe classic risk factors. Murphy's sign — inspiratory arrest with deep RUQ palpation — is 97% specific. RUQ ultrasound is first-line imaging. Treatment is IV antibiotics and laparoscopic cholecystectomy, ideally within 72 hours of symptom onset to avoid complications like perforation or gangrenous cholecystitis.",
    keyTests: ["RUQ Ultrasound", "CBC", "Liver Function Tests", "Lipase"],
    tests: {
      "RUQ Ultrasound": { result: "Gallbladder wall thickening 5mm ↑, pericholecystic fluid, multiple gallstones with shadowing, sonographic Murphy's sign positive — acute cholecystitis", flag: "critical" },
      CBC: { result: "WBC 16.8 K/µL ↑↑ with 84% neutrophils, Hgb 13.4, Plt 310K", flag: "abnormal" },
      "Liver Function Tests": { result: "ALT 62 U/L ↑, AST 48 U/L ↑, ALP 188 U/L ↑, Bilirubin 2.1 mg/dL ↑, GGT 110 U/L ↑", flag: "abnormal" },
      Lipase: { result: "Lipase 88 U/L — normal (no pancreatitis)", flag: "normal" },
      BMP: { result: "Na 136, K 3.6, Cr 0.8, BUN 14, Glucose 104 — normal", flag: "normal" },
      "CT Abdomen/Pelvis": { result: "Distended gallbladder with wall edema and pericholecystic stranding. No free air. No common bile duct dilation.", flag: "abnormal" },
      "Blood Culture": { result: "Pending — no growth at 24 hours", flag: "normal" },
    }
  },
  {
    id: 10,
    age: 29, sex: "M",
    chiefComplaint: "Palpitations, heat intolerance, and 15-pound weight loss over 2 months",
    symptoms: ["Palpitations", "Heat intolerance", "Weight loss", "Tremor", "Anxiety", "Increased sweating", "Bulging eyes"],
    vitals: { BP: "148/62", HR: "124", RR: "18", Temp: "37.4°C", SpO2: "99%" },
    diagnosis: "Graves Disease",
    system: "Endocrinology",
    explanation: "Graves disease is the most common cause of hyperthyroidism, caused by TSI/TRAb antibodies that stimulate TSH receptors, driving unregulated thyroid hormone production. Exophthalmos from retroorbital inflammation is pathognomonic. Suppressed TSH with elevated Free T3/T4 confirms hyperthyroidism; TSI/TRAb antibodies confirm Graves etiology. Treatment options include antithyroid drugs (methimazole), radioactive iodine ablation, or thyroidectomy.",
    keyTests: ["TSH", "Free T4", "Free T3", "TSI/TRAb"],
    tests: {
      TSH: { result: "TSH <0.01 mIU/L ↓↓↓ (suppressed, normal 0.4–4.0)", flag: "critical" },
      "Free T4": { result: "Free T4 3.8 ng/dL ↑↑↑ (normal 0.8–1.8)", flag: "critical" },
      "Free T3": { result: "Free T3 12.2 pg/mL ↑↑↑ (normal 2.3–4.2)", flag: "critical" },
      "TSI/TRAb": { result: "TSI 480% ↑↑ (normal <140%), TRAb 8.2 IU/L ↑↑ — diagnostic for Graves disease", flag: "critical" },
      CBC: { result: "WBC 5.8K, Hgb 13.2 g/dL, Plt 224K — normal", flag: "normal" },
      ECG: { result: "Sinus tachycardia at 124 bpm. No arrhythmia. No ischemic changes.", flag: "mildly abnormal" },
      BMP: { result: "Na 139, K 3.5, Cr 0.8, BUN 10, Glucose 114 ↑, Ca 10.8 ↑ — mild hypercalcemia", flag: "mildly abnormal" },
    }
  },
  {
    id: 11,
    age: 35, sex: "M",
    chiefComplaint: "Severe flank pain radiating to groin with blood in urine",
    symptoms: ["Colicky flank pain", "Hematuria", "Nausea", "Vomiting", "Pain radiating to groin", "Restlessness", "Dysuria"],
    vitals: { BP: "144/90", HR: "112", RR: "20", Temp: "37.2°C", SpO2: "99%" },
    diagnosis: "Nephrolithiasis",
    system: "Nephrology",
    explanation: "Kidney stones cause colicky flank pain as they migrate through the ureter, classically radiating to the groin. Hematuria is nearly universal. Non-contrast CT abdomen/pelvis detects >95% of stones and is the gold standard. Most stones <5mm pass spontaneously with hydration and analgesics. Calcium oxalate stones are most common; uric acid stones are radiolucent. Metabolic workup (uric acid, calcium/PTH) guides prevention of recurrence.",
    keyTests: ["CT Abdomen/Pelvis", "Urinalysis", "BMP", "Uric Acid"],
    tests: {
      "CT Abdomen/Pelvis": { result: "5mm hyperdense calculus in the right ureter at the ureterovesical junction. Mild right hydronephrosis. No free air.", flag: "critical" },
      "Urinalysis": { result: "RBCs >50/hpf ↑↑ (gross hematuria), WBCs 8/hpf, no bacteria, no casts — hematuria without infection", flag: "abnormal" },
      BMP: { result: "Na 138, K 4.0, Cr 1.2, BUN 20, Glucose 94 — normal renal function", flag: "normal" },
      CBC: { result: "WBC 12.4 K/µL ↑ (pain response), Hgb 15.2 g/dL, Plt 280K", flag: "mildly abnormal" },
      "Urine Culture": { result: "No growth — no urinary tract infection", flag: "normal" },
      "Calcium/PTH": { result: "Serum Ca 10.2 mg/dL (borderline), PTH 18 pg/mL (normal) — no hyperparathyroidism", flag: "normal" },
      "Uric Acid": { result: "Uric acid 7.8 mg/dL ↑ (normal <7.0) — mildly elevated, possible uric acid component", flag: "mildly abnormal" },
    }
  },
  {
    id: 12,
    age: 28, sex: "F",
    chiefComplaint: "Fatigue and heavy menstrual periods for 3 months",
    symptoms: ["Fatigue", "Heavy periods", "Pallor", "Cold intolerance", "Brittle nails"],
    vitals: { BP: "108/70", HR: "98", RR: "16", Temp: "37.1°C", SpO2: "98%" },
    diagnosis: "Iron Deficiency Anemia",
    system: "Hematology",
    explanation: "Iron deficiency anemia is the most common cause of anemia worldwide, resulting from depleted iron stores that impair hemoglobin synthesis. In premenopausal women, heavy menstrual bleeding is the primary culprit. The resulting microcytic, hypochromic RBCs are reflected by low MCV and low MCHC. Ferritin is the most sensitive early marker of iron depletion. Treatment requires oral iron supplementation and addressing the underlying source of blood loss.",
    keyTests: ["Iron Panel", "CBC", "Peripheral Smear", "Reticulocyte Count"],
    tests: {
      CBC: { result: "Hgb 8.2 g/dL ↓, MCV 68 fL ↓ (microcytic), RDW 18% ↑, Platelets 420K ↑", flag: "abnormal" },
      "Iron Panel": { result: "Serum Iron 38 µg/dL ↓, TIBC 480 µg/dL ↑, Ferritin 4 ng/mL ↓, Transferrin Sat 8% ↓", flag: "abnormal" },
      BMP: { result: "Na 139, K 3.9, Cr 0.7, BUN 12, Glucose 88 — all within normal limits", flag: "normal" },
      TSH: { result: "TSH 2.1 mIU/L — normal", flag: "normal" },
      "Chest X-Ray": { result: "No acute cardiopulmonary process. Heart size normal.", flag: "normal" },
      "Peripheral Smear": { result: "Hypochromic microcytic RBCs, anisopoikilocytosis, target cells", flag: "abnormal" },
      "Reticulocyte Count": { result: "Reticulocyte count 0.8% (low for degree of anemia)", flag: "abnormal" },
    }
  },
  {
    id: 13,
    age: 58, sex: "M",
    chiefComplaint: "Worsening cough with blood-tinged sputum and 20-pound weight loss over 3 months",
    symptoms: ["Persistent cough", "Hemoptysis", "Weight loss", "Fatigue", "Chest pain", "Hoarseness", "Night sweats"],
    vitals: { BP: "132/84", HR: "88", RR: "20", Temp: "37.1°C", SpO2: "93%" },
    diagnosis: "Lung Cancer",
    system: "Oncology",
    explanation: "Lung cancer is the leading cause of cancer death worldwide. Adenocarcinoma is now most common, arising in peripheral airways. Constitutional symptoms with hemoptysis and a spiculated pulmonary mass in a smoker are alarming. SIADH causing hyponatremia is a paraneoplastic syndrome. CT chest with PET staging and tissue biopsy are essential before treatment. Early-stage disease may be cured surgically; advanced disease requires systemic therapy guided by molecular profiling.",
    keyTests: ["CT Chest", "Chest X-Ray", "Sputum Cytology", "CBC"],
    tests: {
      "Chest X-Ray": { result: "3.2cm irregular spiculated mass right upper lobe with hilar adenopathy. No pleural effusion.", flag: "critical" },
      "CT Chest": { result: "3.4 x 3.1cm spiculated RUL mass. Mediastinal and hilar lymphadenopathy. No distant metastases on this study.", flag: "critical" },
      "Sputum Cytology": { result: "Malignant cells present — poorly differentiated adenocarcinoma morphology", flag: "critical" },
      CBC: { result: "WBC 11.2K ↑, Hgb 10.4 g/dL ↓ (normocytic — anemia of chronic disease), Plt 488K ↑", flag: "abnormal" },
      BMP: { result: "Na 128 ↓↓ (SIADH pattern), K 3.8, Cr 0.9, BUN 16, Glucose 102, Ca 11.4 ↑", flag: "abnormal" },
      "Liver Function Tests": { result: "ALP 188 U/L ↑, otherwise normal — no definite liver metastases biochemically", flag: "mildly abnormal" },
      "ESR/CRP": { result: "ESR 72 mm/hr ↑↑, CRP 4.8 mg/dL ↑↑ — elevated systemic inflammatory markers", flag: "abnormal" },
    }
  },
  {
    id: 14,
    age: 72, sex: "F",
    chiefComplaint: "Confusion, fever, and painful urination for 2 days",
    symptoms: ["Confusion (acute)", "Fever", "Dysuria", "Flank pain", "Foul-smelling urine", "Hypotension", "Rigors"],
    vitals: { BP: "88/54", HR: "118", RR: "24", Temp: "39.2°C", SpO2: "95%" },
    diagnosis: "Urinary Tract Infection with Sepsis",
    system: "Infectious Disease",
    explanation: "UTI-associated urosepsis is a leading cause of sepsis in elderly women. Ascending infection from the bladder seeds the bloodstream — E. coli accounts for 80% of cases. Lactate >2 mmol/L indicates tissue hypoperfusion; >4 defines septic shock. Early broad-spectrum antibiotics within 1 hour, aggressive IV fluids (30 mL/kg), and source identification are the pillars of the Surviving Sepsis Campaign. Elevated procalcitonin confirms bacterial etiology.",
    keyTests: ["Urinalysis", "Urine Culture", "Blood Culture", "Lactate", "Procalcitonin"],
    tests: {
      "Urinalysis": { result: "WBCs >100/hpf ↑↑↑, Nitrites positive ↑, Leukocyte esterase 3+ ↑, Bacteria many ↑, RBCs 20/hpf ↑", flag: "critical" },
      "Urine Culture": { result: "E. coli >100,000 CFU/mL ↑↑↑, pan-sensitive — susceptible to ceftriaxone, ciprofloxacin, nitrofurantoin", flag: "critical" },
      "Blood Culture": { result: "2/2 bottles: E. coli isolated — bacteremia confirmed", flag: "critical" },
      CBC: { result: "WBC 22.4 K/µL ↑↑↑ with 92% neutrophils, Bands 18% ↑↑, Hgb 11.8, Plt 88K ↓", flag: "critical" },
      BMP: { result: "Na 132 ↓, K 5.1 ↑, Cr 2.4 ↑↑ (baseline 0.9), BUN 44 ↑↑, Glucose 188 ↑, HCO3 18 ↓", flag: "critical" },
      Lactate: { result: "Lactate 4.2 mmol/L ↑↑ (normal <2.0) — tissue hypoperfusion, septic shock", flag: "critical" },
      Procalcitonin: { result: "Procalcitonin 28.4 ng/mL ↑↑↑ (normal <0.1) — severe bacterial sepsis", flag: "critical" },
    }
  },
  {
    id: 15,
    age: 52, sex: "F",
    chiefComplaint: "Morning stiffness, swollen joints in both hands for 6 months",
    symptoms: ["Morning stiffness >1 hour", "Symmetric joint swelling", "Tender MCP and PIP joints", "Fatigue", "Low-grade fever", "Rheumatoid nodules on elbows"],
    vitals: { BP: "122/78", HR: "76", RR: "14", Temp: "37.6°C", SpO2: "99%" },
    diagnosis: "Rheumatoid Arthritis",
    system: "Rheumatology",
    explanation: "RA is a chronic systemic autoimmune arthritis predominantly affecting the small joints symmetrically. Morning stiffness lasting >1 hour is a hallmark. Anti-CCP is highly specific and predicts erosive disease. RF is sensitive but less specific. Unlike osteoarthritis, RA affects the MCP and PIP joints, sparing the DIPs. DMARDs (methotrexate first-line) slow joint destruction. Early aggressive treatment prevents irreversible joint damage.",
    keyTests: ["ANA Panel", "ESR/CRP", "CBC", "Uric Acid"],
    tests: {
      "ANA Panel": { result: "Rheumatoid Factor (RF) 180 IU/mL ↑↑ (normal <14), Anti-CCP 240 U/mL ↑↑ (normal <20) — highly specific for RA", flag: "critical" },
      "ESR/CRP": { result: "ESR 64 mm/hr ↑↑, CRP 3.8 mg/dL ↑↑ — elevated inflammatory markers consistent with active disease", flag: "abnormal" },
      CBC: { result: "WBC 9.2K, Hgb 10.6 g/dL ↓ (normocytic — anemia of chronic inflammation), Plt 520K ↑", flag: "abnormal" },
      BMP: { result: "Na 138, K 4.0, Cr 0.8, BUN 12, Glucose 96 — normal", flag: "normal" },
      "Liver Function Tests": { result: "All within normal limits — important baseline before DMARD therapy", flag: "normal" },
      "Chest X-Ray": { result: "No acute findings. No pulmonary nodules. No pleural effusion.", flag: "normal" },
      "Uric Acid": { result: "Uric acid 4.2 mg/dL — normal, gout less likely", flag: "normal" },
    }
  },
  {
    id: 16,
    age: 44, sex: "M",
    chiefComplaint: "Sudden onset severe chest pain that tears through to the back",
    symptoms: ["Tearing chest pain", "Pain radiating to back", "Unequal blood pressure in arms", "Diaphoresis", "Syncope", "Pulse deficit right arm"],
    vitals: { BP: "188/110 (L) / 142/88 (R)", HR: "108", RR: "22", Temp: "37.1°C", SpO2: "96%" },
    diagnosis: "Aortic Dissection",
    system: "Cardiology",
    explanation: "Aortic dissection occurs when an intimal tear allows blood to track into the aortic media, creating a false lumen. Type A (ascending aorta) requires emergency surgery; Type B can be managed medically. Tearing pain radiating to the back with pulse/BP differentials between arms is classic. A widened mediastinum on CXR is a key clue. CT angiography is definitive. Thrombolytics (used for STEMI) are absolutely contraindicated and could be fatal.",
    keyTests: ["CT Chest", "Chest X-Ray", "ECG", "Coagulation Studies"],
    tests: {
      "CT Chest": { result: "Type A aortic dissection — intimal flap from aortic root extending to descending aorta. Pericardial effusion present. No hemothorax.", flag: "critical" },
      ECG: { result: "Sinus tachycardia. No ST elevation. No ischemic changes — important to distinguish from STEMI.", flag: "mildly abnormal" },
      "Troponin I": { result: "Troponin I 0.08 ng/mL ↑ (mildly elevated — demand ischemia vs coronary involvement)", flag: "mildly abnormal" },
      CBC: { result: "WBC 16.2 K/µL ↑, Hgb 11.8 g/dL ↓, Plt 188K — anemia from hemorrhage", flag: "abnormal" },
      BMP: { result: "Na 138, K 4.2, Cr 1.4 ↑, BUN 26 ↑, Glucose 132 ↑ — renal malperfusion pattern", flag: "abnormal" },
      "Coagulation Studies": { result: "PT 16.2 sec ↑, INR 1.4 ↑, PTT 42 sec ↑, Fibrinogen 148 mg/dL ↓ — consumptive coagulopathy", flag: "abnormal" },
      "Chest X-Ray": { result: "Widened mediastinum >8cm ↑↑, blurring of aortic knob, left pleural effusion — classic dissection findings", flag: "critical" },
    }
  },
  {
    id: 17,
    age: 66, sex: "M",
    chiefComplaint: "Sudden right-sided weakness and slurred speech that started 1 hour ago",
    symptoms: ["Right arm and leg weakness", "Slurred speech (dysarthria)", "Facial droop (right)", "Headache", "Confusion", "Right-sided sensory loss"],
    vitals: { BP: "192/108", HR: "82", RR: "16", Temp: "37.0°C", SpO2: "97%" },
    diagnosis: "Ischemic Stroke",
    system: "Neurology",
    explanation: "Ischemic stroke results from occlusion of a cerebral artery causing brain infarction. Atrial fibrillation is the most common cardioembolic source, causing ~20% of all strokes. CT head must first rule out hemorrhage before tPA can be given. MRI-DWI confirms infarction. tPA is indicated within 4.5 hours of onset in eligible patients. Anticoagulation for AF prevents recurrence. The NIHSS score quantifies severity and guides treatment decisions.",
    keyTests: ["CT Head", "MRI Brain", "ECG", "Coagulation Studies"],
    tests: {
      "CT Head": { result: "No hemorrhage. No early ischemic changes. Hyperdense MCA sign left side — consistent with acute thrombus.", flag: "abnormal" },
      "MRI Brain": { result: "Diffusion restriction left MCA territory involving corona radiata and internal capsule — acute ischemic infarct confirmed", flag: "critical" },
      ECG: { result: "Atrial fibrillation with rate 82 bpm — cardioembolic source identified", flag: "critical" },
      CBC: { result: "WBC 9.4K, Hgb 13.8 g/dL, Plt 244K — normal", flag: "normal" },
      BMP: { result: "Na 138, K 4.0, Cr 1.1, BUN 18, Glucose 162 ↑ — stress hyperglycemia", flag: "mildly abnormal" },
      "Coagulation Studies": { result: "PT 12.8 sec, INR 1.1, PTT 30 sec — not anticoagulated", flag: "normal" },
      "Lipid Panel": { result: "LDL 158 mg/dL ↑, HDL 36 mg/dL ↓, TG 198 mg/dL ↑, TC 238 mg/dL ↑", flag: "abnormal" },
    }
  },
  {
    id: 18,
    age: 23, sex: "M",
    chiefComplaint: "Sudden severe shortness of breath and chest pain after a long flight",
    symptoms: ["Sudden dyspnea", "Pleuritic chest pain", "Tachycardia", "Calf swelling and tenderness", "Hemoptysis", "Lightheadedness"],
    vitals: { BP: "102/68", HR: "128", RR: "28", Temp: "37.4°C", SpO2: "88%" },
    diagnosis: "Pulmonary Embolism",
    system: "Pulmonology",
    explanation: "PE occurs when DVT dislodges and occludes pulmonary arteries. Virchow's triad (stasis, hypercoagulability, endothelial injury) explains pathogenesis. Massive PE presents with hemodynamic collapse. The S1Q3T3 ECG pattern and right heart strain markers (elevated BNP and troponin) indicate severity. CT pulmonary angiography is the gold standard. Anticoagulation is primary treatment; thrombolytics or embolectomy are reserved for massive PE with shock.",
    keyTests: ["CT Chest", "ECG", "BNP", "Troponin I"],
    tests: {
      "CT Chest": { result: "Large bilateral pulmonary emboli — saddle embolus at main pulmonary artery bifurcation with extension into right and left main PAs. Right heart strain pattern.", flag: "critical" },
      ECG: { result: "Sinus tachycardia. S1Q3T3 pattern. Right bundle branch block. T-wave inversions V1–V4 — right heart strain", flag: "critical" },
      "Troponin I": { result: "Troponin I 0.92 ng/mL ↑↑ — right ventricular myocardial injury from massive PE", flag: "critical" },
      "BNP": { result: "BNP 820 pg/mL ↑↑↑ — right ventricular dysfunction", flag: "critical" },
      CBC: { result: "WBC 12.8K ↑, Hgb 14.4 g/dL, Plt 202K — normal", flag: "mildly abnormal" },
      BMP: { result: "Na 138, K 3.8, Cr 0.9, BUN 14, Glucose 98 — normal", flag: "normal" },
      "Coagulation Studies": { result: "PT 13.0 sec, INR 1.1, PTT 31 sec — normal baseline before anticoagulation", flag: "normal" },
    }
  },
  {
    id: 19,
    age: 48, sex: "F",
    chiefComplaint: "Severe epigastric pain radiating to the back with nausea after alcohol use",
    symptoms: ["Severe epigastric pain", "Pain radiating to back", "Nausea", "Vomiting", "Fever", "Abdominal guarding", "Recent heavy alcohol use"],
    vitals: { BP: "104/66", HR: "116", RR: "22", Temp: "38.4°C", SpO2: "96%" },
    diagnosis: "Acute Pancreatitis",
    system: "Gastroenterology",
    tests: {
      Lipase: { result: "Lipase 2840 U/L ↑↑↑ (normal <60) — markedly elevated, diagnostic for pancreatitis", flag: "critical" },
      BMP: { result: "Na 132 ↓, K 3.2 ↓, Cr 1.8 ↑, BUN 38 ↑, Glucose 284 ↑↑, Ca 7.4 ↓ — multiple electrolyte disturbances", flag: "critical" },
      CBC: { result: "WBC 19.6 K/µL ↑↑↑, Hgb 16.8 g/dL ↑ (hemoconcentration), Hct 52% ↑, Plt 188K", flag: "critical" },
      "Liver Function Tests": { result: "ALT 48 U/L ↑, AST 62 U/L ↑, ALP 110 U/L, Bilirubin 2.2 mg/dL ↑ — mild transaminase elevation", flag: "abnormal" },
      "CT Abdomen/Pelvis": { result: "Pancreatic edema and peripancreatic fat stranding. No necrotizing pancreatitis. Small peripancreatic fluid collections.", flag: "abnormal" },
      "Coagulation Studies": { result: "PT 16.8 sec ↑, INR 1.5 ↑ — hepatic dysfunction from alcohol", flag: "abnormal" },
      "Lactate": { result: "Lactate 3.1 mmol/L ↑ — tissue hypoperfusion from third-spacing", flag: "abnormal" },
    }
  },
  {
    id: 20,
    age: 16, sex: "M",
    chiefComplaint: "Excessive thirst, frequent urination, and vomiting for 3 days with fruity breath",
    symptoms: ["Polyuria", "Polydipsia", "Nausea and vomiting", "Abdominal pain", "Fruity breath odor", "Fatigue", "Weight loss (10 lbs)"],
    vitals: { BP: "96/60", HR: "124", RR: "32", Temp: "37.2°C", SpO2: "99%" },
    diagnosis: "Diabetic Ketoacidosis",
    system: "Endocrinology",
    tests: {
      BMP: { result: "Glucose 488 mg/dL ↑↑↑, Na 128 ↓ (corrected Na 136), K 5.8 ↑, Cr 1.4 ↑, BUN 28 ↑, HCO3 8 ↓↓↓ (severe acidosis), Anion gap 26 ↑↑", flag: "critical" },
      "Urinalysis": { result: "Glucose 4+ ↑↑↑, Ketones 4+ ↑↑↑, pH 5.0 ↓ — ketonuria and glucosuria", flag: "critical" },
      "HbA1c": { result: "HbA1c 13.4% ↑↑↑ — new diagnosis of diabetes with poor glycemic control", flag: "critical" },
      CBC: { result: "WBC 18.4 K/µL ↑ (stress/dehydration), Hgb 15.8 g/dL ↑ (hemoconcentration), Plt 342K", flag: "abnormal" },
      "Blood Culture": { result: "No growth — no infectious precipitant identified", flag: "normal" },
      "Coagulation Studies": { result: "PT 12.2 sec, INR 1.0, PTT 28 sec — normal", flag: "normal" },
      TSH: { result: "TSH 2.4 mIU/L — normal", flag: "normal" },
    }
  },
  {
    id: 21,
    age: 67, sex: "M",
    chiefComplaint: "Burning pain and blistering rash on the right side of chest for 3 days",
    symptoms: ["Unilateral vesicular rash", "Burning/stabbing pain", "Rash following a dermatomal band (right T6)", "Fever", "Fatigue", "Itching", "Pain preceded rash by 2 days"],
    vitals: { BP: "134/82", HR: "80", RR: "14", Temp: "37.9°C", SpO2: "99%" },
    diagnosis: "Herpes Zoster (Shingles)", system: "Infectious Disease",
    explanation: "Herpes zoster (shingles) results from reactivation of varicella-zoster virus (VZV) that lay dormant in dorsal root ganglia after a prior chickenpox infection. Reactivation is triggered by immunosenescence, immunosuppression, or stress. The hallmark is a painful, unilateral dermatomal vesicular rash that does not cross the midline. Pain typically precedes the rash by 2–3 days (prodromal phase), making early diagnosis difficult. Post-herpetic neuralgia (PHN) — persistent pain after rash resolution — is the most feared complication, especially in older adults. Antiviral therapy (acyclovir/valacyclovir) started within 72 hours reduces duration and risk of PHN. The shingrix vaccine reduces incidence by >90%.",
    keyTests: ["CBC", "ESR/CRP", "BMP", "Liver Function Tests"],
    tests: {
      CBC: { result: "WBC 11.4 K/µL ↑ (lymphocytosis 48%), Hgb 13.8 g/dL, Plt 242K — mild lymphocytic response", flag: "mildly abnormal" },
      "ESR/CRP": { result: "ESR 38 mm/hr ↑, CRP 2.2 mg/dL ↑ — mild viral inflammatory response", flag: "mildly abnormal" },
      BMP: { result: "Na 138, K 4.0, Cr 1.0, BUN 16, Glucose 104 — normal", flag: "normal" },
      "Liver Function Tests": { result: "ALT 34 U/L, AST 28 U/L, ALP 88 U/L — all normal", flag: "normal" },
      "Blood Culture": { result: "No growth — viral etiology, no bacterial superinfection", flag: "normal" },
      TSH: { result: "TSH 2.0 mIU/L — normal", flag: "normal" },
    }
  },
  {
    id: 22,
    age: 48, sex: "M",
    chiefComplaint: "Fatigue and right upper quadrant discomfort found incidentally to have elevated liver enzymes on routine labs — obese, diabetic",
    symptoms: ["Fatigue", "Mild RUQ discomfort", "Obesity (BMI 36)", "Type 2 diabetes", "No alcohol use", "Hypertension", "Hyperlipidemia", "No jaundice"],
    vitals: { BP: "142/88", HR: "78", RR: "14", Temp: "37.0°C", SpO2: "99%" },
    diagnosis: "Non-Alcoholic Fatty Liver Disease", system: "Gastroenterology",
    explanation: "Non-alcoholic fatty liver disease (NAFLD) encompasses a spectrum from simple steatosis to non-alcoholic steatohepatitis (NASH), fibrosis, and cirrhosis. It is the most common liver disease in the Western world, strongly associated with metabolic syndrome (obesity, T2DM, dyslipidemia, hypertension). The pathognomonic feature on RUQ ultrasound is a 'bright liver' from hepatic steatosis. ALT typically exceeds AST (unlike alcoholic liver disease where AST:ALT >2:1). Liver biopsy remains the gold standard for staging fibrosis. Management is primarily lifestyle modification — weight loss of >7–10% can reverse steatosis and fibrosis. Newer agents like resmetirom (thyroid receptor agonist) are approved for NASH with fibrosis.",
    keyTests: ["Liver Function Tests", "RUQ Ultrasound", "CBC", "Lipid Panel"],
    tests: {
      "Liver Function Tests": { result: "ALT 88 U/L ↑↑ (normal <40), AST 52 U/L ↑ (ALT > AST — NAFLD pattern), ALP 112 U/L ↑, GGT 98 U/L ↑, Total Bilirubin 0.9 mg/dL (normal), Albumin 4.0 g/dL (normal)", flag: "abnormal" },
      "RUQ Ultrasound": { result: "Diffusely echogenic (bright) liver consistent with hepatic steatosis. Mild hepatomegaly (span 16cm ↑). No focal lesion. No bile duct dilation. Normal gallbladder.", flag: "abnormal" },
      CBC: { result: "WBC 8.2K, Hgb 14.8 g/dL, Plt 238K — normal", flag: "normal" },
      "Lipid Panel": { result: "LDL 158 mg/dL ↑, HDL 32 mg/dL ↓, TG 384 mg/dL ↑↑↑, TC 242 mg/dL ↑ — hypertriglyceridemia and metabolic dyslipidemia", flag: "abnormal" },
      BMP: { result: "Na 138, K 4.1, Cr 1.1, BUN 18, Glucose 148 ↑ (T2DM), HCO3 24 — mildly elevated glucose", flag: "mildly abnormal" },
      "HbA1c": { result: "HbA1c 8.2% ↑↑ — poorly controlled T2DM (common NAFLD driver)", flag: "abnormal" },
      "Coagulation Studies": { result: "PT 12.6 sec, INR 1.1 — normal hepatic synthetic function (no cirrhosis yet)", flag: "normal" },
    }
  }
];

const ALL_DIAGNOSES = [
  { name: "Iron Deficiency Anemia", system: "Hematology" },
  { name: "ST-Elevation Myocardial Infarction", system: "Cardiology" },
  { name: "Hypothyroidism", system: "Endocrinology" },
  { name: "Community-Acquired Pneumonia", system: "Pulmonology" },
  { name: "Type 2 Diabetes Mellitus", system: "Endocrinology" },
  { name: "Subarachnoid Hemorrhage", system: "Neurology" },
  { name: "Congestive Heart Failure", system: "Cardiology" },
  { name: "Systemic Lupus Erythematosus", system: "Rheumatology" },
  { name: "Acute Cholecystitis", system: "Gastroenterology" },
  { name: "Infectious Mononucleosis", system: "Infectious Disease" },
  { name: "Urinary Tract Infection with Sepsis", system: "Infectious Disease" },
  { name: "Cluster Headache", system: "Neurology" },
  { name: "Graves Disease", system: "Endocrinology" },
  { name: "Nephrolithiasis", system: "Nephrology" },
  { name: "Lung Cancer", system: "Oncology" },
  { name: "Aplastic Anemia", system: "Hematology" },
  { name: "Non-ST Elevation MI", system: "Cardiology" },
  { name: "Hyperthyroidism (Non-Graves)", system: "Endocrinology" },
  { name: "Pulmonary Embolism", system: "Pulmonology" },
  { name: "Type 1 Diabetes Mellitus", system: "Endocrinology" },
  { name: "Meningitis", system: "Neurology" },
  { name: "Cardiomyopathy", system: "Cardiology" },
  { name: "Rheumatoid Arthritis", system: "Rheumatology" },
  { name: "Cholelithiasis", system: "Gastroenterology" },
  { name: "Streptococcal Pharyngitis", system: "Infectious Disease" },
  { name: "Pyelonephritis", system: "Infectious Disease" },
  { name: "Migraine", system: "Neurology" },
  { name: "Thyroid Nodule", system: "Endocrinology" },
  { name: "Renal Cell Carcinoma", system: "Nephrology" },
  { name: "Mesothelioma", system: "Oncology" },
  { name: "Vitamin B12 Deficiency", system: "Hematology" },
  { name: "Unstable Angina", system: "Cardiology" },
  { name: "Aortic Dissection", system: "Cardiology" },
  { name: "Ischemic Stroke", system: "Neurology" },
  { name: "Diabetic Ketoacidosis", system: "Endocrinology" },
  { name: "Acute Pancreatitis", system: "Gastroenterology" },
  { name: "Transient Ischemic Attack", system: "Neurology" },
  { name: "Hemorrhagic Stroke", system: "Neurology" },
  { name: "Chronic Pancreatitis", system: "Gastroenterology" },
  { name: "Peptic Ulcer Disease", system: "Gastroenterology" },
  { name: "Hyperglycemic Hyperosmolar State", system: "Endocrinology" },
  { name: "Cardiac Tamponade", system: "Cardiology" },
  { name: "Deep Vein Thrombosis", system: "Hematology" },
  { name: "Reactive Arthritis", system: "Rheumatology" },
  { name: "Herpes Zoster (Shingles)", system: "Infectious Disease" },
  { name: "Non-Alcoholic Fatty Liver Disease", system: "Gastroenterology" },
];

const MAX_GUESSES = 5;
const TESTS_AVAILABLE = ["CBC", "Iron Panel", "BMP", "TSH", "Free T4", "Free T3", "Chest X-Ray", "Troponin I", "ECG", "BNP", "Lipid Panel", "Liver Function Tests", "Urinalysis", "Blood Culture", "Urine Culture", "CT Head", "MRI Brain", "Lumbar Puncture", "Sputum Culture", "Sputum Cytology", "CT Chest", "CT Abdomen/Pelvis", "RUQ Ultrasound", "Monospot Test", "EBV Antibodies", "ANA Panel", "Complement", "ESR/CRP", "Thyroid Antibodies", "TSI/TRAb", "Coagulation Studies", "Procalcitonin", "Lactate", "Lipase", "Peripheral Smear", "Reticulocyte Count", "Microalbumin/Cr", "HbA1c", "Calcium/PTH", "Uric Acid"];

function getDailyIndex() {
  return Math.floor(Date.now() / 86400000) % CASES.length;
}

function getFeedback(guessName, correctName, allDiagnoses) {
  if (guessName === correctName) return "correct";
  const guessDx = allDiagnoses.find(d => d.name === guessName);
  const correctDx = allDiagnoses.find(d => d.name === correctName);
  if (guessDx && correctDx && guessDx.system === correctDx.system) return "related";
  return "unrelated";
}

function calcScore(guessCount, testCount) {
  const guessScore = Math.max(0, (MAX_GUESSES - Math.max(0, (guessCount - 1))) * 200);
  const testPenalty = Math.min(testCount * 20, 200);
  return Math.max(0, guessScore - testPenalty);
}

const FLAG_COLORS = { critical: "#ff4444", abnormal: "#ff9900", "mildly abnormal": "#f0c040", normal: "#4caf50" };
const FLAG_LABELS = { critical: "CRITICAL", abnormal: "ABNORMAL", "mildly abnormal": "ABNORMAL", normal: "NORMAL" };

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Mono:wght@300;400;600&family=DM+Serif+Display&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0e14; color: #e0e8f0; font-family: 'IBM Plex Mono', monospace; min-height: 100vh; }
  :root {
    --bg: #0a0e14; --surface: #111620; --surface2: #161d2a; --border: #1e2c3d;
    --accent: #00d4ff; --accent2: #7c3aed; --green: #00e676; --yellow: #ffca28; --red: #ff5252;
    --text: #e0e8f0; --text2: #8899aa; --text3: #445566;
  }
  .app { max-width: 820px; margin: 0 auto; padding: 16px; min-height: 100vh; }
  .header { text-align: center; padding: 24px 0 20px; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
  .header-logo { font-family: 'DM Serif Display', serif; font-size: 2.2rem; color: var(--accent); letter-spacing: -1px; }
  .header-sub { font-size: 0.65rem; color: var(--text2); letter-spacing: 4px; text-transform: uppercase; margin-top: 4px; }
  .header-actions { display: flex; justify-content: center; gap: 10px; margin-top: 14px; }
  .case-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 16px; }
  .case-title { font-size: 0.6rem; letter-spacing: 4px; color: var(--accent); text-transform: uppercase; margin-bottom: 12px; font-family: 'Space Mono', monospace; }
  .case-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
  .badge { background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 3px 10px; font-size: 0.72rem; color: var(--text2); }
  .complaint { font-size: 0.95rem; color: var(--text); line-height: 1.5; margin-bottom: 14px; font-style: italic; }
  .symptoms-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
  .symptom-tag { background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2); border-radius: 4px; padding: 2px 10px; font-size: 0.72rem; color: var(--accent); }
  .vitals-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
  .vital { background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; text-align: center; }
  .vital-label { font-size: 0.58rem; letter-spacing: 2px; color: var(--text3); text-transform: uppercase; margin-bottom: 3px; }
  .vital-val { font-size: 0.88rem; color: var(--text); font-weight: 600; font-family: 'Space Mono', monospace; }
  .section-label { font-size: 0.58rem; letter-spacing: 3px; color: var(--text2); text-transform: uppercase; margin-bottom: 10px; font-family: 'Space Mono', monospace; }
  .tests-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 6px; margin-bottom: 16px; }
  .test-btn { background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; font-size: 0.72rem; color: var(--text2); cursor: pointer; font-family: 'IBM Plex Mono', monospace; transition: all 0.15s; text-align: left; }
  .test-btn:hover:not(.ordered):not(.disabled) { border-color: var(--accent); color: var(--accent); background: rgba(0,212,255,0.06); }
  .test-btn.ordered { border-color: var(--text3); color: var(--text3); cursor: default; background: var(--surface); }
  .test-btn.disabled { opacity: 0.4; cursor: not-allowed; }
  .results-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .result-item { background: var(--surface2); border-radius: 6px; overflow: hidden; animation: slideIn 0.3s ease; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  .result-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid var(--border); }
  .result-name { font-size: 0.72rem; font-weight: 600; color: var(--text); font-family: 'Space Mono', monospace; }
  .result-flag { font-size: 0.58rem; letter-spacing: 2px; padding: 2px 6px; border-radius: 3px; font-weight: 700; }
  .result-body { padding: 10px 12px; font-size: 0.76rem; color: var(--text2); line-height: 1.6; }
  .guesses-area { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 16px; }
  .guess-history { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; min-height: 40px; }
  .guess-row { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 6px; animation: slideIn 0.3s ease; }
  .guess-row.correct { background: rgba(0,230,118,0.12); border: 1px solid rgba(0,230,118,0.3); }
  .guess-row.related { background: rgba(255,202,40,0.1); border: 1px solid rgba(255,202,40,0.25); }
  .guess-row.unrelated { background: rgba(255,255,255,0.03); border: 1px solid var(--border); }
  .guess-emoji { font-size: 1.1rem; flex-shrink: 0; }
  .guess-text { font-size: 0.8rem; color: var(--text); flex: 1; }
  .guess-sys { font-size: 0.62rem; color: var(--text2); }
  .guess-controls { display: flex; gap: 8px; }
  .dx-select { flex: 1; background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 10px 12px; font-size: 0.8rem; color: var(--text); font-family: 'IBM Plex Mono', monospace; cursor: pointer; }
  .dx-select:focus { outline: none; border-color: var(--accent); }
  .dx-select option { background: var(--surface2); }
  .btn { border: none; border-radius: 6px; padding: 10px 20px; font-size: 0.78rem; font-family: 'Space Mono', monospace; cursor: pointer; font-weight: 700; letter-spacing: 1px; transition: all 0.15s; text-transform: uppercase; }
  .btn-primary { background: var(--accent); color: #000; }
  .btn-primary:hover { background: #00b8e0; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--text2); }
  .btn-secondary:hover { border-color: var(--text2); color: var(--text); }
  .btn-new-case { background: transparent; border: 1px solid rgba(124,58,237,0.5); color: #c4b5fd; font-size: 0.7rem; padding: 7px 16px; border-radius: 6px; cursor: pointer; font-family: 'Space Mono', monospace; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; transition: all 0.15s; }
  .btn-new-case:hover { border-color: #c4b5fd; background: rgba(124,58,237,0.1); }
  .case-indicator { font-size: 0.62rem; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }
  .attempts-bar { display: flex; gap: 4px; margin-bottom: 12px; }
  .attempt-dot { width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface2); transition: all 0.3s; }
  .attempt-dot.used { background: var(--text3); border-color: var(--text3); }
  .attempt-dot.current { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 6px var(--accent); }
  .score-display { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--surface2); border-radius: 6px; margin-bottom: 12px; }
  .score-num { font-size: 1.4rem; font-family: 'Space Mono', monospace; color: var(--accent); font-weight: 700; }
  .score-label { font-size: 0.6rem; letter-spacing: 3px; color: var(--text2); text-transform: uppercase; }
  .result-banner { text-align: center; padding: 32px; border-radius: 8px; margin-bottom: 16px; }
  .result-banner.win { background: rgba(0,230,118,0.08); border: 1px solid rgba(0,230,118,0.25); }
  .result-banner.lose { background: rgba(255,82,82,0.08); border: 1px solid rgba(255,82,82,0.25); }
  .result-banner-emoji { font-size: 3rem; margin-bottom: 12px; }
  .result-banner-title { font-family: 'DM Serif Display', serif; font-size: 1.6rem; margin-bottom: 6px; }
  .result-banner.win .result-banner-title { color: var(--green); }
  .result-banner.lose .result-banner-title { color: var(--red); }
  .result-banner-dx { font-size: 0.85rem; color: var(--text2); margin-bottom: 20px; }
  .share-box { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 12px; font-size: 0.78rem; font-family: 'Space Mono', monospace; white-space: pre; color: var(--text2); margin-bottom: 12px; line-height: 1.6; }
  .result-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
  .hint-area { padding: 8px 12px; background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.2); border-radius: 6px; font-size: 0.72rem; color: #c4b5fd; margin-bottom: 8px; }
  .tab-bar { display: flex; gap: 2px; margin-bottom: 16px; border-bottom: 1px solid var(--border); }
  .tab { padding: 8px 16px; font-size: 0.68rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; color: var(--text2); font-family: 'Space Mono', monospace; border-bottom: 2px solid transparent; transition: all 0.15s; background: none; border-left: none; border-right: none; border-top: none; }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .legend { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.68rem; color: var(--text2); }
  .copied-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--green); color: #000; padding: 8px 20px; border-radius: 6px; font-size: 0.78rem; font-family: 'Space Mono', monospace; font-weight: 700; animation: fadeUp 0.3s ease; z-index: 999; }
  @keyframes fadeUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  .progress-info { font-size: 0.68rem; color: var(--text2); margin-bottom: 8px; }
  .dx-grid { display: grid; grid-template-columns: 1fr; gap: 4px; max-height: 240px; overflow-y: auto; margin-bottom: 12px; padding-right: 4px; }
  .dx-grid::-webkit-scrollbar { width: 4px; }
  .dx-grid::-webkit-scrollbar-track { background: var(--surface); }
  .dx-grid::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  .dx-option { background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; cursor: pointer; transition: all 0.12s; display: flex; justify-content: space-between; align-items: center; }
  .dx-option:hover { border-color: var(--accent); background: rgba(0,212,255,0.06); }
  .dx-option.selected { border-color: var(--accent); background: rgba(0,212,255,0.1); }
  .dx-name { font-size: 0.78rem; color: var(--text); }
  .dx-sys { font-size: 0.62rem; color: var(--text2); }
  .search-input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 9px 12px; font-size: 0.8rem; color: var(--text); font-family: 'IBM Plex Mono', monospace; margin-bottom: 8px; }
  .search-input:focus { outline: none; border-color: var(--accent); }
  .confirm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .confirm-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 28px 24px; max-width: 340px; width: 90%; text-align: center; }
  .confirm-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--text); margin-bottom: 8px; }
  .confirm-body { font-size: 0.75rem; color: var(--text2); margin-bottom: 20px; line-height: 1.6; }
  .confirm-actions { display: flex; gap: 10px; justify-content: center; }
  .case-picker-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .case-picker-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px; max-width: 480px; width: 94%; max-height: 80vh; display: flex; flex-direction: column; }
  .case-picker-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: var(--text); margin-bottom: 4px; }
  .case-picker-sub { font-size: 0.65rem; color: var(--text2); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; }
  .case-picker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(56px, 1fr)); gap: 6px; overflow-y: auto; padding-right: 4px; }
  .case-picker-grid::-webkit-scrollbar { width: 4px; }
  .case-picker-grid::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  .case-num-btn { background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 8px 4px; font-size: 0.72rem; font-family: 'Space Mono', monospace; color: var(--text2); cursor: pointer; text-align: center; transition: all 0.12s; }
  .case-num-btn:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,212,255,0.06); }
  .case-num-btn.active { border-color: var(--accent); color: var(--accent); background: rgba(0,212,255,0.12); font-weight: 700; }
  .case-picker-close { margin-top: 14px; align-self: center; }
  .explanation-card { background: var(--surface); border: 1px solid rgba(0,212,255,0.15); border-radius: 8px; padding: 20px; margin-bottom: 16px; }
  .explanation-title { font-size: 0.58rem; letter-spacing: 3px; color: var(--accent); text-transform: uppercase; margin-bottom: 10px; font-family: 'Space Mono', monospace; }
  .explanation-text { font-size: 0.78rem; color: var(--text2); line-height: 1.8; margin-bottom: 16px; }
  .key-tests-row { display: flex; flex-wrap: wrap; gap: 6px; }
  .key-test-tag { background: rgba(0,230,118,0.08); border: 1px solid rgba(0,230,118,0.25); border-radius: 4px; padding: 3px 10px; font-size: 0.7rem; color: #00e676; font-family: 'Space Mono', monospace; }
  @media (max-width: 600px) {
    .header-logo { font-size: 1.7rem; }
    .tests-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
    .vitals-row { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); }
  }
`;

function resetGameState() {
  localStorage.removeItem("medguess_tests");
  localStorage.removeItem("medguess_results");
  localStorage.removeItem("medguess_guesses");
  localStorage.removeItem("medguess_game_over");
  localStorage.removeItem("medguess_won");
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MedGuessGame() {
  // SSR-safe localStorage helper
  const ls = (key, fallback) => {
    if (typeof window === "undefined") return fallback;
    const v = localStorage.getItem(key);
    return v !== null ? v : fallback;
  };

  // --- CASE INDEX STATE ---
  const [caseIndex, setCaseIndex] = useState(() => {
    if (typeof window === "undefined") return getDailyIndex();
    const saved = localStorage.getItem("medguess_case_index");
    return saved !== null ? parseInt(saved) : getDailyIndex();
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [showCasePicker, setShowCasePicker] = useState(false);
  const [pendingCaseIndex, setPendingCaseIndex] = useState(null);

  const caseData = CASES[caseIndex];

  // --- GAME STATE ---
  const [tab, setTab] = useState("tests");
  const [selectedDx, setSelectedDx] = useState("");
  const [gameOver, setGameOver] = useState(() => typeof window !== "undefined" && localStorage.getItem("medguess_game_over") === "true");
  const [won, setWon] = useState(() => typeof window !== "undefined" && localStorage.getItem("medguess_won") === "true");
  const [copied, setCopied] = useState(false);
  const [dxSearch, setDxSearch] = useState("");

  const [orderedTests, setOrderedTests] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("medguess_tests");
    return saved ? JSON.parse(saved) : [];
  });

  const [testResults, setTestResults] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("medguess_results");
    return saved ? JSON.parse(saved) : [];
  });

  const [guesses, setGuesses] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("medguess_guesses");
    return saved ? JSON.parse(saved) : [];
  });

  // --- DERIVED STATE ---
  const gameEnded = gameOver || won;
  const currentScore = gameEnded ? calcScore(guesses.length, orderedTests.length) : null;
  const availableTests = TESTS_AVAILABLE.filter(t => !orderedTests.includes(t));
  const filteredDx = ALL_DIAGNOSES.filter(d =>
    d.name.toLowerCase().includes(dxSearch.toLowerCase()) ||
    d.system.toLowerCase().includes(dxSearch.toLowerCase())
  );

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
    localStorage.setItem("medguess_case_index", caseIndex);
  }, [caseIndex]);

  useEffect(() => {
    localStorage.setItem("medguess_tests", JSON.stringify(orderedTests));
  }, [orderedTests]);

  useEffect(() => {
    localStorage.setItem("medguess_results", JSON.stringify(testResults));
  }, [testResults]);

  useEffect(() => {
    localStorage.setItem("medguess_guesses", JSON.stringify(guesses));
  }, [guesses]);

  useEffect(() => {
    localStorage.setItem("medguess_game_over", gameOver);
  }, [gameOver]);

  useEffect(() => {
    localStorage.setItem("medguess_won", won);
  }, [won]);

  // Daily Reset Check
  useEffect(() => {
    const savedDay = localStorage.getItem("medguess_last_day");
    const today = new Date().toDateString();
    if (savedDay && savedDay !== today) {
      resetGameState();
      localStorage.setItem("medguess_last_day", today);
      localStorage.setItem("medguess_case_index", getDailyIndex());
      window.location.reload();
    } else {
      localStorage.setItem("medguess_last_day", today);
    }
  }, []);

  // --- NEW CASE HANDLER ---
  const startNewCase = useCallback(() => {
    const nextIndex = (caseIndex + 1) % CASES.length;
    resetGameState();
    setCaseIndex(nextIndex);
    setOrderedTests([]);
    setTestResults([]);
    setGuesses([]);
    setGameOver(false);
    setWon(false);
    setSelectedDx("");
    setDxSearch("");
    setTab("tests");
    setShowConfirm(false);
  }, [caseIndex]);

  const jumpToCase = useCallback((idx) => {
    if (idx === caseIndex) { setShowCasePicker(false); setPendingCaseIndex(null); return; }
    resetGameState();
    setCaseIndex(idx);
    setOrderedTests([]);
    setTestResults([]);
    setGuesses([]);
    setGameOver(false);
    setWon(false);
    setSelectedDx("");
    setDxSearch("");
    setTab("tests");
    setShowCasePicker(false);
    setPendingCaseIndex(null);
  }, [caseIndex]);

  // --- HANDLERS ---
  const orderTest = useCallback((testName) => {
    if (orderedTests.includes(testName) || gameEnded) return;
    const result = caseData.tests[testName];
    setOrderedTests(prev => [...prev, testName]);
    if (result) {
      setTestResults(prev => [...prev, { name: testName, ...result }]);
    } else {
      setTestResults(prev => [...prev, { name: testName, result: "No significant findings. Results within normal limits.", flag: "normal" }]);
    }
    if (tab !== "results") setTab("results");
  }, [orderedTests, gameEnded, caseData.tests, tab]);

  const submitGuess = useCallback(() => {
    if (!selectedDx || gameEnded) return;
    const feedback = getFeedback(selectedDx, caseData.diagnosis, ALL_DIAGNOSES);
    const newGuess = { name: selectedDx, feedback };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setSelectedDx("");

    if (feedback === "correct") {
      setWon(true);
      setGameOver(true);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
    }
  }, [selectedDx, gameEnded, guesses, caseData.diagnosis]);

  const buildShareText = () => {
    const emojiRow = guesses.map(g =>
      g.feedback === "correct" ? "🟩" : g.feedback === "related" ? "🟨" : "⬜"
    ).join("");
    return `MedGuess — Case #${caseData.id}\n${won ? guesses.length : "X"}/${MAX_GUESSES} | ${orderedTests.length} tests ordered\nScore: ${calcScore(guesses.length, orderedTests.length)}\n\n${emojiRow}\n\nPlay at medguess.app`;
  };

  const copyShare = () => {
    navigator.clipboard.writeText(buildShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const feedbackEmoji = { correct: "🟩", related: "🟨", unrelated: "⬜" };
  const feedbackLabel = { correct: "Correct!", related: "Same system, wrong dx", unrelated: "Unrelated" };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="header-logo">MedGuess</div>
          <div className="header-sub">Daily Medical Diagnosis Challenge</div>
          <div className="header-actions">
            <button
              className="btn-new-case"
              onClick={() => gameEnded ? startNewCase() : setShowConfirm(true)}
            >
              🔀 New Case
            </button>
            <button
              className="btn-new-case"
              onClick={() => setShowCasePicker(true)}
              style={{ borderColor: "rgba(0,212,255,0.4)", color: "var(--accent)" }}
            >
              # Go to Case
            </button>
          </div>
          <div className="case-indicator">Case #{caseData.id} · {CASES.length} total</div>
        </div>

        {/* Confirm Modal (only shown mid-game) */}
        {showConfirm && (
          <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
            <div className="confirm-box" onClick={e => e.stopPropagation()}>
              <div className="confirm-title">Skip this case?</div>
              <div className="confirm-body">
                You're in the middle of a case. Starting a new one will forfeit your current progress and score.
              </div>
              <div className="confirm-actions">
                <button className="btn btn-secondary" onClick={() => { setShowConfirm(false); setPendingCaseIndex(null); }}>Cancel</button>
                <button className="btn btn-primary" onClick={() => {
                  if (pendingCaseIndex !== null) jumpToCase(pendingCaseIndex);
                  else startNewCase();
                }}>Skip Case</button>
              </div>
            </div>
          </div>
        )}

        {/* Case Picker Modal */}
        {showCasePicker && (
          <div className="case-picker-overlay" onClick={() => setShowCasePicker(false)}>
            <div className="case-picker-box" onClick={e => e.stopPropagation()}>
              <div className="case-picker-title">Select a Case</div>
              <div className="case-picker-sub">{CASES.length} cases available</div>
              <div className="case-picker-grid">
                {CASES.map((c, idx) => (
                  <button
                    key={c.id}
                    className={`case-num-btn ${idx === caseIndex ? "active" : ""}`}
                    onClick={() => {
                      if (idx === caseIndex) { setShowCasePicker(false); return; }
                      if (!gameEnded) { setPendingCaseIndex(idx); setShowCasePicker(false); setShowConfirm(true); }
                      else jumpToCase(idx);
                    }}
                    title={`Case #${c.id}`}
                  >
                    #{c.id}
                  </button>
                ))}
              </div>
              <button className="btn btn-secondary case-picker-close" onClick={() => setShowCasePicker(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Patient Case */}
        <div className="case-card">
          <div className="case-title">📋 Patient Presentation</div>
          <div className="case-meta">
            <span className="badge">Age: {caseData.age}</span>
            <span className="badge">Sex: {caseData.sex}</span>
            <span className="badge">🏥 ED Consult</span>
          </div>
          <div className="complaint">"{caseData.chiefComplaint}"</div>
          <div className="section-label">Symptoms</div>
          <div className="symptoms-grid">
            {caseData.symptoms.map(s => <span key={s} className="symptom-tag">{s}</span>)}
          </div>
          <div className="section-label" style={{ marginTop: 12 }}>Vitals</div>
          <div className="vitals-row">
            {Object.entries(caseData.vitals).map(([k, v]) => (
              <div key={k} className="vital">
                <div className="vital-label">{k}</div>
                <div className="vital-val">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          <button className={`tab ${tab === "tests" ? "active" : ""}`} onClick={() => setTab("tests")}>
            Order Tests
          </button>
          <button className={`tab ${tab === "results" ? "active" : ""}`} onClick={() => setTab("results")}>
            Results ({testResults.length})
          </button>
          <button className={`tab ${tab === "diagnose" ? "active" : ""}`} onClick={() => setTab("diagnose")}>
            Diagnose
          </button>
        </div>

        {/* Tests Tab */}
        {tab === "tests" && (
          <div className="case-card">
            <div className="section-label">Available Investigations</div>
            <div className="progress-info">
              {orderedTests.length} test{orderedTests.length !== 1 ? "s" : ""} ordered — each test costs 20 points
            </div>
            <div className="tests-grid">
              {availableTests.map(t => (
                <button
                  key={t}
                  className={`test-btn ${gameEnded ? "disabled" : ""}`}
                  onClick={() => orderTest(t)}
                  disabled={gameEnded}
                >
                  {t}
                </button>
              ))}
              {orderedTests.map(t => (
                <button key={t} className="test-btn ordered" disabled>
                  ✓ {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Tab */}
        {tab === "results" && (
          <div>
            {testResults.length === 0 ? (
              <div className="case-card" style={{ textAlign: "center", color: "var(--text2)", padding: 32 }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>🔬</div>
                <div style={{ fontSize: "0.8rem" }}>No tests ordered yet. Go to "Order Tests" to begin your workup.</div>
              </div>
            ) : (
              <div className="results-list">
                {testResults.map(r => (
                  <div key={r.name} className="result-item">
                    <div className="result-header">
                      <span className="result-name">{r.name}</span>
                      <span className="result-flag" style={{
                        background: `${FLAG_COLORS[r.flag]}22`,
                        color: FLAG_COLORS[r.flag],
                        border: `1px solid ${FLAG_COLORS[r.flag]}44`
                      }}>
                        {FLAG_LABELS[r.flag]}
                      </span>
                    </div>
                    <div className="result-body">{r.result}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Diagnose Tab */}
        {tab === "diagnose" && (
          <div className="guesses-area">
            <div className="section-label">Diagnosis Attempts</div>

            <div className="attempts-bar">
              {Array.from({ length: MAX_GUESSES }).map((_, i) => (
                <div key={i} className={`attempt-dot ${i < guesses.length ? "used" : i === guesses.length && !gameEnded ? "current" : ""}`} />
              ))}
              <span style={{ fontSize: "0.65rem", color: "var(--text2)", marginLeft: 8 }}>
                {gameEnded ? "Done" : `${MAX_GUESSES - guesses.length} remaining`}
              </span>
            </div>

            <div className="legend">
              <div className="legend-item">🟩 <span>Correct diagnosis</span></div>
              <div className="legend-item">🟨 <span>Same system, wrong dx</span></div>
              <div className="legend-item">⬜ <span>Unrelated</span></div>
            </div>

            {guesses.length > 0 && (
              <div className="guess-history">
                {guesses.map((g, i) => (
                  <div key={i} className={`guess-row ${g.feedback}`}>
                    <span className="guess-emoji">{feedbackEmoji[g.feedback]}</span>
                    <div style={{ flex: 1 }}>
                      <div className="guess-text">{g.name}</div>
                      <div className="guess-sys">{feedbackLabel[g.feedback]} — {ALL_DIAGNOSES.find(d => d.name === g.name)?.system}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {guesses.length >= 2 && !won && (
              <div className="hint-area">
                💡 Hint: The correct diagnosis falls under <strong>{caseData.system}</strong>
              </div>
            )}

            {!gameEnded && (
              <>
                <div className="section-label" style={{ marginTop: 12 }}>Select Diagnosis</div>
                <input
                  className="search-input"
                  placeholder="Search diagnoses..."
                  value={dxSearch}
                  onChange={e => setDxSearch(e.target.value)}
                />
                <div className="dx-grid">
                  {filteredDx.map(d => (
                    <div
                      key={d.name}
                      className={`dx-option ${selectedDx === d.name ? "selected" : ""}`}
                      onClick={() => setSelectedDx(d.name)}
                    >
                      <span className="dx-name">{d.name}</span>
                      <span className="dx-sys">{d.system}</span>
                    </div>
                  ))}
                </div>
                <div className="guess-controls">
                  <button
                    className="btn btn-primary"
                    onClick={submitGuess}
                    disabled={!selectedDx}
                  >
                    Submit Guess
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Result Banner */}
        {gameEnded && (
          <div className={`result-banner ${won ? "win" : "lose"}`}>
            <div className="result-banner-emoji">{won ? "🩺" : "📖"}</div>
            <div className="result-banner-title">
              {won ? `Diagnosed in ${guesses.length} guess${guesses.length !== 1 ? "es" : ""}!` : "Case Closed"}
            </div>
            <div className="result-banner-dx">
              {won ? "Correct: " : "The diagnosis was: "}
              <strong style={{ color: "var(--text)" }}>{caseData.diagnosis}</strong>
            </div>

            <div className="score-display" style={{ justifyContent: "center" }}>
              <div>
                <div className="score-num">{currentScore}</div>
                <div className="score-label">Final Score</div>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text2)", textAlign: "left" }}>
                <div>Guesses: {guesses.length}/{MAX_GUESSES}</div>
                <div>Tests ordered: {orderedTests.length}</div>
              </div>
            </div>

            <div className="share-box">{buildShareText()}</div>
            <div className="result-actions">
              <button className="btn btn-primary" onClick={copyShare}>
                {copied ? "✓ Copied!" : "Share Result"}
              </button>
              <button className="btn-new-case" onClick={startNewCase}>
                🔀 Next Case
              </button>
            </div>
          </div>
        )}

        {/* Explanation Card — shown after game ends */}
        {gameEnded && (
          <div className="explanation-card">
            <div className="explanation-title">📚 Clinical Explanation — {caseData.diagnosis}</div>
            {caseData.explanation
              ? <div className="explanation-text">{caseData.explanation}</div>
              : <div className="explanation-text" style={{ color: "var(--text3)", fontStyle: "italic" }}>Explanation coming soon for this case.</div>
            }
            {caseData.keyTests && caseData.keyTests.length > 0 && (
              <>
                <div className="section-label">Key Tests to Order</div>
                <div className="key-tests-row">
                  {caseData.keyTests.map(t => (
                    <span key={t} className="key-test-tag">✓ {t}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "20px 0", fontSize: "0.62rem", color: "var(--text3)", letterSpacing: "2px", textTransform: "uppercase" }}>
          MedGuess · {CASES.length} cases available · For educational purposes
        </div>
      </div>
      {copied && <div className="copied-toast">✓ Copied to clipboard!</div>}
    </>
  );
}