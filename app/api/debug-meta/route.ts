import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  
  if (!productId) {
    return NextResponse.json({ 
      error: 'Product ID is required',
      usage: '/api/debug-meta?productId=your-product-slug'
    });
  }

  try {
    // This is a simple debug endpoint to check environment variables
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-moment.belivmart.com';
    const shareUrl = `${baseUrl}/product/${productId}`;
    
    return NextResponse.json({
      productId,
      baseUrl,
      shareUrl,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      metaTags: {
        title: `Product - Rent for ₹999 | Rent the Moment`,
        description: `Product description...`,
        image: `${baseUrl}/logo.png`,
        url: shareUrl,
        ogImage: `${baseUrl}/logo.png`,
        ogTitle: `Product - Rent for ₹999`,
        ogDescription: `Product description...`,
        ogUrl: shareUrl,
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to generate debug info',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
