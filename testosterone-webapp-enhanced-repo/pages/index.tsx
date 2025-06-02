
import React, { useState } from 'react';
import { estimateTestosterone, determineType } from '../utils/algorithm';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<{ testosterone: number; type: string } | null>(null);

  const handleDownload = () => {
    if (!result) return;
    const content = `이름: ${name}\n이메일: ${email}\n예상 테스토스테론 수치: ${result.testosterone.toFixed(2)} ng/dL\n유형: ${result.type}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'testosterone_result.txt';
    link.click();
  };

  const handleSubmit = () => {
    if (!email || !name || !consent) {
      alert('모든 항목을 입력하고 동의해야 측정이 가능합니다.');
      return;
    }
    const mockInput = { hrv: 52, age: 30 };
    const testosterone = estimateTestosterone(mockInput);
    const type = determineType(testosterone);
    setResult({ testosterone, type });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>6Letters 테스토스테론 측정</h1>
      <input
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, marginBottom: 10, display: 'block' }}
      />
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, marginBottom: 10, display: 'block' }}
      />
      <label>
        <input
          type="checkbox"
          checked={consent}
          onChange={() => setConsent(!consent)}
        />
        개인정보 활용 및 이메일 수신에 동의합니다
      </label>
      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        테스토스테론 측정하기
      </button>
      {result && (
        <div style={{ marginTop: 20, border: '1px solid #ccc', padding: 20 }}>
          <h2>분석 결과</h2>
          <p><strong>이름:</strong> {name}</p>
          <p><strong>이메일:</strong> {email}</p>
          <p><strong>예상 테스토스테론 수치:</strong> {result.testosterone.toFixed(2)} ng/dL</p>
          <p><strong>유형:</strong> {result.type}</p>
          <button onClick={handleDownload} style={{ marginTop: 10 }}>
            결과 다운로드
          </button>
        </div>
      )}
    </div>
  );
}
