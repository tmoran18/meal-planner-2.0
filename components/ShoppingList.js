import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useClipboard,
} from '@chakra-ui/react'

const ShoppingList = ({ isOpen, onClose, shoppingList }) => {
  const [value, setValue] = useState('')
  const { hasCopied, onCopy } = useClipboard(value)

  useEffect(() => {
    setValue(stringifyShoppingList)
    // eslint-disable-next-line
  }, [isOpen])

  const stringifyShoppingList = () => {
    if (shoppingList.length > 1) {
      const shoppingStr = shoppingList.map(
        (item) => `${item.name} x ${item.quantity} \n`
      )
      return shoppingStr.toString().replace(/,/g, '')
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>List Item</Th>
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {shoppingList.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCopy}
              bg='brand.green'
              color='white'
              borderRadius='100px'
              mr={3}
            >
              {hasCopied ? 'Copied' : 'Copy to Clipboard'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ShoppingList
