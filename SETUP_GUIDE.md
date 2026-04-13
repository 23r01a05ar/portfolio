# 🚀 VALLABHA PORTFOLIO — COMPLETE SETUP & DEPLOYMENT GUIDE
## Stack: Next.js 14 + Supabase + Vercel (All Free Tier)

---

## STEP 1: Set Up Supabase (5 mins)

### 1.1 Create Project
1. Go to https://supabase.com → Sign up (free)
2. Click **"New Project"**
3. Fill in:
   - Name: `vallabha-portfolio`
   - Password: (save this — DB password)
   - Region: **South Asia (Mumbai ap-south-1)** ← closest to Hyderabad
4. Click **"Create new project"** (takes ~2 mins)

### 1.2 Create Database Tables + RLS
1. In your Supabase dashboard → **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase-setup.sql` from this project
4. **Paste the entire contents** into the editor
5. Click **"Run"** (green button)
6. You should see: "Success. No rows returned."

### 1.3 Create Your Admin User
1. In Supabase dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - Email: `kanchumarthisaisrivallabha@gmail.com`
   - Password: (choose a strong password — you'll use this to log into admin panel)
4. Click **"Create user"**

### 1.4 Get Your API Keys
1. In Supabase → **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

## STEP 2: Local Development Setup

### 2.1 Install & Run Locally
```bash
# 1. Extract the portfolio.zip
unzip portfolio.zip
cd portfolio

# 2. Install dependencies
npm install

# 3. Create your .env.local file
cp .env.local.example .env.local
```

### 2.2 Fill in .env.local
Open `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJYOUR_ANON_KEY_HERE
NEXT_PUBLIC_ADMIN_EMAIL=kanchumarthisaisrivallabha@gmail.com
```

### 2.3 Run the dev server
```bash
npm run dev
# Open http://localhost:3000
```

### 2.4 Test Admin Login
1. Go to http://localhost:3000/admin/login
2. Login with your email + the password you set in Supabase Auth step

---

## STEP 3: Deploy to Vercel (Free)

### 3.1 Push to GitHub
```bash
# If you haven't already, create a GitHub repo
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/23r01a05ar/portfolio.git
git push -u origin main
```

### 3.2 Deploy on Vercel
1. Go to https://vercel.com → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Import your `portfolio` GitHub repo
4. Under **"Environment Variables"**, add these 3 variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL     = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
   NEXT_PUBLIC_ADMIN_EMAIL      = kanchumarthisaisrivallabha@gmail.com
   ```
5. Click **"Deploy"**

Your site will be live at: `https://portfolio-xxx.vercel.app`

### 3.3 (Optional) Custom Domain
If you have a domain like `vallabha.dev`:
1. In Vercel → Project → **Settings** → **Domains**
2. Add your domain and follow DNS instructions

---

## STEP 4: Using the Admin Panel

### Access
- URL: `https://your-site.vercel.app/admin/login`
- Email: `kanchumarthisaisrivallabha@gmail.com`
- Password: (what you set in Supabase Auth)

### Managing Content

**Stories:**
- Go to `/admin/dashboard` → Stories
- Click "New Story" to write blog posts
- Upload cover images (stored in Supabase Storage)
- Edit or delete any existing story

**Gallery:**
- Upload photos from hackathons, events, meetups
- Add optional captions
- Photos show up in the gallery section on the homepage

**Certificates:**
- Add certifications with title, issuer, date
- Upload PDF or image files
- These show alongside your static resume certs

---

## STEP 5: Supabase Storage Buckets (if SQL didn't create them)

If you get storage errors, create buckets manually:
1. Supabase → **Storage** (left sidebar)
2. Click **"New bucket"** for each:
   - `stories` → **Public bucket** ✓
   - `gallery` → **Public bucket** ✓
   - `certificates` → **Public bucket** ✓

---

## FREE TIER LIMITS (You're well within these)

| Service | Free Limit | Your Usage |
|---------|-----------|------------|
| Supabase DB | 500MB | < 10MB |
| Supabase Storage | 1GB | < 100MB |
| Supabase Auth | 50,000 users | 1 user (just you) |
| Vercel Deployments | Unlimited | ✓ |
| Vercel Bandwidth | 100GB/month | < 1GB |

---

## TROUBLESHOOTING

**"Cannot log in to admin"**
→ Check NEXT_PUBLIC_ADMIN_EMAIL matches exactly what you put in Supabase Auth

**"Images not showing"**
→ Check storage buckets are set to Public in Supabase Storage settings

**"Build failed on Vercel"**
→ Check all 3 environment variables are set correctly in Vercel dashboard

**"Supabase connection error"**
→ Verify your Project URL and Anon Key are correct (no trailing spaces)

---

## PROJECT STRUCTURE

```
src/
├── app/
│   ├── page.tsx              ← Main portfolio homepage
│   ├── stories/
│   │   ├── page.tsx          ← All stories listing
│   │   └── [id]/page.tsx     ← Individual story
│   └── admin/
│       ├── login/page.tsx    ← Admin login
│       ├── dashboard/page.tsx← Admin dashboard
│       ├── stories/page.tsx  ← Manage stories
│       ├── gallery/page.tsx  ← Manage gallery
│       └── certificates/page.tsx ← Manage certs
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Certifications.tsx
│   │   ├── Stories.tsx
│   │   ├── Gallery.tsx
│   │   └── Contact.tsx
│   └── admin/
│       └── LogoutButton.tsx
├── lib/
│   ├── data.ts               ← All your resume/portfolio data
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
└── types/index.ts
```

**To update your resume content:** Edit `src/lib/data.ts` directly.
