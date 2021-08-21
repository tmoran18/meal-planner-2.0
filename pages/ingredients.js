import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  VStack,
  Radio,
  Flex,
  Divider,
} from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

const Ingredients = ({ data }) => {
  const [nameInput, setNameInput] = useState('')
  const [foodGroupValue, setFoodGroupValue] = useState('1')

  const insertIngredient = () => {
    console.log(nameInput, foodGroupValue)
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
      <Navbar />
      <Box maxW='30rem' m='5rem auto'>
        {showSuccessAlert && (
          <Alert status='success' mb={5}>
            <AlertIcon />
            Recipe has been successfully added
          </Alert>
        )}
        {showErrorAlert && (
          <Alert status='error' mb={5}>
            <AlertIcon />
            There was an error creating your recipe
          </Alert>
        )}
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
      </Box>
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
