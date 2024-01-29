// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// local components
import Dashboard from './dashboard';

// metadata
export const metadata = {
  title: 'Dashboard',
  description:
    'A central hub for viewing enrolled workshops, upcoming events, and recent activities.',
  openGraph: {
    title: 'Profile Page',
    images: images,
    description:
      'A central hub for viewing enrolled workshops, upcoming events, and recent activities.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Dashboard />;
}
