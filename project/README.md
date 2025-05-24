# Periskope Chat Application

A real-time chat application built with Next.js, Tailwind CSS, and Supabase.

## Features

- Real-time messaging with Supabase subscriptions
- User authentication and authorization
- Chat conversation management
- Chat labels and filtering
- Responsive design for all screen sizes

## Technologies Used

- Next.js 13.5
- TypeScript
- Tailwind CSS
- Supabase (Authentication, Database, Real-time)
- shadcn/ui Components
- React Hook Form with Zod validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Supabase:
   - Create a Supabase project
   - Run the SQL migrations in the `supabase/migrations` directory
   - Set up your environment variables in a `.env.local` file:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `/app` - Next.js 13 app directory
- `/components` - React components
- `/lib` - Utility functions and libraries
- `/types` - TypeScript type definitions
- `/supabase` - Supabase related files and migrations