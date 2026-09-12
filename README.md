# Tara Kape

Tara Kape is a small-batch coffee e-commerce application built with Next.js. It presents weekly coffee roasts, tells the story behind each batch, and gives customers a simple way to browse products, manage a cart, sign in, and complete checkout.

## Features

- Coffee storefront with featured products and origin information
- Product browsing and cart management
- User authentication and account-aware cart refresh
- Checkout and payment processing with Stripe
- Product and user data backed by MongoDB and Mongoose
- Coffee imagery managed through Cloudinary
- Newsletter subscription form powered by Resend
- Responsive design with Tailwind CSS and reusable UI components

## Home page

`app/(with-header)/page.tsx` is the main Tara Kape storefront page. It combines the hero section, coffee origin marquee, product shop, roasting process, customer quote, newsletter signup, and footer. It also loads products, refreshes the signed-in user's cart, and handles newsletter subscriptions.

## Packages

### Application framework

- **Next.js** - React framework for the application, routing, server actions, and optimized images
- **React** and **React DOM** - UI rendering
- **TypeScript** - Static typing

### Authentication and data

- **next-auth** - Authentication and session management
- **@auth/mongodb-adapter** - MongoDB adapter for NextAuth
- **mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **zustand** - Client-side state management, including the shopping cart

### Payments and communication

- **stripe** - Server-side payment and checkout integration
- **@stripe/stripe-js** - Stripe.js client library
- **@stripe/react-stripe-js** - React components for Stripe Elements
- **resend** - Newsletter and email delivery

### Media, icons, and UI

- **cloudinary** - Image and photo storage
- **lucide-react** - Icons used throughout the interface
- **shadcn** - UI component tooling
- **@base-ui/react** - Accessible UI primitives
- **class-variance-authority** - Variant-based component styling
- **clsx** - Conditional class name composition
- **tailwind-merge** - Safe merging of Tailwind CSS classes
- **tw-animate-css** - Tailwind CSS animations

### Styling and development

- **Tailwind CSS** - Utility-first styling
- **@tailwindcss/postcss** - Tailwind CSS PostCSS integration
- **ESLint** and **eslint-config-next** - Code quality and Next.js linting
- **Prettier** and **prettier-plugin-tailwindcss** - Code formatting
- **@types/node**, **@types/react**, and **@types/react-dom** - TypeScript type definitions

## Getting started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Environment variables

Create a `.env.local` file and configure the credentials required by the enabled services, including MongoDB, NextAuth, Cloudinary, Stripe, and Resend. Keep secret keys out of source control.

Required variables: `MONGODB_URI`, `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `CLOUDINARY_URL`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, and `RESEND_API_KEY`.

## Stripe webhook setup

Set `STRIPE_WEBHOOK_SECRET` to the signing secret for:

```text
/api/webhooks/stripe
```

Subscribe the endpoint to `payment_intent.succeeded`, `payment_intent.payment_failed`, and `payment_intent.canceled`. Payment totals are calculated server-side from the authenticated user's cart. The persisted cart is cleared only after a verified successful-payment webhook; failed and canceled payments preserve the cart for retry.
