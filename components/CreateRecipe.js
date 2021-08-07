import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

import CreateRecipeSteps from './CreateRecipeSteps'
import IngredientSelect from './IngredientSelect'

const CreateRecipe = ({ isOpen, onClose }) => {
  const [steps, setSteps] = useState([])
  const [recipeIngredients, setRecipeIngredients] = useState([])

  const [nameInput, setNameInput] = useState('')
  const [secondaryNameInput, setSecondaryNameInput] = useState('')
  const [imageUrlInput, setImageUrlInput] = useState('')

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const addSteps = (step) => {
    setSteps((steps) => [...steps, step])
  }

  const addRecipeIngredients = (ingredient) => {
    const isDuplicate = recipeIngredients.some((el) => el.id === ingredient.id)

    if (isDuplicate) {
      alert('Ingredient already chosen')
    } else {
      setRecipeIngredients((recipeIngredients) => [
        ...recipeIngredients,
        ingredient,
      ])
    }
  }

  const updateRecipeIngredientsQty = (ingredientID, qty) => {
    const newArr = recipeIngredients.map((ingredient) =>
      ingredient.id === ingredientID ? { ...ingredient, qty } : ingredient
    )
    setRecipeIngredients(newArr)
  }

  const removeRecipeIngredient = (ingredientID) => {
    const newArr = recipeIngredients.filter(
      (ingredient) => ingredient.id !== ingredientID
    )
    setRecipeIngredients(newArr)
  }

  const insertRecipe = async () => {
    let { data, error } = await supabase.from('recipe').insert([
      {
        name: nameInput,
        name_secondary: secondaryNameInput,
        imgurl: imageUrlInput,
        steps: steps,
      },
    ])
    if (error) {
      console.log('Recipe error', error)
      setShowErrorAlert(true)
      setTimeout(() => {
        setShowErrorAlert(false)
      }, 3000)
    } else {
      const newRecipeID = await data[0].id
      let { data: recipe, error: recipeError } = await supabase
        .from('recipe_ingredient')
        .insert(
          recipeIngredients.map((ingredient) => {
            return {
              recipe_id: newRecipeID,
              ingredient_id: parseInt(ingredient.id),
              quantity: parseInt(ingredient.qty),
            }
          })
        )
      if (recipeError) {
        console.log('Recipe Ingredients error', error)
        setShowErrorAlert(true)
        setTimeout(() => {
          setShowErrorAlert(false)
        }, 3000)
      } else {
        setShowSuccessAlert(true)
        setTimeout(() => {
          setShowSuccessAlert(false)
          onClose()
        }, 3000)
        setNameInput('')
        setSecondaryNameInput('')
        setImageUrlInput('')
        setSteps([])
        setRecipeIngredients([])
      }
    }
  }

  return (
    <>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
              <FormLabel>Recipe Name</FormLabel>
              <Input
                placeholder='Recipe Name'
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Recipe Secondary Name</FormLabel>
              <Input
                placeholder='Recipe Secondary Name'
                value={secondaryNameInput}
                onChange={(e) => setSecondaryNameInput(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder='Image URL'
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
              />
            </FormControl>

            <CreateRecipeSteps steps={steps} addSteps={addSteps} />
            <IngredientSelect
              addRecipeIngredients={addRecipeIngredients}
              recipeIngredients={recipeIngredients}
              updateRecipeIngredientsQty={updateRecipeIngredientsQty}
              removeRecipeIngredient={removeRecipeIngredient}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={insertRecipe} colorScheme='blue' mr={3}>
              Save Recipe
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateRecipe
