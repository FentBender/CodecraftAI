'use client';

interface CodeSnippet {
  id: string;
  userId: string;
  projectId?: string;
  title: string;
  description?: string;
  code: string;
  language: string;
  prompt?: string;
  linesOfCode: number;
  isFavorite: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversionHistory {
  id: string;
  userId: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceCode: string;
  convertedCode: string;
  createdAt: string;
}

const STORAGE_KEYS = {
  CODE_SNIPPETS: 'code_snippets',
  PROJECTS: 'projects',
  CONVERSION_HISTORY: 'conversion_history'
};

function getFromStorage<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const codeSnippetService = {
  async getAll(userId: string): Promise<CodeSnippet[]> {
    const snippets = getFromStorage<CodeSnippet>(STORAGE_KEYS.CODE_SNIPPETS);
    return snippets.filter(s => s.userId === userId);
  },

  async create(snippet: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>): Promise<CodeSnippet> {
    const snippets = getFromStorage<CodeSnippet>(STORAGE_KEYS.CODE_SNIPPETS);
    const newSnippet: CodeSnippet = {
      ...snippet,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    snippets.push(newSnippet);
    saveToStorage(STORAGE_KEYS.CODE_SNIPPETS, snippets);
    return newSnippet;
  },

  async update(id: string, updates: Partial<CodeSnippet>): Promise<CodeSnippet> {
    const snippets = getFromStorage<CodeSnippet>(STORAGE_KEYS.CODE_SNIPPETS);
    const index = snippets.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Snippet not found');
    
    snippets[index] = {
      ...snippets[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveToStorage(STORAGE_KEYS.CODE_SNIPPETS, snippets);
    return snippets[index];
  },

  async delete(id: string): Promise<void> {
    const snippets = getFromStorage<CodeSnippet>(STORAGE_KEYS.CODE_SNIPPETS);
    const filtered = snippets.filter(s => s.id !== id);
    saveToStorage(STORAGE_KEYS.CODE_SNIPPETS, filtered);
  }
};

export const projectService = {
  async getAll(userId: string): Promise<Project[]> {
    const projects = getFromStorage<Project>(STORAGE_KEYS.PROJECTS);
    return projects.filter(p => p.userId === userId);
  },

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const projects = getFromStorage<Project>(STORAGE_KEYS.PROJECTS);
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.push(newProject);
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = getFromStorage<Project>(STORAGE_KEYS.PROJECTS);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    return projects[index];
  },

  async delete(id: string): Promise<void> {
    const projects = getFromStorage<Project>(STORAGE_KEYS.PROJECTS);
    const filtered = projects.filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PROJECTS, filtered);
  }
};

export const conversionHistoryService = {
  async getAll(userId: string): Promise<ConversionHistory[]> {
    const history = getFromStorage<ConversionHistory>(STORAGE_KEYS.CONVERSION_HISTORY);
    return history.filter(h => h.userId === userId);
  },

  async create(conversion: Omit<ConversionHistory, 'id' | 'createdAt'>): Promise<ConversionHistory> {
    const history = getFromStorage<ConversionHistory>(STORAGE_KEYS.CONVERSION_HISTORY);
    const newConversion: ConversionHistory = {
      ...conversion,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    history.push(newConversion);
    saveToStorage(STORAGE_KEYS.CONVERSION_HISTORY, history);
    return newConversion;
  },

  async delete(id: string): Promise<void> {
    const history = getFromStorage<ConversionHistory>(STORAGE_KEYS.CONVERSION_HISTORY);
    const filtered = history.filter(h => h.id !== id);
    saveToStorage(STORAGE_KEYS.CONVERSION_HISTORY, filtered);
  }
};