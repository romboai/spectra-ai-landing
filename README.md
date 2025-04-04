# SpectraFlow Landing Page

A modern landing page for SpectraFlow - an AI-powered spectral analysis tool.

## Features

- Modern, responsive design
- Newsletter signup with HubSpot integration
- Built with React and TailwindCSS
- Optimized for performance and SEO

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- HubSpot account with API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/spectraflow-landing.git
cd spectraflow-landing
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your HubSpot API key:
```
VITE_HUBSPOT_API_KEY=your_api_key_here
VITE_HUBSPOT_LIST_ID=your_list_id_here
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Development

- `src/App.tsx` - Main landing page component
- `src/services/hubspot.ts` - HubSpot integration service
- `src/index.css` - Global styles and Tailwind configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 