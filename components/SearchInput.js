import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input'
import { SearchIcon } from '@chakra-ui/icons'

const SearchInput = ({ setSearchTerm }) => {
  return (
    <InputGroup maxW='25rem' display={{ base: 'none', md: 'flex' }}>
      <Input
        py={6}
        placeholder='Search Recipes'
        borderRight='none'
        borderRadius='100px'
        shadow='shadow.three'
        _focus={{ outline: 'none', shadow: 'shadow.four' }}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
      />
      {/* eslint-disable-next-line react/no-children-prop */}
      <InputRightAddon
        bg='brand.green'
        borderTopRightRadius='100px'
        borderBottomRightRadius='100px'
        border='1px'
        borderColor='brand.green'
        shadow='shadow.three'
        zIndex='99'
        py={6}
      >
        <SearchIcon color='white' w={8} />
      </InputRightAddon>
    </InputGroup>
  )
}

export default SearchInput
