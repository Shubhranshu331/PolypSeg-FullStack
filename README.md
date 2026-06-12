# PolypSeg-FullStack

**Full-stack AI web application for colonoscopy polyp segmentation using Attention U-Net.**

Live: [https://polypseg.vercel.app](https://polypseg.vercel.app) ← update after deploy  
Dataset: [Kaggle — CVC-ClinicDB](https://www.kaggle.com/datasets/shubhranshu331/colonoscopy-images)  
Built by: [Shubhranshu](https://github.com/Shubhranshu331)

---

## What It Does

Upload any colonoscopy image → Attention U-Net segments polyp regions → returns:
- Binary segmentation mask
- Amber-highlighted overlay
- Polyp coverage percentage and pixel count

---

## Folder Structure

```
PolypSeg-FullStack/
├── backend/
│   ├── app.py                  Flask API + /predict endpoint
│   ├── requirements.txt        Python dependencies
│   ├── Procfile                Render start command
│   ├── .python-version         Pins Python 3.11.9
│   └── best_model.keras        ← add your model here
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   └── globals.css
│   │   └── components/
│   │       ├── LoadingLogo.jsx  ← swap Canva video here
│   │       ├── Navbar.jsx
│   │       ├── Hero.jsx         3D floating cubes + headline
│   │       ├── About.jsx
│   │       ├── HowItWorks.jsx
│   │       ├── ModelStats.jsx   Animated counters
│   │       ├── Demo.jsx         Upload + results
│   │       ├── TechStack.jsx
│   │       └── Footer.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── .env.example
│
└── README.md
```

---

## Local Setup

### Backend

```bash
cd backend

# Add your model file
cp /path/to/best_model.keras .

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
python app.py
# Running at http://localhost:5000
```

Test it: open `http://localhost:5000` — you should see `{"status": "ok"}`

### Frontend

```bash
cd frontend

# Create env file
# Windows:
echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
# Mac/Linux:
cp .env.example .env.local

# Install packages
npm install

# Start dev server
npm run dev
# Open http://localhost:3000
```

---

## Deploy Backend to Render.com

1. Push repo to GitHub
2. Go to render.com → New → Web Service
3. Connect your GitHub repo

| Field | Value |
|-------|-------|
| Root Directory | `backend` |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app:app --bind 0.0.0.0:$PORT --timeout 120 --workers 1` |
| Instance Type | Free |

4. Click Create Web Service
5. Wait 5–10 minutes for first deploy
6. Get your URL: `https://polypseg-api.onrender.com`

> ⚠️ Commit `best_model.keras` to the repo — Render pulls it from GitHub

---

## Deploy Frontend to Vercel

1. Go to vercel.com → New Project → Import your repo
2. Set Root Directory: `frontend`
3. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://polypseg-api.onrender.com` ← your Render URL
4. Click Deploy
5. Get your URL: `https://polypseg.vercel.app`

---

## Swap Loading Animation (Canva Video)

1. Export your Canva animation as `loading-video.mp4`
2. Place it in `frontend/public/loading-video.mp4`
3. Open `frontend/src/components/LoadingLogo.jsx`
4. Uncomment the `<video>` block and delete the placeholder `<div>`
5. Push to GitHub — Vercel auto-redeploys

---

## Model Details

| Property | Value |
|----------|-------|
| Architecture | Attention U-Net |
| Framework | TensorFlow 2.x / Keras |
| Input | 256 × 256 × 3 (RGB) |
| Output | 256 × 256 × 1 (binary mask) |
| Loss | BCE + Dice Loss |
| Test Dice | 0.7681 |
| Test IoU | 0.6901 |
| Dataset | CVC-ClinicDB |
