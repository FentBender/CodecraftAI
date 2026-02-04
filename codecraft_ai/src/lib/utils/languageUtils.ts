'use client';

import { getLanguageByValue, detectLanguageFromExtension } from '../config/languages';

export interface FormatOptions {
  indentSize: number;
  useTabs: boolean;
  lineWidth: number;
}

const DEFAULT_FORMAT_OPTIONS: FormatOptions = {
  indentSize: 2,
  useTabs: false,
  lineWidth: 80
};

// Language-specific formatting rules
const LANGUAGE_FORMATTERS: Record<string, (code: string, options: FormatOptions) => string> = {
  javascript: formatJavaScriptLike,
  typescript: formatJavaScriptLike,
  python: formatPython,
  java: formatJavaScriptLike,
  csharp: formatJavaScriptLike,
  cpp: formatJavaScriptLike,
  c: formatJavaScriptLike,
  rust: formatJavaScriptLike,
  go: formatGo,
  swift: formatJavaScriptLike,
  kotlin: formatJavaScriptLike,
  dart: formatJavaScriptLike,
  php: formatJavaScriptLike,
  ruby: formatRuby,
  perl: formatPerl,
  bash: formatBash,
  sql: formatSQL,
  postgresql: formatSQL,
  mysql: formatSQL
};

function formatJavaScriptLike(code: string, options: FormatOptions): string {
  // Basic formatting for C-style languages
  let formatted = code;
  const indent = options.useTabs ? '\t' : ' '.repeat(options.indentSize);
  
  // Add newlines after opening braces
  formatted = formatted.replace(/{\s*/g, '{\n');
  
  // Add newlines before closing braces
  formatted = formatted.replace(/\s*}/g, '\n}');
  
  // Add semicolons if missing (for languages that use them)
  formatted = formatted.replace(/(\w+)\s*$/gm, '$1;');
  
  return formatted;
}

function formatPython(code: string, options: FormatOptions): string {
  // Python-specific formatting
  let formatted = code;
  const indent = ' '.repeat(options.indentSize);
  
  // Ensure proper spacing around operators
  formatted = formatted.replace(/([^\s])=([^\s=])/g, '$1 = $2');
  formatted = formatted.replace(/([^\s])\+([^\s+])/g, '$1 + $2');
  
  return formatted;
}

function formatGo(code: string, options: FormatOptions): string {
  // Go uses tabs by default
  let formatted = code;
  formatted = formatted.replace(/^( {2,})/gm, '\t');
  return formatted;
}

function formatRuby(code: string, options: FormatOptions): string {
  // Ruby-specific formatting
  let formatted = code;
  const indent = ' '.repeat(options.indentSize);
  
  // Ensure proper spacing
  formatted = formatted.replace(/([^\s])=([^\s=])/g, '$1 = $2');
  
  return formatted;
}

function formatPerl(code: string, options: FormatOptions): string {
  // Perl-specific formatting
  let formatted = code;
  
  // Ensure semicolons at end of statements
  formatted = formatted.replace(/(\w+)\s*$/gm, '$1;');
  
  return formatted;
}

function formatBash(code: string, options: FormatOptions): string {
  // Bash script formatting
  let formatted = code;
  
  // Ensure proper spacing around operators
  formatted = formatted.replace(/([^\s])=([^\s])/g, '$1=$2');
  
  return formatted;
}

function formatSQL(code: string, options: FormatOptions): string {
  // SQL formatting
  let formatted = code;
  const indent = options.useTabs ? '\t' : ' '.repeat(options.indentSize);
  
  // Uppercase SQL keywords
  const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 
                    'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 
                    'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE'];
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    formatted = formatted.replace(regex, keyword);
  });
  
  return formatted;
}

export function formatCode(code: string, language: string, options: Partial<FormatOptions> = {}): string {
  const mergedOptions = { ...DEFAULT_FORMAT_OPTIONS, ...options };
  const formatter = LANGUAGE_FORMATTERS[language];
  
  if (formatter) {
    return formatter(code, mergedOptions);
  }
  
  // Return original code if no formatter available
  return code;
}

export function validateCode(code: string, language: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Basic validation rules
  if (!code.trim()) {
    errors.push('Code cannot be empty');
    return { valid: false, errors };
  }
  
  // Language-specific validation
  const langConfig = getLanguageByValue(language);
  if (!langConfig) {
    errors.push('Unknown language');
    return { valid: false, errors };
  }
  
  // Check for common syntax issues
  const bracketLanguages = ['javascript', 'typescript', 'java', 'csharp', 'cpp', 'c', 'rust', 'go', 'swift', 'kotlin', 'dart', 'php'];
  if (bracketLanguages.includes(language)) {
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push('Mismatched braces');
    }
    
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push('Mismatched parentheses');
    }
  }
  
  return { valid: errors.length === 0, errors };
}

