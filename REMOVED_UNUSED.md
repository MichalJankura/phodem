Removed unused code/assets for performance:
- Deleted PreloadProvider usage and related preload logic in App.tsx
- Removed FirefliesOverlay (decorative animation) from hero
- Replaced react-icons with inline SVG (Navbar, Contact) -> react-icons can be uninstalled
- Trimmed index.css: removed dark theme vars, unused animations, container & extra utility classes
- Left hooks useLazyImage, OptimizedImage component if later needed (not yet deleted). Consider deleting if not referenced.

Next optional cleanups:
1. Delete unused files: src/components/OptimizedImage.tsx, src/hooks/useLazyImage.ts, src/hooks/usePreload.tsx, src/App.css
2. Remove dependency react-icons from package.json and reinstall
3. Generate WOFF2 subset fonts
4. Add hero preload link tags for mobile/desktop variant

Specify if you want these executed.
