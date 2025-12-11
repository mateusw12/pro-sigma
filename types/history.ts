// Tipos para histórico de análises e arquivos

export interface HistoryFile {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  columns: string[];
  rowCount: number;
  uploadedBy: string;
}

export interface HistoryAnalysis {
  id: string;
  name: string;
  type: string;
  fileId: string;
  fileName: string;
  executedAt: Date;
  selectedColumns: string[];
  results?: any;
  status: 'completed' | 'failed' | 'pending';
  duration: number; // em ms
}

export interface AnalysisHistory {
  files: HistoryFile[];
  analyses: HistoryAnalysis[];
}
