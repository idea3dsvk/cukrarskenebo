# 📝 Git Commit Messages Templates

Použite tieto templaty pre konzistentné commit messages:

## Initial Deployment

```
feat: Initial commit - Complete Cukrarske Nebo e-commerce site

- Angular 20 frontend with Tailwind CSS
- Product catalog with 11 categories (108+ products)
- Shopping cart with checkout process
- Admin panel with image upload functionality
- EmailJS integration for order emails (service_qghioic)
- LocalStorage persistence for products and images
- Responsive design with modern UI/UX
- GitHub Pages deployment ready with GitHub Actions
- Comprehensive documentation and setup guides
```

## Feature Updates

```
feat: Add new product category and improve UX

- Add [kategória] products to catalog
- Improve mobile responsiveness
- Enhanced admin panel functionality
- Bug fixes and performance optimizations
```

## Bug Fixes

```
fix: Resolve image upload and email issues

- Fix uploaded image persistence after page refresh
- Resolve EmailJS template formatting
- Improve error handling in checkout process
- Update localStorage error recovery
```

## Documentation Updates

```
docs: Update setup guides and add troubleshooting

- Enhanced EMAILJS_SETUP.md with better instructions
- Added troubleshooting section to README.md
- Updated DEPLOYMENT.md with latest GitHub Pages setup
- Fixed typos and improved clarity
```

## Configuration Changes

```
config: Update EmailJS settings and deployment config

- Update EmailJS Public Key and Service ID
- Modify GitHub Actions workflow
- Update base href for custom domain
- Environment configuration improvements
```

## UI/UX Improvements

```
ui: Enhance product display and navigation

- Improved product card hover effects
- Better mobile navigation menu
- Enhanced loading states and animations
- Accessibility improvements (ARIA labels)
- Updated color scheme and typography
```

## Performance Optimization

```
perf: Optimize images and reduce bundle size

- Implement lazy loading for product images
- Optimize Tailwind CSS purging
- Reduce JavaScript bundle size
- Improve page load performance
```

## Security Updates

```
security: Enhance input validation and XSS protection

- Improve form validation in checkout
- Enhanced email template sanitization
- Update admin authentication handling
- Security audit fixes
```

## Deployment and DevOps

```
deploy: Update GitHub Actions and deployment config

- Fix GitHub Pages deployment issues
- Update workflow for better performance
- Add deployment status monitoring
- Improve error handling in CI/CD
```

---

## Commit Types

- **feat**: Nová funkcionalita
- **fix**: Oprava chyby
- **docs**: Dokumentácia
- **style**: Formátovanie, CSS changes
- **refactor**: Refaktorovanie kódu
- **perf**: Performance vylepšenia
- **test**: Testy
- **build**: Build systém
- **ci**: CI/CD zmeny
- **chore**: Maintenance úlohy
- **security**: Bezpečnostné opravy
- **config**: Konfiguračné zmeny
- **ui**: UI/UX zmeny
- **deploy**: Deployment súvisiace zmeny
