# Cowabunga

## Description

Cowabunga is a lightweight web app for cataloging Teenage Mutant Ninja Turtles cards from the UniVersus TCG.

The idea came after a trip to London, where a friend and I discovered a new TMNT card collection and started buying packs.

I used the opportunity to keep practicing React, experiment with Supabase (Auth and Postgres), and ship a minimal but functional app in about two days.

This is a personal, non-commercial project. Not affiliated with UVS Games, Nickelodeon, or any rights holder. All trademarks belong to their respective owners.

## Objectives

- Practice a fast end-to-end flow: Vite + React, Supabase for Auth/DB, GitHub Pages deployment.
- Keep the scope minimal yet useful: Google sign-in, card list, simple inventory states, and sorting.
- Structure data for future expansion.
- Keep code readable and straightforward.

## Tech Stack

![HTML5 badge](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white&style=for-the-badge)
![CSS3 badge](https://img.shields.io/badge/CSS3-1572b6?logo=css&logoColor=white&style=for-the-badge)
![JavaScript badge](https://img.shields.io/badge/JAVASCRIPT-f7df1e?logo=javascript&logoColor=black&style=for-the-badge)
![REACT badge](https://img.shields.io/badge/REACT-61dafb?logo=react&logoColor=black&style=for-the-badge)
![TailwindCSS badge](https://img.shields.io/badge/TAILWINDCSS-06b6d4?logo=tailwindcss&logoColor=white&style=for-the-badge)
![Node.js badge](https://img.shields.io/badge/NODE.JS-5fa04e?logo=node.js&logoColor=white&style=for-the-badge)
![Supabase badge](https://img.shields.io/badge/Supabase-3fcf8e?logo=supabase&logoColor=white&style=for-the-badge)

## File Description

| **FILE**            | **DESCRIPTION**                                                 |
| :-----------------: | --------------------------------------------------------------- |
| `public`            | Public assets.                                                  |
| `src`               | React source code (components, utilities, etc.).                |
| `index.html`        | Application's HTML entry point.                                 |
| `vite.config.js`    | Vite configuration for development and building.                |
| `package.json`      | Dependencies and scripts configuration.                         |
| `package-lock.json` | Automatically generated file locking exact dependency versions. |
| `eslint.config.js`  | Linter configuration to enforce code quality.                   |
| `.gitignore`        | Specifies files and folders to be ignored by Git.               |
| `README.md`         | The README file you are currently reading 😉.                   |

## Installation & Usage

### Installation

1. Clone this repository:
    - Open your preferred Terminal.
    - Navigate to the directory where you want to clone the repository.
    - Run the following command:

```
git clone https://github.com/fchavonet/web-cowabunga.git
```

2. Open the cloned repository.

3. Install dependencies:

```
npm install
```

4. Create a Supabase account and project:

    - Go to [Supabase](https://supabase.com) and sign up.
    - Click “New project” → Choose an organization (or create one).
    - Name your project (e.g., cowabunga) and choose your region.
    - Wait for Supabase to initialize the database.

5. Create the card_status table:

    - In your Supabase dashboard, go to Database → Table editor.
    - Click “New table”, name it `card_status`.
    - Add the following columns:

| **Name**     | **Type**      | **Default value** | **Notes**                      |
| :----------: | :-----------: | :---------------: | ------------------------------ |
| `user_id`    | `uuid`        | -                 | Foreign key → `auth.users.id`. |
| `card_id`    | `text`        | -                 | Card identifier.               |
| `owned`      | `bool`        | `false`           | The user owns this card.       |
| `wanted`     | `bool`        | `false`           | The user wants this card.      |
| `updated_at` | `timestamptz` | `now()`           | Last update timestamp.         |

6. Set up table security and policies:

    - Enable Row Level Security (RLS) on the table.
    - Add the following policy rules (SQL or via UI):

```
-- Allow users to read only their own rows.
create policy "Users can view their own card status"
on card_status for select
using (auth.uid() = user_id);

-- Allow users to insert their own data.
create policy "Users can insert their own card status"
on card_status for insert
with check (auth.uid() = user_id);

-- Allow users to update their own data.
create policy "Users can update their own card status"
on card_status for update
using (auth.uid() = user_id);
```

7. Configure environment variables:

    - Create a `.env.local` file at the project root with:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> In Supabase Dashboard, go to Settings → API, then copy your Project URL and anon public key.

8. Then enable the Google provider:
    
- Go to Authentication → Providers, enable Google, and set your Redirect URLs to match your local environment:

```
http://localhost:3000
```

9. Start the development server:

```
npm run dev
```

### Usage

1. Open the app and sign in with Google.
   
2. Browse the cards list.
   
3. Toggle the Owned or Wanted status on any card.
   
4. Use sorting controls to reorganize the list.

You can also test the project online by clicking [here](https://fchavonet.github.io/full_stack-cowabunga/). 

<table>
    <tr>
        <th align="center" style="text-align: center;">Desktop view</th>
        <th align="center" style="text-align: center;">Mobile view</th>
    </tr>
    <tr valign="top">
        <td align="center">
            <img src="./public/screenshots/desktop_page_screenshot.webp" alt="Desktop Screenshots" width="100%">
        </td>
        <td align="center">
            <img src="./public/screenshots/mobile_page_screenshot.webp" alt="Mobile Screenshot" width="100%">
        </td>
    </tr>
</table>

## What's Next?

- Search & filters (character, rarity...).
- CSV import/export to batch-update inventory.
- PWA & offline caching for quick mobile access.
- Add missing images (secret cards).

## Thanks

- Supabase for the fantastic developer experience!
- UniVersus / UVS Games and the TMNT community for the inspiration and card ecosystem.
- Friends, particularly Alexis, who tested the app and provided valuable feedback.

## Author(s)

**Fabien CHAVONET**
- GitHub: [@fchavonet](https://github.com/fchavonet)
