# SpectraAI Landing Page

A modern landing page for SpectraAI, built with React, TypeScript, and Tailwind CSS.

## Project Structure

```
spectra-ai-landing/
├── .github/workflows/   # GitHub Actions workflows
├── public/              # Static assets
├── src/
│   ├── assets/          # Project assets
│   ├── components/      # Reusable React components
│   ├── services/        # API services
│   ├── types/           # TypeScript interfaces
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Example environment variables
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Features

- Responsive design with Tailwind CSS
- TypeScript for type safety
- Component-based architecture
- HubSpot integration for email signups
- GitHub Pages deployment

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm 7+ installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/spectra-ai-landing.git
   cd spectra-ai-landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your actual API keys and settings.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Building for Production

Build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `develop` branch, using the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add some amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

This project is licensed under the MIT License. 