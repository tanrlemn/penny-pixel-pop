// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// local components
import Budget from './budget';

// metadata
export const metadata = {
  title: 'Budget',
  description: 'List of current envelopes with allocated and spent amounts.',
  openGraph: {
    title: 'Budget',
    images: images,
    description: 'List of current envelopes with allocated and spent amounts.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Budget />;
}
