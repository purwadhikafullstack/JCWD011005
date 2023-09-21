import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Box, Button, Input, Text, useDisclosure } from '@chakra-ui/react';
import { TbAlertTriangle, TbLockQuestion } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';
import BlankPage from '../universal/BlankPage';
import FormCard from '../../components/card/FormCard';
import InputWithError from '../../components/input/InputWithError'
import ModalRegular from '../../components/modal/ModalRegular';

const SubmitEmailPage = (props) => {
  const [errorStatus, setErrorStatus] = useState("");
  const [errorStatusText, setErrorStatusText] = useState("");
  const [errorData, setErrorData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const destination = (props.purpose === "password")? "resetPassword" : "resendOtp";
  const formTitle = (props.purpose === "password")? "Kehilangan kata sandi?" : "Kode OTP kadaluarsa?";
  const formDescription = (props.purpose === "password")? "Kami akan membantu dalam memulihkan akun anda" : "Kami akan membantu dalam verifikasi akun anda";

  const modalAlertTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    <TbAlertTriangle size={70}/>
    <Text as={"b"} fontSize="2xl">Kesalahan</Text>
  </Box>;

  const submitEmailSchema = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format penulisan email tidak valid!")
        .required("Email tidak boleh kosong!")
    }),
    onSubmit: async values => {
      setIsLoading(true);
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/${destination}`, {
        email: values.email,
      }).then(resp => {
        setIsLoading(false);
        navigate('/user/register/emailSent');
      }).catch(err => {
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
      <FormCard>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <TbLockQuestion size={70}/>
        </Box>
        <Text as="b" fontSize="2xl">${formTitle}</Text>
        <Text>${formDescription}</Text>
        <form onSubmit={submitEmailSchema.handleSubmit}>
          <InputWithError errors={submitEmailSchema.errors.email} touched={submitEmailSchema.touched.email}>
            <Input type="text" name="email" placeholder='Email' bgColor="white" borderColor={"grey"} color={"black"} value={submitEmailSchema.values.email} onChange={submitEmailSchema.handleChange}/>
          </InputWithError>
          <Box display={"flex"}>
            <Button type="submit" isLoading={isLoading} colorScheme={"green"} flex={1} marginX="5">Kirim</Button>
          </Box>
        </form>

        <ModalRegular isLoading={isLoading} isOpen={isOpen} onCloseX={onClose} onSubmit={onClose} primaryButton="OK" primaryButtonColor="green" title={modalAlertTitle}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Text as="b" fontSize="lg">{errorData}</Text>
            <Text>({errorStatus} {errorStatusText})</Text>
          </Box>
        </ModalRegular>
      </FormCard>
    </BlankPage>
  )
}

export default SubmitEmailPage