# Calendar Team Viewer

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying [`app/page.tsx`](app/page.tsx). The page auto-updates as you edit the file.

## Project Structure

- `app/`: Contains the main application components and pages.
  - `common/`: Shared data and types.
    - [`data.ts`](app/common/data.ts): Contains initial data for team members, appointments, and clients.
    - [`type.ts`](app/common/type.ts): Defines TypeScript interfaces for the data.
  - `components/`: React components used in the application.
    - [`Tabs.tsx`](app/components/Tabs.tsx): Component for rendering tabs.
    - [`RightPanel.tsx`](app/components/RightPanel.tsx): Component for the right panel with client information.
    - [`Controls.tsx`](app/components/Controls.tsx): Component for the control panel with filters and navigation.
    - [`TeamScheduler.tsx`](app/components/TeamScheduler.tsx): Main component for the team scheduler view.
  - `context/`: Context providers for state management.
    - [`CalendarContext.tsx`](app/context/CalendarContext.tsx): Context and provider for calendar state management.
  - `utils/`: Utility functions.
    - [`dateUtils.ts`](app/utils/dateUtils.ts): Utility functions for date and time manipulation.
  - [`globals.css`](app/globals.css): Global CSS styles.
  - [`layout.tsx`](app/layout.tsx): Root layout component.
  - [`page.tsx`](app/page.tsx): Home page component.
- `.next/`: Next.js build output.
- `public/`: Static assets.
- `types/`: TypeScript type definitions.
- `next.config.ts`: Next.js configuration file.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.
- `postcss.config.mjs`: PostCSS configuration file.
- `.gitignore`: Git ignore file.

## Calendar Context

The `CalendarContext` provides state management for the calendar view. It includes the following:

- `viewMode`: The current view mode ("Day", "Week", or "Month").
- `setViewMode`: Function to set the view mode.
- `currentDate`: The current date being viewed.
- `setCurrentDate`: Function to set the current date.
- `visibleRange`: The visible date range based on the current date and view mode.
- `goToPrevious`: Function to navigate to the previous date range.
- `goToNext`: Function to navigate to the next date range.
- `goToToday`: Function to navigate to the current date.

### Usage

To use the `CalendarContext`, wrap your components with the `CalendarProvider`:

```tsx
import { CalendarProvider } from './context/CalendarContext';

function MyApp({ Component, pageProps }) {
  return (
    <CalendarProvider>
      <Component {...pageProps} />
    </CalendarProvider>
  );
}

export default MyApp;
```

Then, use the `useCalendar` hook to access the context values:

```tsx
import { useCalendar } from './context/CalendarContext';

const MyComponent = () => {
  const { viewMode, setViewMode, currentDate, setCurrentDate, visibleRange, goToPrevious, goToNext, goToToday } = useCalendar();

  // Use the context values in your component
};
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
