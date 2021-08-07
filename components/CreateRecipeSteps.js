import { useState } from 'react'
import { Textarea, Text, Button, Box } from '@chakra-ui/react'

const Steps = ({ addSteps, steps }) => {
  let [value, setValue] = useState('')

  let handleInputChange = (e) => {
    e.preventDefault()
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addSteps({ step: value })
    setValue('')
  }

  return (
    <Box mt='3'>
      <Text
        fontSize='14px'
        fontWeight='500'
        color='gray.500'
        my='10px'
      >{`Step ${steps.length + 1}`}</Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder='Enter your recipes steps here'
        size='sm'
        bg='var(--l_grey)'
      />
      <Button
        onClick={onSubmit}
        _hover={{
          background: 'blue.600',
        }}
        bg='blue.500'
        color='white'
        mt='3'
        mb='6'
        type='submit'
      >
        Add Step
      </Button>
      {steps.length !== 0 && (
        <ul>
          {steps.map((step, index) => (
            <Text isTruncated key={index}>
              {`Step ${index + 1}: ${step.step}`}
            </Text>
          ))}
        </ul>
      )}
    </Box>
  )
}

export default Steps
