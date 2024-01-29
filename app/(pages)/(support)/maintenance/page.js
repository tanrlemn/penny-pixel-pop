// images
const maintenanceModeImage = 'https://i.imgur.com/2klVn0x.jpg';

// chakra-ui
import { Container, Heading, Image, Link, Text } from '@chakra-ui/react';

export default function MaintenanceMode() {
  return (
    <Container mt={'3rem'}>
      <Image
        borderRadius={'5px'}
        src={maintenanceModeImage}
        alt={'Maintenance Mode'}
        objectFit={'cover'}
        w={'100%'}
        opacity={'0.75'}
        mb={'2rem'}
      />
      <Heading
        color={'purple.600'}
        size={'3xl'}
        mb={'1rem'}>
        Working on it...
      </Heading>
      <Text size={'md'}>
        We are currently working on this site. Please check back later. Feel
        free to contact us at{' '}
        <Link
          color={'purple.700'}
          variant={'link'}
          href={'mailto:support@thoughtsoda.com'}>
          support@thoughtsoda.com
        </Link>{' '}
        if you have any questions.
      </Text>
    </Container>
  );
}
