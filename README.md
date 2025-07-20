# IntelliDelve

<div align="center">
  <img src="./public/Main logo TM.png" alt="IntelliDelve Logo" width="200" height="auto" />

  <p align="center">
    <strong>Intelligent Solutions for Modern Business Challenges</strong>
  </p>

  <p align="center">
    A cutting-edge web application built with modern technologies to deliver AI-powered business solutions, compliance tools, and data intelligence services.
  </p>

  <p align="center">
    <a href="#getting-started">Getting Started</a> •
    <a href="#features">Features</a> •
    <a href="#technologies">Technologies</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 🚀 Project Overview

IntelliDelve is a comprehensive web platform that provides intelligent business solutions including:

- **AI-Powered Analytics**: Advanced data processing and predictive analytics
- **Compliance Management**: Regulatory compliance tools and risk assessment
- **Background Screening**: Comprehensive verification and screening services
- **Document Intelligence**: Automated document processing and analysis
- **Interactive Dashboards**: Real-time data visualization and reporting

The platform is designed to help businesses streamline their operations, ensure compliance, and make data-driven decisions through cutting-edge AI and machine learning technologies.

## ✨ Features

### 🎯 Core Features
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Dark/Light Mode**: User-preferred theme switching with system detection
- **Accessibility**: WCAG compliant with comprehensive accessibility features
- **Performance Optimized**: Code splitting, lazy loading, and optimized bundle sizes
- **SEO Friendly**: Server-side rendering support and meta tag management

### 🔧 Business Solutions
- **KYC Compliance**: Know Your Customer verification and compliance tools
- **Risk Scoring**: Advanced risk assessment algorithms
- **Document Processing**: AI-powered document analysis and extraction
- **Predictive Analytics**: Machine learning models for business insights
- **Background Verification**: Employee screening and background verification

### 🎨 User Experience
- **Interactive Charts**: Dynamic data visualization with Recharts
- **Smooth Animations**: GSAP and Framer Motion powered animations
- **Modern UI Components**: ShadCN UI with Radix UI primitives
- **Toast Notifications**: Real-time user feedback system
- **Loading States**: Elegant loading animations and skeleton screens

## 🛠️ Technologies Used

