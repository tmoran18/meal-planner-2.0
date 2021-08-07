import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import {
  Box,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  VStack,
  Text,
  IconButton,
} from '@chakra-ui/react'

import { CloseIcon } from '@chakra-ui/icons'

const IngredientSelect = ({
  addRecipeIngredients,
  recipeIngredients,
  updateRecipeIngredientsQty,
  removeRecipeIngredient,
}) => {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    let { data, error } = await supabase
      .from('ingredient')
      .select('*')
      .order('name')
    if (error) console.log('error', error)
    else setIngredients(data)
  }
  return (
    <>
      <Select
        mb={3}
        placeholder='Select option'
        onChange={(e) =>
          addRecipeIngredients({
            id: e.currentTarget.value,
            name: e.target.selectedOptions[0].text,
            qty: 0,
          })
        }
      >
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </Select>
      <VStack align='flex-start'>
        {recipeIngredients.map((ingredient) => {
          return (
            <Flex key={ingredient.id} justify='space-between' w='full'>
              <Text ml={4}>{ingredient.name}</Text>
              <Flex>
                <NumberInput
                  size='xs'
                  maxW={16}
                  defaultValue={0}
                  onChange={(e) => updateRecipeIngredientsQty(ingredient.id, e)}
                  mr={4}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <IconButton
                  variant='ghost'
                  size='xs'
                  colorScheme='red'
                  aria-label='Call Sage'
                  fontSize='12px'
                  icon={<CloseIcon />}
                  onClick={(e) => removeRecipeIngredient(ingredient.id)}
                />
              </Flex>
            </Flex>
          )
        })}
      </VStack>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      data: data,
    },
  }
}
export default IngredientSelect
