# System Patterns

## System Architecture
HabitJunkie follows a modern React application architecture using Next.js as the framework. The application is structured with a clear separation of concerns and follows a component-based architecture.

### High-Level Architecture
```
HabitJunkie
├── App Container (Next.js)
│   └── Dashboard
│       ├── Header (User Stats)
│       ├── Main Content
│       │   ├── HabitsList
│       │   ├── DailiesList
│       │   ├── TodosList
│       │   └── RewardsList
│       └── Footer
```

## Key Technical Decisions

### 1. Next.js Framework
- **App Router**: Using Next.js 15's app router for routing and layout management
- **Client Components**: Leveraging 'use client' directive for interactive components
- **Server Components**: Utilizing server components where appropriate for improved performance

### 2. State Management
- **Context API**: Using React's Context API for global state management
- **Local Storage**: Persisting application state in the browser's localStorage
- **Component State**: Using React's useState for component-specific state

### 3. Styling Approach
- **Tailwind CSS**: Utilizing utility-first CSS framework for styling
- **Dark Mode Support**: Implementing theme switching capabilities
- **Responsive Design**: Ensuring the application works well across different screen sizes

### 4. Data Persistence
- Currently using localStorage for data persistence
- Structured to allow for future backend integration

## Design Patterns

### 1. Context Provider Pattern
The application uses the Context Provider pattern to manage global state and provide it to components throughout the application hierarchy. This is implemented through:
- `DashboardContext`: Manages user data, tasks, and related functions
- `ThemeContext`: Manages theme state (light/dark mode)

### 2. Component Composition
The UI is built using component composition, with smaller, reusable components combined to create more complex interfaces:
- `Card`: A reusable container component
- `ListItem`: A reusable component for displaying items in lists
- `Dashboard`: Composes multiple list components

### 3. Custom Hooks
Custom hooks are used to encapsulate and reuse stateful logic:
- `useDashboard`: Provides access to the dashboard context
- `useTheme`: Provides access to the theme context

### 4. Controlled Components
Form inputs and interactive elements are implemented as controlled components, with their state managed by React.

## Component Relationships

### Core Components
1. **Dashboard**: The main container component that orchestrates the layout and includes the DashboardProvider
2. **Header**: Displays user information and stats
3. **List Components**:
   - `HabitsList`: Displays and manages habits
   - `DailiesList`: Displays and manages daily tasks
   - `TodosList`: Displays and manages todo items
   - `RewardsList`: Displays and manages rewards

### Context Providers
1. **DashboardProvider**:
   - Provides user data (level, health, experience, gold, etc.)
   - Provides tasks data (habits, dailies, todos, rewards)
   - Provides functions to interact with the data (toggle completion, update habits, purchase rewards)
   - Handles data persistence with localStorage

2. **ThemeProvider**:
   - Manages theme state (light/dark)
   - Provides theme switching functionality

### Utility Components
1. **Card**: A reusable container with consistent styling
2. **ListItem**: A reusable component for displaying items in lists
3. **ThemeToggle**: Toggles between light and dark mode
4. **AddHabitModal**: Modal for adding new habits

## Data Flow
1. User interacts with a component (e.g., clicks a habit's plus button)
2. Component calls the appropriate context function (e.g., `updateHabit`)
3. Context function updates the state
4. State changes trigger re-renders of affected components
5. Updated state is persisted to localStorage

## Future Architecture Considerations
1. **API Integration**: Prepare for backend integration to replace localStorage
2. **Authentication**: Add user authentication and account management
3. **State Management Evolution**: Consider more robust state management solutions if complexity increases
4. **Performance Optimization**: Implement memoization and other performance optimizations as the application grows