### Frontend Stack
- **[React 18](https://reactjs.org/)** - Modern React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN UI](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives

### State Management & Data Fetching
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Animation & Visualization
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation
- **[Recharts](https://recharts.org/)** - Composable charting library

### Development Tools
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Prettier](https://prettier.io/)** - Code formatting
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS processing and optimization

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/intellidelve.git
   cd intellidelve
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with your configuration:
   ```env
   REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   VITE_API_BASE_URL=your_api_base_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Running Tests

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Folder Structure

```
intellidelve/
├── client/                     # Frontend source code
│   ├── components/            # Reusable React components
│   │   ├── ui/               # ShadCN UI components
│   │   ├── Hero.tsx          # Landing page hero section
│   │   ├── Navigation.tsx    # Main navigation component
│   │   └── ...               # Other components
│   ├── pages/                # Page components and routes
│   │   ├── industries/       # Industry-specific pages
│   │   ├── solutions/        # Solution pages
│   │   ├── Index.tsx         # Home page
│   │   └── ...               # Other pages
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and configurations
│   ├── data/                 # Static data and configurations
│   ├── styles/               # Global styles and CSS
│   ├── utils/                # Helper functions
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Application entry point
│   └── routes.tsx            # Route definitions
├── public/                    # Static assets
│   ├── images/               # Image assets
│   ├── favicon.ico           # Favicon
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
├── shared/                    # Shared utilities and types
├── dist/                      # Production build output
├── scripts/                   # Build and deployment scripts
├── components.json            # ShadCN UI configuration
├── tailwind.config.ts         # TailwindCSS configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🎨 UI Components

The project uses a comprehensive design system built on top of ShadCN UI and Radix UI:

### Available Components
- **Layout**: Grid, Container, Section Headers
- **Navigation**: Mega Menu, Mobile Menu, Breadcrumbs
- **Forms**: Input, Select, Checkbox, Radio, Textarea
- **Feedback**: Toast, Alert, Loading States
- **Data Display**: Cards, Tables, Charts, Testimonials
- **Overlays**: Modal, Popover, Tooltip, Dropdown
- **Media**: Optimized Images, Carousels, Video Players

### Component Usage Example
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">
          Click me
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# ReCaptcha Configuration
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here

# API Configuration
VITE_API_BASE_URL=https://api.intellidelve.com

# Analytics (Optional)
VITE_GA_TRACKING_ID=your_google_analytics_id

# Feature Flags (Optional)
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_RECAPTCHA=true
```

### TailwindCSS Customization

The project includes custom TailwindCSS configuration in `tailwind.config.ts`:

```typescript
// Custom colors, fonts, and animations
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`

3. **Set environment variables** in Vercel dashboard
4. **Deploy**: Automatic deployments on push to main branch

### Netlify

1. **Connect repository to Netlify**
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist/spa`
3. **Configure redirects** in `netlify.toml`
4. **Deploy**

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing Strategy

### Unit Testing
- **Framework**: Vitest with React Testing Library
- **Coverage**: Aim for >80% code coverage
- **Location**: `*.test.tsx` files alongside components

### Integration Testing
- **API Integration**: Mock API responses with MSW
- **User Flows**: Test complete user journeys
- **Accessibility**: Automated a11y testing

### Performance Testing
- **Bundle Analysis**: Use `npm run build:analyze`
- **Lighthouse**: Regular performance audits
- **Core Web Vitals**: Monitor loading, interactivity, and visual stability

## 📈 Performance Optimization

### Code Splitting
- **Route-based**: Automatic code splitting by routes
- **Component-based**: Lazy loading for heavy components
- **Vendor chunks**: Separate vendor libraries

### Asset Optimization
- **Image Optimization**: Sharp for image processing
- **Compression**: Gzip/Brotli compression enabled
- **Caching**: Aggressive caching strategies

### Bundle Analysis
```bash
npm run build:analyze
```

## 🔒 Security

### Security Measures
- **Content Security Policy**: Configured CSP headers
- **HTTPS Only**: Force HTTPS in production
- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: ReCaptcha integration

### Security Headers
```typescript
// Example security headers configuration
{
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines to contribute to IntelliDelve.

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/intellidelve.git
   cd intellidelve
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed

4. **Run tests and linting**
   ```bash
   npm run test
   npm run typecheck
   npm run format.fix
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

#### TypeScript/React
- Use TypeScript for all new code
- Follow React functional component patterns
- Use custom hooks for reusable logic
- Implement proper error boundaries

#### CSS/Styling
- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theming

#### Component Structure
```tsx
// Example component structure
interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export function Component({ title, children }: ComponentProps) {
  return (
    <div className="component-wrapper">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
```

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Pull Request Process

1. **Ensure your PR**:
   - Has a clear title and description
   - Includes tests for new functionality
   - Updates documentation if needed
   - Passes all CI checks

2. **PR Review Process**:
   - At least one maintainer review required
   - All discussions must be resolved
   - CI/CD pipeline must pass

3. **After Approval**:
   - Squash and merge for feature branches
   - Regular merge for release branches

### Issue Reporting

When reporting issues, please include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Clear reproduction steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable

### Feature Requests

For new features:

- **Use Case**: Describe the problem you're solving
- **Proposed Solution**: Your suggested approach
- **Alternatives**: Other solutions you've considered
- **Additional Context**: Any other relevant information

## 📚 Documentation

### API Documentation
- **Endpoints**: `/docs/api/` - API endpoint documentation
- **Authentication**: `/docs/auth/` - Authentication guide
- **Rate Limits**: `/docs/limits/` - API rate limiting

### Component Documentation
- **Storybook**: Run `npm run storybook` for component documentation
- **Props**: TypeScript interfaces document component props
- **Examples**: Usage examples in component files

### Deployment Guides
- **Production**: `/docs/deployment/production.md`
- **Staging**: `/docs/deployment/staging.md`
- **Local Development**: This README

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npm run typecheck

# Update TypeScript definitions
npm update @types/react @types/react-dom
```

#### Styling Issues
```bash
# Rebuild TailwindCSS
npm run build:css

# Check for conflicting styles
npm run lint:css
```

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Community discussions and Q&A
- **Documentation**: Check `/docs` folder for detailed guides
- **Stack Overflow**: Tag questions with `intellidelve`

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 IntelliDelve

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **[React Team](https://reactjs.org/)** - For the amazing React framework
- **[Vite Team](https://vitejs.dev/)** - For the lightning-fast build tool
- **[TailwindCSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[ShadCN](https://ui.shadcn.com/)** - For the beautiful component library
- **[Radix UI](https://www.radix-ui.com/)** - For accessible UI primitives
- **Open Source Community** - For the countless libraries and tools

---

<div align="center">
  <p>Made with ❤️ by the IntelliDelve Team</p>
  <p>
    <a href="https://intellidelve.com">Website</a> •
    <a href="https://github.com/intellidelve">GitHub</a> •
    <a href="https://twitter.com/intellidelve">Twitter</a> •
    <a href="mailto:contact@intellidelve.com">Contact</a>
  </p>
</div>
