# PHỞ ĐÊM Website

This is the website for PHỞ ĐÊM, a Vietnamese restaurant.

## Performance Optimizations

This website has been optimized for high-performance using several techniques:

### 1. Non-Blocking Font Loading

- Using `preconnect` for Google Fonts domains
- Loading font CSS with `preload` strategy and fallback for noscript users

### 2. Image Optimization

- Lazy loading of images using Intersection Observer API
- Image placeholder technique for faster perceived loading
- Image compression and format optimization
- Proper size attributes to prevent layout shifts

### 3. Resource Caching

- Implemented service worker for offline capabilities via PWA
- Strategic cache policies for different asset types
- Vercel configuration for optimal cache headers

### 4. Code Splitting

- Lazy loading of non-critical components
- Vendor chunk separation in the build process
- Preloading of critical assets

### 5. Performance Monitoring

- Reduced layout thrashing with optimized scroll handling
- Optimized animations for smooth rendering

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production with optimization
npm run build:prod

# Optimize images only
npm run optimize-images

# Preview production build
npm run preview
```

## Technologies

- React with TypeScript
- Vite for bundling
- TailwindCSS for styling
- PWA capabilities for offline use
