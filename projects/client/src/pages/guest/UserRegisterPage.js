import { Box, Button, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import InputWithError from '../../components/input/InputWithError'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import InputPassword from '../../components/input/InputPassword';
import ModalRegular from '../../components/modal/ModalRegular';
import { TbAlertTriangle } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const UserRegisterPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
      }).then(resp => {
        navigate('/user-register/emailSent');
      }).catch(err => {
        console.log(err.response);
        
        setErrorStatus(err.response.status);
        setErrorStatusText(err.response.statusText);
        setErrorData(err.response.data);
        onOpen();
      });
    }
  });
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"calc(100vh)"} width={"100%"} bgColor={"lightgrey"}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width="25%" bgColor={"white"} border={"black"} borderRadius={"15"} padding={"5"} boxShadow={"md"} >
        <form onSubmit={userRegisterSchema.handleSubmit}>
          <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.firstName} touched={userRegisterSchema.touched.firstName}>
            <Input type="text" name="firstName" placeholder='Nama Depan' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.firstName} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.lastName} touched={userRegisterSchema.touched.lastName}>
            <Input type="text" name="lastName" placeholder='Nama Belakang' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.lastName} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.email} touched={userRegisterSchema.touched.email}>
            <Input type="text" name="email" placeholder='Email' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.email} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.password} touched={userRegisterSchema.touched.password}>
            <InputPassword name="password" value={userRegisterSchema.values.password} onChange={userRegisterSchema.handleChange} handleClick={handleClick} show={show}/>
          </InputWithError>
          <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.phone} touched={userRegisterSchema.touched.phone}>
            <Input type="text" name="phone" placeholder='Nomor Telepon' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.phone} onChange={userRegisterSchema.handleChange}/>
          </InputWithError>
          <Button type="submit" colorScheme={"green"} marginX="5">Mendaftar</Button>
        </form>
        
        <ModalRegular isOpen={isOpen} onCloseX={onClose} onSubmit={onClose} primaryButton="OK" primaryButtonColor="green" title={modalAlertTitle}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Text as="b" fontSize="lg">{errorData}</Text>
            <Text>({errorStatus} {errorStatusText})</Text>
          </Box>
        </ModalRegular>
      </Box>
    </Box>
  )
}

export default UserRegisterPage