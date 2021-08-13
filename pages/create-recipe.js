import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Text,
} from '@chakra-ui/react'

import Navbar from '../components/Navbar'
import CreateRecipeSteps from '../components/CreateRecipeSteps'
import IngredientSelect from '../components/IngredientSelect'

export default function CreateRecipe() {
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
    // Check if all the fields are filled out
    if (
      !nameInput ||
      !secondaryNameInput ||
      !imageUrlInput ||
      !steps ||
      !recipeIngredients
    ) {
      alert('All fields must be filled out')
    } else {
      // Insert a recipe
      let { data, error } = await supabase.from('recipe').insert([
        {
          name: nameInput,
          name_secondary: secondaryNameInput,
          imgurl: imageUrlInput,
          steps: steps,
        },
      ])
      // Fire of error
      if (error) {
        console.log('Recipe error', error)
        setShowErrorAlert(true)
        setTimeout(() => {
          setShowErrorAlert(false)
        }, 3000)
      } else {
        // Get the ID of the newly created recipe to add ingredients
        const newRecipeID = await data[0].id
        // Add recipe ingredients
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
        // Handle Error
        if (recipeError) {
          console.log('Recipe Ingredients error', error)
          setShowErrorAlert(true)
          setTimeout(() => {
            setShowErrorAlert(false)
          }, 3000)
        } else {
          // Cleanup, reset and show success notification
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
  }
  return (
    <>
      <Navbar />
      <Text>Create Recipe</Text>
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
      <Button onClick={insertRecipe} colorScheme='blue' mr={3}>
        Save Recipe
      </Button>
    </>
  )
}