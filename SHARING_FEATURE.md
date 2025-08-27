# Product Sharing Feature

This document explains the new product sharing feature that allows users to share products with rich previews on WhatsApp and other social media platforms.

## Overview

The sharing feature creates special product links that display both the product image and information when shared on WhatsApp, Facebook, Twitter, and other social media platforms. This is achieved through Open Graph meta tags and dedicated sharing pages.

## How It Works

### 1. Share URLs
- **Format**: `/product/{productSlug}`
- **Example**: `https://rent-moment.belivmart.com/product/designer-lehenga-1`

### 2. Open Graph Meta Tags
The sharing pages include comprehensive Open Graph meta tags that provide:
- Product title with price
- Product description
- Product image (1200x630px optimized)
- Category and discount information
- Proper URL structure

### 3. WhatsApp Integration
- **Get Info Button**: Sends detailed product information to WhatsApp
- **Share Button**: Creates a shareable link with product preview
- **Direct Sharing**: Users can share products directly from product cards

## Implementation Details

### Files Created/Modified

1. **`/app/share/[productId]/page.tsx`** - New sharing page with Open Graph meta tags
2. **`/app/utils/shareUtils.ts`** - Utility functions for sharing functionality
3. **`/app/components/ProductCard.tsx`** - Added share button to product cards
4. **`/app/product/[productId]/page.tsx`** - Updated to use new share links
5. **`/app/layout.tsx`** - Enhanced with site-wide Open Graph meta tags

### Key Features

#### 1. Dynamic Meta Tags
```typescript
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const product = await getProductBySlug(productId);
  
  return {
    title: `${product.name} - Rent for ₹${product.price} | Rent the Moment`,
    description: `${product.description.substring(0, 160)}...`,
    openGraph: {
      title: `${product.name} - Rent for ₹${product.price}`,
      description: `${product.description.substring(0, 160)}...`,
      images: [{ url: product.images[0], width: 1200, height: 630 }],
      // ... more Open Graph properties
    }
  };
}
```

#### 2. Share Utilities
```typescript
// Generate share URL
const shareUrl = generateShareUrl(product.slug);

// Generate WhatsApp message
const message = generateWhatsAppMessage(product);

// Share to WhatsApp
shareToWhatsApp(message, phoneNumber);
```

#### 3. Product Card Integration
- Share button on each product card
- Links to `/share/{productSlug}` page
- Maintains existing "Get Info" functionality

## Usage Examples

### 1. Sharing from Product Page
Users can click the share button (WhatsApp icon) on any product page to:
- Get a shareable link with rich preview
- Send detailed product information via WhatsApp

### 2. Sharing from Product Cards
Users can click the share icon on product cards in listings to:
- Generate a shareable link
- Share directly to WhatsApp

### 3. Direct Link Sharing
Users can share the `/product/{productSlug}` URL directly, which will show:
- Product image
- Product title and price
- Description
- Call-to-action buttons

## WhatsApp Preview

When a user shares a product link on WhatsApp, they will see:
1. **Product Image** - High-quality product photo
2. **Title** - Product name with rental price
3. **Description** - Truncated product description
4. **URL** - Clean, branded link

## Technical Requirements

### Environment Variables
```env
NEXT_PUBLIC_BASE_URL=https://rent-moment.belivmart.com
```

### Image Requirements
- Product images should be at least 1200x630px for optimal social media preview
- Images are automatically optimized by Next.js Image component
- Fallback to logo if product image is unavailable

### SEO Benefits
- Improved social media engagement
- Better click-through rates
- Enhanced brand visibility
- Rich snippets in search results

## Testing

### WhatsApp Testing
1. Share a product link on WhatsApp
2. Verify image and description appear correctly
3. Test on both mobile and desktop WhatsApp

### Social Media Testing
1. Test on Facebook, Twitter, LinkedIn
2. Verify Open Graph tags are working
3. Check image display and link functionality

### Link Validation
Use these tools to validate Open Graph tags:
- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector

## Future Enhancements

1. **Analytics Integration** - Track share clicks and conversions
2. **Custom Share Messages** - Allow users to customize share text
3. **Bulk Sharing** - Share multiple products at once
4. **QR Code Generation** - Generate QR codes for product links
5. **Social Media Buttons** - Add direct sharing to Facebook, Twitter, etc.

## Troubleshooting

### Common Issues

1. **Images not showing**: Check image URLs and ensure they're accessible
2. **Meta tags not updating**: Clear social media cache using their debugger tools
3. **Links not working**: Verify product slugs exist in the database

### Debug Tools
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## Support

For issues or questions about the sharing feature, please refer to the implementation files or contact the development team.
