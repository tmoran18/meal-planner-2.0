import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Head from 'next/head'
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  Flex,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import LoginModal from '../components/LoginModal'
import { useUser } from '../lib/UserContext'

const DynamicNavbar = dynamic(() => import('../components/Navbar'), {
  ssr: false,
})

import CreateRecipeSteps from '../components/CreateRecipeSteps'
import IngredientSelect from '../components/IngredientSelect'
import Button from '../components/Button'
import Alert from '../components/Alert'

export default function CreateRecipe() {
  const { user } = useUser()
  const toast = useToast()
  const [steps, setSteps] = useState([])
  const [recipeIngredients, setRecipeIngredients] = useState([])

  const [nameInput, setNameInput] = useState('')
  const [secondaryNameInput, setSecondaryNameInput] = useState('')
  const [imageUrlInput, setImageUrlInput] = useState('')

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

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
              'You must be logged in as an administrator to create a recipe',
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
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Flex direction='column' justify='space-between' minH='100vh'>
        <Box>
          <DynamicNavbar onModalOpen={onModalOpen} isAuthed={user} />
          <LoginModal isOpen={isModalOpen} onClose={onModalClose} />

          <Box maxW='35rem' p={5} w='full' m='auto'>
            <Heading py={{ base: 3, md: 10 }} textAlign='center'>
              Create Recipe
            </Heading>
            {showSuccessAlert && (
              <Alert status='success'>Recipe has been successfully added</Alert>
            )}
            {showErrorAlert && (
              <Alert status='error'>
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
            <Flex justify='flex-end' mt={5}>
              {!user ? (
                <Button
                  fullWidth
                  onClickFunc={() =>
                    alert('You must be logged in to create a recipe')
                  }
                >
                  Save Recipe!
                </Button>
              ) : (
                <Button fullWidth onClickFunc={insertRecipe}>
                  Save Recipe
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
        <Flex>
          <Image
            src='https://res.cloudinary.com/dsjhcek2q/image/upload/v1629007518/meal-shopper/green_wave_2_ittxhj.svg'
            width={3820}
            height={452}
            alt='green waves'
          />
        </Flex>
      </Flex>
    </>
  )
}
