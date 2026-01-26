# Smart Appointment & Queue Manager

A comprehensive web application designed to streamline service appointments, manage staff availability, and handle customer queues with intelligent conflict detection and automated assignment rules.

## 🚀 Live Demo

**Live URL:** _[Insert Deployment Link Here]_

### Demo Account

- **Email:** `demo@smartappointment.com`
- **Password:** `Pa$$w0rd!`
  _(Or use the "Demo User" login button on the sign-in page)_

---

## ✨ Features

### 1. Authentication & Security

- **Professional Onboarding:** Secure user registration and login system.
- **Organization Isolation:** Multi-tenant architecture ensuring data privacy between different organizations.
- **Protected Routes:** Middleware-based authentication and organization-level authorization.

### 2. Staff & Service Management

- **Manual Staff Creation:** Create staff profiles with specific designations (e.g., Doctor, Consultant).
- **Capacity Tracking:** Define daily appointment limits (e.g., max 5 per day) per staff member.
- **Availability Control:** Toggle staff status between `Available` or `On Leave`.
- **Dynamic Services:** Define services with custom durations (15, 30, 60 mins) and required staff designations.

### 3. Intelligent Appointment Management

- **Lifecycle Management:** Create, edit, cancel, and track appointments.
- **Advanced Filtering:** View appointments by specific dates or date ranges.
- **Search:** Instant search across customer names, service names, and staff members.
- **Status Tracking:** Monitor progress with statuses like `Scheduled`, `Completed`, `Cancelled`, and `No-Show`.

### 4. Assignment Rules & Queue System

- **Staff Load Awareness:** Real-time visibility of staff workload (e.g., "Arthur (3/5 appointments today)").
- **Automated Waiting Queue:** Appointments are automatically moved to a waiting list if no eligible staff is available or capacity is reached.
- **Manual Assignment:** One-click assignment from queue to available staff.

### 5. Conflict Detection

- **Time Collision Prevention:** Real-time detection of overlapping appointments for the same staff member.
- **Proactive Warnings:** Notifies users of daily capacity limits before they are exceeded.

### 6. Admin Dashboard & Activity Logs

- **Key Metrics:** Real-time cards for Total Appointments, Completed vs. Pending, and Waiting Queue counts.
- **Audit Trail:** Detailed activity logs tracking assignments and system changes with timestamps.
- **Visual Insights:** High-level overview of daily operations and staff throughput.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 💻 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js
- MongoDB Connection String

### Environment Setup

Create a `.env` file in the root directory:

```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_random_secret
NEXTAUTH_SECRET=your_random_secret
JWT_ACCESS_TOKEN_EXPIRES_IN="1d"
JWT_REFRESH_TOKEN_EXPIRES_IN="7d"
BCRYPT_SALT_ROUNDS=12
SITE_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
BACKEND_BASE_URL=http://localhost:3000/api
```

### Installation & Development

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `/app`: Next.js App Router (Pages & API Routes)
- `/components`: Reusable UI components (Shadcn + Custom)
- `/lib`: Utility functions, database connection, and query builders
- `/models`: Mongoose schemas and models
- `/redux`: Global state management and API slices
- `/types`: TypeScript interfaces and type definitions
- `/validators`: Zod schemas for form and API validation

---

## 📝 License

This project is developed for personal use. All rights reserved.
