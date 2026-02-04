# CodeCraft AI - Complete Rebuild

A modern, standalone Next.js 15 code generation and development toolkit built with TypeScript and Tailwind CSS. This is a completely rebuilt, clean implementation with no backend dependencies.

## 🌟 Features

### Core Technologies
- **Next.js 15** - Latest version with App Router and Server Components
- **React 19** - Latest React with enhanced capabilities
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Modern utility-first CSS framework
- **localStorage** - All data stored locally in the browser

### 7 Powerful Tools

#### 1. Code Generator Dashboard
- Generate code snippets with AI-powered templates
- Support for 40+ programming languages
- Syntax highlighting with react-syntax-highlighter
- Save and manage snippets locally
- Quick stats and recent snippets view

#### 2. Code Converter
- Convert code between different programming languages
- Bidirectional conversion support
- Real-time conversion preview
- Language-specific syntax highlighting

#### 3. Code Analysis
- Analyze code quality and complexity
- Get detailed metrics (LOC, functions, complexity score)
- Receive actionable improvement suggestions
- Identify potential issues

#### 4. Linux Command Reference
- Quick reference for common Linux commands
- Categorized by function (File Management, System, Permissions, etc.)
- Search and filter capabilities
- Command examples and descriptions

#### 5. Encryption Tools
- Base64 encoding/decoding
- Text hashing
- String reversal
- Copy and process text securely

#### 6. GitHub Integration
- Connect to GitHub account (demo mode)
- View repositories
- Repository management interface
- Export code to GitHub

#### 7. Snippets Library
- Organize and manage saved code snippets
- Search by title or language
- Filter by programming language
- View, copy, and delete snippets
- Syntax-highlighted code display

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:4028](http://localhost:4028) to view the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run serve
```

## 📁 Project Structure

```
codecraft-ai/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── code-generator-dashboard/  # Main code generation tool
│   │   ├── code-converter/            # Language converter
│   │   ├── code-analysis/             # Code quality analyzer
│   │   ├── linux-reference/           # Linux commands reference
│   │   ├── encryption-tools/          # Encryption utilities
│   │   ├── git-hub-integration/       # GitHub connection
│   │   ├── saved-snippets-library/    # Snippets manager
│   │   ├── login/                     # Authentication
│   │   ├── register/                  # User registration
│   │   └── layout.tsx                 # Root layout
│   ├── components/
│   │   ├── ui/                        # Base UI components
│   │   └── common/                    # Shared components (Header, etc.)
│   ├── contexts/
│   │   └── AuthContext.tsx            # localStorage-based authentication
│   ├── lib/
│   │   ├── config/                    # Configuration files
│   │   │   └── languages.ts            # 40+ language definitions
│   │   └── utils/                     # Helper functions
│   └── styles/                       # Global styles
├── public/                           # Static assets
├── package.json                      # Dependencies
├── tailwind.config.js                # Tailwind configuration
└── tsconfig.json                     # TypeScript configuration
```

## 🔐 Authentication

This application uses **localStorage-based authentication** for demo purposes:
- User credentials stored in browser localStorage
- No server-side authentication required
- Perfect for standalone frontend deployment
- Secure for local development and testing

## 💾 Data Storage

All application data is stored locally:
- **User Authentication** - localStorage
- **Code Snippets** - localStorage
- **Conversion History** - localStorage
- **User Preferences** - localStorage

## 🎨 Styling

Custom Tailwind CSS configuration:
- Dark theme with slate/blue color scheme
- Custom fonts (JetBrains Mono, Inter, Source Sans 3, Fira Code)
- Responsive design for all screen sizes
- Typography plugin for rich text
- Custom animations and transitions

## 🛠️ Available Scripts

```bash
npm run dev         # Start development server (port 4028)
npm run build       # Build for production
npm run start       # Start development server
npm run serve       # Start production server
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Format code with Prettier
npm run type-check  # Run TypeScript type checking
```

## 🌐 Supported Languages (40+)

### Systems Programming
Rust, Go, Zig, C, C++, Assembly (x86)

### Web Development
JavaScript, TypeScript, PHP, Ruby, Perl, HTML, CSS

### Mobile Development
Swift, Kotlin, Dart, Objective-C

### Data & Scientific
Python, R, MATLAB, Julia, SQL (PostgreSQL, MySQL, SQLite)

### Functional Programming
Haskell, F#, Clojure, Elixir, Scala, Erlang

### Scripting & Automation
Bash, PowerShell, Lua, Perl

### Markup & Configuration
YAML, JSON, Markdown, Dockerfile, TOML

### Game Development
GDScript (Godot), C# (Unity)

### Graphics Programming
HLSL, GLSL

### And More
Java, C#, Groovy, Crystal, Nim, V

## 🚀 Deployment

This application can be deployed to any static hosting service:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Other Options
- GitHub Pages
- AWS S3 + CloudFront
- Cloudflare Pages
- Any static file server

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ✨ What's New in This Rebuild

- ✅ Complete codebase rebuild from scratch
- ✅ Removed all Supabase dependencies
- ✅ Simplified authentication with localStorage
- ✅ Clean, modern UI with improved UX
- ✅ Better code organization and structure
- ✅ Improved performance and load times
- ✅ Enhanced error handling
- ✅ Responsive design for all devices
- ✅ Consistent styling across all pages
- ✅ Better TypeScript type safety

## 👏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by Next.js 15 and React 19
- Styled with Tailwind CSS
- Syntax highlighting by react-syntax-highlighter

---

Built with ❤️ on Rocket.new