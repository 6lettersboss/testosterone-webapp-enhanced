mport React, { useState } from 'react';

interface DataRow {
  metric: string;
  input: string;
  formula?: string;
  example?: string;
  ref?: string;
}

const data: DataRow[] = [
  { metric: 'Sex', input: 'M' },
  { metric: 'Age', input: '30' },
  { metric: 'Height (cm)', input: '176' },
  { metric: 'Weight (kg)', input: '74' },
  { metric: 'BMI', input: '23.9' },
  { metric: 'Baseline Testosterone', input: '500' },
  { metric: 'SDNN (ms)', input: '65', formula: '+15 if >60, -15 if <40', example: '15', ref: 'HRV & SDNN' },
  { metric: 'RMSSD (ms)', input: '50', formula: '+20 if >45, -20 if <30', example: '20', ref: 'RMSSD & Testosterone' },
  { metric: 'LF (ms^2)', input: '850', formula: '+10 if >800', example: '0', ref: 'LF' },
  { metric: 'HF (ms^2)', input: '700', formula: '+10 if >600', example: '10', ref: 'HF' },
  { metric: 'LF/HF Ratio', input: '1.2', formula: '-15 if >2 or <0.5', example: '-15', ref: 'LF/HF ratio' },
  { metric: 'Type 2 Diabetes (Y/N)', input: 'Y', formula: '', example: '-60', ref: 'Type 2 DM' },
  { metric: 'Sleep Apnea (Y/N)', input: 'Y', formula: '', example: '-20', ref: 'Sleep Apnea' },
  { metric: 'Hypertension (Y/N)', input: 'N', formula: '', example: '-10', ref: 'Hypertension' },
  { metric: 'Liver/Kidney Disease (Y/N)', input: 'N', formula: '', example: '-25', ref: 'Liver/Kidney' },
  { metric: 'Hypothyroidism (Y/N)', input: 'N', formula: '', example: '-20', ref: 'Thyroid' },
  { metric: 'Glucocorticoids (Y/N)', input: 'N', formula: '', example: '-50', ref: 'Glucocorticoids' },
  { metric: 'Opioids (Y/N)', input: 'N', formula: '', example: '-40', ref: 'Opioids' },
  { metric: 'Antifungal (Y/N)', input: 'N', formula: '', example: '-40', ref: 'Antifungal' },
  { metric: 'Spironolactone (Y/N)', input: 'N', formula: '', example: '-30', ref: 'Spironolactone' },
  { metric: 'Cimetidine (Y/N)', input: 'N', formula: '', example: '-20', ref: 'Cimetidine' },
  { metric: 'Clomiphene (Y/N)', input: 'Y', formula: '', example: '+50', ref: 'Clomiphene' },
  { metric: 'hCG (Y/N)', input: 'N', formula: '', example: '+50', ref: 'hCG' },
  { metric: 'Anti-estrogens (Y/N)', input: 'N', formula: '', example: '+35', ref: 'Anti-estrogens' },
  { metric: 'Chronic Alcohol (Y/N)', input: 'N', formula: '', example: '-30', ref: 'Alcohol' },
  { metric: 'Exercise (Y/N)', input: 'Y', formula: '', example: '+40', ref: 'Exercise' },
  { metric: 'Final Testosterone', input: '550' },
  { metric: 'Change vs Normal (5%)', input: '10% higher' },
  { metric: 'Daily Sleep Duration', input: '4.5 hrs', formula: '+10 if ≥4 hrs, -10 if <4 hrs', example: '+10', ref: 'Apple Watch Sleep Tracking' },
  { metric: 'Weekly Sleep Consistency', input: '≥4 days over 4 hrs', formula: '+10 if ≥4 days/7 days, -10 if <3 days', example: '+10', ref: 'Sleep Consistency & Testosterone' },
  { metric: 'Daily Step Count', input: '3,000 steps', formula: '+5 if ≥3,000, -5 if <2,000', example: '+5', ref: 'Step Count & Testosterone' },
  { metric: 'Weekly Step Average', input: '<3,000 steps ≥3 days', formula: '', example: '-5', ref: 'Activity Deficiency' },
  { metric: 'Moderate Exercise Weekly', input: '2 hrs', formula: '+10 if ≥2 sessions/week (≥1hr)', example: '+10', ref: 'Moderate Exercise Weekly' },
  { metric: 'High-Intensity Training Weekly', input: '1 session', formula: '+15 if ≥1 session/week', example: '+15', ref: 'High-Intensity Training' },
  { metric: 'Consistent Aerobic Exercise', input: '3 sessions/week', formula: '+5 if consistent, 0 if stopped', example: '+5', ref: 'Consistent Aerobic Exercise Study' },
];

