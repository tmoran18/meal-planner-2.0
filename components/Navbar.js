import {
  Box,
  Text,
  Flex,
  HStack,
  Link,
  IconButton,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react'

import Image from 'next/image'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
// import MobileMenu from './MobileMenu'

import CreateRecipe from './CreateRecipe'

const Navbar = () => {
  const [isMobile] = useMediaQuery('(max-width: 684px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  //return <Box>{isMobile ? <MobileNav /> : <DesktopNav />}</Box>
  return (
    <Box>
      <Box w='70rem' m='auto'>
        <Image
          src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1628845313/meal-shopper/logo_mimzdf.png'
          width={295}
          height={109}
          alt='Meal Planner Logo'
        />
      </Box>
      <Box color='white' bg='brand.green' h={16} p={5} zIndex={99}>
        <Flex
          maxW='70rem'
          m='auto'
          alignItems='center'
          h='100%'
          justify='space-between'
        >
          <HStack spacing={10}>
            <HStack align='center' spacing={8} justify='center'>
              <Link href='/'>Recipes</Link>
              <Link href='/create-recipe'>Create Recipe</Link>
              <Link href='/#'>Ingredients</Link>
              <Link href='/#'>Create Ingredients</Link>
            </HStack>
          </HStack>
          <Link href='/#'>Admin</Link>
        </Flex>
      </Box>
      <CreateRecipe isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Navbar
