import { useState } from 'react'
import { Box, Heading, Fade } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import ViewRecipe from './ViewRecipe'

const Recipe = ({
  id,
  name,
  name_secondary,
  imgurl,
  steps,
  addRecipeSelectedRecipes,
  removeRecipeSelectedRecipes,
}) => {
  const [overlayOpacity, setoverlayOpacity] = useState('0.00')
  const [isHover, setIsHover] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const addSelected = (id) => {
    setIsSelected(true)
    addRecipeSelectedRecipes(id)
  }

  const removeSelected = (id) => {
    setIsSelected(false)
    removeRecipeSelectedRecipes(id)
  }

  const onHover = (e) => {
    if (e.type === 'mouseenter') {
      setoverlayOpacity('0.65')
      setIsHover(true)
    } else if (e.type === 'mouseleave') {
      setoverlayOpacity('0.0')
      setIsHover(false)
    }
  }

  return (
    <Box
      maxW='320px'
      minH='300px'
      mb={8}
      boxShadow={
        isSelected
          ? '0 7px 13px rgba(0,0,0,0.15), 0 15px 40px rgba(0,0,0,0.2)'
          : '0 7px 13px rgba(154,160,185,0.15), 0 15px 40px rgba(166,173,201,0.2)'
      }
      borderRadius={5}
      overflow='hidden'
      textAlign='center'
      bg={isSelected && 'rgba(136, 188, 127, 0.30)'}
      // onClick={setIsSelected.toggle}
      cursor='pointer'
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      position='relative'
    >
      <ViewRecipe
        imgurl={imgurl}
        name={name}
        name_secondary={name_secondary}
        steps={steps}
      />
      <Image
        src={imgurl}
        width={320}
        height={200}
        alt={`${name} ${name_secondary}`}
      />
      <Box px={3} pb={3}>
        <Heading size='md' color='blackAlpha.700' fontWeight={600} pt={2}>
          {name}
        </Heading>
        <Heading size='sm' color='blackAlpha.800' fontWeight={400}>
          {name_secondary}
        </Heading>
        <Fade in={isHover}>
          <Box
            position='absolute'
            top={0}
            left={0}
            opacity={overlayOpacity}
            bg='gray.600'
            w='100%'
            h='100%'
            cursor='pointer'
          ></Box>
          {isSelected ? (
            <MinusIcon
              onClick={() => removeSelected(id)}
              position='absolute'
              color='white'
              w={24}
              h={24}
              cursor='pointer'
              top='30%'
              left='35%'
              border='1px solid'
              borderColor='red.300'
              borderRadius='100px'
              bg='red.300'
            />
          ) : (
            <AddIcon
              onClick={() => addSelected(id)}
              position='absolute'
              color='white'
              w={24}
              h={24}
              cursor='pointer'
              top='30%'
              left='35%'
              border='1px solid'
              borderColor='brand.green'
              borderRadius='100px'
              p={3}
              bg='brand.green'
            />
          )}
        </Fade>
      </Box>
    </Box>
  )
}

export default Recipe
