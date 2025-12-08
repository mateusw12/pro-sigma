export interface VariabilityResult {
  mean?: number;
  std?: number;
  cv?: number;
  range?: number;
  min?: number;
  max?: number;
  q1?: number;
  q2?: number;
  q3?: number;
  variance?: number;
  iqr?: number;
}

export interface ProcessCapabilityResult {
  cp?: number;
  cpk?: number;
  pp?: number;
  ppk?: number;
  mean?: number;
  std?: number;
  within_spec?: number;
}

export interface HypothesisTestResult {
  statistic?: number;
  pvalue?: number;
  alpha?: number;
  reject_null?: boolean;
  conclusion?: string;
  confidence_interval?: [number, number];
}

export interface RegressionResult {
  equation?: string;
  r_squared?: number;
  slope?: number;
  intercept?: number;
  p_value?: number;
}

export interface AnalysisResultsProps {
  visible: boolean;
  onClose: () => void;
  toolName: string;
  results: Record<string, unknown> | null;
}
