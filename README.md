# Nikologorskie Dachi Residence - Digital Experience

This is a premium digital experience for "Nikologorskie Dachi", built with Next.js 15, Tailwind CSS, and Framer Motion.

## Features

- **Persona-Based Interface**: Dynamic content switching for Family, Investor, and Party personas.
- **PDF Generation**: On-the-fly brochure generation with custom content for each persona (`@react-pdf/renderer`).
- **Interactive Map**: SVG-based location map with filters.
- **Visual Scrollytelling**: Parallax scroll effects.
- **Area Comparator**: Interactive plan comparison.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **PDF**: @react-pdf/renderer
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment on Vercel

This project is optimized for deployment on Vercel.

1. **Push to Git**: Ensure your code is pushed to a remote repository (GitHub, GitLab, Bitbucket).
2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - "Add New" -> "Project".
   - Select your repository.
3. **Configuration**:
   - Framework Preset: `Next.js` (detects automatically).
   - Build Command: `next build` (default).
   - Output Directory: `.next` (default).
4. **Deploy**: Click "Deploy".

### Important Note on PDF Generation
The project includes a `vercel.json` and `next.config.ts` configuration to ensure PDF fonts and assets are correctly bundled in the serverless function. No manual file copying is required.
