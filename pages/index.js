import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient'
import { Box, Button, Flex } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Recipe from '../components/Recipe'
import SelectedRecipesBadge from '../components/SelectedRecipesBadge'
import Hero from '../components/Hero'
import ShoppingListBtn from '../components/ShoppingListBtn'

export default function Home({ data }) {
  const [selectedRecipes, setSelectedRecipes] = useState([])
  const [shoppingList, setShoppingList] = useState([])
  const [test, setTest] = useState([])

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
    }
  }

  const sumGroupBy = (shoppingList) => {
    const result = []
    shoppingList.reduce((res, item) => {
      // if the item does not exist in the accumulator push it in
      if (!res[item.id]) {
        res[item.id] = { id, name, quantity: 0 }
        result.push(res[item.id])
      }
      res[item.id].quantity += item.quantity
      setTest(res)
    })
  }
  return (
    <>
      <Navbar />
      <Hero />
      <Box maxW='70rem' m='auto'>
        <Flex>
        <ShoppingListBtn recipeCount={selectedRecipes.length} getShoppingList={getShoppingList}/>

        </Flex>
          <Box w='full' display='flex' justifyContent='space-around'>
            {data.map((recipe) => {
              return (
                <>
                  <Recipe
                    id={recipe.id}
                    name={recipe.name}
                    name_secondary={recipe.name_secondary}
                    imgurl={recipe.imgurl}
                    addRecipeSelectedRecipes={addRecipeSelectedRecipes}
                    removeRecipeSelectedRecipes={removeRecipeSelectedRecipes}
                  />
                </>
              )
            })}
          </Box>
        </Box>
    </>
  )
}

export async function getServerSideProps(context) {
  let { data, error } = await supabase.from('recipe').select('*')

  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  }
}
