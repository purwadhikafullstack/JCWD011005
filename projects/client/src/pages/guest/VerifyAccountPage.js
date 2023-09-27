import { Box, Button, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import InputWithError from '../../components/input/InputWithError';
import BlankPage from '../universal/BlankPage';
import FormCard from '../../components/card/FormCard';
import { TbAlertTriangle, TbUserCheck } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import ModalRegular from '../../components/modal/ModalRegular';

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [errorStatusText, setErrorStatusText] = useState("");
  const [errorData, setErrorData] = useState("");
  const {token} = useParams();
  
  const modalAlertTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    <TbAlertTriangle size={70}/>
    <Text as={"b"} fontSize="2xl">Kesalahan</Text>
  </Box>;

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
      setIsLoading(true);
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/verify`, {
        otp: values.otp
      }, {
        headers: {
          'Token': token
        },
      }).then(resp => {
        setIsLoading(false);
        navigate('/user/verified');
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
        <Box display={"flex"} flexDirection="column" justifyContent={"center"} alignItems={"center"} marginBottom="5">
          <TbUserCheck size={70}/>
          <Text as="b" fontSize="2xl">Verifikasi Akun</Text>
          <Text>Untuk melakukan verifikasi akun anda, masukkan kode OTP yang kami kirimkan melalui email anda</Text>
        </Box>
        <form onSubmit={verifyAccountSchema.handleSubmit}>
          <InputWithError margin={"0"} padding={"1"} errors={verifyAccountSchema.errors.otp} touched={verifyAccountSchema.touched.otp}>
          <Input type="text" name="otp" placeholder='Kode OTP' bgColor="white" borderColor={"grey"} color={"black"} value={verifyAccountSchema.values.phone} onChange={verifyAccountSchema.handleChange}/>
          </InputWithError>
          <Button type="submit" colorScheme={"green"} isLoading={isLoading} marginX="5" marginTop="5">Verifikasi</Button>
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

export default VerifyAccountPage