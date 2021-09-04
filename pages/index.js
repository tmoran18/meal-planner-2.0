import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import Recipe from '../components/Recipe'
import Hero from '../components/Hero'
import ShoppingListBtn from '../components/ShoppingListBtn'
import SearchInput from '../components/SearchInput'
import ShoppingList from '../components/ShoppingList'
import LoginModal from '../components/LoginModal'
import { useUser } from '../lib/UserContext'

// Required to get Navbar working correctly with SSR
const DynamicNavbar = dynamic(() => import('../components/Navbar'), {
  ssr: false,
})

export default function Home({ recipes }) {
  const { user } = useUser()
  const [selectedRecipes, setSelectedRecipes] = useState([])
  const [shoppingList, setShoppingList] = useState([])
  const recipeRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const scrollToRecipe = () => {
    window.scrollBy({ top: 660, behavior: 'smooth' })
  }

  const addRecipeSelectedRecipes = (recipeID) => {
    setSelectedRecipes((selectedRecipes) => [...selectedRecipes, recipeID])
  }

  const removeRecipeSelectedRecipes = (recipeID) => {
    setSelectedRecipes(
      selectedRecipes.filter(
        (selectedRecipeID) => recipeID !== selectedRecipeID
      )
    )
  }

  const searchFilter = (recipes) => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getShoppingList = async () => {
    const query = 'quantity, ingredient (id, name)'
    let { data, error } = await supabase
      .from('recipe_ingredient')
      .select(query)
      .in('recipe_id', selectedRecipes)
    if (error) {
      console.log('Recipe error', error)
    } else {
      // Build the array correctly once getting data
      const shoppingArr = data.map((item) => ({
        id: item.ingredient.id,
        name: item.ingredient.name,
        quantity: item.quantity,
      }))
      const sumGroupbyArr = shoppingArr
        .reduce((prev, next) => {
          if (next.id in prev) {
            prev[next.id].quantity += next.quantity
          } else {
            prev[next.id] = next
          }
          return prev
        }, [])
        .filter((item) => item !== null)
      setShoppingList(sumGroupbyArr)
      onOpen()
    }
  }

  return (
    <>
      <DynamicNavbar onModalOpen={onModalOpen} isAuthed={user} />
      <LoginModal isOpen={isModalOpen} onClose={onModalClose} />
      <Hero scroll={scrollToRecipe} />
      <Box maxW='70rem' m='auto'>
        <Flex
          py={{ base: 12, md: 16 }}
          px={4}
          justifyContent='space-between'
          direction={{ base: 'column', md: 'row' }}
          align='center'
        >
          <ShoppingListBtn
            recipeCount={selectedRecipes.length}
            getShoppingList={getShoppingList}
            onOpen={onOpen}
          />
          <SearchInput setSearchTerm={setSearchTerm} />
        </Flex>
        <Flex
          w='full'
          justify='space-between'
          px={6}
          ref={recipeRef}
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center' }}
          wrap='wrap'
        >
          {searchFilter(recipes).map((recipe) => {
            return (
              <Box key={recipe.id}>
                <Recipe
                  id={recipe.id}
                  name={recipe.name}
                  name_secondary={recipe.name_secondary}
                  imgurl={recipe.imgurl}
                  addRecipeSelectedRecipes={addRecipeSelectedRecipes}
                  removeRecipeSelectedRecipes={removeRecipeSelectedRecipes}
                />
              </Box>
            )
          })}
        </Flex>
        <ShoppingList
          isOpen={isOpen}
          onClose={onClose}
          shoppingList={shoppingList}
        />
      </Box>
    </>
  )
}

export async function getServerSideProps() {
  let { data, error } = await supabase.from('recipe').select('*')

  return {
    props: {
      recipes: data,
    }, // will be passed to the page component as props
  }
}
