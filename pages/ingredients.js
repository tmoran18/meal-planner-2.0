import { useState, useEffect } from 'react'
import { useUser } from '../lib/UserContext'
import { supabase } from '../utils/supabaseClient'
import Image from 'next/image'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  VStack,
  Radio,
  Flex,
  Divider,
  Heading,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Accordion from '../components/Accordion'
import LoginModal from '../components/LoginModal'

const DynamicNavbar = dynamic(() => import('../components/Navbar'), {
  ssr: false,
})

const Ingredients = ({ data }) => {
  const { user } = useUser()
  const toast = useToast()
  const [nameInput, setNameInput] = useState('')
  const [foodGroupValue, setFoodGroupValue] = useState('1')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  useEffect(() => {
    if (!user) {
      if (!toast.isActive(1)) {
        {
          toast({
            id: 1,
            title:
              'You must be logged in as an administrator to create or delete an ingredient',
            position: 'top-right',
            isClosable: true,
            duration: null,
          })
        }
      }
    } else {
      toast.closeAll()
    }
  }, [user])

  const insertIngredient = async () => {
    // Check if all the fields are filled out
    if (!nameInput) {
      alert('All fields must be filled out')
    } else {
      // Insert a recipe
      let { data, error } = await supabase.from('ingredient').insert([
        {
          name: nameInput,
          food_group_id: foodGroupValue,
        },
      ])
      // Fire off error
      if (error) {
        console.log('Insert Ingredient error', error)
        setShowErrorAlert(true)
        setTimeout(() => {
          setShowErrorAlert(false)
        }, 3000)
      } else {
        // Cleanup, reset and show success notification
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
          location.reload()
        }, 3000)
      }
    }
  }

  const deleteIngredient = async (id) => {
    // Delete an ingredient
    let { data, error } = await supabase
      .from('ingredient')
      .delete()
      .match({ id })
    // Fire off error
    if (error) {
      console.log('Delete Ingredient error', error)
    } else {
      setShowDeleteSuccess(true)
      setTimeout(() => {
        setShowDeleteSuccess(false)
        // location.reload()
      }, 3000)
    }
  }

  const foodGroupArr = [
    '',
    'Meat',
    'Vegetable',
    'Dairy',
    'Fruit',
    'Sauce',
    'Canned Goods',
    'Baking Goods',
    'Other',
    'Frozen Food',
  ]

  return (
    <>
      <Head>
        <title>Meal Planner | Create Ingredient</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Flex direction='column' justify='space-between' minH='100vh'>
        <Box>
          <DynamicNavbar onModalOpen={onModalOpen} isAuthed={user} />
          <LoginModal isOpen={isModalOpen} onClose={onModalClose} />
          <Box p={5} maxW='30rem' m='auto'>
            {showSuccessAlert && (
              <Alert status='success'>Ingredient Successfully Added</Alert>
            )}
            {showErrorAlert && (
              <Alert status='error'>
                Error creating new ingredient: Are you logged in?
              </Alert>
            )}
            <Heading py={{ base: 3, md: 10 }} textAlign='center'>
              Create Ingredient
            </Heading>
            <FormControl>
              <FormLabel>Ingredient Name</FormLabel>
              <Input
                placeholder='Ingredient Name'
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormControl>
            <FormLabel mt={5}>Ingredient Food Group</FormLabel>
            <RadioGroup onChange={setFoodGroupValue} value={foodGroupValue}>
              <VStack spacing={3} direction='column' align='flex-start'>
                <Radio colorScheme='green' value='1'>
                  Meat
                </Radio>
                <Radio colorScheme='green' value='2'>
                  Vegetable
                </Radio>
                <Radio colorScheme='green' value='3'>
                  Dairy
                </Radio>
                <Radio colorScheme='green' value='4'>
                  Fruit
                </Radio>
                <Radio colorScheme='green' value='5'>
                  Sauce
                </Radio>
                <Radio colorScheme='green' value='6'>
                  Canned Goods
                </Radio>
                <Radio colorScheme='green' value='7'>
                  Baking Goods
                </Radio>
                <Radio colorScheme='green' value='8'>
                  Other
                </Radio>
                <Radio colorScheme='green' value='9'>
                  Frozen Food
                </Radio>
              </VStack>
              <Flex w='full' justify='flex-end' mt={5}>
                {!user ? (
                  <Button
                    fullWidth
                    onClickFunc={() =>
                      alert('You must be logged in to create an ingredient')
                    }
                  >
                    Create Ingredient
                  </Button>
                ) : (
                  <Button fullWidth onClickFunc={insertIngredient}>
                    Create Ingredient
                  </Button>
                )}
              </Flex>
            </RadioGroup>
            <Divider mt={10} />
            <Accordion>
              <Table size='sm' mt={10}>
                <Thead>
                  <Tr>
                    <Th>Current Ingredient List</Th>
                    <Th textAlign='right'>Food Group</Th>
                    <Th textAlign='right'>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((ingredient) => (
                      <Tr key={ingredient.id}>
                        <Td>{ingredient.name}</Td>
                        <Td textAlign='right'>
                          {foodGroupArr[ingredient.food_group_id]}
                        </Td>
                        <Td
                          color='red'
                          fontWeight='bold'
                          cursor='pointer'
                          textAlign='right'
                          _hover={{ fontSize: '17px' }}
                          onClick={() => deleteIngredient(ingredient.id)}
                        >
                          x
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Accordion>
            {showDeleteSuccess && (
              <Alert status='success'>Ingredient Successfully Deleted</Alert>
            )}
          </Box>
        </Box>
        <Flex>
          <Image
            src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1629621714/meal-shopper/green_wave_3_kpgfp5.svg'
            width={3820}
            height={769}
            alt='green waves'
          />
        </Flex>
      </Flex>
    </>
  )
}

export default Ingredients

export async function getServerSideProps({ req }) {
  let { data, error } = await supabase.from('ingredient').select('*')

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  }
}
