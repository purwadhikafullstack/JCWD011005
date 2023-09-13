import { Box, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import InputWithError from '../../components/input/InputWithError'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import InputPassword from '../../components/input/InputPassword';

const UserRegisterPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
      await axios.post("http://localhost:8000/api/user/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
      }).then(resp => {
        // props.fetchData();
      }).catch(error => {
        console.log(error.response.data.error);
        alert(error.response.data.message);
      });
    }
  });
  return (
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
  )
}

export default UserRegisterPage