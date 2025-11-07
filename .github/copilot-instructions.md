4# Kavitaara AI Development Guide

## Project Overview
Kavitaara is a social media platform focused on Telugu poetry, built with a modern tech stack:
- Frontend: Next.js 16.0 with TypeScript and App Router
- UI: Custom components with Tailwind CSS and Radix UI primitives
- Authentication: Email and Google OAuth (in progress)

## Architecture & Structure

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Shared React components
│   │   ├── ui/        # Base UI components
│   │   └── *.tsx      # Feature components
│   └── lib/           # Shared utilities
```

### Key Design Patterns
1. **Component Architecture**
   - Base UI components in `components/ui/` (see `button.tsx`, `input.tsx`)
   - Feature components in root `components/` (see `auth-form.tsx`)
   - Client-side components marked with "use client" directive

2. **Styling Approach**
   - Tailwind CSS with custom theme variables in `globals.css`
   - Design system colors defined in `:root` using OKLCH color space
   - Consistent animation patterns (see `animate-blob` in `globals.css`)

3. **State Management**
   - React hooks for local component state
   - Form state handled with controlled components
   - Loading states managed per-component

## Development Workflow

### Setup & Installation
```bash
cd frontend
npm install
npm run dev   # Starts dev server on http://localhost:3000
```

### Key Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint

### Code Conventions
1. **Typescript**
   - Strict mode enabled
   - Component props defined with interfaces
   - React.FC type avoided in favor of explicit props

2. **File Organization**
   - One component per file
   - Component files named in kebab-case
   - Imports using `@/` alias (configured in tsconfig.json)

3. **Component Patterns**
   ```tsx
   // Client components
   "use client"
   
   interface ComponentProps {
     // Props interface
   }
   
   export default function Component({ prop1, prop2 }: ComponentProps) {
     // Implementation
   }
   ```

### Error Handling
- Form validation errors displayed in red alert boxes
- Loading states disable form inputs
- Async operations wrapped in try/catch blocks

## Integration Points

### Authentication (WIP)
- Email/password auth form in `auth-form.tsx`
- Google OAuth integration placeholder
- Form validation and error handling implemented

## Common Operations

### Adding New UI Components
1. Create new component in `components/ui/`
2. Export from component file
3. Import using `@/components/ui` alias

### Styling New Features
1. Use Tailwind classes with project color scheme
2. Add custom animations in `globals.css` if needed
3. Follow existing patterns for hover/focus states

### Form Implementation
1. Use controlled components with state hooks
2. Include loading states
3. Implement error handling
4. Follow `auth-form.tsx` pattern for consistency

## Future Considerations
- Backend API integration points will be added
- State management may need revisiting as app grows
- Authentication flow needs completion