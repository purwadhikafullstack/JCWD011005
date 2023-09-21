import React from 'react'
import BlankPage from './BlankPage'
import InputWithError from '../components/input/InputWithError'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { TbLockQuestion } from 'react-icons/tb'
import FormCard from '../components/card/FormCard';

const ResendOtpPage = () => {
    const forgotPasswordSchema = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
              .required("Email tidak boleh kosong!")
              .email("Format email tidak benar!")
        }),
        onSubmit: async values => {
            // alert(JSON.stringify(values, null, 2));
  
            // const axios = require("axios");
            await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", {
                email: values.email,
            }).then(resp => {
                alert(`[resp.data]: ${resp.data}`);
            }).catch(error => {
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
          <form onSubmit={forgotPasswordSchema.handleSubmit}>
            <InputWithError errors={forgotPasswordSchema.errors.email} touched={forgotPasswordSchema.touched.email}>
              <Input type="text" name="email" placeholder='Email' bgColor="white" borderColor={"grey"} color={"black"} value={forgotPasswordSchema.values.email} onChange={forgotPasswordSchema.handleChange}/>
            </InputWithError>
            <Box display={"flex"}>
              <Button type="submit" colorScheme={"green"} flex={1} marginX="5">Kirim</Button>
            </Box>
          </form>
        </FormCard>
      </BlankPage>
    )
}

export default ResendOtpPage