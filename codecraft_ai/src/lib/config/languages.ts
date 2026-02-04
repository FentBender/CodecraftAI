'use client';

export interface LanguageConfig {
  value: string;
  label: string;
  category: 'systems' | 'web' | 'mobile' | 'data' | 'functional' | 'scripting' | 'markup' | 'gaming' | 'graphics';
  extensions: string[];
  syntaxHighlight: string;
  template: string;
  description: string;
}

export const LANGUAGE_CATEGORIES = {
  systems: 'Systems Programming',
  web: 'Web Development',
  mobile: 'Mobile Development',
  data: 'Data & Scientific',
  functional: 'Functional Programming',
  scripting: 'Scripting & Automation',
  markup: 'Markup & Config',
  gaming: 'Game Development',
  graphics: 'Graphics Programming'
};

export const LANGUAGES: LanguageConfig[] = [
  // Web Development
  {
    value: 'javascript',
    label: 'JavaScript',
    category: 'web',
    extensions: ['.js', '.mjs', '.cjs'],
    syntaxHighlight: 'javascript',
    description: 'Dynamic web programming language',
    template: `// JavaScript Example
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`
  },
  {
    value: 'typescript',
    label: 'TypeScript',
    category: 'web',
    extensions: ['.ts', '.tsx'],
    syntaxHighlight: 'typescript',
    description: 'Typed superset of JavaScript',
    template: `// TypeScript Example
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = { name: 'World', age: 25 };
console.log(greet(user));`
  },
  {
    value: 'php',
    label: 'PHP',
    category: 'web',
    extensions: ['.php'],
    syntaxHighlight: 'php',
    description: 'Server-side scripting language',
    template: `<?php
// PHP Example
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`
  },
  {
    value: 'ruby',
    label: 'Ruby',
    category: 'web',
    extensions: ['.rb'],
    syntaxHighlight: 'ruby',
    description: 'Dynamic, object-oriented language',
    template: `# Ruby Example
def greet(name)
  "Hello, #{name}!"
end

puts greet("World")`
  },
  // Systems Programming
  {
    value: 'rust',
    label: 'Rust',
    category: 'systems',
    extensions: ['.rs'],
    syntaxHighlight: 'rust',
    description: 'Memory-safe systems programming',
    template: `// Rust Example
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("World"));
}`
  },
  {
    value: 'go',
    label: 'Go',
    category: 'systems',
    extensions: ['.go'],
    syntaxHighlight: 'go',
    description: 'Concurrent programming language',
    template: `// Go Example
package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    fmt.Println(greet("World"))
}`
  },
  {
    value: 'zig',
    label: 'Zig',
    category: 'systems',
    extensions: ['.zig'],
    syntaxHighlight: 'zig',
    description: 'Low-level systems programming',
    template: `// Zig Example
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, World!\\n", .{});
}`
  },
  {
    value: 'c',
    label: 'C',
    category: 'systems',
    extensions: ['.c', '.h'],
    syntaxHighlight: 'c',
    description: 'Low-level procedural language',
    template: `// C Example
#include <stdio.h>

void greet(const char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    greet("World");
    return 0;
}`
  },
  {
    value: 'cpp',
    label: 'C++',
    category: 'systems',
    extensions: ['.cpp', '.hpp', '.cc', '.cxx'],
    syntaxHighlight: 'cpp',
    description: 'Object-oriented systems language',
    template: `// C++ Example
#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << greet("World") << std::endl;
    return 0;
}`
  },
  {
    value: 'assembly',
    label: 'Assembly',
    category: 'systems',
    extensions: ['.asm', '.s'],
    syntaxHighlight: 'x86asm',
    description: 'Low-level machine code',
    template: `; Assembly Example (x86-64)
section .data
    msg db 'Hello, World!', 0xA
    len equ $ - msg

section .text
    global _start

_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall
    
    mov rax, 60
    xor rdi, rdi
    syscall`
  },
  // Mobile Development
  {
    value: 'swift',
    label: 'Swift',
    category: 'mobile',
    extensions: ['.swift'],
    syntaxHighlight: 'swift',
    description: 'iOS app development',
    template: `// Swift Example
import Foundation

func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print(greet(name: "World"))`
  },
  {
    value: 'kotlin',
    label: 'Kotlin',
    category: 'mobile',
    extensions: ['.kt', '.kts'],
    syntaxHighlight: 'kotlin',
    description: 'Android development',
    template: `// Kotlin Example
fun greet(name: String): String {
    return "Hello, $name!"
}

fun main() {
    println(greet("World"))
}`
  },
  {
    value: 'dart',
    label: 'Dart',
    category: 'mobile',
    extensions: ['.dart'],
    syntaxHighlight: 'dart',
    description: 'Flutter mobile apps',
    template: `// Dart Example
String greet(String name) {
  return 'Hello, $name!';
}

void main() {
  print(greet('World'));
}`
  },
  {
    value: 'objectivec',
    label: 'Objective-C',
    category: 'mobile',
    extensions: ['.m', '.mm', '.h'],
    syntaxHighlight: 'objectivec',
    description: 'Legacy iOS development',
    template: `// Objective-C Example
#import <Foundation/Foundation.h>

NSString* greet(NSString* name) {
    return [NSString stringWithFormat:@"Hello, %@!", name];
}

int main() {
    @autoreleasepool {
        NSLog(@"%@", greet(@"World"));
    }
    return 0;
}`
  },
  // Data & Scientific
  {
    value: 'python',
    label: 'Python',
    category: 'data',
    extensions: ['.py'],
    syntaxHighlight: 'python',
    description: 'General-purpose programming',
    template: `# Python Example
def greet(name: str) -> str:
    return f"Hello, {name}!"

if __name__ == "__main__": print(greet("World"))`
  },
  {
    value: 'r',
    label: 'R',
    category: 'data',
    extensions: ['.r', '.R'],
    syntaxHighlight: 'r',
    description: 'Statistical computing',
    template: `# R Example
greet <- function(name) {
  paste("Hello,", name, "!")
}

print(greet("World"))`
  },
  {
    value: 'matlab',
    label: 'MATLAB',
    category: 'data',
    extensions: ['.m'],
    syntaxHighlight: 'matlab',
    description: 'Mathematical computing',
    template: `% MATLAB Example
function result = greet(name)
    result = ['Hello, ', name, '!'];
end

disp(greet('World'));`
  },
  {
    value: 'julia',
    label: 'Julia',
    category: 'data',
    extensions: ['.jl'],
    syntaxHighlight: 'julia',
    description: 'High-performance scientific computing',
    template: `# Julia Example
function greet(name::String)::String
    return "Hello, $name!"
end

println(greet("World"))`
  },
  // Functional Programming
  {
    value: 'haskell',
    label: 'Haskell',
    category: 'functional',
    extensions: ['.hs'],
    syntaxHighlight: 'haskell',
    description: 'Pure functional language',
    template: `-- Haskell Example
greet :: String -> String
greet name = "Hello, " ++ name ++ "!"

main :: IO ()
main = putStrLn $ greet "World"`
  },
  {
    value: 'fsharp',
    label: 'F#',
    category: 'functional',
    extensions: ['.fs', '.fsx'],
    syntaxHighlight: 'fsharp',
    description: '.NET functional language',
    template: `// F# Example
let greet name =
    sprintf "Hello, %s!" name

[<EntryPoint>]
let main argv =
    printfn "%s" (greet "World")
    0`
  },
  {
    value: 'clojure',
    label: 'Clojure',
    category: 'functional',
    extensions: ['.clj', '.cljs'],
    syntaxHighlight: 'clojure',
    description: 'Lisp on the JVM',
    template: `; Clojure Example
(defn greet [name]
  (str "Hello, " name "!"))

(println (greet "World"))`
  },
  {
    value: 'elixir',
    label: 'Elixir',
    category: 'functional',
    extensions: ['.ex', '.exs'],
    syntaxHighlight: 'elixir',
    description: 'Concurrent functional programming',
    template: `# Elixir Example
defmodule Greeter do
  def greet(name) do
    "Hello, #{name}!"
  end
end

IO.puts Greeter.greet("World")`
  },
  {
    value: 'scala',
    label: 'Scala',
    category: 'functional',
    extensions: ['.scala'],
    syntaxHighlight: 'scala',
    description: 'JVM functional programming',
    template: `// Scala Example
object Main {
  def greet(name: String): String = {
    s"Hello, $name!"
  }
  
  def main(args: Array[String]): Unit = {
    println(greet("World"))
  }
}`
  },
  // Scripting & Automation
  {
    value: 'bash',
    label: 'Bash',
    category: 'scripting',
    extensions: ['.sh', '.bash'],
    syntaxHighlight: 'bash',
    description: 'Unix shell scripting',
    template: `#!/bin/bash
# Bash Example

greet() {
    echo "Hello, $1!"
}

greet "World"`
  },
  {
    value: 'perl',
    label: 'Perl',
    category: 'scripting',
    extensions: ['.pl', '.pm'],
    syntaxHighlight: 'perl',
    description: 'Text processing and scripting',
    template: `# Perl Example
use strict;
use warnings;

sub greet {
    my $name = shift;
    return "Hello, $name!";
}

print greet("World") . "\\n";`
  },
  // JVM Languages
  {
    value: 'java',
    label: 'Java',
    category: 'systems',
    extensions: ['.java'],
    syntaxHighlight: 'java',
    description: 'Enterprise application development',
    template: `// Java Example
public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        System.out.println(greet("World"));
    }
}`
  },
  {
    value: 'csharp',
    label: 'C#',
    category: 'systems',
    extensions: ['.cs'],
    syntaxHighlight: 'csharp',
    description: '.NET application development',
    template: `// C# Example
using System;

class Program {
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
    
    static void Main() {
        Console.WriteLine(Greet("World"));
    }
}`
  },
  // Gaming
  {
    value: 'lua',
    label: 'Lua',
    category: 'gaming',
    extensions: ['.lua'],
    syntaxHighlight: 'lua',
    description: 'Game scripting language',
    template: `-- Lua Example
function greet(name)
    return "Hello, " .. name .. "!"
end

print(greet("World"))`
  },
  {
    value: 'gdscript',
    label: 'GDScript',
    category: 'gaming',
    extensions: ['.gd'],
    syntaxHighlight: 'gdscript',
    description: 'Godot game engine scripting',
    template: `# GDScript Example
extends Node

func greet(name: String) -> String:
    return "Hello, %s!" % name

func _ready():
    print(greet("World"))`
  },
  // Graphics Programming
  {
    value: 'hlsl',
    label: 'HLSL',
    category: 'graphics',
    extensions: ['.hlsl', '.fx'],
    syntaxHighlight: 'hlsl',
    description: 'DirectX shader language',
    template: `// HLSL Example
float4 main(float4 pos : POSITION) : SV_POSITION
{
    return pos;
}`
  },
  {
    value: 'glsl',
    label: 'GLSL',
    category: 'graphics',
    extensions: ['.glsl', '.vert', '.frag'],
    syntaxHighlight: 'glsl',
    description: 'OpenGL shader language',
    template: `// GLSL Example
#version 330 core

in vec3 position;

void main() {
    gl_Position = vec4(position, 1.0);
}`
  },
  // Markup & Config
  {
    value: 'sql',
    label: 'SQL',
    category: 'data',
    extensions: ['.sql'],
    syntaxHighlight: 'sql',
    description: 'Database query language',
    template: `-- SQL Example
SELECT 
    id,
    name,
    email
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT 10;`
  },
  {
    value: 'postgresql',
    label: 'PostgreSQL',
    category: 'data',
    extensions: ['.sql'],
    syntaxHighlight: 'pgsql',
    description: 'PostgreSQL-specific SQL',
    template: `-- PostgreSQL Example
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);`
  },
  {
    value: 'mysql',
    label: 'MySQL',
    category: 'data',
    extensions: ['.sql'],
    syntaxHighlight: 'mysql',
    description: 'MySQL-specific SQL',
    template: `-- MySQL Example
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  },
  {
    value: 'yaml',
    label: 'YAML',
    category: 'markup',
    extensions: ['.yaml', '.yml'],
    syntaxHighlight: 'yaml',
    description: 'Configuration format',
    template: `# YAML Example
app:
  name: MyApp
  version: 1.0.0
  settings:
    debug: true
    port: 3000
  features:
    - authentication
    - logging
    - caching`
  },
  {
    value: 'json',
    label: 'JSON',
    category: 'markup',
    extensions: ['.json'],
    syntaxHighlight: 'json',
    description: 'Data interchange format',
    template: `{
  "app": {
    "name": "MyApp",
    "version": "1.0.0",
    "settings": {
      "debug": true,
      "port": 3000
    },
    "features": [
      "authentication",
      "logging",
      "caching"
    ]
  }
}`
  },
  {
    value: 'dockerfile',
    label: 'Dockerfile',
    category: 'markup',
    extensions: ['Dockerfile', '.dockerfile'],
    syntaxHighlight: 'dockerfile',
    description: 'Container configuration',
    template: `# Dockerfile Example
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`
  },
  {
    value: 'markdown',
    label: 'Markdown',
    category: 'markup',
    extensions: ['.md', '.markdown'],
    syntaxHighlight: 'markdown',
    description: 'Documentation formatting',
    template: `# Markdown Example

## Features

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- \`Inline code\`

### Code Block

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Blockquote example`
  }
];

// Utility functions
export function getLanguageByValue(value: string): LanguageConfig | undefined {
  return LANGUAGES.find(lang => lang.value === value);
}

export function getLanguagesByCategory(category: string): LanguageConfig[] {
  return LANGUAGES.filter(lang => lang.category === category);
}

export function detectLanguageFromExtension(filename: string): LanguageConfig | undefined {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return LANGUAGES.find(lang => lang.extensions.includes(ext));
}

export function getLanguageLabel(value: string): string {
  const lang = getLanguageByValue(value);
  return lang?.label || value;
}

export function getAllLanguageValues(): string[] {
  return LANGUAGES.map(lang => lang.value);
}

export function getLanguageTemplate(value: string): string {
  const lang = getLanguageByValue(value);
  return lang?.template || '';
}