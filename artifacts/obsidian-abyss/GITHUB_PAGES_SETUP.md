# GitHub Pages Deployment Setup

This application is now configured to deploy to GitHub Pages with automatic builds via GitHub Actions.

## Setup Instructions

### 1. Local Development & Build

```bash
# Navigate to the project directory
cd artifacts/obsidian-abyss

# Install dependencies
npm install
# or
pnpm install

# Development mode (Replit compatible)
npm run dev
# or set environment variables
PORT=5173 BASE_PATH=/ npm run dev

# Production build for GitHub Pages
npm run build
# Output will be in: dist/
```

### 2. Push to GitHub

The repository is already configured with:
- `.github/workflows/deploy.yml` - Automatic GitHub Pages deployment
- `vite.config.ts` - Updated for static hosting
- `.env.example` - Environment variable template

**Initial push:**
```bash
git add .
git commit -m "Configure for GitHub Pages deployment with Railway backend"
git push origin main
```

### 3. GitHub Pages Configuration

GitHub Actions will automatically:
1. Build the application with `npm run build`
2. Deploy to GitHub Pages using the `gh-pages` action
3. Make it available at: `https://cheffer0723.github.io/obsidian-abyss/`

**Important:** GitHub Pages deployment happens automatically on every push to `main`. No manual configuration needed.

## Environment Variables

The application automatically uses:
- `VITE_API_URL` - Backend API URL (set to Railway endpoint in GitHub Actions)
- `BASE_PATH` - GitHub Pages base path (set to `/obsidian-abyss/` in GitHub Actions)

**For local development:**
```bash
# .env.local (create this file)
VITE_API_URL=https://emotion-detection-api-production.up.railway.app
BASE_PATH=/
```

## API Integration

The app can now call the Railway backend via `src/lib/api-client.ts`:

```typescript
import { analyzeTradesFromCSV, getRegimeForecast } from '@/lib/api-client';

// Upload trades and get analysis
const result = await analyzeTradesFromCSV(csvContent);

// Get regime forecast
const forecast = await getRegimeForecast();
```

## Features Preserved

✓ All UI components intact (Radix UI, Tailwind CSS)
✓ Three.js 3D graphics
✓ Framer Motion animations
✓ Wouter client-side routing
✓ React Query data fetching

## Build & Deploy Status

- **Vite build output:** `dist/` (GitHub Pages compatible)
- **GitHub Actions:** Automatic on push to main
- **API Backend:** Railway emotion-detection-api
- **Hosting:** github.com pages

## Testing Deployment Locally

```bash
# Build for production
npm run build

# Preview the build
npm run serve
# Visit: http://localhost:5173
```

## Troubleshooting

1. **Build fails locally:** Ensure all dependencies installed
   ```bash
   npm install --force
   ```

2. **API calls fail:** Verify Railway backend is running and `VITE_API_URL` is set correctly

3. **Styles not loading:** Check that `BASE_PATH` matches the GitHub Pages configuration

4. **Assets missing:** Verify the base path in vite.config.ts matches GitHub Pages path
