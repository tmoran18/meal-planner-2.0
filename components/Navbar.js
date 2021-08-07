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

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
// import MobileMenu from './MobileMenu'

import CreateRecipe from './CreateRecipe'

const Navbar = () => {
  const [isMobile] = useMediaQuery('(max-width: 684px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  //return <Box>{isMobile ? <MobileNav /> : <DesktopNav />}</Box>
  return (
    <Box>
      {
        <>
          <Box color='white' bg='#171717' h={16} p={5} zIndex={99}>
            <Flex
              maxW='1000px'
              m='auto'
              alignItems='center'
              h='100%'
              justify='space-between'
            >
              <HStack spacing={10}>
                <HStack align='center' spacing={8} justify='center'>
                  <Link href='/'>Recipes</Link>
                  <Link href='/create-recipe'>Create Recipe</Link>
                </HStack>
              </HStack>
            </Flex>
          </Box>
          <CreateRecipe isOpen={isOpen} onClose={onClose} />
        </>
      }
    </Box>
  )
}

export default Navbar
