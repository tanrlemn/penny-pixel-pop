// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// local components
import Privacy from './privacy';

// metadata
export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for using Thought Soda',
  openGraph: {
    title: 'Privacy Policy',
    images: images,
    description: 'Privacy Policy for using Thought Soda',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Privacy />;
}
