import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import ModalRegular from '../../components/modal/ModalRegular';
import { IoBed, IoPerson } from 'react-icons/io5';
import { TbAlertTriangle, TbLogin, TbLogout, TbSearch } from 'react-icons/tb';
import InputWithError from '../../components/input/InputWithError';
import InputDate from '../../components/input/InputDate';
import InputWithLeftIcon from '../../components/input/InputWithLeftIcon';
import DropdownMenu from '../../components/input/DropdownMenu';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [errorStatus, setErrorStatus] = useState("");
  const [errorStatusText, setErrorStatusText] = useState("");
  const [errorData, setErrorData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMouseOverStartDate, setIsMouseOverStartDate] = useState(false);
  const [isMouseOverEndDate, setIsMouseOverEndDate] = useState(false);
  const [inputHeight] = useState("60px");
  const [marginX] = useState(75);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const dropdownMenuItem = [
    {"display": "1 orang", "value": 1},
    {"display": "2 orang", "value": 2},
    {"display": "3 orang", "value": 3},
    {"display": "4 orang", "value": 4},
    {"display": "lebih dari 5 orang", "value": 5},
  ]

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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/greetings`, {
        name: values.propertyName,
        start_date: values.startDate,
        end_date: values.endDate,
        total_guest: values.totalGuest
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
            <Box backgroundColor="white" borderTopRadius="15" display="flex" flexDirection="row" alignItems="center" gap="5" marginX={marginX} paddingBottom="2.5" paddingTop="5" paddingX="5" width="100%">
              <InputWithError margin="0" padding="1" errors={roomSearchSchema.errors.propertyName} touched={roomSearchSchema.touched.propertyName}>
                <InputWithLeftIcon type="text" name="propertyName" placeholder='Nama Penginapan' height={inputHeight} icon={<IoBed/>} value={roomSearchSchema.values.propertyName} onChange={roomSearchSchema.handleChange}/>
              </InputWithError>
              <InputWithError margin="0" padding="1" width="35%" errors={roomSearchSchema.errors.startDate} touched={roomSearchSchema.touched.startDate}>
                <InputDate type={isMouseOverStartDate} name="startDate" placeholder={'Tanggal Check In'} height={inputHeight} icon={<TbLogin/>} value={roomSearchSchema.values.startDate} onChange={roomSearchSchema.handleChange} onMouseOver={() => setIsMouseOverStartDate(true)} onMouseOut={() => setIsMouseOverStartDate(false)}/>
              </InputWithError>
              <InputWithError margin="0" padding="1" width="35%" errors={roomSearchSchema.errors.endDate} touched={roomSearchSchema.touched.endDate}>
                <InputDate type={isMouseOverEndDate} name="endDate" placeholder='Tanggal Check Out' height={inputHeight} icon={<TbLogout/>} value={roomSearchSchema.values.endDate} onChange={roomSearchSchema.handleChange} onMouseOver={() => setIsMouseOverEndDate(true)} onMouseOut={() => setIsMouseOverEndDate(false)}/>
              </InputWithError>
              <Box as="b" border="2px" borderColor="gray" borderRadius="50" display="flex" justifyContent="center" alignItems="center" fontSize="lg" height="40px" paddingX="5" minWidth="130px">12 Malam</Box>
              <InputWithError margin="0" padding="1" width="auto" errors={roomSearchSchema.errors.totalGuest} touched={roomSearchSchema.touched.totalGuest}>
                <DropdownMenu icon={<IoPerson/>} buttonHeight={inputHeight} placeholder="Jumlah Tamu" value={dropdownMenuItem}></DropdownMenu>
              </InputWithError>
            </Box>
          </Box>
        </Box>
        <Box backgroundColor="white" borderBottomRadius="15" boxShadow="md" display="flex" flexDirection="row" marginX={marginX} paddingBottom="5" paddingTop="2.5" paddingX="5">
          <Button type="submit" colorScheme="blue" gap="2" isLoading={isLoading} width="100%"><TbSearch/>Cari</Button>
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
  )
}

export default LandingPage