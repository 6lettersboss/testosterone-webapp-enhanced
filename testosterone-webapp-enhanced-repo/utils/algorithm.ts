
export function estimateTestosterone(input: { hrv: number; age: number }): number {
  const { hrv, age } = input;
  return 400 + (hrv - age) * 1.5;
}

export function determineType(score: number): string {
  if (score >= 700) return '마초형';
  if (score >= 500) return '균형형';
  if (score >= 300) return '예술형';
  return '민감형';
}
