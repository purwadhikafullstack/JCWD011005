import { Box, Button, Divider, IconButton, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import InputWithError from '../../components/input/InputWithError'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import InputPassword from '../../components/input/InputPassword';
import ModalRegular from '../../components/modal/ModalRegular';
import { BsFacebook, BsFillTelephoneFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { TbAlertTriangle, TbUserPlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import BlankPage from '../universal/BlankPage';
import FormCard from '../../components/card/FormCard';
import PopoverText from '../../components/popover/PopoverText';

const UserRegisterPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const [errorStatus, setErrorStatus] = useState("");
  const [errorStatusText, setErrorStatusText] = useState("");
  const [errorData, setErrorData] = useState("");
  
  const modalAlertTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    <TbAlertTriangle size={70}/>
    <Text as={"b"} fontSize="2xl">Kesalahan</Text>
  </Box>;

  const userRegisterSchema = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
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
        navigate('/user/register/emailSent');
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
    <BlankPage>
      <FormCard gap="5">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginBottom="5">
          <TbUserPlus size="70"/>
          <Text as="b" fontSize="2xl">Membuat Akun Baru</Text>
        </Box>
        <form onSubmit={userRegisterSchema.handleSubmit}>
          <InputWithError margin="0" padding="1" errors={userRegisterSchema.errors.firstName} touched={userRegisterSchema.touched.firstName}>
            <Input type="text" name="firstName" placeholder='Nama Depan' bgColor="white" borderColor="grey" color="black" value={userRegisterSchema.values.firstName} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <InputWithError margin="0" padding="1" errors={userRegisterSchema.errors.lastName} touched={userRegisterSchema.touched.lastName}>
            <Input type="text" name="lastName" placeholder='Nama Belakang' bgColor="white" borderColor="grey" color="black" value={userRegisterSchema.values.lastName} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <InputWithError margin="0" padding="1" errors={userRegisterSchema.errors.email} touched={userRegisterSchema.touched.email}>
            <Input type="text" name="email" placeholder='Email' bgColor="white" borderColor="grey" color="black" value={userRegisterSchema.values.email} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <InputWithError margin="0" padding="1" errors={userRegisterSchema.errors.password} touched={userRegisterSchema.touched.password}>
            <InputPassword name="password" value={userRegisterSchema.values.password} onChange={userRegisterSchema.handleChange} handleClick={handleClick} show={show}/>
          </InputWithError>
          <InputWithError margin="0" padding="1" errors={userRegisterSchema.errors.phone} touched={userRegisterSchema.touched.phone}>
            <Input type="text" name="phone" placeholder='Nomor Telepon' bgColor="white" borderColor="grey" color="black" value={userRegisterSchema.values.phone} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <Button type="submit" colorScheme="green" isLoading={isLoading} marginX="5" marginTop="5">Mendaftar</Button>
        </form>
        <Divider/>
        <Box display="flex" flexDirection="column" gap="5">
          <Text>Atau dengan cara lain:</Text>
          <Box display="flex" justifyContent="center" gap="5">
            <PopoverText bgColor="teal" borderColor="transparent" text="Phone" textColor="white">
              <IconButton aria-label='Phone' colorScheme='teal' icon={<BsFillTelephoneFill />} isRound={true} fontSize='20px' size="lg" variant='solid'/>
            </PopoverText>
            <PopoverText bgColor="white" borderColor="gray.300" text="Google" textColor="black">
              <IconButton aria-label='Google' colorScheme="white" border="1px" borderColor='gray.300' icon={<FcGoogle />} isRound={true} fontSize='30px' size="lg" variant='solid'/>
            </PopoverText>
            <PopoverText bgColor="blue.500" borderColor="transparent" text="Facebook" textColor="white">
              <IconButton aria-label='Facebook' colorScheme='blue' icon={<BsFacebook />} isRound={true} fontSize='30px' size="lg" variant='solid'/>
            </PopoverText>
          </Box>
        </Box>
        
        <ModalRegular isOpen={isOpen} onCloseX={onClose} onSubmit={onClose} primaryButton="OK" primaryButtonColor="green" title={modalAlertTitle}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Text as="b" fontSize="lg">{errorData}</Text>
            <Text>({errorStatus} {errorStatusText})</Text>
          </Box>
        </ModalRegular>
      </FormCard>
    </BlankPage>
  )
}

export default UserRegisterPage