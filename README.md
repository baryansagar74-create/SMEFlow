<div align="center">
  <img src="public/robot-hand.jpg" alt="SMEFlow — AI-Powered Business Automation" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  <h1>🚀 SMEFlow</h1>
  <p><strong>Where Human Vision Meets Intelligent Automation.</strong></p>
  <p>A premium, modular automation platform built to help small and medium businesses streamline operations, capture every lead, and scale with confidence — without the enterprise price tag.</p>

  <br />

  [![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-sme--flow.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://sme-flow.vercel.app/)

  <br />

  ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-Cloud_DB-3FCF8E?logo=supabase&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?logo=framer&logoColor=white)
  ![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-yellow.svg)

</div>

---

## 📖 What is SMEFlow?

SMEFlow turns operational chaos into organised, intelligent workflows. Designed specifically for growing SMEs, it replaces scattered spreadsheets, missed follow-ups, and disconnected tools with a unified, beautifully designed system.

The front end is built with **React + Vite**, featuring a premium, cinematic UI powered by **Framer Motion** for smooth transitions and micro-interactions. Real-time data is handled by **Supabase** (PostgreSQL), and the entire app is deployed globally on **Vercel**.

---

## ✨ Features

### 🏢 Business Operations
| Feature | Description |
|---------|-------------|
| **Lead Management** | Centralise and track customer inquiries with conversion visibility |
| **Automated Follow-Ups** | Rule-based reminders ensure no opportunity or payment is ever missed |
| **Sales Pipeline** | Stage-based deal tracking with clear forecasting |
| **Contact Form** | Live inquiry capture — data lands in Supabase in real-time |
| **FAQ System** | Dynamic accordion FAQs managed directly from the admin panel |

### 🔐 Admin Panel (`/admin`)
A password-protected, ultra-dark themed control center — invisible to regular users.

| Capability | Detail |
|------------|--------|
| 📊 **Live Stat Cards** | See total, pending, in-process, and completed inquiries at a glance |
| 🔍 **Search & Filter** | Search by name, email, company, or message; filter by status |
| 📑 **Smart Sort** | Sort by date (newest/oldest), name (A–Z), or status |
| 🏷️ **Status Management** | One-click status update: `Not Started → In Process → Done` |
| 📦 **Content Management** | Manage pricing plans, team members, and FAQs live — no code required |
| ⚙️ **Settings** | Change admin password, clear completed inquiries with a confirmation guard |
| 🔑 **Auth Gate** | Password-protected session with localStorage persistence |

### 🎨 UI / UX
- **Framer Motion** — Cinematic page transitions, staggered reveals, and `AnimatePresence` card animations
- **Glassmorphism** — Deep gradients, rich overlays, and glowing gold accents
- **Toast System** — Instant non-blocking feedback on every user action
- **3D Buttons** — Tactile press-down effect with layered `box-shadow`
- **Responsive** — Full mobile-friendly layout with animated hamburger menu

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Routing** | React Router DOM v6 |
| **Database** | Supabase (PostgreSQL) |
| **Animations** | Framer Motion |
| **Styling** | Vanilla CSS (Flexbox/Grid, CSS Variables, Glassmorphism) |
| **Auth** | Custom context-based auth with `localStorage` session |
| **Deployment** | Vercel |
| **Icons** | Custom embedded inline SVGs |

---

## 📂 Project Structure

```text
SMEFlow/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navbar with conditional Admin link
│   │   ├── Footer.jsx          # Site footer with links
│   │   ├── Layout.jsx          # Page wrapper (Header + Footer)
│   │   ├── PageTransition.jsx  # Route transition animations
│   │   ├── ProtectedRoute.jsx  # Auth guard — redirects to /login
│   │   └── ContentManager.jsx  # 📦 Live CRUD for Pricing, Team, FAQs
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state, login, logout, changePassword
│   │   └── ToastContext.jsx    # Global toast notification system
│   ├── lib/
│   │   └── supabase.js         # Supabase client (reads from .env)
│   ├── services/
│   │   └── api.js              # API helpers (Inquiries, Plans, Team, FAQs)
│   ├── pages/
│   │   ├── Home.jsx            # Homepage with hero & CTA
│   │   ├── Features.jsx        # Feature showcase grid
│   │   ├── Pricing.jsx         # Dynamic pricing from Supabase
│   │   ├── About.jsx           # Dynamic team profiles from Supabase
│   │   ├── Contact.jsx         # Contact form + FAQ accordion
│   │   ├── LeadManagement.jsx  # Lead management feature page
│   │   ├── AutomatedFollowUps.jsx  # Follow-ups feature page
│   │   ├── LandingPage.jsx     # Standalone cinematic landing page
│   │   ├── Dashboard.jsx       # 🔒 Admin panel with all controls
│   │   └── Login.jsx           # 🔒 Admin login gate
│   ├── App.jsx                 # Router, auth provider, global loader
│   ├── main.jsx                # React entry point
│   └── index.css               # Global stylesheet (1500+ lines)
├── .env                        # 🔒 Supabase credentials (git-ignored)
├── .env.example                # Template — safe to commit
├── vercel.json                 # SPA rewrite rules for Vercel
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
└── vite.config.js              # Vite configuration
```

---

## 💻 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/baryansagar74-create/SMEFlow.git
cd SMEFlow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Set up the Supabase database

In your Supabase **SQL Editor**, run:

```sql
-- Inquiries table
CREATE TABLE inquiries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'not_started'
);

-- Pricing Plans table
CREATE TABLE pricing_plans (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    subtitle TEXT,
    price TEXT NOT NULL,
    features TEXT,
    button_text TEXT DEFAULT 'GET STARTED',
    is_popular BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0
);

-- Team Members table
CREATE TABLE team_members (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    role TEXT,
    bio TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0
);

-- FAQs table
CREATE TABLE faqs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0
);
```

Enable Row Level Security (RLS) and set public access policies:
```sql
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public access" ON inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON pricing_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON faqs FOR ALL USING (true) WITH CHECK (true);
```

### 5. Start the development server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 6. Build for production
```bash
npm run build
```

---

## 🚀 Deploying to Vercel

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. In **Project Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL` → your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
4. Deploy — Vercel auto-detects Vite and handles everything

> The `vercel.json` file already includes the SPA rewrite rule so all routes (including `/admin`) resolve correctly.

---

## 🔐 Admin Panel Access

The admin panel is completely hidden from regular users — it doesn't appear in the nav until you're authenticated.

1. Navigate to `yoursite.com/admin`
2. You'll be redirected to the login page automatically
3. Enter the admin password *(default: `smeflowadminArpit` — change it immediately in Settings)*
4. Once logged in, the **ADMIN** link appears in the navbar
5. Manage inquiries, website content (pricing, team, FAQs), and settings from one panel

> **⚠️ Security Note**: The default password is stored in `AuthContext.jsx`. Change it from inside the Settings panel after first login — the new password is stored in `localStorage` encrypted by key.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Background** | `linear-gradient(135deg, #E9E2D0, #D4CCB8)` |
| **Primary Dark** | `linear-gradient(135deg, #1C3E4D, #112A35)` |
| **Gold Accent** | `#F0B90B` |
| **Base Text** | `#F5F3E7` (Off-White) |
| **Admin BG** | `#0F1114 → #1A1D23` (Ultra-dark) |
| **Heading Font** | **Oswald** (bold, tracked) |
| **Body Font** | **Inter** (highly legible) |

---

## 🤝 Contributing

All components follow consistent labelling conventions (e.g. `/* ===== IMPORTS ===== */`, `/* ===== RENDER ===== */`) for maximum readability. Please maintain this standard when contributing.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Copy `.env.example` → `.env` and add your credentials
4. Commit your changes: `git commit -m 'feat: add my feature'`
5. Push and open a Pull Request

---

## 📄 License

MIT © SMEFlow
