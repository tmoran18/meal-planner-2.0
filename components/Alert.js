import { Alert as ChakraAlert, AlertIcon } from '@chakra-ui/react'

const Alert = ({ children, status }) => {
  return (
    <ChakraAlert status={status} mb={5}>
      <AlertIcon />
      {children}
    </ChakraAlert>
  )
}

export default Alert
