import React, { useEffect, useState } from 'react'
import { Box, Button, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import ModalRegular from '../../components/modal/ModalRegular';
import { TbAlertTriangle } from 'react-icons/tb';

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState([]);
    
  const [errorStatus, setErrorStatus] = useState("");
  const [errorStatusText, setErrorStatusText] = useState("");
  const [errorData, setErrorData] = useState("");

  const modalAlertTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    <TbAlertTriangle size={70}/>
    <Text as={"b"} fontSize="2xl">Kesalahan</Text>
  </Box>;

  const fetchData = async () => {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/property/categories`).then(resp => {
      // setIsLoading(false);
      setCategories(resp.data.data);
      // console.log(resp);
    }).catch(err => {
      console.log(err.response);
      // setIsLoading(false);
      setErrorStatus(err.response.status);
      setErrorStatusText(err.response.statusText);
      (typeof err.response.data === 'string')? setErrorData(err.response.data) : setErrorData(err.response.data.message);
      onOpen();
    });
  };

  useEffect(() => {
    fetchData();
}, []);
console.log(categories)
  return (
    <Box>
      <Box maxHeight="500px" width="100%" border="1px">
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
          {
            (categories)? categories.map((item, index) => (
              <Box as="button" borderRadius="15" display="flex" flexDirection="row" alignItems="center" gap="5" _hover={{background: "blackAlpha.500"}} id={index} paddingRight="50" transition="0.3s">
                <Image borderRadius="15px" boxSize="100px" src={`${process.env.REACT_APP_API_BASE_URL}/categories/${item.name}.jpg`} alt={`${item.name} Image`}/>
                <Text as="b" fontSize="xl">{item.name}</Text>
              </Box>
            ))
            : <Box bgColor="red"><Text>This is Landing Page</Text></Box>
          }
        </Box>
      </Box>
        
      <ModalRegular isOpen={isOpen} onCloseX={onClose} onSubmit={onClose} primaryButton="OK" primaryButtonColor="green" title={modalAlertTitle}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Text as="b" fontSize="lg">{errorData}</Text>
          <Text>({errorStatus} {errorStatusText})</Text>
        </Box>
      </ModalRegular>
    </Box>
  )
}

export default LandingPage