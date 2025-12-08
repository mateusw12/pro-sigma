// Tipos para upload de arquivos

export interface FileUploadRequest {
  file: File;
}

export interface FileUploadResponse {
  success: boolean;
  id: string;
  columns: string[];
  preview: any[];
  rowCount: number;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface FileUploadError {
  error: string;
  message?: string;
  details?: any;
}

export interface BackendFileData {
  id?: string;
  file_id?: string;
  columns?: string[];
  preview?: any[];
  row_count?: number;
  rows?: number;
}
