import React, { useState } from 'react'
import BlankPage from './BlankPage'
import InputWithError from '../components/input/InputWithError'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Box, Button, Input, Text, useDisclosure } from '@chakra-ui/react';
import { TbAlertTriangle, TbLockQuestion } from 'react-icons/tb'
import FormCard from '../components/card/FormCard';
import ModalRegular from '../../components/modal/ModalRegular';

const SubmitEmailPage = () => {
  const [errorStatus, setErrorStatus] = useState("");
  const [errorStatusText, setErrorStatusText] = useState("");
  const [errorData, setErrorData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        .required("Email tidak boleh kosong!")
        .email("Format email tidak benar!")
    }),
    onSubmit: async values => {
      setIsLoading(true);
      await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", {
        email: values.email,
      }).then(resp => {
        setIsLoading(false);
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
        <Text as="b" fontSize="2xl">Kehilangan kata sandi?</Text>
        <Text>Kami akan membantu dalam memulihkan akun anda</Text>
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