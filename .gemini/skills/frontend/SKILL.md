---
name: frontend
description: Comprehensive guidance for building, testing, and optimizing frontend applications. Use when the user needs help with UI components, state management, styling (Tailwind, CSS), framework-specific logic (React, Angular), or CLI-based rendering using Ink.
---

# Frontend Expert Skill

This skill provides expert guidance for frontend development, from UI/UX implementation to complex state management.

## Core Competencies

- **Component Architecture**: Designing reusable, modular, and maintainable components.
- **State Management**: Expertise in React Hooks, Redux, Zustand, and Context API.
- **Styling & Layout**: CSS-in-JS, Tailwind CSS, Flexbox, Grid, and responsive design.
- **CLI UI (Ink)**: Specific patterns for building terminal-based React applications (like Gemini CLI itself).
- **Performance**: Virtualization, memoization, and lazy loading.
- **Testing**: Unit and integration testing with Vitest, Jest, and Playwright.

## Common Workflows

### Creating a New Component

1. Define the component's purpose and state requirements.
2. Choose the appropriate styling method (Tailwind vs. CSS Modules).
3. Implement accessibility (A11y) standards.
4. Add comprehensive tests.

### State Management Selection

- **Local State**: Use `useState` for simple component-level state.
- **Shared State**: Use `useContext` or a lightweight store (Zustand) for state shared across a feature.
- **Global State**: Use Redux for complex, app-wide state.

## Best Practices

- **Atomic Design**: Structure components into atoms, molecules, and organisms.
- **Prop Validation**: Use TypeScript interfaces for all component props.
- **Accessibility First**: Always include ARIA labels and keyboard navigation.
- **Separation of Concerns**: Keep business logic in hooks, UI in components.
