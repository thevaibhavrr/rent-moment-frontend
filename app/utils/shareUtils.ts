export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  hashtags?: string[];
}

export const generateShareUrl = (productSlug: string, baseUrl?: string): string => {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://rent-the-moment.vercel.app');
  return `${base}/share/${productSlug}`;
};

export const generateWhatsAppMessage = (product: any, shareUrl?: string): string => {
  const url = shareUrl || generateShareUrl(product.slug);
  
  return `Check out this amazing ${product.category.name} on Rent the Moment! 

${product.name}
Price: ₹${product.price}${product.originalPrice > 0 ? ` (Original: ₹${product.originalPrice})` : ''}
${product.description.substring(0, 100)}...

View full details: ${url}`;
};

export const generateWhatsAppInfoMessage = (product: any, shareUrl?: string): string => {
  const url = shareUrl || generateShareUrl(product.slug);
  
  return `May I know about this dress?

*Product Details:*
• Name: ${product.name}
• Price: ₹${product.price}${product.originalPrice > 0 ? ` (Original: ₹${product.originalPrice})` : ''}
• Category: ${product.category.name}
• Color: ${product.color}
• Sizes: ${product.sizes.map((s: { size: string }) => s.size).join(', ')}
• Condition: ${product.condition}
• Rental Duration: ${product.rentalDuration} days
• Brand: ${product.brand || 'Not specified'}
• Rating: ${product.rating || 0}/5 (${product.numReviews || 0} reviews)

*Description:*
${product.description}

*Tags:* ${product.tags.join(', ')}

*Product Link:* ${url}`;
};

export const shareToWhatsApp = (message: string, phoneNumber?: string): void => {
  if (typeof window === 'undefined') return;
  
  const whatsappUrl = phoneNumber 
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, '_blank');
};

export const shareToSocialMedia = (options: ShareOptions): void => {
  if (typeof window === 'undefined') return;
  
  const { title, text, url, hashtags = [] } = options;
  
  // Try to use native sharing API first
  if (navigator.share) {
    navigator.share({
      title: title || 'Check out this product on Rent the Moment',
      text: text || 'Amazing clothing rental platform',
      url: url || window.location.href,
    }).catch((error) => {
      console.log('Error sharing:', error);
      // Fallback to copying to clipboard
      copyToClipboard(url || window.location.href);
    });
  } else {
    // Fallback to copying to clipboard
    copyToClipboard(url || window.location.href);
  }
};

export const copyToClipboard = async (text: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    await navigator.clipboard.writeText(text);
    // You can add a toast notification here
    console.log('Link copied to clipboard');
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

export const generateSocialShareUrls = (product: any, shareUrl?: string) => {
  const url = shareUrl || generateShareUrl(product.slug);
  const text = `${product.name} - Rent for ₹${product.price} on Rent the Moment`;
  
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
  };
};
