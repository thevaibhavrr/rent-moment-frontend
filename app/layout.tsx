import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Rent the moment - Rent Designer Clothes for Every Occasion",
  description: "India's premier clothing rental platform. Rent designer lehengas, western dresses, traditional wear, shoes, and accessories for special occasions.",
  keywords: "clothing rental, lehenga rental, dress rental, designer clothes, fashion rental, India",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Rent the Moment - Designer Clothing Rental Platform",
    description: "India's premier clothing rental platform. Rent designer lehengas, western dresses, traditional wear, shoes, and accessories for special occasions.",
    type: 'website',
            url: process.env.NEXT_PUBLIC_BASE_URL || 'https://rent-moment.belivmart.com',
    siteName: 'Rent the Moment',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Rent the Moment - Designer Clothing Rental',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rent the Moment - Designer Clothing Rental Platform",
    description: "India's premier clothing rental platform. Rent designer lehengas, western dresses, traditional wear, shoes, and accessories for special occasions.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1a1a1a',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#fbbf24',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
