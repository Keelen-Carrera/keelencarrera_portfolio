# Keelen Carrera — DevSecOps Portfolio

A production-grade personal portfolio website built to showcase DevSecOps engineering, SOC analysis, and security lab work.

**Live site:** `https://keelencarrera.netlify.app` *(update after deploy)*

---

## 🗂 Project Structure

```
portfolio/
├── index.html          # Main single-page site
├── css/
│   ├── style.css       # Core layout, components, responsive
│   └── animations.css  # Scroll reveals, transitions, hover effects
├── js/
│   └── main.js         # Canvas grid, cursor, scroll behavior, form
├── netlify.toml        # Netlify config, security headers, redirects
└── README.md
```

---

## 🚀 Deploy to Netlify via GitHub

### Step 1 — Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `portfolio` (or `keelencarrera.dev`)
3. Set it to **Public**
4. Do NOT initialize with README (you already have one)

### Step 2 — Push Local Files

```bash
# Navigate to your portfolio folder
cd portfolio/

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "feat: initial portfolio site"

# Add your GitHub repo as remote (replace with your actual URL)
git remote add origin https://github.com/keelencarrera/portfolio.git

# Push to main branch
git push -u origin main
```

### Step 3 — Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and log in (free account)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as the Git provider
4. Select your `portfolio` repository
5. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (dot — the root)
6. Click **"Deploy site"**

Netlify will give you a URL like `https://random-name.netlify.app`

### Step 4 — Custom Domain (Optional)

1. In Netlify: **Domain settings** → **Add custom domain**
2. Enter your domain (e.g., `keelencarrera.dev`)
3. Update your domain's DNS nameservers to Netlify's
4. Netlify auto-provisions an SSL certificate via Let's Encrypt

### Step 5 — Enable Netlify Forms

The contact form uses Netlify Forms (free for up to 100 submissions/month).

1. In Netlify dashboard: **Forms** tab
2. After first deploy, form submissions appear here automatically
3. Enable **email notifications** in Forms → Settings

---

## 🔄 Updating the Site

Every push to `main` triggers an automatic redeploy:

```bash
# Make your changes, then:
git add .
git commit -m "feat: add new lab project"
git push
```

Netlify redeploys in ~30 seconds. ✅

---

## 📋 Customization Checklist

Before going live, update these values in `index.html`:

- [ ] Email address in contact section (`mailto:keelen@example.com`)
- [ ] GitHub profile URL (`https://github.com/keelencarrera`)
- [ ] LinkedIn URL (`https://linkedin.com/in/keelencarrera`)
- [ ] Project GitHub links (once repos are created)
- [ ] Project status badges (In Progress → Completed as you finish labs)
- [ ] Add Houston, TX or your city to the meta/about section

---

## 🔐 Security Headers

`netlify.toml` includes production security headers:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` — prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` — prevents MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Content-Security-Policy` | Restricts scripts to self only |

---

## 📊 GitHub Repos to Create & Link

As you build each lab, create these repos and link them in `index.html`:

| Project | Suggested Repo Name |
|---------|-------------------|
| Wazuh SIEM Home Lab | `siem-detections` |
| Secure CI/CD Pipeline | `devsecops-pipeline` |
| AWS Threat Detection | `aws-threat-detection-lab` |
| PCAP Analysis | `security-labs` |
| Threat Intel Automation | `threat-intel-automation` |

---

## 🛠 Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — zero framework dependencies, maximum performance
- **GitHub** — version control + source of truth
- **Netlify** — CI/CD deployment on every push, free SSL, form handling
- **Netlify Forms** — contact form backend, no server required
- **Google Fonts** — Syne (display) + DM Mono (code aesthetic)

---

*Built with purpose. Deployed with security. Documented like a professional.*
