# FoodHub Frontend 🍱

A modern, full-stack food ordering web application built with Next.js, featuring role-based access control for customers, providers, and administrators.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [User Roles](#user-roles)
- [Key Pages & Routes](#key-pages--routes)
- [Components](#components)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Deployment](#deployment)

---

## 🌟 Overview

FoodHub is a comprehensive meal ordering platform that connects customers with food providers. The application supports three distinct user roles (Customer, Provider, Admin) with tailored experiences for each. Built with modern web technologies, it offers a seamless, responsive user experience with real-time order tracking and management.

---

## ✨ Features

### 🛍️ Customer Features
- Browse and search meals with advanced filtering
- Add meals to cart and manage cart items
- Place orders with delivery address (Cash on Delivery)
- Track order status in real-time
- Leave reviews and ratings for meals
- Manage user profile and order history

### 🍳 Provider Features
- Manage restaurant/provider profile
- Add, edit, and delete menu items with image uploads
- View and manage incoming orders
- Update order status (Placed → Preparing → Ready → Delivered)
- Dashboard with order statistics

### 👨‍💼 Admin Features
- View and manage all users (customers and providers)
- Suspend or activate user accounts
- View all orders across the platform
- Manage food categories
- Platform-wide statistics and oversight

### 🌐 Public Features
- Browse all available meals and providers
- Filter meals by category, cuisine, and dietary preferences
- View provider profiles with complete menus
- Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16.1.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate)** - Animation utilities
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
  - Dialog, Alert Dialog, Select, Toast, Scroll Area, Label, Separator
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Component variants

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation integration

### Authentication
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library

### Utilities
- **[date-fns](https://date-fns.org/)** - Date manipulation
- **[react-hot-toast](https://react-hot-toast.com/)** - Toast notifications
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional styling

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodhub-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
foodhub-client/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (auth)/       # Authentication pages (login, register)
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── provider/     # Provider dashboard pages
│   │   ├── meals/        # Meal browsing and details
│   │   ├── orders/       # Order management
│   │   ├── checkout/     # Checkout flow
│   │   ├── profile/      # User profile
│   │   ├── reviews/      # Customer reviews
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── cart/         # Shopping cart components
│   │   ├── checkout/     # Checkout components
│   │   ├── home/         # Home page components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── meals/        # Meal-related components
│   │   ├── orders/       # Order management components
│   │   ├── profile/      # Profile components
│   │   ├── reviews/      # Review components
│   │   ├── shared/       # Shared/reusable components
│   │   └── ui/           # Base UI components (shadcn/ui)
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   ├── services/         # API service layer
│   │   ├── api.ts        # Main API client
│   │   └── categories.ts # Category services
│   └── types/            # TypeScript type definitions
├── .env                   # Environment variables
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | ✅ Yes |
| `NEXT_PUBLIC_BACKEND_URL` | Backend server URL | ✅ Yes |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for image uploads | ✅ Yes |

> **Note:** All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 👥 User Roles

### 🛒 Customer
- Browse and order meals
- Track order status
- Leave reviews
- Manage profile

### 🍳 Provider
- Manage menu items
- Process orders
- Update order status
- View business statistics

### 👨‍💼 Admin
- Manage all users
- Oversee all orders
- Manage categories
- Platform moderation

> **Note:** Users select their role during registration. Admin accounts are typically seeded in the database.

---

## 🗺️ Key Pages & Routes

### Public Routes
| Route | Description |
|-------|-------------|
| `/` | Home page with featured meals and categories |
| `/meals` | Browse all meals with filters |
| `/meals/:id` | Meal details page |
| `/login` | User login |
| `/register` | User registration |

### Customer Routes (Protected)
| Route | Description |
|-------|-------------|
| `/checkout` | Checkout and place order |
| `/orders` | Order history |
| `/profile` | User profile management |
| `/reviews` | Customer reviews |

### Provider Routes (Protected)
| Route | Description |
|-------|-------------|
| `/provider/dashboard` | Provider dashboard |
| `/provider/menu` | Manage menu items |
| `/provider/orders` | View and manage orders |
| `/provider/profile` | Provider profile |

### Admin Routes (Protected)
| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard |
| `/admin/users` | User management |
| `/admin/orders` | All orders overview |
| `/admin/categories` | Category management |

---

## 🧩 Components

### UI Components (shadcn/ui)
Pre-built, accessible components from Radix UI:
- Button, Input, Label, Select
- Dialog, Alert Dialog
- Toast notifications
- Scroll Area, Separator
- And more...

### Feature Components
- **MealCard** - Display meal information
- **CartItem** - Shopping cart item
- **OrderCard** - Order summary
- **ReviewCard** - Customer review display
- **Header/Footer** - Layout components
- **ProtectedRoute** - Route authentication wrapper

---

## 🔌 API Integration

The application uses a centralized API service layer located in `src/services/`:

- **api.ts** - Main API client with methods for:
  - Authentication (login, register, logout)
  - Meals (fetch, create, update, delete)
  - Orders (create, fetch, update status)
  - Reviews (create, fetch)
  - User management
  - Provider operations

- **categories.ts** - Category-specific API calls

All API calls are made to the backend URL specified in environment variables.

---

## 🔒 Authentication

Authentication is handled using **Better Auth** with the following features:

- Email/password authentication
- Session management
- Role-based access control
- Protected routes
- Automatic token refresh
- Secure cookie handling

### Auth Flow
1. User registers/logs in
2. Backend returns session token
3. Token stored in secure HTTP-only cookies
4. Middleware validates token on protected routes
5. User redirected based on role

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

3. **Configure Environment Variables**
   - Add all `NEXT_PUBLIC_*` variables in Vercel dashboard

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

---

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations

### Component Guidelines
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Use proper TypeScript types/interfaces

### Best Practices
- Implement proper error boundaries
- Use React.memo for performance optimization
- Lazy load components when appropriate
- Optimize images with Next.js Image component
- Follow accessibility guidelines (WCAG)

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** "Failed to fetch" errors
- **Solution:** Check if backend URL is correct in `.env`
- Ensure backend server is running

**Issue:** Authentication not working
- **Solution:** Clear browser cookies and local storage
- Verify Better Auth configuration

**Issue:** Images not loading
- **Solution:** Check ImgBB API key
- Verify image URLs are valid

---

## 📄 License

This project is part of an academic assignment.

---

## 🤝 Contributing

This is an academic project. Contributions are not currently accepted.

---

## 📧 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Programming Hero Assignment 4**
