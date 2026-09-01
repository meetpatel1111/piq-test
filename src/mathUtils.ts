export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

export interface ComputeOptions {
  round: boolean;
  precision?: number;
}

export function computeStats(values: number[], options: ComputeOptions): { sum: number; mean: number } {
  if (values.length === 0) return { sum: 0, mean: 0 };
  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = sum / values.length;
  if (options.round) {
    const p = options.precision ?? 2;
    return { sum: Number(sum.toFixed(p)), mean: Number(mean.toFixed(p)) };
  }
  return { sum, mean };
}
