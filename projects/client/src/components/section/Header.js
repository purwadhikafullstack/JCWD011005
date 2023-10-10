import { Box, Button, Text} from '@chakra-ui/react'
import React from 'react'

const Header = () => {
    const bgColor = "#1E91B6";
    return (
        <Box bgColor={bgColor} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" paddingX="75" paddingY="30">
            <Text as="b" fontSize="5xl">Pro-Rent</Text>
            <Button size="lg" colorScheme='gray' color={bgColor}>Login</Button>
        </Box>
    )
}

export default Header