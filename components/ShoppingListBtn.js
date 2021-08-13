import { Button, Flex } from "@chakra-ui/react"

const ShoppingListBtn = ({recipeCount, getShoppingList}) => {
    return (
        <Button
            color='white'
            shadow='xl'
            py={6}
            px={5}
            borderRadius='100px'
            bg='brand.green'
            outline='none'
            onClick={getShoppingList}
            >
            View Shopping List
            <Flex color='black' justify='center' align='center' ml={3} bg='white' borderRadius='100px' w={7} h={7}>
                {recipeCount}
            </Flex>
        </Button>
    )
}

export default ShoppingListBtn
