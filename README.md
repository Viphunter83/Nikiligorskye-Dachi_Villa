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

## Environment Variables

For the Telegram bot integration to work, you must configure the following environment variables (locally in `.env.local` and in Vercel Project Settings):

- `TELEGRAM_BOT_TOKEN`: Your Telegram Bot API Token
- `TELEGRAM_CHAT_ID`: The ID of the chat(s) where leads should be sent. You can specify multiple IDs separated by commas (e.g., `12345678,-100987654321`) to send notifications to multiple users or groups simultaneously.

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
