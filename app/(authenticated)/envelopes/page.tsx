// images
const images = ['https://i.imgur.com/mhsvRaa.jpg'];

// local components
import Envelopes from './envelopes';

// metadata
export const metadata = {
  title: 'Envelopes',
  description: 'List of current envelopes with allocated and spent amounts.',
  openGraph: {
    title: 'Envelope List - Budget App',
    images: images,
    description: 'List of current envelopes with allocated and spent amounts.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Envelopes />;
}
