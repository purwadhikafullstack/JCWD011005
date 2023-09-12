import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'
import InputWithError from '../../components/input/InputWithError'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";

const UserRegisterPage = () => {
  const userRegisterSchema = useFormik({
    initialValues: {
      roleName: ""
    },
    validationSchema: Yup.object({
      roleName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
        .required("Peran tidak boleh kosong!"),
    }),
    onSubmit: async values => {
      await axios.post("http://localhost:8000/api/admin/role/create", {
        roleName: values.roleName
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
      <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.firstName} touched={userRegisterSchema.touched.lastName}>
        <Input type="text" name="lastName" placeholder='Nama Belakang' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.lastName} onChange={userRegisterSchema.handleChange}/>
      </InputWithError>
      <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.email} touched={userRegisterSchema.touched.email}>
        <Input type="text" name="email" placeholder='Nama Depan' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.email} onChange={userRegisterSchema.handleChange}/>
      </InputWithError>
      <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.password} touched={userRegisterSchema.touched.password}>
        <Input type="text" name="password" placeholder='Password' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.password} onChange={userRegisterSchema.handleChange}/>
      </InputWithError>
      <InputWithError margin={"0"} padding={"1"} errors={userRegisterSchema.errors.phone} touched={userRegisterSchema.touched.phone}>
        <Input type="text" name="phone" placeholder='Nomor Telepon' bgColor="white" borderColor={"grey"} color={"black"} value={userRegisterSchema.values.phone} onChange={userRegisterSchema.handleChange}/>
      </InputWithError>
      <Button type="submit" colorScheme={"green"} marginX="5">Mendaftar</Button>
    </form>
  )
}

export default UserRegisterPage