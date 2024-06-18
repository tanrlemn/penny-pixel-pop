import Account from './account';

// images
const images = ['https://i.imgur.com/BFWf7kuh.jpg'];

// metadata
export const metadata = {
  title: 'Account',
  description:
    'Adjust account settings, notification preferences, and privacy settings.',
  openGraph: {
    title: 'Account',
    images: images,
    description:
      'Adjust account settings, notification preferences, and privacy settings',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <Account />;
}
