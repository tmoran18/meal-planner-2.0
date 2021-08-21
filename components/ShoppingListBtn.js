import { Button, Center, Box, Circle } from '@chakra-ui/react'

const ShoppingListBtn = ({ recipeCount, getShoppingList }) => {
  return (
    <Button
      color='white'
      boxShadow='shadow.three'
      py={6}
      px={5}
      maxW={56}
      borderRadius='100px'
      bg='brand.green'
      onClick={getShoppingList}
      fontWeight='bold'
      _hover={{ bg: 'brand.green', boxShadow: 'shadow.four' }}
      _focus={{ border: 'none' }}
    >
      View Shopping List
      <Circle size='30px' ml={3} color='black' bg='white'>
        {recipeCount}
      </Circle>
    </Button>
  )
}

export default ShoppingListBtn
