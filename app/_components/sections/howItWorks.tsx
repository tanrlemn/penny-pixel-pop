// images
const images = [
  'https://i.imgur.com/YuikxYKh.jpg',
  'https://i.imgur.com/4KQQFagh.jpg',
  'https://i.imgur.com/vZEEpPDh.jpg',
  'https://i.imgur.com/dJZPdkXh.jpg',
  'https://i.imgur.com/mhsvRaah.jpg',
  'https://i.imgur.com/jZ6hSsXh.jpg',
];

// chakra-ui
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function HowItWorks() {
  const color = useColorModeValue('orange.600', 'orange.300');
  return (
    <Container maxW={'900px'}>
      <Heading mb={'2rem'}>How it works</Heading>
      <List>
        <StepItem
          step={1}
          title={'Sign Up in Seconds'}
          description={
            'Begin your journey to smarter finances by creating your account. Quick, secure, and straightforward, getting started with Penny Pixel Pop is the first step toward financial clarity.'
          }
        />
        <StepItem
          step={2}
          title={'Chat with Penny'}
          description={
            'Utilize the power of conversational AI to manage your money. Simply type or speak your financial transactions and goals, like "spent $25 on dinner" or "save $500 for a vacation," and let Penny handle the rest.'
          }
          isReversed
        />
        <StepItem
          step={3}
          title={'Automated Budgeting'}
          description={
            'Penny categorizes your expenses and savings into visual envelopes within predefined categories—Income, Necessities, Savings, Pressing, and Discretionary spending. Watch your budgets adjust automatically with each transaction.'
          }
        />
        <StepItem
          step={4}
          title={'Visual Insights'}
          description={
            'Gain insights into your financial habits with intuitive graphs and summaries. Understand where your money goes each month, identify spending trends, and adjust your habits to align with your financial goals.'
          }
          isReversed
        />
        <StepItem
          step={5}
          title={'Stay Informed'}
          description={
            'Receive timely alerts and notifications about your budget status, upcoming bills, and savings milestones. Penny keeps you on track, so you never miss a beat in your financial journey.'
          }
        />
        <StepItem
          step={6}
          title={'Secure and Private'}
          description={
            'Your financial data is encrypted and stored securely, ensuring your information is protected. Privacy and security are our top priorities, giving you peace of mind.'
          }
          isReversed
        />
      </List>
      <Box m={'auto'} maxW={'750px'} pt={'2rem'}>
        <Heading mb={'1rem'} color={color} fontWeight={900}>
          Where budgeting meets innovation, that&apos;s where you&apos;ll find
          Penny Pixel Pop.
        </Heading>
        <Text mb={'1.5rem'}>
          Join Penny Pixel Pop today and experience the simplicity of managing
          your finances through AI-driven conversations.
        </Text>
        <Link href={'/auth/login'}>
          <Button colorScheme={'orange'}>Sign up now</Button>
        </Link>
      </Box>
    </Container>
  );
}

const StepItem = ({ step, title, description, isReversed = false }) => {
  return (
    <ListItem mb={{ base: '3rem', md: '5rem' }}>
      <Flex
        gap={'2rem'}
        align={'center'}
        direction={{ base: 'column', md: isReversed ? 'row-reverse' : 'row' }}
      >
        <AspectRatio ratio={1} w={{ base: '100%', md: '40%' }}>
          <Image src={images[step - 1]} objectFit={'cover'} alt={title} />
        </AspectRatio>
        <Box maxW={'400px'}>
          <Tag mb={'0.5rem'} colorScheme={'orange'} size={'lg'}>
            {step}
          </Tag>
          <Heading mb={'0.5rem'} size={'md'}>
            {title}
          </Heading>
          <Text>{description}</Text>
        </Box>
      </Flex>
    </ListItem>
  );
};
