# Exploration: Next.js Podcast Bootstrap Setup for team SUPERNOVA

### Current State
The workspace at `/home/nayssakristel/Proyectos/Podcast` is currently an empty directory containing only initial configuration folders/files (`.gitignore`, `openspec/`, `.atl/`). There is no existing Next.js source code, `package.json`, or application setup.

### Affected Areas
- `/home/nayssakristel/Proyectos/Podcast/package.json` — Dependency management, run scripts, and configuration.
- `/home/nayssakristel/Proyectos/Podcast/tsconfig.json` — TypeScript compiler options.
- `/home/nayssakristel/Proyectos/Podcast/src/app/` — Root directory for the Next.js App Router structure.
- `/home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx` — Global layout file where custom fonts and global HTML styling will be integrated.
- `/home/nayssakristel/Proyectos/Podcast/src/app/page.tsx` — The main entry point hosting the podcast landing sections (Hero, Episodes, About, Contact).
- `/home/nayssakristel/Proyectos/Podcast/src/app/globals.css` — Global styling and font variables defined using Vanilla CSS.

### Approaches

#### 1. **Next.js App Router with TypeScript and Vanilla CSS / CSS Modules**
Initialize the workspace with modern Next.js using the App Router, TypeScript for robust static type checking, and Vanilla CSS/CSS Modules for styling.
- **Pros:**
  - Modern architecture with React Server Components (RSC) and automatic layout nesting.
  - Native optimization for custom fonts using `next/font/google`, minimizing font loading delays and layout shifts.
  - Strict compliance with project styling guidelines prioritizing Vanilla CSS over utility-first frameworks.
  - Robust type safety and excellent IDE support with TypeScript.
- **Cons:**
  - High reliance on server components might require client boundaries (`"use client"`) for interactive elements like custom audio players or form validations.
- **Effort:** Low (Standard bootstrap)

#### 2. **Next.js Pages Router with JavaScript and Tailwind CSS**
Initialize the project using legacy Pages Router, Vanilla JavaScript, and Tailwind CSS.
- **Pros:**
  - Simpler learning curve for developers unused to modern React Server Components.
  - Utility-first approach for rapid styling.
- **Cons:**
  - Violates project guidelines that advise avoiding Tailwind CSS unless explicitly requested and confirmed.
  - Lacks type-safety, which can lead to runtime bugs in production.
  - Foregoes the optimization benefits of the modern Next.js App Router.
- **Effort:** Medium

### Recommendation
We recommend **Approach 1 (App Router + TypeScript + Vanilla CSS)** for the following reasons:
1. **Framework & Architecture**: Next.js App Router is the current standard. It provides native support for server-side rendering, layout nesting, and optimal loading performance.
2. **Language**: TypeScript is recommended to catch errors early and guarantee code robustness.
3. **Styling**: Vanilla CSS/CSS Modules provide high performance and complete custom control without library bloating. This adheres to the strict project guideline for styling.
4. **Font Integration**: Next.js optimizes Google Fonts automatically. We can load them directly via `next/font/google` in `layout.tsx` using CSS variables:
   ```typescript
   import { Cinzel, Monsieur_La_Doulaise, Montserrat } from 'next/font/google';

   const cinzel = Cinzel({
     subsets: ['latin'],
     variable: '--font-cinzel',
     display: 'swap',
   });

   const monsieurLaDoulaise = Monsieur_La_Doulaise({
     weight: '400',
     subsets: ['latin'],
     variable: '--font-monsieur',
     display: 'swap',
   });

   const montserrat = Montserrat({
     subsets: ['latin'],
     variable: '--font-montserrat',
     display: 'swap',
   });
   ```
   These variables can then be mapped in CSS variables in `globals.css` and applied to typography rules.
5. **Page Layout Structure**:
   - **Hero**: A high-impact banner showing the logo, title ("team SUPERNOVA"), tagline, and call-to-action buttons (e.g., "Listen Now"). Styled with combinations of Montserrat and Cinzel/Monsieur La Doulaise for an elegant, cinematic look.
   - **Episodes**: Dynamic section displaying the list of latest episodes with custom play/pause widgets and metadata (date, duration).
   - **About**: Section explaining the podcast background and introducing "team SUPERNOVA" members.
   - **Contact**: A contact form and list of social channels/podcast platforms (Spotify, Apple Podcasts, etc.).

### Risks
- **Readability**: Script fonts like "Monsieur La Doulaise" can be hard to read at small sizes. We must restrict its use to large accent headings and decorative elements.
- **CSS Modularization**: As the codebase grows, naming conflicts can occur without strict organization. We will use CSS Modules (`*.module.css`) for component-specific styles.

### Ready for Proposal
Yes
