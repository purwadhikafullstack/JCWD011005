import React from 'react'
import BlankPage from './BlankPage'
import { Box, Button, Image, Input, Text } from '@chakra-ui/react'

const LandingPage = () => {
  return (
      // <BlankPage flexDirection="column">
    <Box>
      <Box maxHeight="500px" width="100%" border="1px">
        {/* <Image src="../../public/header.jpg" alt='Header Image'/> */}
        <Image src={`${process.env.REACT_APP_API_BASE_URL}/heros/header.jpg`} alt='Header Image' fallbackSrc="https://via.placeholder.com/1000x500"/>
      </Box>
      <Box padding="5">
        <Box display="flex" flexDirection="row" backgroundColor="white" borderRadius="15" gap="5" padding="5">
          <Input type='text' placeholder='Kota atau penginapan' backgroundColor="white" border="1px"/>
          <Input type='text' placeholder='Check In' backgroundColor="white" border="1px"/>
          <Input type='text' placeholder='Check Out' backgroundColor="white" border="1px"/>
          <Input type='text' placeholder='Tipe kamar' backgroundColor="white" border="1px"/>
          <Button type="submit">Cari</Button>
        </Box>
        <Text>Kategori</Text>
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="row">
            {/* <Box maxHeight="25%" maxWidth="25%" border="1px" borderRadius="5"> */}
              <Image boxSize="100px" src={`${process.env.REACT_APP_API_BASE_URL}/categories/jakarta.jpg`} alt='Jakarta Image'/>
            {/* </Box> */}
            <Text>Jakarta</Text>
          </Box>
        </Box>
      </Box>
    </Box>
    // </BlankPage>
  )
}

export default LandingPage