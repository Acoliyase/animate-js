# animate-js

A modern animation project scaffold inspired by Motion/Anime style APIs.

This repository contains a full Astro + React site scaffold (originally based on Wix templates) and a self-contained static demo suitable for publishing on GitHub Pages without any private dependencies.

## Quick: GitHub Pages demo (no private deps)

- A static demo is included at `public/demo/` which uses only the browser Web Animations API.
- The demo requires no `npm install` and no access to private registries — you can publish it directly.

How to publish the demo:

1) Docs folder method

   - Copy the contents of `public/demo/` into a `docs/` folder at the repository root.
   - Push to `main` and in GitHub repository Settings → Pages, select the `main` branch and `/docs` folder.

2) gh-pages branch method

   - Create a `gh-pages` branch and put the files from `public/demo/` at the root of that branch.
   - Push the `gh-pages` branch and enable Pages for that branch in the repository Settings.

Either option will publish a static page (HTML + JS) that does not rely on private packages.

## Notes about private / paid dependencies

The original scaffold includes many `@wix/*` packages and other enterprise packages which may require access to private registries or accounts. To avoid build-time failures on GitHub Actions or other CI, either:

- Use the provided static demo in `public/demo/` (recommended, zero-dependency), or
- Remove/replace private packages in `package.json` with public alternatives before attempting to build on CI, or
- Configure the CI environment with credentials to access any private registries used by the project.

If you want, I can help:

- Create a minimal `package.json` for a pure static demo site (no private deps), or
- Replace selected private packages with public alternatives and update code accordingly.

## Local dev (full project — may require private registries)

This project originally uses Wix tooling and a full set of dependencies. If you have access to the required registries, run:

```bash
npm run install-template
npm run dev
```

If you do not have access to private registries, use the static demo described above.

## Where to find the demo

- `public/demo/index.html`
- `public/demo/demo.js`

## Contact / Contributing

If you want me to continue and (A) publish the demo to GitHub Pages, (B) remove private deps from `package.json`, or (C) adapt the site to a minimal build that runs on public CI — tell me which option and I'll proceed.
# Wixstro - Wix Astro Template

A modern, full-featured Wix Astro template built with React, TypeScript, and Tailwind CSS. This template provides a solid foundation for building dynamic, interactive websites with Wix's powerful ecosystem.

## 🚀 Features

- **Astro Framework** - Modern static site generator with server-side rendering
- **React Integration** - Full React support with JSX components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework with custom components
- **Wix Integration** - Seamless integration with Wix services and APIs
- **Modern UI Components** - Radix UI components with custom styling
- **Authentication** - Built-in member authentication and protected routes
- **CMS Integration** - Content management system integration
- **Client-side Routing** - React Router for seamless navigation
- **Responsive Design** - Mobile-first responsive design
- **Testing** - Vitest testing framework setup
- **Development Tools** - ESLint, TypeScript checking, and more

## 🛠️ Tech Stack

- **Framework**: Astro 5.8.0
- **Frontend**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.14
- **Language**: TypeScript 5.8.3
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest
- **Build Tool**: Vite
- **Deployment**: Cloudflare


## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Wix account and site

### Installation

1. **Install dependencies**:
   ```bash
   npm run install-template
   ```

2. **Set up environment variables**:
   ```bash
   npm run env
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

The development server will start and you can view your site at `http://localhost:4321`.

## 📁 Project Structure

```
main/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Head.tsx        # Page head component
│   │   └── Router.tsx      # Routing component
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Astro pages
│   └── styles/             # Global styles
├── integrations/           # Wix integrations
│   ├── cms/               # CMS integration
│   └── members/           # Member authentication
├── public/                # Static assets
└── eslint-rules/          # Custom ESLint rules
```

## 🎨 UI Components

This template includes a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Layout**: Accordion, Collapsible, Tabs, Sheet
- **Forms**: Input, Select, Checkbox, Radio Group, Switch
- **Navigation**: Navigation Menu, Menubar, Breadcrumb
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlays**: Dialog, Popover, Tooltip, Hover Card
- **Data Display**: Table, Card, Badge, Avatar
- **Interactive**: Button, Toggle, Slider, Command

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run release` - Release to Wix
- `npm run env` - Pull environment variables
- `npm run check` - Type check with Astro
- `npm run test:run` - Run tests
- `npm run install-template` - Install dependencies

## 🧪 Testing

The project includes Vitest for testing:

```bash
npm run test:run
```

## 📱 Responsive Design

The template is built with a mobile-first approach and includes:

- Responsive breakpoints
- Touch-friendly interactions
- Optimized images
- Flexible layouts

## 🚀 Deployment

The template is configured for deployment on Cloudflare:

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🆘 Support

For support and questions:

- Check the [Wix Developer Documentation](https://dev.wix.com/)
- Review the [Astro Documentation](https://docs.astro.build/)


---

Built with ❤️ using Wix Vibe, Astro, and modern web technologies.
