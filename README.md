# Geoffrey Kabiaro Advocate

> Kenya's premier digital-first law firm — combining 15+ years of legal excellence with cutting-edge technology.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=flat-square&logo=tailwindcss)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

---

## Overview

A full-stack legal services platform built for **Geoffrey Kabiaro Advocate**, a Nairobi-based law firm. The platform features an award-winning marketing website, a 4-step consultation booking wizard with M-Pesa payment integration, a secure client portal, and AI-assisted legal tools — all on a dark gold-and-navy design system that reflects the firm's premium positioning.

**Live site:** [https://geoffreykabiaro.co.ke](https://geoffreykabiaro.co.ke)

---

## Screenshots

| Page | Description |
|------|-------------|
| Home | 3D Nairobi skyline hero, animated stats, legal tools |
| About | Attorney bio, timeline, team section |
| Practice Areas | 6 specialisations with full detail pages |
| Consultation | 4-step wizard with M-Pesa STK Push |
| Client Portal | Secure file management and case tracking |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 14 (App Router) | React framework, SSR/SSG |
| TypeScript | Type safety |
| Tailwind CSS 3.3 | Utility-first styling |
| Framer Motion | Page and component animations |
| Three.js + R3F | 3D Nairobi skyline hero |
| React Query v3 | Server state management |
| React Hook Form + Zod | Form validation |
| Socket.io Client | Real-time chat |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Primary database |
| Redis + Bull | Caching and job queues |
| OpenAI API | AI legal analysis |
| Safaricom Daraja API | M-Pesa STK Push payments |
| JWT + bcrypt | Authentication |
| Socket.io | Real-time features |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| Vercel | Frontend hosting |
| Docker + Docker Compose | Backend containerisation |
| Nginx | Reverse proxy |
| MongoDB Atlas / self-hosted | Database |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, legal tools, CTA |
| `/about` | Attorney bio, values, timeline, team |
| `/practice-areas` | Overview of all 6 practice areas |
| `/practice-areas/corporate` | Corporate & Commercial Law |
| `/practice-areas/land` | Land & Property Law |
| `/practice-areas/family` | Family & Wealth Law |
| `/practice-areas/employment` | Employment Law |
| `/practice-areas/litigation` | Litigation & Dispute Resolution |
| `/practice-areas/tech` | Technology & IP Law |
| `/consultation` | 4-step booking wizard + M-Pesa payment |
| `/contact` | Contact form, office info, FAQ |
| `/blog` | Legal insights and resources |
| `/portal` | Authenticated client portal |
| `/privacy` | KDPA-compliant Privacy Policy |
| `/terms` | Advocates Act-compliant Terms of Service |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend (Express + TypeScript)

```bash
cd backend
npm install
cp .env.example .env   # Fill in your credentials
npm run dev
```

API runs on [http://localhost:5000](http://localhost:5000).

### Full Stack (Docker)

```bash
docker-compose up -d
```

Services start at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

---

## Environment Variables

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)

```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/geoffreykabiaro
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_jwt_secret_here

# M-Pesa (Safaricom Daraja)
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# URLs
API_URL=https://api.geoffreykabiaro.co.ke
```

---

## Deployment

### Frontend — Vercel (recommended)

```bash
npm install -g vercel
cd frontend
vercel --prod
```

Set `NEXT_PUBLIC_API_URL` in Vercel's environment variable settings.

### Backend — VPS / Docker

```bash
./deploy.sh
```

The `deploy.sh` script pulls the latest code, rebuilds containers, runs migrations, and health-checks all services.

---

## Project Structure

```
lex-digitalis/
├── frontend/               # Next.js 14 App Router
│   ├── app/                # Pages (App Router)
│   │   ├── about/
│   │   ├── blog/
│   │   ├── consultation/
│   │   ├── contact/
│   │   ├── portal/
│   │   ├── practice-areas/
│   │   │   └── [slug]/     # Dynamic practice area pages
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/             # Reusable UI primitives
│   │   ├── 3d/             # Three.js components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── public/             # Static assets
│
├── backend/                # Express + TypeScript API
│   └── src/
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express route handlers
│       └── services/       # AI, M-Pesa, etc.
│
├── docker-compose.yml
├── deploy.sh
└── CLAUDE.md               # AI assistant instructions
```

---

## Key Features

### M-Pesa Integration
Consultation bookings trigger an M-Pesa STK Push to the client's phone. Payment status is polled and confirmed before the booking is finalised. Webhook callback at `POST /api/payments/mpesa-callback` handles async confirmation.

### AI Legal Tools
- **Legal Health Checker** — 6-question assessment with AI-powered risk scoring
- **Case Valuation Tool** — Instant estimate of case timeline, cost, and success probability

### Client Portal
Auth-gated portal with case tracking, document uploads, real-time chat with the attorney, invoice management, and a colour-coded calendar.

### Compliance
- **KDPA** (Kenya Data Protection Act 2019) — full privacy policy, consent management, data subject rights
- **Advocates Act** (Cap. 16) — terms of service, professional engagement, fee transparency
- **AML/KYC** — client identity verification workflow

---

## Compliance & Legal

All legal content on this platform is governed by Kenyan law:
- Advocates Act (Cap. 16, Laws of Kenya)
- Kenya Data Protection Act 2019
- Law Society of Kenya Rules of Professional Conduct
- Advocates (Remuneration) Order

---

## Contact

**Geoffrey Kabiaro Advocate**
ABC Place, Waiyaki Way, Westlands, Nairobi
📞 +254 792 530 464
✉️ info@geoffreykabiaro.co.ke
💬 [WhatsApp](https://wa.me/254792530464)

---

© 2025 Geoffrey Kabiaro Advocate. All rights reserved.
