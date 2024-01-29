// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// local components
import Terms from './terms';

// metadata
export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for using Thought Soda',
  openGraph: {
    title: 'Terms of Service',
    images: images,
    description: 'Terms of Service for using Thought Soda',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Terms />;
}
