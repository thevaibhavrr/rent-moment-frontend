# 3D Hero Section Architecture

## Component Structure

```
Hero Component
├── useFeaturedProducts Hook
│   ├── API Call: /api/products/featured
│   ├── Loading State
│   └── Error Handling
├── ProductCarousel3D Component
│   ├── 3D Transform Logic
│   ├── Auto-play Timer
│   ├── Navigation Controls
│   └── Product Selection
└── Content Overlay
    ├── Dynamic Product Info
    ├── CTA Buttons
    └── Floating Elements
```

## 3D Carousel Layout

```
Front View (Active Product)
    ┌─────────────────┐
    │   [Product 1]  │ ← Active (z-index: 10, opacity: 1)
    │   [Product 2]   │
    │   [Product 3]   │
    └─────────────────┘

Side View (3D Perspective)
    [Product 0] ← Left (rotateY: 45deg, translateX: -100px)
    [Product 1] ← Center (Active)
    [Product 2] → Right (rotateY: -45deg, translateX: 100px)
    [Product 3] ← Background (scale: 0.6, opacity: 0.2)
```

## Data Flow

```
1. Hero Component Mounts
   ↓
2. useFeaturedProducts Hook
   ↓
3. API Call to /api/products/featured
   ↓
4. Products Data Received
   ↓
5. ProductCarousel3D Renders
   ↓
6. 3D Transform Calculations
   ↓
7. User Interactions
   ├── Click Product → Update Selected Product
   ├── Navigation → Update Current Index
   └── Auto-play → Rotate Products
```

## CSS 3D Transforms

```css
/* Active Product */
transform: translateZ(0px) scale(1);
opacity: 1;
z-index: 10;

/* Previous Product */
transform: translateZ(-200px) translateX(-100px) rotateY(45deg) scale(0.8);
opacity: 0.6;
z-index: 5;

/* Next Product */
transform: translateZ(-200px) translateX(100px) rotateY(-45deg) scale(0.8);
opacity: 0.6;
z-index: 5;

/* Background Products */
transform: translateZ(-400px) scale(0.6);
opacity: 0.2;
z-index: 1;
```

## Animation Timeline

```
0s: Product 1 Active
1s: Smooth transition to Product 2
2s: Product 2 Active
3s: Smooth transition to Product 3
4s: Product 3 Active
5s: Loop back to Product 1
```

## Interactive Features

### Navigation
- **Arrow Buttons**: Previous/Next navigation
- **Dot Indicators**: Direct product selection
- **Play/Pause**: Auto-play control
- **Product Click**: Select specific product

### Visual Effects
- **Hover Effects**: Pause auto-play on hover
- **Smooth Transitions**: 1000ms ease-in-out
- **3D Perspective**: 1000px perspective distance
- **Floating Elements**: Animated background elements

## Responsive Behavior

### Desktop (1024px+)
- Full 3D carousel with all effects
- Side-by-side product layout
- Complete navigation controls

### Tablet (768px - 1023px)
- Simplified 3D effects
- Reduced perspective distance
- Touch-friendly controls

### Mobile (< 768px)
- 2D carousel fallback
- Swipe navigation
- Optimized touch interactions
