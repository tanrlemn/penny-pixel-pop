// chakra-ui
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from '@chakra-ui/react';

// local components
import {
  Bird,
  ChevronRight,
  HeartHandshake,
  MessageCircleHeart,
  Rainbow,
} from 'lucide-react';

export default function About() {
  return (
    <Box pt={{ base: '5rem', md: '9rem' }}>
      <Container
        maxW={'1000px'}
        pb={'5rem'}>
        <Box mb={'4rem'}>
          <Heading
            mb={2}
            fontWeight={700}
            size={'4xl'}>
            Making it pop
          </Heading>
          <Heading
            color={'purple.600'}
            size={'lg'}>
            Gettin fizzy since &apos;16
          </Heading>
        </Box>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          color={'gray.600'}
          gap={'2rem'}
          flexWrap={'wrap'}>
          <ProjectStat
            stat={'10 Years'}
            label={'Creative Experience'}
            description={
              'Led by our founder, taNrleMn, we have a decade of experience in innovating in art and technology.'
            }
          />
          <ProjectStat
            stat={'100+'}
            label={'Diverse Projects'}
            description={
              'Our expertise ranges from web development to oil paintings and music production'
            }
          />
          <ProjectStat
            stat={'50+'}
            label={'Collaborative Partnerships'}
            description={
              'We work with artists and small businesses to bring ideas to life'
            }
          />
        </Flex>
      </Container>
      <Box
        minW={'100%'}
        pb={'9rem'}
        pt={'9rem'}
        bgSize={'200%'}
        bgPosition={'top center'}
        bgRepeat={'no-repeat'}
        // bgImage={`linear-gradient(transparent, white 75%), url(${bgSwoop.src})`}
      >
        <Container
          maxW={'700px'}
          pt={'5rem'}>
          <Text
            fontSize={'1.2rem'}
            textAlign={'center'}>
            Our mission is to use creativity as a tool for healing and
            liberation. We specialize in Web Design and Development and Project
            Collaboration, fostering partnerships for creative innovation.
          </Text>

          <Heading
            mt={'12rem'}
            textAlign={'center'}>
            Whether or not you&apos;ve heard of these artists, there&apos;s no
            denying their talent.
          </Heading>
        </Container>
      </Box>

      <Container
        maxW={'1000px'}
        mt={'10rem'}>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          gap={'2rem'}
          align={'flex-end'}>
          <Heading size={'xl'}>
            We can turn creative concepts into complete, tangible realities.
          </Heading>
          <Text fontSize={'1.2rem'}>
            From the first sketch to the final product, we bring ideas to life.
            If you have a vision, we&apos;re the team to help you realize it.
          </Text>
        </Flex>
        <Divider py={'6rem'} />
        <Box m={'10rem 0'}>
          <Heading fontWeight={500}>
            Want to know what it’s like to work with us?
          </Heading>
          <Heading mb={'4rem'}>It’s a mix of these things:</Heading>
          <Flex
            gap={10}
            flexWrap={'wrap'}>
            <HowItem
              icon={<Rainbow size={35} />}
              label={'Inspiring Projects'}
              description={
                'We motivate others through design and development, turning creative ideas into inspiring realities.'
              }
              iconColor={'blue'}
            />
            <HowItem
              icon={<HeartHandshake size={35} />}
              label={'Collaborative Community'}
              description={
                'We motivate others through design and development, turning creative ideas into inspiring realities.'
              }
              iconColor={'purple'}
            />
            <HowItem
              icon={<MessageCircleHeart size={35} />}
              label={'Healing Conversations'}
              description={
                'We foster an atmosphere for open and meaningful dialogue, facilitating growth and healing through creativity.'
              }
              iconColor={'green'}
            />
            <HowItem
              icon={<Bird size={35} />}
              label={'Empowering Creativity'}
              description={
                'Our approach liberates and empowers, using creativity as a catalyst for personal and collective transformation.'
              }
              iconColor={'orange'}
            />
          </Flex>
        </Box>
        <Heading
          size={'2xl'}
          fontWeight={500}
          maxW={'850px'}>
          We inspire and challenge people to use creativity as a tool for
          healing so that, together, we can liberate ourselves.
        </Heading>
        <Box m={'10rem 0'}>
          <Text
            mb={0}
            _hover={{ textDecoration: 'none' }}
            textTransform={'uppercase'}>
            Get on the horn
          </Text>
          <Link href={'/contact'}>
            <Button
              size={'lg'}
              rightIcon={<ChevronRight size={35} />}
              colorScheme={'purple'}
              variant={'ghost'}
              textAlign={'left'}>
              <Heading>Let&apos;s work together</Heading>
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

const ProjectStat = ({ stat, label, description }) => {
  return (
    <Stat mr={'2rem'}>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{stat}</StatNumber>
      <StatHelpText>{description}</StatHelpText>
    </Stat>
  );
};

const HowItem = ({ icon, label, description, iconColor }) => {
  return (
    <Box maxW={{ base: '100%', md: '45%' }}>
      <Box
        color={`${iconColor}.500`}
        mb={'0.25rem'}>
        {icon}
      </Box>
      <Tag
        mb={'0.5rem'}
        color={'gray.600'}
        textTransform={'uppercase'}
        colorScheme={iconColor}
        size={'md'}>
        {label}
      </Tag>
      <Text>{description}</Text>
    </Box>
  );
};
