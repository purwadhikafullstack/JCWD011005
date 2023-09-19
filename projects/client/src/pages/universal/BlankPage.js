import { Box, Divider, Text } from '@chakra-ui/react'
import React from 'react'

const BlankPage = (props) => {
  return (
    <Box
      bgColor="lightgrey"
      display='flex'
      justifyContent={"center"}
      height="calc(100vh)"
      width='100%'
    >
      <Box
        alignItems="center"
        bgColor="whiteAlpha.500"
        display="flex"
        flexDirection="column"
        justifyItems="start"
        width="50%"
      >
        <Box width="100%" textAlign="center">
          <Text textAlign="center" as="b" fontSize="6xl" marginBottom="4">Pro-Rent</Text>
        </Box>
        <Divider/>
        <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}

export default BlankPage