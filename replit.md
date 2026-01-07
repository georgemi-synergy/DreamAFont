# Dream a Font

## Overview

Dream a Font is a web application that allows users to explore and preview different fonts with AI-powered text styling effects. Users can browse a curated library of fonts (sans-serif, serif, monospace), customize preview text and font sizes, and apply AI-generated visual effects to their text using natural language prompts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for UI animations
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/` (shadcn/ui)
- Custom components in `client/src/components/`
- Custom hooks in `client/src/hooks/`
- Utility functions in `client/src/lib/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under `/api/`
- **Build**: esbuild for production bundling

Key backend structure:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data storage abstraction (currently in-memory)
- `server/db.ts` - Drizzle ORM database connection

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts`
- **Current Storage**: MemStorage class (in-memory) with PostgreSQL ready

Database tables:
- `fonts` - Font metadata (name, family, category)
- `conversations` - Chat conversation sessions
- `messages` - Individual chat messages

### AI Integration
- **Provider**: OpenAI API via Replit AI Integrations
- **Features**: Text effect generation, chat functionality, image generation
- **Security**: CSS style sanitization with whitelist for AI-generated styles

Replit integration modules in `server/replit_integrations/`:
- `batch/` - Batch processing with rate limiting
- `chat/` - Conversation and message management
- `image/` - Image generation capabilities

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Database schema and Zod validation
- `routes.ts` - API route type definitions
- `models/chat.ts` - Chat-related schema definitions

## External Dependencies

### Database
- **PostgreSQL** - Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit** - Database migrations (`npm run db:push`)

### AI Services
- **OpenAI API** - Text effects and chat (via `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL`)

### Google Fonts
The application loads fonts from Google Fonts CDN, including:
- Sans-serif: Inter, Roboto, Open Sans, Montserrat, DM Sans, Plus Jakarta Sans, Outfit
- Serif: Playfair Display, Lora, Merriweather, Libre Baskerville, Source Serif 4
- Monospace: Fira Code, Roboto Mono, JetBrains Mono, Space Mono, Geist Mono

### Key npm packages
- `@tanstack/react-query` - Data fetching and caching
- `drizzle-orm` / `drizzle-zod` - Database ORM and validation
- `framer-motion` - Animations
- `openai` - AI API client
- `zod` - Schema validation
- Radix UI primitives - Accessible UI components