// images
const images = ['https://i.imgur.com/jZ6hSsX.jpg'];

// local components
import Privacy from './privacy';

// metadata
export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for using Penny Pixel Pop',
  openGraph: {
    title: 'Privacy Policy',
    images: images,
    description: 'Privacy Policy for using Penny Pixel Pop',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Privacy />;
}
