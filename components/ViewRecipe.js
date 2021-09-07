import Image from 'next/image'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Button,
  Heading,
  useDisclosure,
  Text,
  Tooltip,
} from '@chakra-ui/react'

const ViewRecipe = ({ imgurl, name, name_secondary, steps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box position='absolute' zIndex='99' right={1} onClick={onOpen}>
      <Tooltip label='View Recipe Steps' placement='top'>
        <svg
          stroke='currentColor'
          fill='white'
          strokeWidth='0'
          viewBox='0 0 576 512'
          height='2em'
          width='2em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z'></path>
        </svg>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as='h3' size='md'>
              {name}
            </Heading>
            <Heading as='h4' size='sm'>
              {name_secondary}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify='center'>
              <Image
                src={imgurl}
                width={512}
                height={345}
                alt={`${name} ${name_secondary}`}
              />
            </Flex>
            <br />
            {steps.length > 1 &&
              isOpen &&
              steps.map((step, index) => {
                return (
                  <>
                    <Text fontWeight='600'>{`Step ${index + 1}`}</Text>
                    <Text textAlign='justify'>{step.step}</Text>
                    <br />
                  </>
                )
              })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ViewRecipe
