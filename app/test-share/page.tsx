'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestSharePage() {
  const [testUrl, setTestUrl] = useState('');

  const sampleProducts = [
    {
      id: '1',
      name: 'Flower Print Lehenga',
      slug: 'flower-print-lehenga',
      price: 999,
      image: 'https://res.cloudinary.com/djrdmqjir/image/upload/v1754331368/WhatsApp_Image_2025-08-04_at_11.32.04_PM_gyswr8.jpg'
    },
    {
      id: '2', 
      name: 'Pink Printed Lehenga',
      slug: 'pink-printed-lehenga',
      price: 1499,
      image: 'https://res.cloudinary.com/djrdmqjir/image/upload/v1754331307/WhatsApp_Image_2025-08-04_at_11.31.37_PM_7_madfij.jpg'
    }
  ];

  const generateShareUrl = (slug: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-moment.belivmart.com';
    return `${baseUrl}/product/${slug}`;
  };

  const testMetaTags = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://developers.facebook.com/tools/debug/?q=${encodedUrl}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Share Feature Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Share URLs</h2>
          
          <div className="space-y-4">
            {sampleProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price}</p>
                    <p className="text-sm text-gray-500">Slug: {product.slug}</p>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href={`/product/${product.slug}`}
                      className="block bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                    >
                      View Product Page
                    </Link>
                    <button
                      onClick={() => testMetaTags(generateShareUrl(product.slug))}
                      className="block bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 w-full"
                    >
                      Test Meta Tags
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Manual Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Share URL to Test:
              </label>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="https://rent-moment.belivmart.com/product/product-slug"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => testUrl && testMetaTags(testUrl)}
                disabled={!testUrl}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Test on Facebook Debugger
              </button>
              
              <button
                onClick={() => {
                  if (testUrl) {
                    const encodedUrl = encodeURIComponent(testUrl);
                    window.open(`https://cards-dev.twitter.com/validator?url=${encodedUrl}`, '_blank');
                  }
                }}
                disabled={!testUrl}
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Test on Twitter
              </button>
              
              <button
                onClick={() => {
                  if (testUrl) {
                    const encodedUrl = encodeURIComponent(testUrl);
                    window.open(`https://www.linkedin.com/post-inspector/inspect/${encodedUrl}`, '_blank');
                  }
                }}
                disabled={!testUrl}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Test on LinkedIn
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Guide</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-red-600">If images don't show on WhatsApp:</h3>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Check if the image URL is accessible (try opening in browser)</li>
                <li>Verify the image URL is absolute (starts with http/https)</li>
                <li>Test the URL on Facebook Debugger first</li>
                <li>Clear WhatsApp cache by sharing the link again after 24 hours</li>
                <li>Ensure the image is at least 200x200 pixels</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-600">Testing Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Click "Test Meta Tags" for any product above</li>
                <li>Check if the image appears in the Facebook Debugger</li>
                <li>If image shows in debugger but not WhatsApp, wait 24 hours</li>
                <li>Try sharing the link directly on WhatsApp</li>
                <li>Check the browser console for any errors</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600">Expected Results:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Facebook Debugger should show the product image</li>
                <li>Title should include product name and price</li>
                <li>Description should be truncated product description</li>
                <li>URL should be the share page URL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
