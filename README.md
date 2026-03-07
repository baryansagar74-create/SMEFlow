<div align="center">
  <img src="public/robot-hand.jpg" alt="SMEFlow Header Image" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  <h1>🚀 SMEFlow</h1>
  <p><strong>Where Human Vision Meets Intelligent Automation.</strong></p>
  <p>A modular automation platform built to help small and medium businesses streamline operations, increase revenue visibility, and scale efficiently.</p>
</div>

---

## 📖 Project Overview

SMEFlow transforms operational chaos into organized digital systems. Designed specifically for growing SMEs, it converts scattered spreadsheets, notebooks, and disconnected tools into a unified, intelligent workflow. 

The front-end architecture is built with **React** and **Vite**, featuring a highly polished, premium UI driven by **Framer Motion** for state-of-the-art cinematic transitions and micro-interactions.

## ✨ Key Features

- **Lead Management**: Centralize and organize customer inquiries with structured tracking and conversion visibility.
- **Automated Follow-Ups**: Rule-based reminders and smart notifications ensure no opportunity or payment is missed.
- **Sales Pipeline**: Stage-based deal management that provides clear forecasting and performance insights.
- **Task Management**: Assign responsibilities, monitor deadlines, and maintain internal workflow clarity.
- **Billing & Payments**: Generate invoices, track collections, and maintain financial transparency.
- **Interactive UI/UX**:
  - **Framer Motion** powered scroll animations (`whileInView`) and staggered grid layouts.
  - Premium **Glassmorphism** styling with deep, rich gradients and elegant glowing shadows.
  - A custom standalone **Toast Notification (`ToastContext`)** system for immediate user feedback.
  - Tactile **3D Button States** and scalable **SVG illustrations**.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS (Flexbox/Grid, CSS Variables, Glassmorphism)
- **Icons**: Custom embedded SVGs

---

## 📂 Project Structure

```text
SMEFlow/
├── public/                 # Static assets (images, SVGs)
├── src/
│   ├── components/         # Reusable structural UI (Header, Footer, Layout)
│   ├── context/            # Global React Contexts (e.g., ToastContext)
│   ├── pages/              # Primary route views (Home, Pricing, Contact, etc.)
│   ├── App.jsx             # Main router and global loading screen setup
│   ├── main.jsx            # React mounting entry point
│   └── index.css           # Highly organized global stylesheet
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

---

## 🎨 Design System

Our UI is designed to feel premium, cinematic, and highly interactive.

- **Primary Colors**:
  - Deep Teal Gradient: `linear-gradient(135deg, #1C3E4D, #112A35)`
  - Rich Red Gradient: `linear-gradient(135deg, #A83626, #7A1C0F)`
  - Gold Accent: `#CBBE9A`
  - Base Text: `#F5F3E7` (Off-White)
- **Typography**:
  - Headings: **'Oswald'** (sans-serif, bold, tracked out)
  - Body: **'Inter'** (sans-serif, highly legible)
- **Animations**:
  - Global Initial Loader (1.5s delay)
  - `AnimatePresence` smooth page wipes
  - Staggered `<motion.div>` reveals on scroll

---

## 💻 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/baryansagar74-create/SMEFlow.git
   cd SMEFlow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will be accessible at `http://localhost:5173` (or the port specified by Vite).*

4. **Create a production build:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 🤝 Contributing

This project features properly labeled components and clearly delineated CSS files (e.g., `/* ===== IMPORTS ===== */`, `/* ===== RENDER ===== */`) to ensure maximum readability and maintainability. When contributing, please adhere to the existing structural layouts.

## 📄 License

MIT
