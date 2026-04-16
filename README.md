# 🎓 Homeschooling App

A Next.js app with a kids' learning game and a parent dashboard, backed by Supabase. Deploys to Vercel in minutes.

- **`/kids`** — your children's learning app (quizzes across 8 GCSE subjects, XP, levels, progress tracking)
- **`/parent`** — PIN-protected dashboard showing daily summaries for each child, from any device

Because everything is stored in Supabase, progress syncs automatically between your kids' tablets and your phone.

---

## 🚀 Step-by-Step Deployment Guide

### 1 · Set up the database in Supabase

1. Go to your Supabase project → **SQL Editor** → **New query**
2. Open `supabase/schema.sql` from this project, copy the entire contents
3. Paste it into the SQL editor and click **Run**
4. You should see "Success. No rows returned" — the tables are now created

### 2 · Get your Supabase keys

1. In Supabase, go to **Settings → API**
2. Copy two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

### 3 · Open the project in Cursor

1. Unzip `homeschooling-app.zip` somewhere on your computer
2. Open Cursor → **File → Open Folder** → select the `homeschooling-app` folder
3. Open a terminal in Cursor (**Terminal → New Terminal**)
4. Install dependencies:
   ```bash
   npm install
   ```

### 4 · Set up your environment variables

1. In Cursor, create a new file called `.env.local` in the project root (same level as `package.json`)
2. Paste this in, replacing the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_PARENT_PIN=1234
   ```
3. **Change the PIN** to something only you know (4–6 digits)

### 5 · Test it locally

In the Cursor terminal:
```bash
npm run dev
```

Open **http://localhost:3000** in your browser. You should see the home page with two buttons. Click "Kids — Learn & Play" and create a test profile. Then go to the Parent Dashboard, enter your PIN, and you should see the test child listed.

If something breaks, check the terminal for error messages. The most common issue is a typo in `.env.local` — make sure there are no quotes around the values.

### 6 · Push to GitHub

1. Go to [github.com](https://github.com) and create a new empty repository (e.g. `homeschooling-app`). **Don't** check any of the "initialize" boxes.
2. In the Cursor terminal, run these commands one by one (replace `YOUR-USERNAME` with your GitHub username):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/homeschooling-app.git
   git push -u origin main
   ```
3. If Git asks you to log in, follow the prompts. Cursor may open a browser for authentication.

### 7 · Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in (you can sign in with GitHub)
2. Click **Add New → Project**
3. Find your `homeschooling-app` repository and click **Import**
4. **Before deploying**, expand the **Environment Variables** section and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `NEXT_PUBLIC_PARENT_PIN` = your chosen PIN
5. Click **Deploy**
6. Wait ~1 minute. Vercel will give you a URL like `https://homeschooling-app-xyz.vercel.app` — that's your live app!

### 8 · Put it on the kids' tablets

1. Open the Vercel URL in Safari (iPad) or Chrome (Android tablet)
2. On iPad: tap the **Share** button → **Add to Home Screen**
3. On Android: tap the **three-dot menu** → **Add to Home screen**
4. The app icon will appear like a native app. Repeat for your own phone for the Parent Dashboard.

---

## 🔧 Making Changes

Any time you want to update the app:

1. Edit files in Cursor
2. Test locally with `npm run dev`
3. Push your changes:
   ```bash
   git add .
   git commit -m "describe your change"
   git push
   ```
4. Vercel auto-deploys within ~60 seconds

---

## 📝 File Structure

```
homeschooling-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home (kids / parent selector)
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Animations and global styles
│   │   ├── kids/page.tsx         # Kids' learning app
│   │   └── parent/page.tsx       # Parent Dashboard (PIN-gated)
│   └── lib/
│       ├── supabase.ts           # Supabase client
│       ├── constants.ts          # Subjects, levels, avatars
│       ├── questions.ts          # Question bank (480+ questions)
│       └── db.ts                 # Database helper functions
├── supabase/
│   └── schema.sql                # Run once in Supabase SQL editor
├── .env.example                  # Copy to .env.local and fill in
├── package.json
└── README.md
```

---

## 🛠 Troubleshooting

**"Cannot find module '@supabase/supabase-js'"**
Run `npm install` again.

**Kids app shows "Add a Learner" but nothing saves**
Check that your Supabase URL and anon key in `.env.local` are correct, and that you ran the SQL schema. Check the browser console (F12) for error details.

**Parent dashboard says "No Learners Yet" but kids have profiles**
Make sure all devices are using the **same deployed URL** (not localhost on one and Vercel on another), since each Supabase project is one shared database.

**Want to wipe everything and start fresh?**
In Supabase → SQL Editor, run: `delete from children;` (this cascades to clear all progress too).

---

## 🎯 Next Steps

Ideas for improvements:
- Add weekly/monthly trend charts to the parent dashboard
- Add a reading comprehension mode with longer passages
- Award badges for topic mastery (80%+ over 10+ attempts)
- Add audio reading for younger kids
- Add a "challenge mode" for review of weakest topics
