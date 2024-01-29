// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// local components
import Transactions from './transactions';

// metadata
export const metadata = {
  title: 'Transactions',
  description: 'Add, edit, and delete transactions.',
  openGraph: {
    title: 'Transactions',
    images: images,
    description: 'Add, edit, and delete transactions.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Transactions />;
}
