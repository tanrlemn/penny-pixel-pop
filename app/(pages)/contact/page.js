// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// local components
import Contact from './contact';

// metadata
export const metadata = {
  title: 'Contact Thought Soda',
  description: 'Contact Thought Soda',
  openGraph: {
    title: 'Contact Thought Soda',
    images: images,
    description: 'Contact Thought Soda',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Contact />;
}
