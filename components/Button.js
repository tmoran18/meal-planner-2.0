import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

const Button = ({ children, onClickFunc, fullWidth }) => {
  return (
    <ChakraButton
      color='white'
      boxShadow='shadow.three'
      px={5}
      borderRadius='100px'
      bg='brand.green'
      fontWeight='bold'
      width={fullWidth && '100%'}
      _hover={{ bg: 'brand.green', boxShadow: 'shadow.four' }}
      _focus={{ border: 'none' }}
      onClick={onClickFunc}
    >
      {children}
    </ChakraButton>
  )
}

export default Button
