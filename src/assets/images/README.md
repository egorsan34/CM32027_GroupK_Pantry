# Images Folder

## Folder Structure

```
src/assets/images/
├── logos/          # App logos, brand assets
├── icons/          # Custom icons, app icons
├── products/       # Product images (groceries)
├── stores/         # Store logos (Tesco, Aldi, etc.)
└── backgrounds/    # Background images
```

## Usage

Import images in your components:

```tsx
import logo from '@/assets/images/logos/nectar-logo.svg';

// Then use in component:
<img src={logo} alt="Nectar Logo" />
```

## Notes
- These images will be processed by Vite
- Images will be optimized during build
- Use this for images that need to be imported in components

