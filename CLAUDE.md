# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lex Digitalis is a premium legal services platform for the Kenyan market. It combines a Next.js frontend with a Node.js/Express backend, featuring AI-powered legal tools, M-Pesa payment integration, and real-time capabilities.

## Development Commands

### Frontend (Next.js 14)
```bash
cd frontend
npm install
npm run dev      # Start development server on port 3000
npm run build    # Production build
npm run lint     # ESLint
```

### Backend (Express + TypeScript)
```bash
cd backend
npm install
npm run dev      # Start with nodemon (auto-reload) on port 5000
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled output
```

### Docker (Full Stack)
```bash
docker-compose up -d          # Start all services
docker-compose up -d --build  # Rebuild and start
docker-compose logs -f        # Follow logs
```

Services: MongoDB (27017), Redis (6379), Backend API (5000), Frontend (3000), Nginx (80/443)

### Deployment
```bash
./deploy.sh  # Pull, build, migrate, restart, and health-check all services
```

## Architecture

### Frontend (`frontend/`)
- **Next.js App Router** — pages live under `app/`, components under `components/`
- **Styling**: Tailwind CSS with custom gold (`#FFD700`) accent and navy-blue dark theme; fonts are Inter (sans) and Cormorant Garamond (serif)
- **3D/Animation**: Three.js + React Three Fiber for the hero section; Framer Motion for page animations
- **Data fetching**: React Query + Axios; forms via React Hook Form + Zod
- **Real-time**: Socket.io client

Key components:
- `LegalHealthChecker.tsx` — 6-question legal assessment with AI-powered risk scoring
- `CaseValuationTool.tsx` — Instant case valuation (timeline, costs, success probability)
- `ClientPortal.tsx` — Client management interface
- `Analytics.tsx` — Performance analytics dashboard

### Backend (`backend/src/`)
- **Express REST API** with Socket.io for real-time features
- **Database**: MongoDB via Mongoose; Redis for caching and Bull job queues
- **Auth**: JWT + bcrypt
- **Models**: `User.ts`, `Case.ts`
- **Services**: `aiService.ts` (OpenAI), `mpesa.ts` (Safaricom M-Pesa STK push)
- **Routes**: `consultation.ts` — booking, status, M-Pesa callback webhook

### API Endpoints
- `POST /api/consultations/book` — Book consultation, initiates M-Pesa payment
- `GET /api/consultations/:id/status` — Check consultation/payment status
- `POST /api/payments/mpesa-callback` — M-Pesa webhook callback

### Infrastructure
- Nginx reverse proxy in front of both services
- MongoDB and Redis run as Docker containers with persistent volumes
- Environment config: `backend/.env` and `frontend/.env.local`

## Environment Variables

**Backend** (`backend/.env`):
- `MONGODB_URI`, `REDIS_URL`
- `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`
- `OPENAI_API_KEY`, `JWT_SECRET`, `API_URL`, `NODE_ENV`

**Frontend** (`frontend/.env.local`):
- `NEXT_PUBLIC_API_URL` (default: `http://localhost:5000/api`)

## Key Technical Details

- **M-Pesa integration** uses Safaricom Daraja API — the `mpesa.ts` service handles OAuth token retrieval, STK push initiation, and payment status polling
- **AI service** uses OpenAI API for legal analysis and risk scoring
- **No tests exist** — the project has no test configuration or test files
- **Production URL**: https://lexdigitalis.co.ke
