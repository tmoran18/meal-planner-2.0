import Image from 'next/image'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Flex, Box, Heading, Text } from '@chakra-ui/layout'
import { Button, Link, VStack } from '@chakra-ui/react'
const Hero = ({ scroll, onOpen }) => {
  const [isMobile] = useMediaQuery('(max-width: 800px)')

  return (
    <Flex
      display='flex'
      justify='center'
      position='relative'
      minH={64}
      bg='url(https://res.cloudinary.com/dsjhcek2q/image/upload/v1628851160/meal-shopper/green_wave_fvedoe.svg)'
    >
      {isMobile ? (
        <Image
          src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1628847931/meal-shopper/meal_hero_mobile_wxaxrn.jpg'
          width={799}
          height={439}
          alt='Grey background with green leaves'
        />
      ) : (
        <Image
          src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1628845315/meal-shopper/meal_hero_o1qrc0.jpg'
          width={1920}
          height={482}
          alt='Food in a bowl on a grey background'
        />
      )}
      <Box pos='absolute' top={0} w='full' height='full'>
        <Flex
          maxW='70rem'
          height='full'
          m='auto'
          direction='column'
          justify='center'
          px={6}
        >
          <VStack
            align={{ base: 'center', md: 'flex-start' }}
            textAlign={{ base: 'center', md: 'left' }}
            spacing={6}
          >
            <Heading as='h2'>Plan Your Meals Fast</Heading>
            <Text fontSize='18px' maxW='27rem'>
              Quickly and easily choose your meals for the week, then just click
              a button to generate your shopping list.
            </Text>
            <Button
              display={{ base: 'none', md: 'block' }}
              onClick={scroll}
              bg='brand.green'
              color='white'
              borderRadius='100px'
            >
              Get Started Now
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Hero
