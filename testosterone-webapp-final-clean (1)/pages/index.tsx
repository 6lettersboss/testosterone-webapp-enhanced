import React, { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name || !email) {
      alert('이름과 이메일을 입력해주세요.');
      return;
    }

    const hrv = 52; // mock data
    const testosterone = hrv * 1.35 + 180 + Math.random() * 50;
    const personality = testosterone > 250 ? '🔥 열정형' : '❄️ 이성형';

    setResult(testosterone);
    setType(personality);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>테스토스테론 추정기</h1>
      <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', marginBottom: 10 }} />
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', marginBottom: 10 }} />
      <button onClick={handleSubmit}>결과 보기</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>{name}님의 결과</h2>
          <p>예상 테스토스테론: {result.toFixed(2)} ng/dL</p>
          <p>유형: {type}</p>
        </div>
      )}
    </div>
  );
}