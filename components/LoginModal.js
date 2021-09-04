import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { supabase } from '../utils/supabaseClient'
import Alert from '../components/Alert'

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const login = async () => {
    if (email == '' || password == '') {
      setShowErrorAlert(true)
      setTimeout(() => {
        setShowErrorAlert(false)
      }, 3000)
      return
    }
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    })
    setEmail('')
    setPassword('')
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log into your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Email'
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='password'
                required
                mb={3}
              />
            </FormControl>
            {showErrorAlert && (
              <Alert status='error'>
                You must provide an email or password
              </Alert>
            )}
          </ModalBody>

          <ModalFooter sx={{ gap: '20px' }}>
            <Button onClick={login} colorScheme='blue' mr={3}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal
