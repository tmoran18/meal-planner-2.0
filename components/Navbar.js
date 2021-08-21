import {
  Box,
  Text,
  Flex,
  HStack,
  Link,
  IconButton,
  useMediaQuery,
  useDisclosure,
  Stack,
  VStack,
  Collapse,
} from '@chakra-ui/react'

import Image from 'next/image'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
// import MobileMenu from './MobileMenu'

const Navbar = () => {
  const [isMobile] = useMediaQuery('(max-width: 800px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <Box>{isMobile ? <MobileNav /> : <DesktopNav />}</Box>
}

const DesktopNav = () => {
  return (
    <Box>
      <Box maxW='70rem' m='auto' pl={5}>
        <Image
          src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1628845313/meal-shopper/logo_mimzdf.png'
          width={295}
          height={109}
          alt='Meal Planner Logo'
        />
      </Box>
      <Box color='white' bg='brand.green' h={16} zIndex={99}>
        <Flex
          maxW='70rem'
          m='auto'
          alignItems='center'
          h='100%'
          justify='space-between'
          pl={5}
        >
          <HStack>
            <HStack align='center' spacing={8} justify='center'>
              <Link href='/'>Recipes</Link>
              <Link href='/create-recipe'>Create Recipe</Link>
              <Link href='/ingredients'>Ingredients</Link>
            </HStack>
          </HStack>
          <Link href='/#'>Admin</Link>
        </Flex>
      </Box>
    </Box>
  )
}

const MobileNav = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box>
      <Box color='white' bg='brand.green' h={16} p={5} zIndex={99}>
        <Flex
          maxW='70rem'
          m='auto'
          alignItems='center'
          h='100%'
          justify='space-between'
        >
          <Image
            src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1628845313/meal-shopper/logo_mimzdf.png'
            width={145}
            height={50}
            alt='Meal Planner Logo'
          />
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={7} h={7} />
            }
            variant={'ghost'}
            colorScheme='blackAlpha'
            aria-label={'Toggle Navigation'}
            size='sm'
            _focus={{ border: 'none ' }}
          />
        </Flex>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Stack p={4} bg='brand.green'>
          <VStack color='white'>
            <Link href='/'>Recipes</Link>
            <Link href='/create-recipe'>Create Recipe</Link>
            <Link href='/ingredients'>Ingredients</Link>
          </VStack>
        </Stack>
      </Collapse>
    </Box>
  )
}

export default Navbar
