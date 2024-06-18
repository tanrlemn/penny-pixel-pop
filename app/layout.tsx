import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// images
const images = ['https://i.imgur.com/4KQQFag.jpg'];

// providers
import Providers from './_lib/providers';
import { Suspense } from 'react';

// local components
import LoadingDiv from './_components/interactive/loadingDiv';

const APP_NAME = 'Penny Pixel Pop';
const APP_DEFAULT_TITLE = 'Penny Pixel Pop - Budgeting App';
const APP_TITLE_TEMPLATE = '%s - Penny Pixel Pop';
const APP_DESCRIPTION =
  'Simplify your budgeting process with Penny Pixel Pop. Penny Pixel Pop is a free budgeting app that helps you track your spending and save more money through natural language processing.';

// metadata
export const metadata = {
  metadataBase: new URL('https://thoughtsoda.com/'),
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
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<LoadingDiv id={'layout'} isLoading={true} />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
