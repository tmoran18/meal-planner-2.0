import Image from 'next/image'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Flex, Box, Heading, Text } from '@chakra-ui/layout'
const Hero = () => {
  const [isMobile] = useMediaQuery('(max-width: 800px)')

  return (
    <Flex
      display='flex'
      justify='center'
      position='relative'
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
      <Box
        border='1px solid'
        borderColor='red'
        pos='absolute'
        top={0}
        w='full'
        height='full'
      >
        <Flex
          border='1px solid'
          borderColor='blue'
          maxW='70rem'
          height='full'
          m='auto'
          direction='column'
          justify='center'
        >
          <Heading as='h2'>Plan Your Meals Fast Today</Heading>
          <Text>Choose your meals and get a shopping list ready fast</Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Hero
