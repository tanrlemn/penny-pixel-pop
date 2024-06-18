// images
const images = ['https://i.imgur.com/mhsvRaa.jpg'];

// local components
import Sheets from './sheets';

// metadata
export const metadata = {
  title: 'Sheets',
  description: 'List of current sheets.',
  openGraph: {
    title: 'Sheets',
    images: images,
    description: 'List of current sheets.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Sheets />;
}
