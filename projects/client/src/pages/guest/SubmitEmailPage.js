import React, { useState } from 'react'
import BlankPage from './BlankPage'
import InputWithError from '../components/input/InputWithError'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { TbLockQuestion } from 'react-icons/tb'
import FormCard from '../components/card/FormCard';

const SubmitEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        alert(`[resp.data]: ${resp.data}`);
      }).catch(error => {
        setIsLoading(false);
        alert(`[error.response.data.err] ${error.response.data.err}`);
      });
      alert("Done");
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
      </FormCard>
    </BlankPage>
  )
}

export default SubmitEmailPage