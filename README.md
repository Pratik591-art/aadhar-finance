# Aadhar Finance App

A modern finance application built with React, Vite, and Firebase.

## 🔥 Firebase Phone Authentication

This project includes a complete Firebase Phone Authentication setup with reCAPTCHA verification.

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Firebase:**
   - Update `.env.local` with your Firebase credentials
   - See `FIREBASE_QUICK_START.md` for step-by-step setup

3. **Run the app:**
   ```bash
   npm run dev
   ```

### 📚 Documentation

- **[FIREBASE_QUICK_START.md](./FIREBASE_QUICK_START.md)** - Get started in 5 minutes
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Complete setup guide
- **[AUTH_CONTEXT_GUIDE.md](./AUTH_CONTEXT_GUIDE.md)** - Using AuthContext in your app
- **[FIREBASE_AUTH_README.md](./FIREBASE_AUTH_README.md)** - Features overview

### 🎯 Features

- ✅ Phone number authentication with reCAPTCHA
- ✅ OTP verification
- ✅ Auth context for easy state management
- ✅ Protected routes support
- ✅ Example components included
- ✅ TypeScript-ready

### 🔧 Tech Stack

- React 19
- Vite 7
- Firebase Authentication
- Tailwind CSS 4
- React Router 7

## Project Structure

```
src/
├── components/
│   ├── PhoneAuthExample.jsx    # Direct auth example
│   └── AuthWithContext.jsx     # Context-based auth example
├── contexts/
│   └── AuthContext.jsx         # Auth context provider
├── firebase/
│   ├── config.js              # Firebase configuration
│   ├── auth.js                # Auth functions
│   └── index.js               # Firebase exports
└── pages/
    └── landingPage/           # Landing page components
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Getting Started with Auth

### Option 1: Using Context (Recommended)

```jsx
import { AuthProvider } from './contexts/AuthContext';
import AuthWithContext from './components/AuthWithContext';

function App() {
  return (
    <AuthProvider>
      <AuthWithContext />
    </AuthProvider>
  );
}
```

### Option 2: Direct Functions

```jsx
import PhoneAuthExample from './components/PhoneAuthExample';

function App() {
  return <PhoneAuthExample />;
}
```

## Environment Variables

Create a `.env.local` file with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 📖 Learn More

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## License

MIT
