# Maddie West Events 🎉

Welcome to the **Maddie West Events** repo—where vanilla JS and Webpack were sent packing, and React + Vite now reign supreme. 🚀

Check out the live site here:
https://maddiewestevents.com/

## 🚀 Getting Started

1. **Clone the repo** (because you’re about to make magic):
   git clone https://github.com/your-repo/maddie_west_events.git cd maddie_west_events

2. **Install dependencies** (grab a coffee, it's quick):
   npm install

3. **Start the dev server** (and watch the magic happen):
   npm run dev

Your app will be live at `http://localhost:5173/` (or whatever Vite decides).

## 🏗️ Building for Production

When you're ready to show off:
npm run build

This compiles everything into a neat little `dist/` folder, optimized for deployment.

## 👀 Preview the Build

To see what your production build looks like before launching it to the world:

npm run preview

## 🚢 Deployment

Every merge to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml): it builds the site with `npm run build` and uploads `dist/` to Hostinger over FTP. Only changed files are sent. You can also run it by hand from the Actions tab ("Run workflow").

Required repository secrets (Settings → Secrets and variables → Actions), all found in hPanel → Files → FTP Accounts:

| Secret                   | Example                                 |
| ------------------------ | --------------------------------------- |
| `HOSTINGER_FTP_HOST`     | `123.45.67.89` or `ftp.maddiewestevents.com` |
| `HOSTINGER_FTP_USER`     | `u123456789.maddiewestevents.com`       |
| `HOSTINGER_FTP_PASSWORD` | the FTP account's password              |

## 🧹 Linting (Because Clean Code is Sexy)

Run ESLint to make sure everything is looking tidy:

npm run lint

No errors? You’re a legend. Errors? Fix ‘em.

## ✨ Tech Stack

- **React 18** - Because we like things fresh.
- **Vite** - Blazing fast builds and HMR for that buttery dev experience.
- **GSAP + Framer Motion** - For animations smoother than your best pickup line.
- **SASS** - Because CSS deserves some structure.
- **React Router** - Navigation made easy.

## 📬 Contact Form Magic

Using **Elastic Email** to handle submissions—because who likes setting up email servers? Not us.

## 🛠️ Future Improvements

- Optimize animations for even more smoothness.
- Learn more React best practices and realize how bad I screwed up this implementation.
- Consider world domination (optional).
- Optimize the SPA for better SEO performance to get ALL THE CLICKS.

---

**TL;DR:** Run `npm run dev`, enjoy the experience, and let the event planning magic begin. 🎉
