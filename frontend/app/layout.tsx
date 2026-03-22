import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Geoffrey Kabiaro Advocate | Premier Legal Counsel in Kenya',
  description: 'Award-winning legal services combining traditional expertise with cutting-edge technology. Specializing in corporate law, land disputes, and family wealth management.',
  keywords: 'Kenyan lawyer, corporate law Kenya, land dispute lawyer, family law Kenya, legal technology',
  openGraph: {
    title: 'Geoffrey Kabiaro Advocate | Premier Legal Counsel in Kenya',
    description: 'Award-winning legal services combining traditional expertise with cutting-edge technology.',
    url: 'https://lexdigitalis.co.ke',
    siteName: 'Geoffrey Kabiaro Advocate',
    images: [
      {
        url: 'https://lexdigitalis.co.ke/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geoffrey Kabiaro Advocate | Premier Legal Counsel in Kenya',
    description: 'Award-winning legal services combining traditional expertise with cutting-edge technology.',
    images: ['https://lexdigitalis.co.ke/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-dark-navy text-white">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}