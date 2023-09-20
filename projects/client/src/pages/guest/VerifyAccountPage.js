import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import InputWithError from '../../components/input/InputWithError';
import BlankPage from '../universal/BlankPage';

const VerifyAccountPage = () => {
  const verifyAccountSchema = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
        otp: Yup.string()
        .matches(/[0-9]/, "Kode OTP yang diperbolehkan hanya angka!")
        .max(6, "Kode OTP maksimal 6 digit!")
        .required("Kode OTP tidak boleh kosong!")
    }),
    onSubmit: async values => {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/verifyAccount`, {
        otp: values.otp,
      }).then(resp => {
        // props.fetchData();
      }).catch(error => {
        console.log(error.response.data.error);
        alert(error.response.data.message);
      });
    }
  });
  return (
    <BlankPage>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width="25%" bgColor={"white"} border={"black"} borderRadius={"15"} padding={"5"} boxShadow={"md"} >
        <form onSubmit={verifyAccountSchema.handleSubmit}>
          <InputWithError margin={"0"} padding={"1"} errors={verifyAccountSchema.errors.otp} touched={verifyAccountSchema.touched.otp}>
            <Input type="text" name="otp" placeholder='Kode OTP' bgColor="white" borderColor={"grey"} color={"black"} value={verifyAccountSchema.values.phone} onChange={verifyAccountSchema.handleChange}/>
          </InputWithError>
          <Button type="submit" colorScheme={"green"} marginX="5">Verifikasi</Button>
        </form>
      </Box>
    </BlankPage>
  )
}

export default VerifyAccountPage