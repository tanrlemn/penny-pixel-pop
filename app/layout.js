import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// providers
import { RecoilRootProvider } from './_lib/context/RecoilRoot';
import { ThemeProvider } from './_lib/context/ThemeProvider';
import { Suspense } from 'react';

// local components
import Navbar from './_navigation/navbar';
import NewEnvelope from './_components/forms/newEnvelope';
import TransactionDrawer from './_components/forms/transactionDrawer';
import LoadingDiv from './_components/interactive/loadingDiv';

const APP_NAME = 'Budge App';
const APP_DEFAULT_TITLE = 'Budge App';
const APP_TITLE_TEMPLATE = '%s - Budge App';
const APP_DESCRIPTION =
  'Simplify your budgeting process with Budge App. Budge App is a free budgeting app that helps you track your spending and save more money';

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
    images: '/images/og-image.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <RecoilRootProvider>
          <ThemeProvider>
            <Suspense fallback={<LoadingDiv />}>
              <Navbar />
              {children}
              <NewEnvelope />
              <TransactionDrawer />
            </Suspense>
          </ThemeProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