export function getLanguageDocumentation(language: string): { name: string; description: string; links: { title: string; url: string }[] } | null {
  const langConfig = getLanguageByValue(language);
  if (!langConfig) return null;
  
  const docs: Record<string, { title: string; url: string }[]> = {
    javascript: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { title: 'JavaScript.info', url: 'https://javascript.info/' }
    ],
    typescript: [
      { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
      { title: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/' }
    ],
    python: [
      { title: 'Python Official Docs', url: 'https://docs.python.org/3/' },
      { title: 'Real Python', url: 'https://realpython.com/' }
    ],
    rust: [
      { title: 'The Rust Book', url: 'https://doc.rust-lang.org/book/' },
      { title: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/' }
    ],
    go: [
      { title: 'Go Documentation', url: 'https://go.dev/doc/' },
      { title: 'Go by Example', url: 'https://gobyexample.com/' }
    ],
    swift: [
      { title: 'Swift Documentation', url: 'https://swift.org/documentation/' },
      { title: 'Swift Programming Guide', url: 'https://docs.swift.org/swift-book/' }
    ],
    kotlin: [
      { title: 'Kotlin Docs', url: 'https://kotlinlang.org/docs/home.html' },
      { title: 'Kotlin Koans', url: 'https://play.kotlinlang.org/koans/' }
    ],
    dart: [
      { title: 'Dart Language Tour', url: 'https://dart.dev/guides/language/language-tour' },
      { title: 'Flutter Docs', url: 'https://flutter.dev/docs' }
    ],
    java: [
      { title: 'Java Documentation', url: 'https://docs.oracle.com/en/java/' },
      { title: 'Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/' }
    ],
    csharp: [
      { title: 'C# Documentation', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/' },
      { title: 'C# Programming Guide', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/' }
    ],
    ruby: [
      { title: 'Ruby Documentation', url: 'https://www.ruby-lang.org/en/documentation/' },
      { title: 'Ruby on Rails Guides', url: 'https://guides.rubyonrails.org/' }
    ],
    php: [
      { title: 'PHP Manual', url: 'https://www.php.net/manual/en/' },
      { title: 'PHP The Right Way', url: 'https://phptherightway.com/' }
    ],
    r: [
      { title: 'R Documentation', url: 'https://www.r-project.org/other-docs.html' },
      { title: 'R for Data Science', url: 'https://r4ds.had.co.nz/' }
    ],
    haskell: [
      { title: 'Learn You a Haskell', url: 'http://learnyouahaskell.com/' },
      { title: 'Haskell Documentation', url: 'https://www.haskell.org/documentation/' }
    ],
    elixir: [
      { title: 'Elixir Documentation', url: 'https://elixir-lang.org/docs.html' },
      { title: 'Elixir School', url: 'https://elixirschool.com/en/' }
    ],
    scala: [
      { title: 'Scala Documentation', url: 'https://docs.scala-lang.org/' },
      { title: 'Scala Tour', url: 'https://docs.scala-lang.org/tour/tour-of-scala.html' }
    ]
  };
  
  return {
    name: langConfig.label,
    description: langConfig.description,
    links: docs[language] || []
  };
}

export function detectLanguage(code: string, filename?: string): string {
  // Try to detect from filename first
  if (filename) {
    const detected = detectLanguageFromExtension(filename);
    if (detected) return detected.value;
  }
  
  // Detect from code patterns
  if (code.includes('<?php')) return 'php';
  if (code.includes('#!/bin/bash') || code.includes('#!/bin/sh')) return 'bash';
  if (code.match(/^package \w+/m) && code.includes('func ')) return 'go';
  if (code.includes('fn main()') && code.includes('println!')) return 'rust';
  if (code.includes('def ') && code.includes(':')) return 'python';
  if (code.includes('function ') || code.includes('const ') || code.includes('let ')) return 'javascript';
  if (code.includes('interface ') && code.includes(': ')) return 'typescript';
  if (code.includes('public class ') && code.includes('static void main')) return 'java';
  if (code.includes('using System;')) return 'csharp';
  if (code.includes('#include <iostream>')) return 'cpp';
  if (code.includes('import Foundation')) return 'swift';
  if (code.includes('fun main()')) return 'kotlin';
  if (code.includes('void main()') && code.includes('print(')) return 'dart';
  if (code.includes('SELECT ') || code.includes('INSERT ') || code.includes('CREATE TABLE')) return 'sql';
  
  // Default to javascript if can't detect
  return 'javascript';
}