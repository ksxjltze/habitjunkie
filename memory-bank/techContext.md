# Technical Context

## Technologies Used

### Core Framework and Libraries
- **Next.js 15.2.3**: React framework for production
- **React 19.0.0**: JavaScript library for building user interfaces
- **TypeScript 5**: Typed superset of JavaScript
- **Tailwind CSS 4.0.15**: Utility-first CSS framework

### UI Components and Styling
- **Heroicons 2.2.0**: SVG icon library
- **Three.js 0.174.0**: 3D library for JavaScript
- **@react-three/fiber 9.1.0**: React renderer for Three.js

### Development Tools
- **ESLint 9**: JavaScript linting utility
- **Turbopack**: Next.js bundler for development (via `next dev --turbopack`)
- **PostCSS 8.5.3**: Tool for transforming CSS with JavaScript

## Development Setup

### Project Structure
```
habitjunkie/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── contexts/       # React context providers
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── next.config.ts      # Next.js configuration
```

### Key Directories and Files
- **src/app/**: Contains the Next.js app router pages and layouts
- **src/components/**: Contains all React components
- **src/contexts/**: Contains context providers for state management
- **src/types/**: Contains TypeScript type definitions
- **src/utils/**: Contains utility functions

### Development Workflow
1. **Local Development**: `npm run dev` starts the development server with Turbopack
2. **Building**: `npm run build` creates a production build
3. **Production**: `npm run start` starts the production server
4. **Linting**: `npm run lint` runs ESLint to check code quality

## Technical Constraints

### Browser Storage
- Currently using localStorage for data persistence
- Limited by browser storage capacity (typically 5-10MB)
- Data is device-specific and not synced across devices

### Client-Side Rendering
- Application primarily uses client-side rendering
- State is managed on the client side
- No server-side persistence currently implemented

### Browser Compatibility
- Targets modern browsers with good ES6+ support
- Uses modern React features (hooks, context)
- Relies on localStorage API

### Performance Considerations
- Large state objects in localStorage may impact performance
- React context updates can cause re-renders across the component tree
- Three.js can be resource-intensive for 3D visualizations

## Dependencies

### Production Dependencies
```json
{
  "@heroicons/react": "^2.2.0",
  "@react-three/fiber": "^9.1.0",
  "@types/three": "^0.174.0",
  "next": "15.2.3",
  "postcss": "^8.5.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "three": "^0.174.0"
}
```

### Development Dependencies
```json
{
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4.0.15",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.2.3",
  "tailwindcss": "^4.0.15",
  "typescript": "^5"
}
```

## Future Technical Considerations

### Backend Integration
- Plan for API endpoints to replace localStorage
- Consider serverless functions for user authentication and data persistence
- Prepare for data migration from localStorage to server storage

### Performance Optimization
- Implement memoization for expensive calculations
- Consider code splitting for larger components
- Optimize Three.js usage for better performance

### Mobile Responsiveness
- Ensure all components work well on mobile devices
- Consider touch interactions for mobile users
- Test on various screen sizes and devices

### Accessibility
- Implement ARIA attributes for better screen reader support
- Ensure keyboard navigation works properly
- Test with accessibility tools and screen readers
