import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// cookies
import { cookies } from 'next/headers';

// types
import { Metadata } from 'next';
import type { Viewport } from 'next';

// images
const images = ['https://i.imgur.com/4KQQFag.jpg'];

// providers
import Providers from './_lib/providers';
import { Suspense } from 'react';

// local components
import LoadingDiv from './_components/interactive/loadingDiv';

// viewport
export const viewport: Viewport = {
  themeColor: 'black',
  maximumScale: 1,
};

// metadata
const APP_NAME = 'Penny Pixel Pop';
const APP_DEFAULT_TITLE = 'Penny Pixel Pop - Conversational Budgeting App';
const APP_TITLE_TEMPLATE = '%s - Penny Pixel Pop';
const APP_DESCRIPTION =
  'Penny Pixel Pop is a conversational budgeting app that helps you track your spending and save more money with AI.';

export const metadata: Metadata = {
  metadataBase: new URL('https://pennypixelpop.com/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: images,
  },
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers cookies={cookieStore}>
          <Suspense fallback={<LoadingDiv id={'layout'} isLoading={true} />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
