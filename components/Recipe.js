import { useState } from 'react'
import { Box, Heading, useBoolean, Fade } from '@chakra-ui/react'
import {
  AddIcon,
  DeleteIcon,
  ViewIcon,
  EditIcon,
  MinusIcon,
} from '@chakra-ui/icons'
import Image from 'next/image'

const Recipe = ({ id, name, name_secondary, imgurl }) => {
  const [overlayOpacity, setoverlayOpacity] = useState('0.00')
  const [isHover, setIsHover] = useState(false)
  const [isSelected, setIsSelected] = useBoolean()

  const addSelected = (id) => {
    setIsSelected.on
    console.log(id)
  }

  const removeSelected = (id) => {
    setIsSelected.off
    console.log(id)
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
      shadow='xl'
      textAlign='center'
      bg={isSelected && 'green.100'}
      cursor='pointer'
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      onClick={setIsSelected.toggle}
      position='relative'
    >
      <Image
        src={imgurl}
        width={320}
        height={200}
        alt={`${name} ${name_secondary}`}
      />
      <Heading size='md' pt={2}>
        {name}
      </Heading>
      <Heading size='sm'>{name_secondary}</Heading>
      <Fade in={isHover}>
        <Box
          position='absolute'
          top={0}
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
            top='85px'
            left='112px'
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
            left={{ base: '30%', md: '35%' }}
          />
        )}
      </Fade>
    </Box>
  )
}

export default Recipe
