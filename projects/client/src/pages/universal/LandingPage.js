import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import ModalRegular from '../../components/modal/ModalRegular';
import { TbAlertTriangle } from 'react-icons/tb';

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState([]);
  const [errorStatus, setErrorStatus] = useState("");
  const [errorStatusText, setErrorStatusText] = useState("");
  const [errorData, setErrorData] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [marginX] = useState(75);

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

  const roomSearchSchema = useFormik({
    initialValues: {
      propertyName: "",
      checkInDate: "",
      checkOutDate: "",
      totalGuest: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
        .required("Nama depan tidak boleh kosong!"),
      lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!"),
      email: Yup.string()
        .email("Format penulisan email tidak valid!")
        .required("Email tidak boleh kosong!"),
      password: Yup.string()
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+=,{}[\]|:;'"><>?/])[a-zA-Z\d`~!@#$%^&*()_+=,{}[\]|:;'"><>?/]+$/, "Kata sandi harus kombinasi alphanumerik dan karakter spesial!")
        .min(6, "Kata sandi setidaknya minimal 6 karakter!")
        .required("Kata sandi tidak boleh kosong!"),
      phone: Yup.string()
        .matches(/[0-9]/, "Nomor ponsel yang diperbolehkan hanya angka!")
        .min(10, "Nomor ponsel setidaknya minimal 10 digit!")
        .max(13, "Nomor ponsel maksimal 13 digit!")
        .required("Nomor ponsel tidak boleh kosong!")
    }),
    onSubmit: async values => {
      setIsLoading(true);
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
      }).then(resp => {
        setIsLoading(false);
        navigate('/result');
      }).catch(err => {
        console.log(err.response);
        setIsLoading(false);
        setErrorStatus(err.response.status);
        setErrorStatusText(err.response.statusText);
        (typeof err.response.data === 'string')? setErrorData(err.response.data) : setErrorData(err.response.data.message);
        onOpen();
      });
    }
  });
  return (
    <Box display="flex" flexDirection="column" gap="5">
      <form onSubmit={roomSearchSchema.handleSubmit}>
        <Box bgColor="red" bgImage={`${process.env.REACT_APP_API_BASE_URL}/heros/header.jpg`} bgPosition={{base: "0px 0px", lg: "0px -150px"}} bgRepeat="no-repeat" bgSize="100% auto" display="flex" flexDirection="column" height={{base: "100%", lg:"90vh"}} width="100%">
          <Box flex="1" bgColor="blackAlpha.400" display="flex" flexDirection="row" justifyContent="space-between" alignItems="baseline" paddingTop="50" paddingX={marginX}>
            <Text as="b" fontSize="5xl">Pro-Rent</Text>
            <Button size="lg" colorScheme='blue'>Login</Button>
          </Box>
          <Box flex="1" bgColor="blackAlpha.400" color="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Text as="b" fontSize="7xl">Hotel for moments rich</Text>
            <Text as="b" fontSize="7xl">in emotions</Text>
          </Box>
          <Box flex="1" bgColor="blackAlpha.400" display="flex" alignItems="flex-end">
            <Box backgroundColor="white" borderTopRadius="15" display="flex" flexDirection="row" gap="5" marginX={marginX} paddingBottom="2.5" paddingTop="5" paddingX="5" width="100%">
              <Input type='text' placeholder='Kota atau penginapan' backgroundColor="white" border="1px"/>
              <Input type='date' placeholder='Tanggal Check In' backgroundColor="white" border="1px"/>
              <Input type='date' placeholder='Tanggal Check Out' backgroundColor="white" border="1px"/>
              <Box border="1px" borderRadius="100" width="auto">2 Malam</Box>
              <Input type='text' placeholder='Kamar & Jumlah Tamu' backgroundColor="white" border="1px"/>
            </Box>
          </Box>
        </Box>
        <Box backgroundColor="white" borderBottomRadius="15" boxShadow="md" display="flex" flexDirection="row" marginX={marginX} paddingBottom="5" paddingTop="2.5" paddingX="5">
          <Button type="submit" colorScheme="blue" isLoading={isLoading} width="100%">Cari</Button>
        </Box>
      </form>
      <Box display="flex" flexDirection="column" gap="5" marginX={marginX}>
        <Text as="b" fontSize="2xl">Kategori</Text>
        <Box display="flex" flexDirection="row" overflowX="auto" paddingY="30px">
          {
            (categories)? categories.map((item, index) => (
              <Box as="button" borderRadius="15" display="flex" flexDirection="row" alignItems="center" gap="5" _hover={{background: "blackAlpha.500"}} id={index} paddingRight="50" transition="0.3s" minWidth="400px" width="100%">
                <Image borderRadius="15px" boxSize="100px" src={`${process.env.REACT_APP_API_BASE_URL}/categories/${item.name}.jpg`} alt={`${item.name} Image`}/>
                <Text as="b" fontSize="xl">{item.name}</Text>
              </Box>
            ))
            : <Box bgColor="red"><Text>This is Landing Page</Text></Box>
          }
        </Box>
      </Box>
      <Box bgColor="gray.200" boxShadow="md" paddingY="5">
        <Box display="flex" flexDirection="row" gap="5" marginX={marginX}>
          <Box display="flex" flexDirection="column" gap="5" flex="1">
            <Text as="b" fontSize="2xl">About Pro-Rent</Text>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="5" flex="1">
            <Text as="b" fontSize="lg">Company</Text>
            <Text>About</Text>
            <Text>Features</Text>
            <Text>Works</Text>
            <Text>Career</Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="5" flex="1">
            <Text as="b" fontSize="lg">Help</Text>
            <Text>Customer Support</Text>
            <Text>Delivery Details</Text>
            <Text>Terms & Conditions</Text>
            <Text>Privacy Policy</Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="5" flex="1">
            <Text as="b" fontSize="lg">Resources</Text>
            <Text>Free eBooks</Text>
            <Text>Development Tutorial</Text>
            <Text>How to - Blog</Text>
            <Text>Youtube Playlist</Text>
          </Box>
        </Box>
      </Box>
        
      <ModalRegular isOpen={isOpen} onCloseX={onClose} onSubmit={onClose} primaryButton="OK" primaryButtonColor="green" title={modalAlertTitle}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Text as="b" fontSize="lg">{errorData}</Text>
          <Text>({errorStatus} {errorStatusText})</Text>
        </Box>
      </ModalRegular>
    </Box>

    // <Box position="relative" height="500px" width="500px">
    //   <Box bgColor="red.200" height="100%" position="absolute" width="100%">This is red box</Box>
    //   <Box bgColor="blue.200" margin="50%" height="100%" display="flex" justifyContent="center" alignItems="center" width="100%" opacity="0.5">This is second box on top of red box</Box>
    // </Box>
  )
}

export default LandingPage