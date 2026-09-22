import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://kids-black-tau.vercel.app'),

  title: {
    default: 'Kids Story | Educational Toys & Learning Products',

    template: '%s | Kids Story',
  },

  description:
    'Discover educational toys, learning games, creative activity sets and fun products for kids at Kids Story.',

  keywords: [
    'Kids Story',

    'kids toys',

    'educational toys',

    'learning toys',

    'kids learning games',

    'educational games for kids',

    'children toys',

    'kids products',

    'toys online',
  ],

  applicationName: 'Kids Story',

  authors: [
    {
      name: 'Kids Story',
    },
  ],

  creator: 'Kids Story',

  publisher: 'Kids Story',

  alternates: {
    canonical: 'https://kids-black-tau.vercel.app/',
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      'max-image-preview': 'large',

      'max-snippet': -1,

      'max-video-preview': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kids-black-tau.vercel.app/',
    siteName: 'Kids Story',
    title: 'Kids Story | Educational Toys & Learning Products',
    description:
      'Explore educational toys, learning games and fun products for kids. Discover products designed to make learning enjoyable.',
    images: [
      {
        url: '/assets/hero.png',
        width: 1200,
        height: 630,
        alt: 'Kids Story - Educational Toys & Learning Products',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Kids Story | Educational Toys & Learning Products',
    description:
      'Explore educational toys, learning games and fun products for kids at Kids Story.',
    images: ['/assets/hero.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <header className="py-2 md:w-11/12 mx-auto">
            <Navbar />
          </header>
          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-320px)]">
            {children}
          </main>
          <footer className="py-2 md:w-11/12 mx-auto">
            <Footer />
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
