import { Box, Flex, Text } from '@chakra-ui/layout'

const SelectedRecipesBadge = ({ recipesLength }) => {
  return (
    <Flex align='center'>
      <Text mr='2' color='gray.500'>
        Recipes Selected
      </Text>
      <Box
        borderRadius='100px'
        color='green.700'
        fontWeight='bold'
        px='5'
        py='1'
        mr={{ base: '0', md: '3' }}
        bg='rgba(136, 188, 127, 0.30)'
      >
        {recipesLength}
      </Box>
    </Flex>
  )
}

export default SelectedRecipesBadge
