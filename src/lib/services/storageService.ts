'use client';

interface FileUpload {
  id: string;
  userId: string;
  projectId?: string;
  fileName: string;
  fileContent: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

const STORAGE_KEY = 'code_genie_files';

function getFromStorage(): FileUpload[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveToStorage(data: FileUpload[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const storageService = {
  async uploadFile(file: File, userId: string, projectId?: string): Promise<FileUpload> {
    const files = getFromStorage();
    const fileContent = await readFileAsBase64(file);
    
    const newFile: FileUpload = {
      id: generateId(),
      userId,
      projectId,
      fileName: file.name,
      fileContent,
      fileSize: file.size,
      mimeType: file.type,
      createdAt: new Date().toISOString()
    };
    
    files.push(newFile);
    saveToStorage(files);
    return newFile;
  },

  async getFileUrl(fileId: string): Promise<string> {
    const files = getFromStorage();
    const file = files.find(f => f.id === fileId);
    if (!file) throw new Error('File not found');
    return file.fileContent;
  },

  async downloadFile(fileId: string): Promise<Blob> {
    const files = getFromStorage();
    const file = files.find(f => f.id === fileId);
    if (!file) throw new Error('File not found');
    
    const response = await fetch(file.fileContent);
    return response.blob();
  },

  async deleteFile(id: string): Promise<void> {
    const files = getFromStorage();
    const filtered = files.filter(f => f.id !== id);
    saveToStorage(filtered);
  },

  async getUserFiles(userId: string): Promise<FileUpload[]> {
    const files = getFromStorage();
    return files.filter(f => f.userId === userId);
  }
};