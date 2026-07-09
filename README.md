# Creatorverse

Submitted by: **Bhargav**

💫 Creatorverse is a full-stack-ready React app for sharing your favorite content
creators. It supports full CRUD — create, read, update, and delete — backed by a
Supabase database.

Time spent: **5 hours** spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch** (via the Supabase JS client)
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL** (`/creator/:id`)
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, and description**

## Stretch Features

The following **stretch** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

## Project Structure

```
creatorverse/
├── index.html              # PicoCSS loaded here
├── supabase_setup.sql      # creates the `creators` table + 5 seed creators
├── .env.example            # template for your Supabase keys
└── src/
    ├── main.jsx            # entry + BrowserRouter
    ├── App.jsx             # routes + fetches all creators
    ├── client.js           # Supabase client
    ├── components/
    │   └── Card.jsx        # a single creator card
    └── pages/
        ├── ShowCreators.jsx   # home (grid of cards)
        ├── ViewCreator.jsx    # single creator detail page
        ├── AddCreator.jsx     # add form
        └── EditCreator.jsx    # edit + delete form
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up the database.** In your Supabase project, open the **SQL Editor**,
   paste the contents of [`supabase_setup.sql`](./supabase_setup.sql), and run it.
   This creates the `creators` table and seeds 5 starter creators.

3. **Add your Supabase credentials.** Either paste them directly into
   `src/client.js`, or (recommended) copy `.env.example` to `.env.local` and fill in:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

   Find both under **Settings → API** in the Supabase dashboard.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open the printed `http://localhost:5173` URL.

## Video Walkthrough

Here's a walkthrough of implemented features:

<!-- Replace the line below with your own GIF/Loom/YouTube link -->
<!-- e.g. recorded with LiceCap (https://www.cockos.com/licecap/) -->

`⏺ Add your walkthrough GIF or video link here`

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [React Router 6](https://reactrouter.com/)
- [Supabase](https://supabase.com/) (Postgres database + JS client)
- [PicoCSS](https://picocss.com/) for styling

## License

    Copyright 2026 Bhargav

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
