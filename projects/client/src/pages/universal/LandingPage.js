import React from 'react'
import BlankPage from './BlankPage'
import { Box, Button, Image, Input, Text } from '@chakra-ui/react'

const LandingPage = () => {
  return (
    <BlankPage flexDirection="column">
      <Box height="50%" width="100%" border="1px">
        {/* <Image src="../../public/header.jpg" alt='Header Image'/> */}
        <Image src={`${process.env.REACT_APP_SERVER_BASE_URL}/heros/header.jpg`} alt='Header Image' fallbackSrc="https://via.placeholder.com/900x300"/>
      </Box>
      <Box display="flex" flexDirection="row" backgroundColor="white" borderRadius="15" gap="5" padding="5">
        <Input type='text' placeholder='Kota atau penginapan' backgroundColor="white" border="1px"/>
        <Input type='text' placeholder='Check In' backgroundColor="white" border="1px"/>
        <Input type='text' placeholder='Check Out' backgroundColor="white" border="1px"/>
        <Input type='text' placeholder='Tipe kamar' backgroundColor="white" border="1px"/>
        <Button type="submit">Cari</Button>
      </Box>
      <Text>Kategori</Text>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/jakarta.jpg" alt='Jakarta Image'/>
          </Box>
          <Text>Jakarta</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src={`${process.env.REACT_APP_SERVER_BASE_URL}/categories/bali.jpeg`} alt='Bali Image'/>
          </Box>
          <Text>Bali</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/bandung.jpg" alt='Bandung Image'/>
          </Box>
          <Text>Bandung</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/bukittinggi.jpg" alt='Bukittinggi Image'/>
          </Box>
          <Text>Bukittinggi</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/jogja.png" alt='Yogyakarta Image'/>
          </Box>
          <Text>Yogyakarta</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/kediri.jpg" alt='Kediri Image'/>
          </Box>
          <Text>Kediri</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/malang.jpg" alt='Malang Image'/>
          </Box>
          <Text>Malang</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/palembang.jpg" alt='Palembang Image'/>
          </Box>
          <Text>Palembang</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/pekanbaru.jpg" alt='Pekanbaru Image'/>
          </Box>
          <Text>Pekanbaru</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/samosir.jpg" alt='Samosir Image'/>
          </Box>
          <Text>Samosir</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box maxHeight="10%" maxWidth="10%" border="1px" borderRadius="5">
            <Image src="/surabaya.jpg" alt='Surabaya Image'/>
          </Box>
          <Text>Surabaya</Text>
        </Box>
      </Box>
    </BlankPage>
  )
}

export default LandingPage