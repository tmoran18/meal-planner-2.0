import { useState } from 'react'
import { FormLabel, Textarea, Text, Box, Flex } from '@chakra-ui/react'
import Button from '../components/Button'

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
      <FormLabel>{`Step ${steps.length + 1}`}</FormLabel>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder='Enter your recipes steps here'
        size='sm'
        bg='var(--l_grey)'
      />
      <Flex justify='flex-end' mt={5}>
        <Button onClickFunc={onSubmit}>Add Step</Button>
      </Flex>
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
