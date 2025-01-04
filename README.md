# Portfolio Project: From Medicine to Code

This project is a personal portfolio website built using **Next.js**, **Supabase**, and **Tailwind CSS**. It showcases my journey from the medical field into software engineering. The site features a blog, a portfolio section highlighting my projects, and an admin dashboard for managing content.

## Technology Stack

This project utilizes the following technologies:

**Frontend:**

-   **Next.js:** A React framework for building server-side rendered (SSR) and statically generated (SSG) web applications.
    -   **React:** A JavaScript library for building user interfaces.
    -   **App Router:** Next.js's routing system for flexible and dynamic routing.
    -   **Server Components:**  Next.js feature to render components on the server, improving performance and SEO.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
    -   **Headless UI:** A set of completely unstyled, fully accessible UI components, designed to integrate with Tailwind CSS.
    -   **Heroicons:** A set of free MIT-licensed high-quality SVG icons for UI development.
-   **TypeScript:** A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
-   **React Markdown:** A React component that renders Markdown content.
-   **SimpleMDE:** A simple, embeddable, and beautiful Markdown editor (used in the blog editor).
-   **React YouTube:** A React component that renders YouTube videos.
-   **Next/Image:** A Next.js component for optimized image loading.

**Backend:**

-   **Supabase:** An open-source Firebase alternative that provides a suite of tools, including:
    -   **PostgreSQL Database:** A powerful, open-source relational database system.
    -   **Authentication:** User management and authentication services.
    -   **Realtime:** Realtime updates for data changes.
    -   **Storage:** File storage and management.
    -   **Edge Functions:** Serverless functions that run close to your users.
-   **Supabase CLI:** A command-line interface for managing your Supabase project.
-   **Supabase.js:** A JavaScript library for interacting with Supabase services from your client-side code.

**Development Tools:**

-   **ESLint:** A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
-   **Prettier:** An opinionated code formatter that enforces a consistent style.
-   **npm (or yarn/pnpm):** Package managers for JavaScript.

## Project Structure

The project follows a typical Next.js application structure with the following key directories:

-   **`app/`:** Contains the main application code, including pages, components, and API routes.
    -   **`admin/`:** Admin dashboard pages (blog, projects, comments management).
    -   **`blog/`:** Blog pages (list, individual posts, new post creation, editing).
    -   **`portfolio/`:** Portfolio pages (list, individual projects, new project creation, editing).
    -   **`components/`:** Reusable UI components (blog, projects, auth, navigation, etc.).
    -   **`lib/`:** Utility functions and helpers.
        -   **`actions/`:** Server actions for data fetching and mutations (blog posts, projects, comments).
        -   **`auth/`:** Authentication-related code (context, sign-in/sign-up forms).
        -   **`supabase/`:** Supabase client and database types.
-   **`public/`:** Static assets like images and fonts.
-   **`supabase/`:** Supabase configuration and migrations.
-   **`styles/`:** Global CSS styles.

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Set up Supabase:**
    -   Create a Supabase account and project.
    -   Copy your project's API URL and anon key.
    -   Create a `.env.local` file in the root of your project and add the following:

        ```
        NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        ```

4. **Run database migrations:**

    ```bash
    npx supabase db push
    ```

5. **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    The application will be running at `http://localhost:3000`.

## Deployment

The project can be deployed to any hosting platform that supports Node.js applications, such as **Vercel**, **Netlify**, or **AWS**. You can also deploy the Supabase backend to your own infrastructure or use the Supabase hosted service.

**Deployment on Vercel (Recommended):**

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.
