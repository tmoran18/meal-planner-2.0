import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Image from 'next/image'
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
} from '@chakra-ui/react'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Accordion from '../components/Accordion'

const DynamicNavbar = dynamic(() => import('../components/Navbar'), {
  ssr: false,
})

const Ingredients = ({ data }) => {
  const [nameInput, setNameInput] = useState('')
  const [foodGroupValue, setFoodGroupValue] = useState('1')

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

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  return (
    <>
      <DynamicNavbar />
      <Box p={5} maxW='30rem' m='auto'>
        {showSuccessAlert && (
          <Alert status='success'>Ingredient Successfully Added</Alert>
        )}
        {showErrorAlert && (
          <Alert status='error'>Error Inserting Successfully Added</Alert>
        )}
        <Heading py={{ base: 3, md: 10 }} textAlign='center'>
          Create Ingredient
        </Heading>
        <FormControl>
          <FormLabel>Ingredient Name</FormLabel>
          <Input
            placeholder='Recipe Name'
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
            <Button fullWidth onClickFunc={insertIngredient}>
              Create Ingredient
            </Button>
          </Flex>
        </RadioGroup>
        <Divider mt={10} />
        <Accordion>
          <Table size='sm' mt={10}>
            <Thead>
              <Tr>
                <Th>Current Ingredient List</Th>
                <Th textAlign='right'>Food Group</Th>
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
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Accordion>
      </Box>
      <Flex>
        <Image
          src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1629621714/meal-shopper/green_wave_3_kpgfp5.svg'
          width={3820}
          height={769}
          alt='green waves'
        />
      </Flex>
    </>
  )
}

export default Ingredients

export async function getServerSideProps(context) {
  let { data, error } = await supabase.from('ingredient').select('*')

  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  }
}
