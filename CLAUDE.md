# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **ResQ**, a pet-powered cryptocurrency project built on Solana. It's a React/Vite-based landing page showcasing a memecoin with AI-powered pet care features. The site promotes the RESQ token, which supports animal welfare and provides access to AI pet diagnosis tools.

## Development Commands

```bash
# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or  
pnpm build

# Run ESLint
npm run lint
# or
pnpm lint

# Preview production build
npm run preview
# or
pnpm preview
```

## Architecture & Tech Stack

### Core Technologies
- **React 18.3.1** - Main framework
- **Vite 6.3.5** - Build tool and dev server
- **TypeScript/JavaScript** - Mixed codebase (`.jsx`, `.tsx`, `.ts`, `.js`)
- **Tailwind CSS 4.1.7** - Styling (with PostCSS)
- **Solana Web3.js** - Blockchain integration

### Key Dependencies
- **shadcn/ui components** - UI component library (Radix UI primitives)
- **Solana Wallet Adapter** - Wallet connection and management
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hook Form + Zod** - Form handling and validation

### Project Structure
```
src/
├── components/
│   ├── ui/           # shadcn/ui components (buttons, cards, forms, etc.)
│   └── solana/       # Solana wallet integration components
│       ├── AppProviders.tsx    # Wallet providers setup
│       ├── Ping.tsx           # Solana connection test
│       ├── SendSol.tsx        # SOL transfer component  
│       └── SolSendIsland.tsx  # Wallet connection UI
├── content/          # MDX content files
├── hooks/           # Custom React hooks
├── lib/             # Utilities (utils.js for cn() helper)
├── assets/          # Images and static assets
├── App.jsx          # Main application component
├── main.jsx         # React app entry point
└── index.css        # Global styles
```

## Configuration Files

### Vite Configuration (`vite.config.js`)
- Configured for React with Tailwind CSS plugin
- Path aliases: `@` maps to `./src`
- Allowed hosts: localhost and resq.petcoinai.info
- PostCSS integration for Tailwind

### shadcn/ui Configuration (`components.json`)
- Style: "new-york"
- TypeScript: enabled (`tsx: true`)
- Base color: neutral
- CSS variables: enabled
- Path aliases match Vite config

### ESLint Configuration (`eslint.config.js`)
- React hooks and refresh plugins
- Ignores `dist` directory
- Custom rule for unused vars (ignores constants in UPPER_CASE)

### Solana Integration
- **Network**: Mainnet (can switch to devnet for testing in `AppProviders.tsx:15`)
- **Supported Wallets**: Phantom, Backpack, Solflare, Torus, Ledger
- **DEX Platform**: Raydium
- **Token Supply**: 1 billion RESQ tokens

## Styling Conventions

- Uses Tailwind CSS with custom CSS classes prefixed with `petcoin-`
- Component-based styling with shadcn/ui
- Custom gradients and animations for branding
- Mobile-responsive design with grid layouts
- Color scheme: teal, yellow, pink, blue gradients

## Content Management

- Main landing page content is in `App.jsx`
- Additional content in `src/content/` as MDX files
- Images stored in `src/assets/`
- Social links and external resources hardcoded in components

## Package Manager

Project uses **pnpm** (version 10.4.1) as specified in `packageManager` field.

## Development Notes

- The codebase mixes JSX and TSX files
- Wallet integration is set up but some components may not be fully functional
- External links point to social media (X, Telegram, Reddit)
- Some sections are commented out (mobile app features, whitepaper links)
- Dexscreener integration for token tracking