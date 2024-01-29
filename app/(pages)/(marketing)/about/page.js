// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// local components
import About from './about';

// metadata
export const metadata = {
  title: 'About Soda',
  description: 'Learn about Thought Soda',
  openGraph: {
    title: 'About',
    images: images,
    description: 'Learn about Thought Soda',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <About />;
}