const refTitles: Record<string, string> = {
  'HRV & SDNN': 'Heart Rate Variability and SDNN',
  'RMSSD & Testosterone': 'RMSSD Correlation with Testosterone',
  'LF': 'Low Frequency Power and Autonomic Balance',
  'HF': 'High Frequency Power in HRV Studies',
  'LF/HF ratio': 'LF/HF Ratio as Stress Marker',
  'Type 2 DM': 'Testosterone Levels in Type 2 Diabetes Mellitus',
  'Sleep Apnea': 'Effect of Sleep Apnea on Testosterone',
  'Hypertension': 'Hypertension and Hormonal Variations',
  'Liver/Kidney': 'Chronic Liver and Kidney Disease Influence',
  'Thyroid': 'Hypothyroidism and Androgen Levels',
  'Glucocorticoids': 'Impact of Glucocorticoid Therapy',
  'Opioids': 'Opioid-Induced Endocrine Disorders',
  'Antifungal': 'Antifungal Agents and Steroidogenesis',
  'Spironolactone': 'Anti-Androgenic Effect of Spironolactone',
  'Cimetidine': 'Cimetidine-Related Hormonal Changes',
  'Clomiphene': 'Clomiphene Citrate and Testosterone',
  'hCG': 'hCG Therapy for Hypogonadism',
  'Anti-estrogens': 'Role of Anti-Estrogen Drugs',
  'Alcohol': 'Chronic Alcohol Consumption and Testosterone',
  'Exercise': 'Exercise-Induced Testosterone Boost',
  'Apple Watch Sleep Tracking': 'Accuracy of Wearable Sleep Tracking',
  'Sleep Consistency & Testosterone': 'Sleep Regularity and Hormonal Balance',
  'Step Count & Testosterone': 'Walking Activity and Testosterone',
  'Activity Deficiency': 'Sedentary Behavior Impact',
  'Moderate Exercise Weekly': 'Benefits of Moderate Weekly Exercise',
  'High-Intensity Training': 'High-Intensity Training Effects',
  'Consistent Aerobic Exercise Study': 'Consistent Aerobic Exercise Study',
};

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [datingStatus, setDatingStatus] = useState('');
  const [datingPreference, setDatingPreference] = useState('');
  const [datesPerMonth, setDatesPerMonth] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name || !email) {
      alert('이름과 이메일을 입력해주세요.');
      alert('Please enter name and email');
      return;
    }

    const hrv = 52; // mock data
    const testosterone = hrv * 1.35 + 180 + Math.random() * 50;
    const personality = testosterone > 250 ? '🔥 열정형' : '❄️ 이성형';
    const personality = testosterone > 250 ? '🔥 Passionate' : '❄️ Rational';

    setResult(testosterone);
    setType(personality);
  };

  const handleCopy = () => {
    if (result !== null) {
      const text = `Name: ${name}\nTestosterone: ${result.toFixed(2)} ng/dL\nType: ${type}`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>테스토스테론 추정기</h1>
      <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', marginBottom: 10 }} />
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', marginBottom: 10 }} />
      <button onClick={handleSubmit}>결과 보기</button>
      <h1>Testosterone Estimator</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />
      <select
        value={datingStatus}
        onChange={(e) => setDatingStatus(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      >
        <option value="">Select Dating Status</option>
        <option value="single_not_dating">Single, not dating</option>
        <option value="single_dating">Single, actively dating</option>
        <option value="relationship">In a relationship</option>
        <option value="married">Married/Long-term</option>
      </select>
      <select
        value={datingPreference}
        onChange={(e) => setDatingPreference(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      >
        <option value="">Preferred Dating Type</option>
        <option value="long_term">Long-term</option>
        <option value="short_term">Short-term</option>
        <option value="casual">Casual</option>
      </select>
      <input
        placeholder="Dates per Month"
        value={datesPerMonth}
        onChange={(e) => setDatesPerMonth(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />
      <button onClick={handleSubmit}>Show Result</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>{name}님의 결과</h2>
          <p>예상 테스토스테론: {result.toFixed(2)} ng/dL</p>
          <p>유형: {type}</p>
          <h2>{name}'s Result</h2>
          <p>Estimated Testosterone: {result.toFixed(2)} ng/dL</p>
          <p>Type: {type}</p>
          <button onClick={handleCopy} style={{ marginBottom: 20 }}>
            Copy Result
          </button>
          <table
            border={1}
            cellPadding={4}
            style={{ borderCollapse: 'collapse', marginBottom: 20 }}
          >
            <thead>
              <tr>
                <th>Metric</th>
                <th>Input</th>
                <th>Formula Change</th>
                <th>Example Change</th>
                <th>Ref</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.metric}>
                  <td>{row.metric}</td>
                  <td>{row.input}</td>
                  <td>{row.formula || '-'}</td>
                  <td>{row.example || '-'}</td>
                  <td>{row.ref ? `[${refTitles[row.ref]}]` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ol>
            {Object.keys(refTitles).map((key) => (
              <li key={key}>{refTitles[key]}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
}
